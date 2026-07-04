from datetime import date, timedelta
from typing import Any

from supabase import Client

from app.core.errors import ExternalServiceError, NotFoundError


class SupabaseRepository:
    def __init__(self, client: Client) -> None:
        self.client = client

    @staticmethod
    def _unwrap_single(result: Any) -> dict[str, Any]:
        error = getattr(result, "error", None)
        data = getattr(result, "data", None)
        if error:
            raise ExternalServiceError(str(error))
        if not data:
            raise NotFoundError()
        return data[0] if isinstance(data, list) else data

    @staticmethod
    def _unwrap_many(result: Any) -> list[dict[str, Any]]:
        error = getattr(result, "error", None)
        data = getattr(result, "data", None)
        if error:
            raise ExternalServiceError(str(error))
        return data or []

    def create_property(self, payload: dict[str, Any]) -> dict[str, Any]:
        result = self.client.table("properties").insert(payload).execute()
        return self._unwrap_single(result)

    def create_tenancy(self, payload: dict[str, Any]) -> dict[str, Any]:
        result = self.client.table("tenancies").insert(payload).execute()
        return self._unwrap_single(result)

    def get_tenancy_by_id(self, tenancy_id: str) -> dict[str, Any]:
        result = self.client.table("tenancies").select("*").eq("id", tenancy_id).limit(1).execute()
        return self._unwrap_single(result)

    def create_maintenance_ticket(self, payload: dict[str, Any]) -> dict[str, Any]:
        result = self.client.table("maintenance_tickets").insert(payload).execute()
        return self._unwrap_single(result)

    def get_urgent_open_maintenance_tickets(self) -> list[dict[str, Any]]:
        result = (
            self.client.table("maintenance_tickets")
            .select("*")
            .eq("status", "open")
            .eq("urgency_level", "Urgent")
            .execute()
        )
        return self._unwrap_many(result)

    def get_expiring_tenancies(self, days: int = 30) -> list[dict[str, Any]]:
        today = date.today()
        end_date = today + timedelta(days=days)
        result = (
            self.client.table("tenancies")
            .select("*")
            .gte("lease_end_date", today.isoformat())
            .lte("lease_end_date", end_date.isoformat())
            .execute()
        )
        return self._unwrap_many(result)
