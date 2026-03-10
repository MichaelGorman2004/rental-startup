"""Booking data access layer (Repository pattern)."""

from datetime import date, time
from uuid import UUID

from sqlalchemy import and_, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import BookingStatus
from app.modules.bookings.models import Booking
from app.modules.bookings.schemas import BookingCreate, BookingFilters


class BookingRepository:
    """Repository for booking data access operations."""

    @staticmethod
    async def create(
        db: AsyncSession,
        booking_data: BookingCreate,
        organization_id: UUID,
    ) -> Booking:
        """Create a new booking record."""
        booking = Booking(
            venue_id=booking_data.venue_id,
            organization_id=organization_id,
            event_name=booking_data.event_name,
            event_date=booking_data.event_date,
            event_start_time=booking_data.event_start_time,
            event_end_time=booking_data.event_end_time,
            guest_count=booking_data.guest_count,
            special_requests=booking_data.special_requests,
            status=BookingStatus.pending,
        )
        db.add(booking)
        await db.commit()
        await db.refresh(booking)
        return booking

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
    async def has_time_conflict(
        db: AsyncSession,
        venue_id: UUID,
        event_date: date,
        start_time: time,
        end_time: time,
    ) -> bool:
        """Check if a time slot conflicts with existing bookings."""
        query = select(func.count()).where(
            and_(
                Booking.venue_id == venue_id,
                Booking.event_date == event_date,
                Booking.status.in_([BookingStatus.pending, BookingStatus.confirmed]),
                Booking.event_start_time < end_time,
                Booking.event_end_time > start_time,
            )
        )
        result = await db.execute(query)
        return result.scalar_one() > 0

    @staticmethod
    async def get_by_venue_id(
        db: AsyncSession,
        venue_id: UUID,
    ) -> list[Booking]:
        """Retrieve all bookings for a venue, pending first."""
        query = (
            select(Booking)
            .where(Booking.venue_id == venue_id)
            .order_by(
                Booking.status != BookingStatus.pending,
                Booking.created_at.desc(),
            )
        )
        result = await db.execute(query)
        return list(result.scalars().all())

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
