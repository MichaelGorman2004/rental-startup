"""Prerelease data access layer (Repository pattern)."""

from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.prerelease.models import PrereleaseResponse
from app.modules.prerelease.schemas import PrereleaseCreate


class PrereleaseRepository:
    """Repository for prerelease data access operations."""

    @staticmethod
    async def create(
        db: AsyncSession,
        data: PrereleaseCreate,
    ) -> PrereleaseResponse:
        """
        Create a new prerelease interest form response.

        Args:
            db: Async database session
            data: Validated form submission data

        Returns:
            The created PrereleaseResponse record
        """
        response = PrereleaseResponse(
            first_name=data.first_name,
            last_name=data.last_name,
            respondent_type=data.respondent_type,
            org_or_venue_name=data.org_or_venue_name,
            email=data.email,
            phone=data.phone,
            personal_note=data.personal_note,
        )
        db.add(response)
        await db.commit()
        await db.refresh(response)
        return response
