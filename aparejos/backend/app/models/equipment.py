"""
Equipment domain model
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum, Text, Float
from sqlalchemy.sql import func
from datetime import datetime
import enum
from app.database import Base

class EquipmentStatusEnum(str, enum.Enum):
    GREEN = "green"      # Inspecciones vigentes
    YELLOW = "yellow"    # Alguna inspección vence en 30 días
    RED = "red"          # Inspección vencida o desincorporado

class EquipmentTypeEnum(str, enum.Enum):
    CHAIN_HOIST = "chain_hoist"
    WIRE_ROPE = "wire_rope"
    SHACKLE = "shackle"
    HOOK = "hook"
    SLING = "sling"
    OTHER = "other"

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, index=True, nullable=False)  # Código interno único
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    equipment_type = Column(Enum(EquipmentTypeEnum), nullable=False)
    capacity_kg = Column(Float, nullable=True)  # Capacidad en kg
    status = Column(Enum(EquipmentStatusEnum), default=EquipmentStatusEnum.GREEN)
    project = Column(String(200), nullable=True)  # Proyecto asociado
    location = Column(String(200), nullable=True)  # Ubicación actual
    
    is_deincorporated = Column(Boolean, default=False, nullable=False)
    deincorporation_date = Column(DateTime(timezone=True), nullable=True)
    
    last_external_inspection_date = Column(DateTime(timezone=True), nullable=True)
    last_field_inspection_date = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by_id = Column(Integer, nullable=True)
    
    is_deleted = Column(Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<Equipment {self.code}>"
