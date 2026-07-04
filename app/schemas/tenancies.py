from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.schemas.properties import PropertyRecord


class TenancyRecord(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    property_id: UUID
    tenant_name: str
    tenant_email: EmailStr
    rent_amount_cents: int
    rent_frequency: str
    lease_start_date: date
    lease_end_date: date
    status: str


class TenancyCreate(BaseModel):
    tenant_name: str = Field(min_length=1)
    tenant_email: EmailStr
    rent_amount_cents: int = Field(ge=0)
    rent_frequency: str = Field(min_length=1)
    lease_start_date: date
    lease_end_date: date
    status: str = Field(default="active", min_length=1)


class OnboardRequest(BaseModel):
    landlord_id: UUID
    address: str = Field(min_length=1)
    state: str = Field(min_length=1)
    tenant_name: str = Field(min_length=1)
    tenant_email: EmailStr
    rent_amount_cents: int = Field(ge=0)
    rent_frequency: str = Field(min_length=1)
    lease_start_date: date
    lease_end_date: date


class OnboardResponse(BaseModel):
    property: PropertyRecord
    tenancy: TenancyRecord
