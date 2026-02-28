"""
Equipment router
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.equipment import Equipment
from app.schemas.equipment import EquipmentCreate, EquipmentRead, EquipmentUpdate
from app.utils.audit import log_action

router = APIRouter()

@router.get("/", response_model=list[EquipmentRead])
def list_equipment(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all equipment"""
    equipment = db.query(Equipment).filter(Equipment.is_deleted == False).offset(skip).limit(limit).all()
    return equipment

@router.get("/{equipment_id}", response_model=EquipmentRead)
def get_equipment(equipment_id: int, db: Session = Depends(get_db)):
    """Get equipment by ID"""
    equipment = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return equipment

@router.post("/", response_model=EquipmentRead)
def create_equipment(equipment: EquipmentCreate, user_id: int = 1, db: Session = Depends(get_db)):
    """Create new equipment"""
    db_equipment = Equipment(**equipment.dict(), created_by_id=user_id)
    db.add(db_equipment)
    db.commit()
    db.refresh(db_equipment)
    
    # Log action
    log_action(db, user_id, "CREATE", "Equipment", db_equipment.id)
    
    return db_equipment

@router.put("/{equipment_id}", response_model=EquipmentRead)
def update_equipment(equipment_id: int, equipment: EquipmentUpdate, user_id: int = 1, db: Session = Depends(get_db)):
    """Update equipment"""
    db_equipment = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not db_equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    for key, value in equipment.dict(exclude_unset=True).items():
        setattr(db_equipment, key, value)
    
    db.commit()
    db.refresh(db_equipment)
    
    # Log action
    log_action(db, user_id, "UPDATE", "Equipment", equipment_id)
    
    return db_equipment

@router.delete("/{equipment_id}")
def delete_equipment(equipment_id: int, user_id: int = 1, db: Session = Depends(get_db)):
    """Soft delete equipment"""
    db_equipment = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not db_equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    db_equipment.is_deleted = True
    db.commit()
    
    # Log action
    log_action(db, user_id, "DELETE", "Equipment", equipment_id)
    
    return {"message": "Equipment deleted successfully"}
