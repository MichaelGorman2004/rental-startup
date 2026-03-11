"""Webhook business logic layer (Service pattern).

All business logic for webhook handling. Services handle external API calls
and database operations through the auth service layer.
"""

import httpx
from fastapi import HTTPException, status
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
    WebhookError,
)
from app.modules.webhooks.schemas import ClerkUserData


class WebhookService:
    """Service layer for webhook business logic."""

    @staticmethod
    async def handle_user_created(
        db: AsyncSession,
        user_data: ClerkUserData,
    ) -> User:
        """
        Handle user.created webhook event.

        Orchestrates the full user creation flow:
        1. Validate required data (email, role)
        2. Create user in local database (fail-fast)
        3. Create organization or venue based on role
        4. Sync role to Clerk publicMetadata

        Order matters: DB operations first (reversible via rollback),
        then Clerk API call (external, harder to compensate).

        Args:
            db: Database session.
            user_data: User data from Clerk webhook.

        Returns:
            Created User.

        Raises:
            HTTPException: If required data is missing or invalid.
        """
        # 1. Validate required fields (fail-fast)
        email = user_data.primary_email
        role_str = user_data.unsafe_metadata.get(ROLE_METADATA_KEY)
        org_name = user_data.unsafe_metadata.get(ORG_NAME_METADATA_KEY)

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=WebhookError.MISSING_EMAIL,
            )

        if not role_str:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=WebhookError.MISSING_ROLE,
            )

        # Validate role enum
        try:
            role = UserRole(role_str)
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=WebhookError.INVALID_ROLE,
            ) from e

        # 2. Create user in database (do this first - can rollback on failure)
        user_create = UserCreate(
            id=user_data.id,
            email=email,
            role=role,
        )
        user = await auth_service.get_or_create_user(db, user_create)

        # 3. Create organization or venue based on role (idempotent)
        if org_name:
            await WebhookService._create_org_or_venue(db, user, role, org_name)

        # 4. Sync role to Clerk publicMetadata (external call last)
        await WebhookService._sync_role_to_clerk(user_data.id, role_str)

        return user

    @staticmethod
    async def _sync_role_to_clerk(user_id: str, role: str) -> None:
        """
        Sync role from unsafeMetadata to publicMetadata via Clerk Backend API.

        This makes the role available in JWT claims for frontend/backend auth.

        Args:
            user_id: Clerk user ID.
            role: Role value to set in publicMetadata.

        Raises:
            HTTPException: If Clerk API call fails.
        """
        try:
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
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=WebhookError.CLERK_SYNC_FAILED,
            ) from e

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
