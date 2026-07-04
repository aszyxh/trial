from datetime import datetime, timezone

import pytest
from fastapi.testclient import TestClient

from app.api.deps import get_dashboard_service, get_maintenance_service, get_onboarding_service
from app.main import app


class FakeOnboardingService:
    def onboard(self, payload):
        return {
            "property": {
                "id": "11111111-1111-1111-1111-111111111111",
                "landlord_id": str(payload.landlord_id),
                "address": payload.address,
                "state": payload.state,
            },
            "tenancy": {
                "id": "22222222-2222-2222-2222-222222222222",
                "property_id": "11111111-1111-1111-1111-111111111111",
                "tenant_name": payload.tenant_name,
                "tenant_email": str(payload.tenant_email),
                "rent_amount_cents": payload.rent_amount_cents,
                "rent_frequency": payload.rent_frequency,
                "lease_start_date": payload.lease_start_date,
                "lease_end_date": payload.lease_end_date,
                "status": "active",
            },
        }


class FakeMaintenanceService:
    def create_ticket(self, payload):
        issue = payload.raw_issue_text.lower()
        urgent = any(keyword in issue for keyword in ("leak", "burst", "gas", "electrical", "overflow", "fire"))
        return {
            "id": "33333333-3333-3333-3333-333333333333",
            "property_id": "11111111-1111-1111-1111-111111111111",
            "tenancy_id": str(payload.tenancy_id),
            "raw_issue_text": payload.raw_issue_text,
            "category": "emergency" if urgent else "general",
            "urgency_level": "Urgent" if urgent else "Non-Urgent",
            "status": "open",
            "created_at": datetime.now(timezone.utc),
        }


class FakeDashboardService:
    def get_exceptions(self):
        return {
            "urgent_maintenance_tickets": [],
            "expiring_tenancies": [],
            "lease_expiry_window_days": 30,
        }


@pytest.fixture()
def client():
    app.dependency_overrides[get_onboarding_service] = lambda: FakeOnboardingService()
    app.dependency_overrides[get_maintenance_service] = lambda: FakeMaintenanceService()
    app.dependency_overrides[get_dashboard_service] = lambda: FakeDashboardService()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
