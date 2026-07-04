from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class PropertyRecord(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    landlord_id: UUID
    address: str
    state: str


class PropertyCreate(BaseModel):
    landlord_id: UUID
    address: str = Field(min_length=1)
    state: str = Field(min_length=1)
