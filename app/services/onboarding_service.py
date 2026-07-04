import logging

from app.core.errors import ExternalServiceError
from app.repositories.supabase_repository import SupabaseRepository
from app.schemas.properties import PropertyRecord
from app.schemas.tenancies import OnboardRequest, OnboardResponse, TenancyRecord

logger = logging.getLogger(__name__)


class OnboardingService:
    def __init__(self, repository: SupabaseRepository) -> None:
        self.repository = repository

    def onboard(self, payload: OnboardRequest) -> OnboardResponse:
        try:
            property_record = self.repository.create_property(
                {
                    "landlord_id": str(payload.landlord_id),
                    "address": payload.address,
                    "state": payload.state,
                }
            )
            tenancy_record = self.repository.create_tenancy(
                {
                    "property_id": property_record["id"],
                    "tenant_name": payload.tenant_name,
                    "tenant_email": str(payload.tenant_email),
                    "rent_amount_cents": payload.rent_amount_cents,
                    "rent_frequency": payload.rent_frequency,
                    "lease_start_date": payload.lease_start_date.isoformat(),
                    "lease_end_date": payload.lease_end_date.isoformat(),
                    "status": "active",
                }
            )
            logger.info(
                "Sending Magic Link email to tenant",
                extra={"tenancy_id": tenancy_record["id"], "tenant_email": str(payload.tenant_email)},
            )
            return OnboardResponse(
                property=PropertyRecord.model_validate(property_record),
                tenancy=TenancyRecord.model_validate(tenancy_record),
            )
        except Exception as exc:  # pragma: no cover - defensive wrapper
            if isinstance(exc, ExternalServiceError):
                raise
            raise ExternalServiceError(str(exc)) from exc
