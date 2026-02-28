"""
Inspection schemas for validation
"""
from pydantic import BaseModel
from datetime import datetime
from app.models.inspection import InspectionStatusEnum

class ExternalInspectionBase(BaseModel):
    equipment_id: int
    inspector_name: str
    certificate_number: str
    certificate_date: datetime
    expiry_date: datetime

class ExternalInspectionCreate(ExternalInspectionBase):
    pass

class ExternalInspectionRead(ExternalInspectionBase):
    id: int
    status: InspectionStatusEnum
    created_at: datetime
    created_by_id: int

    class Config:
        from_attributes = True

class FieldInspectionBase(BaseModel):
    equipment_id: int
    inspector_name: str
    inspection_date: datetime
    next_inspection_date: datetime

class FieldInspectionCreate(FieldInspectionBase):
    pass

class FieldInspectionRead(FieldInspectionBase):
    id: int
    status: InspectionStatusEnum
    created_at: datetime
    created_by_id: int

    class Config:
        from_attributes = True
