"""
Inspection domain models - External and Field inspections
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum, Text, ForeignKey
from sqlalchemy.sql import func
from datetime import datetime
import enum
from app.database import Base

class InspectionStatusEnum(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class ExternalInspection(Base):
    __tablename__ = "external_inspections"

    id = Column(Integer, primary_key=True, index=True)
    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)
    inspector_name = Column(String(200), nullable=False)
    certificate_number = Column(String(100), nullable=False)
    certificate_date = Column(DateTime(timezone=True), nullable=False)
    expiry_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(Enum(InspectionStatusEnum), default=InspectionStatusEnum.COMPLETED)
    
    observations = Column(Text, nullable=True)
    certificate_file = Column(String(500), nullable=True)  # Ruta del PDF
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by_id = Column(Integer, nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    is_deleted = Column(Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<ExternalInspection equipment_id={self.equipment_id}>"

class FieldInspection(Base):
    __tablename__ = "field_inspections"

    id = Column(Integer, primary_key=True, index=True)
    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)
    inspector_name = Column(String(200), nullable=False)
    inspection_date = Column(DateTime(timezone=True), nullable=False)
    next_inspection_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(Enum(InspectionStatusEnum), default=InspectionStatusEnum.COMPLETED)
    
    observations = Column(Text, nullable=True)
    photos = Column(String(500), nullable=True)  # Rutas de fotos (URL)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by_id = Column(Integer, nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    is_deleted = Column(Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<FieldInspection equipment_id={self.equipment_id}>"
