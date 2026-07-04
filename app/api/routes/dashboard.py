from fastapi import APIRouter, Depends

from app.api.deps import get_dashboard_service
from app.schemas.dashboard import ExceptionsFeedResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/exceptions", response_model=ExceptionsFeedResponse)
def get_exceptions(service: DashboardService = Depends(get_dashboard_service)) -> ExceptionsFeedResponse:
    return service.get_exceptions()
