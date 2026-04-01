"""Booking data access layer (Repository pattern)."""

from datetime import date, time
from typing import TypedDict
from uuid import UUID

from sqlalchemy import Interval, and_, case, extract, func, select, type_coerce
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import BookingStatus
from app.modules.bookings.models import Booking
from app.modules.bookings.schemas import BookingCreate, BookingFilters
from app.modules.venues.models import Venue


class OrgSummaryDict(TypedDict):
    """Typed return value for BookingRepository.get_org_summary."""

    upcoming_events_count: int
    total_bookings: int
    budget_used_cents: int


# Statuses that count toward budget
BUDGET_STATUSES = {BookingStatus.confirmed, BookingStatus.completed}


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
        filters: BookingFilters,
    ) -> tuple[list[Booking], int]:
        """Retrieve bookings for a venue with filtering and pagination."""
        query = select(Booking).where(Booking.venue_id == venue_id)

        if filters.status:
            query = query.where(Booking.status == filters.status)

        if filters.from_date:
            query = query.where(Booking.event_date >= filters.from_date)

        # Get total count before pagination
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await db.execute(count_query)
        total = total_result.scalar_one()

        # Apply ordering
        if filters.sort_by == "event_date":
            query = query.order_by(Booking.event_date.asc())
        else:
            query = query.order_by(
                Booking.status != BookingStatus.pending,
                Booking.created_at.desc(),
            )

        # Apply pagination
        offset = (filters.page - 1) * filters.page_size
        query = query.offset(offset).limit(filters.page_size)

        result = await db.execute(query)
        bookings = list(result.scalars().all())

        return bookings, total

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

        if filters.from_date:
            query = query.where(Booking.event_date >= filters.from_date)

        # Get total count before pagination
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await db.execute(count_query)
        total = total_result.scalar_one()

        # Apply ordering
        if filters.sort_by == "event_date":
            query = query.order_by(Booking.event_date.asc())
        else:
            query = query.order_by(Booking.created_at.desc())

        # Apply pagination
        offset = (filters.page - 1) * filters.page_size
        query = query.offset(offset).limit(filters.page_size)

        result = await db.execute(query)
        bookings = list(result.scalars().all())

        return bookings, total

    @staticmethod
    async def get_org_summary(
        db: AsyncSession,
        org_id: UUID,
        today: date,
    ) -> OrgSummaryDict:
        """Get booking summary stats for an organization."""
        total_query = select(func.count()).where(
            Booking.organization_id == org_id,
        )
        total_result = await db.execute(total_query)
        total_bookings = total_result.scalar_one()

        upcoming_query = select(func.count()).where(
            and_(
                Booking.organization_id == org_id,
                Booking.status == BookingStatus.confirmed,
                Booking.event_date >= today,
            ),
        )
        upcoming_result = await db.execute(upcoming_query)
        upcoming_count = upcoming_result.scalar_one()

        budget_query = (
            select(
                func.coalesce(
                    func.sum(
                        case(
                            (Venue.base_price_cents.isnot(None), Venue.base_price_cents),
                            else_=0,
                        ),
                    ),
                    0,
                )
            )
            .select_from(Booking)
            .join(Venue, Booking.venue_id == Venue.id)
            .where(
                and_(
                    Booking.organization_id == org_id,
                    Booking.status.in_(list(BUDGET_STATUSES)),
                ),
            )
        )
        budget_result = await db.execute(budget_query)
        budget_used_cents = budget_result.scalar_one()

        return {
            "upcoming_events_count": upcoming_count,
            "total_bookings": total_bookings,
            "budget_used_cents": budget_used_cents,
        }

    @staticmethod
    async def count_venue_bookings_this_month(
        db: AsyncSession,
        venue_id: UUID,
        year: int,
        month: int,
    ) -> int:
        """Count all bookings for a venue in a given month."""
        query = select(func.count()).where(
            and_(
                Booking.venue_id == venue_id,
                extract("year", Booking.event_date) == year,
                extract("month", Booking.event_date) == month,
            )
        )
        result = await db.execute(query)
        return result.scalar_one()

    @staticmethod
    async def sum_venue_revenue_cents(
        db: AsyncSession,
        venue_id: UUID,
        year: int,
        month: int,
    ) -> int:
        """Sum total_cost_cents for confirmed/completed bookings this month."""
        query = (
            select(func.coalesce(func.sum(Venue.base_price_cents), 0))
            .select_from(Booking)
            .join(Venue, Booking.venue_id == Venue.id)
            .where(
                and_(
                    Booking.venue_id == venue_id,
                    Booking.status.in_(BUDGET_STATUSES),
                    extract("year", Booking.event_date) == year,
                    extract("month", Booking.event_date) == month,
                )
            )
        )
        result = await db.execute(query)
        return int(result.scalar_one_or_none() or 0)

    @staticmethod
    async def sum_venue_booked_hours(
        db: AsyncSession,
        venue_id: UUID,
        year: int,
        month: int,
    ) -> float:
        """Sum booked hours for confirmed/completed bookings this month."""
        duration_interval = type_coerce(
            Booking.event_end_time - Booking.event_start_time,
            Interval(),
        )
        query = select(
            func.coalesce(
                func.sum(extract("epoch", duration_interval) / 3600.0),
                0.0,
            )
        ).where(
            and_(
                Booking.venue_id == venue_id,
                Booking.status.in_(BUDGET_STATUSES),
                extract("year", Booking.event_date) == year,
                extract("month", Booking.event_date) == month,
            )
        )
        result = await db.execute(query)
        return float(result.scalar_one())

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
