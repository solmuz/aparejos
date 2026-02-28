"""
Audit trail router
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.audit import get_audit_logs

router = APIRouter()

@router.get("/logs")
def get_audit_logs_endpoint(
    entity_type: str | None = None,
    entity_id: int | None = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get audit logs"""
    logs = get_audit_logs(db, entity_type, entity_id, limit)
    return {"logs": logs}

@router.get("/equipment/{equipment_id}")
def get_equipment_audit_trail(equipment_id: int, db: Session = Depends(get_db)):
    """Get audit trail for specific equipment"""
    logs = get_audit_logs(db, "Equipment", equipment_id, limit=1000)
    return {"equipment_id": equipment_id, "audit_trail": logs}

@router.get("/user/{user_id}")
def get_user_actions(user_id: int, db: Session = Depends(get_db)):
    """Get all actions performed by a user"""
    # TODO: Implement user action retrieval
    return {"user_id": user_id, "actions": []}
