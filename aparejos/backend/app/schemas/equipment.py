"""
Equipment schemas for validation
"""
from pydantic import BaseModel
from datetime import datetime
from app.models.equipment import EquipmentStatusEnum, EquipmentTypeEnum

class EquipmentBase(BaseModel):
    code: str
    name: str
    equipment_type: EquipmentTypeEnum
    capacity_kg: float | None = None
    project: str | None = None
    location: str | None = None

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(BaseModel):
    name: str | None = None
    capacity_kg: float | None = None
    project: str | None = None
    location: str | None = None
    status: EquipmentStatusEnum | None = None

class EquipmentRead(EquipmentBase):
    id: int
    status: EquipmentStatusEnum
    is_deincorporated: bool
    last_external_inspection_date: datetime | None = None
    last_field_inspection_date: datetime | None = None
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
