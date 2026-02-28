"""
Users management router
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRead, UserCreate, UserUpdate
from app.utils.auth import get_password_hash
from app.utils.audit import log_action

router = APIRouter()

@router.get("/", response_model=list[UserRead])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all users"""
    users = db.query(User).filter(User.is_deleted == False).offset(skip).limit(limit).all()
    return users

@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user: UserUpdate, current_user_id: int = 1, db: Session = Depends(get_db)):
    """Update user"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    
    log_action(db, current_user_id, "UPDATE", "User", user_id)
    return db_user

@router.delete("/{user_id}")
def delete_user(user_id: int, current_user_id: int = 1, db: Session = Depends(get_db)):
    """Soft delete user"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_user.is_deleted = True
    db.commit()
    
    log_action(db, current_user_id, "DELETE", "User", user_id)
    return {"message": "User deleted successfully"}
