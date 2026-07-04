from fastapi import APIRouter, Depends

from app.api.deps import get_onboarding_service
from app.schemas.tenancies import OnboardRequest, OnboardResponse
from app.services.onboarding_service import OnboardingService

router = APIRouter(prefix="/onboard", tags=["onboarding"])


@router.post("", response_model=OnboardResponse)
def onboard(payload: OnboardRequest, service: OnboardingService = Depends(get_onboarding_service)) -> OnboardResponse:
    return service.onboard(payload)
