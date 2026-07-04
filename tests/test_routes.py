def test_onboard_route(client):
    response = client.post(
        "/api/onboard",
        json={
            "landlord_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            "address": "12 Example St",
            "state": "NSW",
            "tenant_name": "Jane Tenant",
            "tenant_email": "jane@example.com",
            "rent_amount_cents": 250000,
            "rent_frequency": "weekly",
            "lease_start_date": "2026-07-01",
            "lease_end_date": "2027-07-01",
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert body["property"]["address"] == "12 Example St"
    assert body["tenancy"]["tenant_email"] == "jane@example.com"


def test_maintenance_route_urgent(client):
    response = client.post(
        "/api/maintenance",
        json={
            "tenancy_id": "22222222-2222-2222-2222-222222222222",
            "raw_issue_text": "The toilet is blocked and overflowing",
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert body["urgency_level"] == "Urgent"
    assert body["status"] == "open"


def test_dashboard_exceptions_route(client):
    response = client.get("/api/dashboard/exceptions")
    assert response.status_code == 200
    body = response.json()
    assert body["urgent_maintenance_tickets"] == []
    assert body["expiring_tenancies"] == []
    assert body["lease_expiry_window_days"] == 30
