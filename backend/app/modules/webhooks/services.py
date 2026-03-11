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
from app.modules.organizations.repository import OrganizationRepository
from app.modules.users.models import User
from app.modules.venues.repository import VenueRepository
from app.modules.webhooks.constants import (
    CLERK_API_BASE,
    ORG_NAME_METADATA_KEY,
    ROLE_METADATA_KEY,
)
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
        Create user and their organization/venue in local database.

        For student_org users, creates an Organization.
        For venue_admin users, creates a Venue.

        Args:
            db: Database session.
            user_data: User data from Clerk webhook.

        Returns:
            Created/existing User, or None if email/role missing.
        """
        email = user_data.primary_email
        role_str = user_data.unsafe_metadata.get(ROLE_METADATA_KEY)
        org_name = user_data.unsafe_metadata.get(ORG_NAME_METADATA_KEY)

        if not email or not role_str:
            return None

        # Validate role enum
        try:
            role = UserRole(role_str)
        except ValueError:
            return None

        # Create user
        user_create = UserCreate(
            id=user_data.id,
            email=email,
            role=role,
        )
        user = await auth_service.get_or_create_user(db, user_create)

        # Create organization or venue based on role (idempotent)
        if org_name:
            await WebhookService._create_org_or_venue(db, user, role, org_name)

        return user

    @staticmethod
    async def _create_org_or_venue(
        db: AsyncSession,
        user: User,
        role: UserRole,
        name: str,
    ) -> None:
        """
        Create organization or venue for user based on their role.

        Idempotent: skips creation if entity already exists.

        Args:
            db: Database session.
            user: User who owns the org/venue.
            role: User's role.
            name: Organization or venue name.
        """
        if role == UserRole.student_org:
            existing_org = await OrganizationRepository.get_by_owner_id(db, user.id)
            if not existing_org:
                await OrganizationRepository.create(db, name, user.id)

        elif role == UserRole.venue_admin:
            existing_venue = await VenueRepository.get_by_owner_id(db, user.id)
            if not existing_venue:
                await VenueRepository.create_minimal(db, name, user.id)


# Singleton instance
webhook_service = WebhookService()
