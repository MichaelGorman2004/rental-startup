"""Booking business logic layer (Service pattern)."""

from math import ceil
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import BookingStatus, UserRole
from app.modules.bookings.constants import BookingError
from app.modules.bookings.models import Booking
from app.modules.bookings.repository import BookingRepository
from app.modules.bookings.schemas import (
    BookingFilters,
    BookingListResponse,
    BookingResponse,
)
from app.modules.organizations.repository import OrganizationRepository
from app.modules.users.models import User

# Statuses that can be cancelled
CANCELLABLE_STATUSES = {BookingStatus.pending, BookingStatus.confirmed}


def _to_booking_response(booking: Booking) -> BookingResponse:
    """Convert a Booking model to BookingResponse with related names."""
    response = BookingResponse.model_validate(booking)
    response.venue_name = booking.venue.name if booking.venue else ""
    response.organization_name = booking.organization.name if booking.organization else ""
    return response


class BookingService:
    """Service layer for booking business logic."""

    @staticmethod
    async def list_my_bookings(
        db: AsyncSession,
        current_user: User,
        filters: BookingFilters,
    ) -> BookingListResponse:
        """List bookings for the current user's organization."""
        if current_user.role != UserRole.student_org:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=BookingError.STUDENT_ORG_REQUIRED,
            )

        org = await OrganizationRepository.get_by_owner_id(
            db=db,
            owner_id=current_user.id,
        )

        if not org:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=BookingError.NO_ORGANIZATION,
            )

        bookings, total = await BookingRepository.get_by_org_id(
            db=db,
            org_id=org.id,
            filters=filters,
        )

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
        booking = await BookingRepository.get_by_id(db=db, booking_id=booking_id)

        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=BookingError.NOT_FOUND,
            )

        # Verify the user owns the organization that made this booking
        org = await OrganizationRepository.get_by_owner_id(
            db=db,
            owner_id=current_user.id,
        )

        if not org or org.id != booking.organization_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=BookingError.NOT_ORG_OWNER,
            )

        if booking.status not in CANCELLABLE_STATUSES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=BookingError.CANNOT_CANCEL_STATUS,
            )

        updated = await BookingRepository.update_status(
            db=db,
            booking=booking,
            new_status=BookingStatus.cancelled,
        )

        return _to_booking_response(updated)


booking_service = BookingService()
