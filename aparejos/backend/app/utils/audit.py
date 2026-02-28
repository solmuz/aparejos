"""
Audit logging utility module
"""
from app.models.audit import AuditLog
from sqlalchemy.orm import Session

def log_action(
    db: Session,
    user_id: int | None,
    action: str,
    entity_type: str,
    entity_id: int | None = None,
    details: str | None = None,
    ip_address: str | None = None
) -> AuditLog:
    """Log an action to the audit trail"""
    audit_log = AuditLog(
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        details=details,
        ip_address=ip_address
    )
    db.add(audit_log)
    db.commit()
    return audit_log

def get_audit_logs(
    db: Session,
    entity_type: str | None = None,
    entity_id: int | None = None,
    limit: int = 100
) -> list[AuditLog]:
    """Retrieve audit logs"""
    query = db.query(AuditLog)
    
    if entity_type:
        query = query.filter(AuditLog.entity_type == entity_type)
    if entity_id:
        query = query.filter(AuditLog.entity_id == entity_id)
    
    return query.order_by(AuditLog.created_at.desc()).limit(limit).all()
