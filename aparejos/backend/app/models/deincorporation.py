"""
Deincorporation Report domain model
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class DeincorporationReport(Base):
    __tablename__ = "deincorporation_reports"

    id = Column(Integer, primary_key=True, index=True)
    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)
    report_date = Column(DateTime(timezone=True), nullable=False)
    reason = Column(Text, nullable=False)
    inspector_name = Column(String(200), nullable=False)
    observations = Column(Text, nullable=True)
    file = Column(String(500), nullable=True)  # Ruta del PDF del reporte
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by_id = Column(Integer, nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    is_deleted = Column(Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<DeincorporationReport equipment_id={self.equipment_id}>"
