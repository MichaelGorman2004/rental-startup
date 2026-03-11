"""Webhook business logic layer (Service pattern).

All business logic for webhook handling. Services handle external API calls
and database operations through the auth service layer.
"""

import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.constants.enums import UserRole
from app.modules.auth.schemas import UserCreate
from app.modules.auth.services import auth_service
from app.modules.users.models import User
from app.modules.webhooks.constants import CLERK_API_BASE, ROLE_METADATA_KEY
from app.modules.webhooks.schemas import ClerkUserData


class WebhookService:
    """Service layer for webhook business logic."""

    @staticmethod
    async def sync_role_to_clerk(user_id: str, role: str) -> None:
        """
        Sync role from unsafeMetadata to publicMetadata via Clerk Backend API.

        This makes the role available in JWT claims for frontend/backend auth.

        Args:
            user_id: Clerk user ID.
            role: Role value to set in publicMetadata.

        Raises:
            httpx.HTTPStatusError: If Clerk API call fails.
        """
        async with httpx.AsyncClient() as client:
            response = await client.patch(
                f"{CLERK_API_BASE}/users/{user_id}/metadata",
                headers={
                    "Authorization": f"Bearer {settings.CLERK_SECRET_KEY}",
                    "Content-Type": "application/json",
                },
                json={"public_metadata": {ROLE_METADATA_KEY: role}},
            )
            response.raise_for_status()

    @staticmethod
    async def sync_user_to_database(
        db: AsyncSession,
        user_data: ClerkUserData,
    ) -> User | None:
        """
        Create or update user in local database from Clerk webhook data.

        Args:
            db: Database session.
            user_data: User data from Clerk webhook.

        Returns:
            Created/existing User, or None if email/role missing.
        """
        email = user_data.primary_email
        role_str = user_data.unsafe_metadata.get(ROLE_METADATA_KEY)

        if not email or not role_str:
            return None

        # Validate role enum
        try:
            role = UserRole(role_str)
        except ValueError:
            return None

        # Reuse existing auth service for user creation
        user_create = UserCreate(
            id=user_data.id,
            email=email,
            role=role,
        )

        return await auth_service.get_or_create_user(db, user_create)


# Singleton instance
webhook_service = WebhookService()
