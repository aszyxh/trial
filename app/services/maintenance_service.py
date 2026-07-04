import logging
from datetime import datetime, timezone

from app.core.errors import ExternalServiceError
from app.domain.maintenance_rules import classify_maintenance_issue
from app.repositories.supabase_repository import SupabaseRepository
from app.schemas.maintenance import MaintenanceCreate, MaintenanceTicketRecord

logger = logging.getLogger(__name__)


class MaintenanceService:
    def __init__(self, repository: SupabaseRepository) -> None:
        self.repository = repository

    def create_ticket(self, payload: MaintenanceCreate) -> MaintenanceTicketRecord:
        try:
            tenancy_record = self.repository.get_tenancy_by_id(str(payload.tenancy_id))
            classification = classify_maintenance_issue(payload.raw_issue_text)
            if classification.is_urgent:
                logger.warning(
                    "Sending emergency landlord alert",
                    extra={
                        "tenancy_id": str(payload.tenancy_id),
                        "property_id": tenancy_record["property_id"],
                        "raw_issue_text": payload.raw_issue_text,
                    },
                )
            ticket_record = self.repository.create_maintenance_ticket(
                {
                    "property_id": tenancy_record["property_id"],
                    "tenancy_id": str(payload.tenancy_id),
                    "raw_issue_text": payload.raw_issue_text,
                    "category": classification.category,
                    "urgency_level": classification.urgency_level,
                    "status": "open",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                }
            )
            return MaintenanceTicketRecord.model_validate(ticket_record)
        except Exception as exc:  # pragma: no cover - defensive wrapper
            if isinstance(exc, ExternalServiceError):
                raise
            raise ExternalServiceError(str(exc)) from exc
