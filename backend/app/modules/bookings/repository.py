"""Booking data access layer (Repository pattern)."""

from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import BookingStatus
from app.modules.bookings.models import Booking
from app.modules.bookings.schemas import BookingFilters


class BookingRepository:
    """Repository for booking data access operations."""

    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        booking_id: UUID,
    ) -> Booking | None:
        """Retrieve a single booking by ID."""
        query = select(Booking).where(Booking.id == booking_id)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_by_org_id(
        db: AsyncSession,
        org_id: UUID,
        filters: BookingFilters,
    ) -> tuple[list[Booking], int]:
        """Retrieve bookings for an organization with filtering and pagination."""
        query = select(Booking).where(Booking.organization_id == org_id)

        if filters.status:
            query = query.where(Booking.status == filters.status)

        # Get total count before pagination
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await db.execute(count_query)
        total = total_result.scalar_one()

        # Apply pagination and ordering
        offset = (filters.page - 1) * filters.page_size
        query = query.order_by(Booking.created_at.desc())
        query = query.offset(offset).limit(filters.page_size)

        result = await db.execute(query)
        bookings = list(result.scalars().all())

        return bookings, total

    @staticmethod
    async def update_status(
        db: AsyncSession,
        booking: Booking,
        new_status: BookingStatus,
    ) -> Booking:
        """Update a booking's status."""
        booking.status = new_status
        await db.commit()
        await db.refresh(booking)
        return booking
