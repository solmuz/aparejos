"""
User schemas for validation
"""
from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.models.user import RoleEnum

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    role: RoleEnum = RoleEnum.HSE

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    role: RoleEnum | None = None
    is_active: bool | None = None

class UserRead(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str
