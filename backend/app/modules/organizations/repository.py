"""Organization data access layer (Repository pattern)."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.organizations.models import Organization
from app.modules.organizations.schemas import OrganizationUpdate


class OrganizationRepository:
    """Repository for organization data access operations."""

    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        org_id: UUID,
    ) -> Organization | None:
        """Retrieve a single organization by ID."""
        query = select(Organization).where(Organization.id == org_id)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_by_owner_id(
        db: AsyncSession,
        owner_id: UUID,
    ) -> Organization | None:
        """Retrieve an organization by its owner's user ID."""
        query = select(Organization).where(Organization.owner_id == owner_id)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def update(
        db: AsyncSession,
        org: Organization,
        update_data: OrganizationUpdate,
    ) -> Organization:
        """Update an existing organization with provided fields."""
        update_dict = update_data.model_dump(exclude_unset=True)

        for field, value in update_dict.items():
            setattr(org, field, value)

        await db.commit()
        await db.refresh(org)

        return org
