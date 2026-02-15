"""Pydantic schemas for authentication."""

from typing import Optional
from pydantic import BaseModel, EmailStr, Field

from app.core.constants.enums import UserRole

class TokenPayload(BaseModel):
    """Schema for JWT token payload."""
    sub: str  # Subject (User ID)
    email: EmailStr
    role: Optional[UserRole] = None
    exp: int
    iat: int

class UserCreate(BaseModel):
    """Schema for creating a user from auth provider data."""
    id: str  # External ID (from Clerk)
    email: EmailStr
    role: UserRole

class AuthResponse(BaseModel):
    """Schema for auth response."""
    access_token: str
    token_type: str = "bearer"
