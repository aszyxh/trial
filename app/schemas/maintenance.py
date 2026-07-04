from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class MaintenanceTicketRecord(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    property_id: UUID
    tenancy_id: UUID
    raw_issue_text: str
    category: str
    urgency_level: str
    status: str
    created_at: datetime


class MaintenanceCreate(BaseModel):
    tenancy_id: UUID
    raw_issue_text: str = Field(min_length=1)
