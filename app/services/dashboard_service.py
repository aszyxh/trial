from app.repositories.supabase_repository import SupabaseRepository
from app.schemas.dashboard import ExceptionsFeedResponse
from app.schemas.maintenance import MaintenanceTicketRecord
from app.schemas.tenancies import TenancyRecord


class DashboardService:
    def __init__(self, repository: SupabaseRepository) -> None:
        self.repository = repository

    def get_exceptions(self) -> ExceptionsFeedResponse:
        urgent_tickets = [MaintenanceTicketRecord.model_validate(row) for row in self.repository.get_urgent_open_maintenance_tickets()]
        expiring_tenancies = [TenancyRecord.model_validate(row) for row in self.repository.get_expiring_tenancies(days=30)]
        return ExceptionsFeedResponse(
            urgent_maintenance_tickets=urgent_tickets,
            expiring_tenancies=expiring_tenancies,
            lease_expiry_window_days=30,
        )
