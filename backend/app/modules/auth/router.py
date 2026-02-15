"""Authentication API router."""

from fastapi import APIRouter, Depends
from app.modules.auth.schemas import UserCreate
from app.modules.users.models import User
from app.modules.auth.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.get("/me", response_model=UserCreate)
async def get_my_profile(current_user: User = Depends(get_current_user)):
    """
    Get the current authenticated user's profile.
    This endpoint effectively syncs the Clerk user with the local database
    via the dependency and returns the local user data.
    """
    return UserCreate(
        id=current_user.id, # Note: returning local UUID, schema might need adjustment if we want Clerk ID
        email=current_user.email,
        role=current_user.role
    )
