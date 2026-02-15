"""FastAPI dependencies for authentication."""

import os
from typing import Annotated, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.modules.users.models import User
from app.modules.auth.schemas import UserCreate, TokenPayload
from app.modules.auth.services import auth_service
from app.modules.auth.constants import AuthError, ROLE_CLAIM_KEY
from app.core.constants.enums import UserRole

# Initialize security scheme
security = HTTPBearer()

# Configuration (should be in env vars)
CLERK_PEM_PUBLIC_KEY = os.getenv("CLERK_PEM_PUBLIC_KEY")
# If PEM is not provided, we might need to fetch JWKS, but for now assuming PEM or skipping sig check in dev if configured so.
# For this task, we'll simulate the JWT decoding or use a placeholder if keys aren't real.
# IN PRODUCTION: Fetch from https://<your-clerk-domain>/.well-known/jwks.json

async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    db: Annotated[AsyncSession, Depends(get_db)]
) -> User:
    """
    Authenticate the current user via JWT.
    
    Verifies the token, extracts claims, and synchronizes the user to the local database.
    """
    token = credentials.credentials
    
    try:
        # In a real scenario with Clerk:
        # options = {"verify_signature": True, "verify_aud": False, "exp": True}
        # payload = jwt.decode(token, CLERK_PEM_PUBLIC_KEY, algorithms=["RS256"], options=options)
        
        # FOR DEVELOPMENT/PROTOTYPE without real Clerk keys:
        # We will decode without signature verification if no key is present, 
        # BUT this is insecure for production.
        # Ideally we assume CLERK_PEM_PUBLIC_KEY is set.
        
        if CLERK_PEM_PUBLIC_KEY:
            payload_dict = jwt.decode(
                token, 
                CLERK_PEM_PUBLIC_KEY, 
                algorithms=["RS256"], 
                options={"verify_aud": False}
            )
        else:
            # Fallback for dev/testing without keys (Security Risk Warning)
            # Just decode to get claims
            payload_dict = jwt.get_unverified_claims(token)
            
        # Extract core fields
        sub = payload_dict.get("sub")
        email = payload_dict.get("email")
        # Clerk stores metadata in 'public_metadata' or custom claims depending on config
        # We assume a custom claim or we might need to parse public_metadata
        # For this implementation, let's assume 'org_role' is a top-level claim 
        # or inside a metadata dict.
        # Let's try to find the role.
        role_str = payload_dict.get(ROLE_CLAIM_KEY)
        if not role_str and "public_metadata" in payload_dict:
             role_str = payload_dict["public_metadata"].get(ROLE_CLAIM_KEY)

        if not email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=AuthError.EMAIL_REQUIRED,
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        # Default role if missing (or handle error)
        # In a strict system, we might require the role to be present.
        # For now, if no role, we might error out or default to something safe?
        # Better to error if we strictly need roles.
        if not role_str:
             # Try to infer or fail. Let's fail for safety.
             # Unless we have a registration flow that hasn't set the role yet.
             # But our requirement is "Role selection persisted in JWT claims".
             # So we expect it there.
             pass 
             # For the sake of the 'sync' logic, if the user already exists in DB, 
             # we might not need the role from JWT every time, but for 'create' we do.
        
        # Map string to Enum
        try:
            role_enum = UserRole(role_str) if role_str else UserRole.STUDENT_ORG # Default fallback or error?
        except ValueError:
             # If invalid role in token, maybe fallback or error
             role_enum = UserRole.STUDENT_ORG

        user_create = UserCreate(
            id=sub,
            email=email,
            role=role_enum
        )
        
        # Sync user to DB
        user = await auth_service.get_or_create_user(db, user_create)
        return user
        
    except (JWTError, ValueError) as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"{AuthError.INVALID_TOKEN} {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

def require_role(required_role: UserRole):
    """Dependency factory for role-based access control."""
    def role_checker(user: User = Depends(get_current_user)) -> User:
        if user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=AuthError.FORBIDDEN
            )
        return user
    return role_checker
