"""
Inspections router
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.inspection import ExternalInspection, FieldInspection
from app.schemas.inspection import (
    ExternalInspectionCreate, ExternalInspectionRead,
    FieldInspectionCreate, FieldInspectionRead
)
from app.utils.audit import log_action

router = APIRouter()

# External Inspections
@router.get("/external", response_model=list[ExternalInspectionRead])
def list_external_inspections(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all external inspections"""
    inspections = db.query(ExternalInspection).filter(ExternalInspection.is_deleted == False).offset(skip).limit(limit).all()
    return inspections

@router.post("/external", response_model=ExternalInspectionRead)
def create_external_inspection(inspection: ExternalInspectionCreate, user_id: int = 1, db: Session = Depends(get_db)):
    """Record an external inspection"""
    db_inspection = ExternalInspection(**inspection.dict(), created_by_id=user_id)
    db.add(db_inspection)
    db.commit()
    db.refresh(db_inspection)
    
    log_action(db, user_id, "CREATE", "ExternalInspection", db_inspection.id)
    return db_inspection

# Field Inspections
@router.get("/field", response_model=list[FieldInspectionRead])
def list_field_inspections(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all field inspections"""
    inspections = db.query(FieldInspection).filter(FieldInspection.is_deleted == False).offset(skip).limit(limit).all()
    return inspections

@router.post("/field", response_model=FieldInspectionRead)
def create_field_inspection(inspection: FieldInspectionCreate, user_id: int = 1, db: Session = Depends(get_db)):
    """Record a field inspection"""
    db_inspection = FieldInspection(**inspection.dict(), created_by_id=user_id)
    db.add(db_inspection)
    db.commit()
    db.refresh(db_inspection)
    
    log_action(db, user_id, "CREATE", "FieldInspection", db_inspection.id)
    return db_inspection

@router.get("/equipment/{equipment_id}")
def get_equipment_inspections(equipment_id: int, db: Session = Depends(get_db)):
    """Get all inspections for an equipment"""
    external = db.query(ExternalInspection).filter(ExternalInspection.equipment_id == equipment_id).all()
    field = db.query(FieldInspection).filter(FieldInspection.equipment_id == equipment_id).all()
    
    return {
        "equipment_id": equipment_id,
        "external_inspections": external,
        "field_inspections": field
    }
