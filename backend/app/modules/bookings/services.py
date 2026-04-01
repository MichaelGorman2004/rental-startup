"""Booking business logic layer (Service pattern)."""

from datetime import UTC, datetime
from math import ceil
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import BookingStatus, UserRole
from app.core.exceptions import (
    AuthorizationError,
    BusinessRuleError,
    ConflictError,
    ResourceNotFoundError,
)
from app.modules.bookings.constants import BookingError
from app.modules.bookings.models import Booking
from app.modules.bookings.repository import BookingRepository
from app.modules.bookings.schemas import (
    BookingCreate,
    BookingFilters,
    BookingListResponse,
    BookingResponse,
    BookingSummaryResponse,
)
from app.modules.organizations.models import Organization
from app.modules.organizations.repository import OrganizationRepository
from app.modules.users.models import User
from app.modules.venues.models import Venue
from app.modules.venues.repository import VenueRepository

# Statuses that can be cancelled
CANCELLABLE_STATUSES = {BookingStatus.pending, BookingStatus.confirmed}

BOOKING_RESOURCE = "Booking"
VENUE_RESOURCE = "Venue"
ORG_RESOURCE = "Organization"


async def _require_student_org(db: AsyncSession, user: User) -> Organization:
    """Verify user is student org and return their organization."""
    if user.role != UserRole.student_org:
        raise AuthorizationError(BookingError.STUDENT_ORG_REQUIRED)
    org = await OrganizationRepository.get_by_owner_id(db, user.id)
    if not org:
        raise ResourceNotFoundError(ORG_RESOURCE, BookingError.NO_ORGANIZATION)
    return org


async def _require_venue_owner(db: AsyncSession, user: User, venue_id: UUID) -> Venue:
    """Verify user is venue admin and owns the venue."""
    if user.role != UserRole.venue_admin:
        raise AuthorizationError(BookingError.VENUE_ADMIN_REQUIRED)
    venue = await VenueRepository.get_by_id(db, venue_id)
    if not venue:
        raise ResourceNotFoundError(VENUE_RESOURCE, BookingError.VENUE_NOT_FOUND)
    if venue.owner_id != user.id:
        raise AuthorizationError(BookingError.NOT_VENUE_OWNER)
    return venue


async def _get_booking_or_raise(db: AsyncSession, booking_id: UUID) -> Booking:
    """Retrieve booking or raise ResourceNotFoundError."""
    booking = await BookingRepository.get_by_id(db, booking_id)
    if not booking:
        raise ResourceNotFoundError(BOOKING_RESOURCE, BookingError.NOT_FOUND)
    return booking


