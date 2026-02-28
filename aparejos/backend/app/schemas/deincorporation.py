"""
Deincorporation Report schemas for validation
"""
from pydantic import BaseModel
from datetime import datetime

class DeincorporationReportBase(BaseModel):
    equipment_id: int
    report_date: datetime
    reason: str
    inspector_name: str

class DeincorporationReportCreate(DeincorporationReportBase):
    pass

class DeincorporationReportRead(DeincorporationReportBase):
    id: int
    created_at: datetime
    created_by_id: int

    class Config:
        from_attributes = True
