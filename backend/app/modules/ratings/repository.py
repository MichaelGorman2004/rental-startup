"""Rating data access layer (Repository pattern)."""

from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.ratings.models import Rating
from app.modules.ratings.schemas import RatingCreate, RatingFilters


class RatingRepository:
    """Repository for rating data access operations."""

    @staticmethod
    async def create(
        db: AsyncSession,
        rating_data: RatingCreate,
        booking_id: UUID,
        organization_id: UUID,
        venue_id: UUID,
    ) -> Rating:
        """Create a new rating record."""
        rating = Rating(
            booking_id=booking_id,
            organization_id=organization_id,
            venue_id=venue_id,
            score=rating_data.score,
            comment=rating_data.comment,
        )
        db.add(rating)
        await db.commit()
        await db.refresh(rating)
        return rating

    @staticmethod
    async def get_by_booking_id(
        db: AsyncSession,
        booking_id: UUID,
    ) -> Rating | None:
        """Retrieve a rating by booking ID."""
        query = select(Rating).where(Rating.booking_id == booking_id)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_by_venue_id(
        db: AsyncSession,
        venue_id: UUID,
        filters: RatingFilters,
    ) -> tuple[list[Rating], int]:
        """Retrieve ratings for a venue with pagination."""
        query = select(Rating).where(Rating.venue_id == venue_id)

        # Get total count before pagination
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await db.execute(count_query)
        total = total_result.scalar_one()

        # Apply pagination and ordering
        offset = (filters.page - 1) * filters.page_size
        query = query.order_by(Rating.created_at.desc())
        query = query.offset(offset).limit(filters.page_size)

        result = await db.execute(query)
        ratings = list(result.scalars().all())

        return ratings, total