def _to_booking_response(booking: Booking) -> BookingResponse:
    """Convert a Booking model to BookingResponse with related names."""
    duration_minutes = int(booking.event_duration.total_seconds() // 60)
    return BookingResponse(
        id=booking.id,
        venue_id=booking.venue_id,
        organization_id=booking.organization_id,
        event_name=booking.event_name,
        event_date=booking.event_date,
        event_start_time=booking.event_start_time,
        event_end_time=booking.event_end_time,
        event_duration_minutes=duration_minutes,
        guest_count=booking.guest_count,
        status=booking.status,
        special_requests=booking.special_requests,
        created_at=booking.created_at,
        updated_at=booking.updated_at,
        venue_name=booking.venue.name if booking.venue else "",
        organization_name=booking.organization.name if booking.organization else "",
    )


class BookingService:
    """Service layer for booking business logic."""

    @staticmethod
    async def get_my_summary(
        db: AsyncSession,
        current_user: User,
    ) -> BookingSummaryResponse:
        """Get booking summary stats for the current user's org."""
        org = await _require_student_org(db, current_user)
        today = datetime.now(tz=UTC).date()
        stats = await BookingRepository.get_org_summary(db, org.id, today)
        return BookingSummaryResponse(**stats)

    @staticmethod
    async def list_my_bookings(
        db: AsyncSession,
        current_user: User,
        filters: BookingFilters,
    ) -> BookingListResponse:
        """List bookings for the current user's organization."""
        org = await _require_student_org(db, current_user)
        bookings, total = await BookingRepository.get_by_org_id(db, org.id, filters)
        total_pages = ceil(total / filters.page_size) if total > 0 else 0
        return BookingListResponse(
            items=[_to_booking_response(b) for b in bookings],
            total=total,
            page=filters.page,
            page_size=filters.page_size,
            total_pages=total_pages,
        )

    @staticmethod
    async def cancel_booking(
        db: AsyncSession,
        booking_id: UUID,
        current_user: User,
    ) -> BookingResponse:
        """Cancel a booking (org owner only, pending/confirmed only)."""
        org = await _require_student_org(db, current_user)
        booking = await _get_booking_or_raise(db, booking_id)
        if org.id != booking.organization_id:
            raise AuthorizationError(BookingError.NOT_ORG_OWNER)
        if booking.status not in CANCELLABLE_STATUSES:
            raise BusinessRuleError(BookingError.CANNOT_CANCEL_STATUS)
        updated = await BookingRepository.update_status(db, booking, BookingStatus.cancelled)
        return _to_booking_response(updated)

    @staticmethod
    async def create_booking(
        db: AsyncSession,
        booking_data: BookingCreate,
        current_user: User,
    ) -> BookingResponse:
        """Create a new booking request (student org only)."""
        org = await _require_student_org(db, current_user)
        venue = await VenueRepository.get_by_id(db, booking_data.venue_id)
        if not venue:
            raise ResourceNotFoundError(VENUE_RESOURCE, BookingError.VENUE_NOT_FOUND)
        has_conflict = await BookingRepository.has_time_conflict(
            db,
            booking_data.venue_id,
            booking_data.event_date,
            booking_data.event_start_time,
            booking_data.event_end_time,
        )
        if has_conflict:
            raise ConflictError(BookingError.TIME_CONFLICT)
        booking = await BookingRepository.create(db, booking_data, org.id)
        return _to_booking_response(booking)

    @staticmethod
    async def accept_booking(
        db: AsyncSession,
        booking_id: UUID,
        current_user: User,
    ) -> BookingResponse:
        """Accept a pending booking (venue owner only)."""
        booking = await _get_booking_or_raise(db, booking_id)
        await _require_venue_owner(db, current_user, booking.venue_id)
        if booking.status != BookingStatus.pending:
            raise BusinessRuleError(BookingError.CANNOT_ACCEPT_STATUS)
        updated = await BookingRepository.update_status(db, booking, BookingStatus.confirmed)
        return _to_booking_response(updated)

    @staticmethod
    async def decline_booking(
        db: AsyncSession,
        booking_id: UUID,
        current_user: User,
    ) -> BookingResponse:
        """Decline a pending booking (venue owner only)."""
        booking = await _get_booking_or_raise(db, booking_id)
        await _require_venue_owner(db, current_user, booking.venue_id)
        if booking.status != BookingStatus.pending:
            raise BusinessRuleError(BookingError.CANNOT_DECLINE_STATUS)
        updated = await BookingRepository.update_status(db, booking, BookingStatus.rejected)
        return _to_booking_response(updated)

    @staticmethod
    async def list_venue_bookings(
        db: AsyncSession,
        venue_id: UUID,
        current_user: User,
        filters: BookingFilters,
    ) -> BookingListResponse:
        """List bookings for a venue with pagination (venue owner only)."""
        await _require_venue_owner(db, current_user, venue_id)
        bookings, total = await BookingRepository.get_by_venue_id(db, venue_id, filters)
        total_pages = ceil(total / filters.page_size) if total > 0 else 0
        return BookingListResponse(
            items=[_to_booking_response(b) for b in bookings],
            total=total,
            page=filters.page,
            page_size=filters.page_size,
            total_pages=total_pages,
        )


booking_service = BookingService()
