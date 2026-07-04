from fastapi import Depends

from app.core.supabase import get_supabase_client
from app.repositories.supabase_repository import SupabaseRepository
from app.services.dashboard_service import DashboardService
from app.services.maintenance_service import MaintenanceService
from app.services.onboarding_service import OnboardingService


def get_repository(client=Depends(get_supabase_client)) -> SupabaseRepository:
    return SupabaseRepository(client)


def get_onboarding_service(repository=Depends(get_repository)) -> OnboardingService:
    return OnboardingService(repository)


def get_maintenance_service(repository=Depends(get_repository)) -> MaintenanceService:
    return MaintenanceService(repository)


def get_dashboard_service(repository=Depends(get_repository)) -> DashboardService:
    return DashboardService(repository)
