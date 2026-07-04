from pydantic import BaseModel

from app.schemas.maintenance import MaintenanceTicketRecord
from app.schemas.tenancies import TenancyRecord


class ExceptionsFeedResponse(BaseModel):
    urgent_maintenance_tickets: list[MaintenanceTicketRecord]
    expiring_tenancies: list[TenancyRecord]
    lease_expiry_window_days: int = 30
