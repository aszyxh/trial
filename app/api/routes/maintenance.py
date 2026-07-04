from fastapi import APIRouter, Depends

from app.api.deps import get_maintenance_service
from app.schemas.maintenance import MaintenanceCreate, MaintenanceTicketRecord
from app.services.maintenance_service import MaintenanceService

router = APIRouter(prefix="/maintenance", tags=["maintenance"])


@router.post("", response_model=MaintenanceTicketRecord)
def create_ticket(payload: MaintenanceCreate, service: MaintenanceService = Depends(get_maintenance_service)) -> MaintenanceTicketRecord:
    return service.create_ticket(payload)
