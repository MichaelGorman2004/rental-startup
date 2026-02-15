"""FastAPI dependencies for authentication."""

import os
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import UserRole
from app.core.database.session import get_db
from app.modules.auth.constants import ROLE_CLAIM_KEY, AuthError
from app.modules.auth.schemas import UserCreate
from app.modules.auth.services import auth_service
from app.modules.users.models import User

# Initialize security scheme
security = HTTPBearer()

# Configuration (should be in env vars)
CLERK_PEM_PUBLIC_KEY = os.getenv("CLERK_PEM_PUBLIC_KEY")
# If PEM is not provided, we might need to fetch JWKS or skip sig check in dev
# IN PRODUCTION: Fetch from https://<your-clerk-domain>/.well-known/jwks.json

async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """
    Authenticate the current user via JWT.

    Verifies the token, extracts claims, and synchronizes the user to
    the local database.
    """
    token = credentials.credentials

    try:
        if CLERK_PEM_PUBLIC_KEY:
            payload_dict = jwt.decode(
                token,
                CLERK_PEM_PUBLIC_KEY,
                algorithms=["RS256"],
                options={"verify_aud": False},
            )
        else:
            # Fallback for dev/testing without keys (Security Risk Warning)
            payload_dict = jwt.get_unverified_claims(token)

        # Extract core fields
        sub = payload_dict.get("sub")
        email = payload_dict.get("email")
        role_str = payload_dict.get(ROLE_CLAIM_KEY)
        if (
            not role_str
            and "public_metadata" in payload_dict
        ):
            role_str = payload_dict["public_metadata"].get(
                ROLE_CLAIM_KEY
            )

        if not email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=AuthError.EMAIL_REQUIRED,
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Map string to Enum
        try:
            role_enum = (
                UserRole(role_str) if role_str else UserRole.STUDENT_ORG
            )
        except ValueError:
            role_enum = UserRole.STUDENT_ORG

        user_create = UserCreate(id=sub, email=email, role=role_enum)

        # Sync user to DB
        return await auth_service.get_or_create_user(db, user_create)

    except (JWTError, ValueError) as err:
        msg = f"{AuthError.INVALID_TOKEN} {err!s}"
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=msg,
            headers={"WWW-Authenticate": "Bearer"},
        ) from err


def require_role(required_role: UserRole) -> object:
    """Dependency factory for role-based access control."""

    def role_checker(
        user: Annotated[User, Depends(get_current_user)],
    ) -> User:
        if user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=AuthError.FORBIDDEN,
            )
        return user

    return role_checker
