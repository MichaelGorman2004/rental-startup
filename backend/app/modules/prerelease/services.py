"""Prerelease business logic layer (Service pattern)."""

from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.prerelease.repository import PrereleaseRepository
from app.modules.prerelease.schemas import (
    PrereleaseCreate,
    PrereleaseResponseSchema,
)


class PrereleaseService:
    """Service layer for prerelease form submissions."""

    @staticmethod
    async def submit_interest(
        db: AsyncSession,
        data: PrereleaseCreate,
    ) -> PrereleaseResponseSchema:
        """
        Process and store a prerelease interest form submission.

        Args:
            db: Async database session
            data: Validated form submission data

        Returns:
            Response schema with submission confirmation
        """
        response = await PrereleaseRepository.create(db=db, data=data)
        return PrereleaseResponseSchema.model_validate(response)


prerelease_service = PrereleaseService()
