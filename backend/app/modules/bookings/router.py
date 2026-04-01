"""Booking management API endpoints."""

from datetime import date
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import BookingStatus
from app.core.database.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.bookings.constants import DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE
from app.modules.bookings.schemas import (
    BookingCreate,
    BookingFilters,
    BookingListResponse,
    BookingResponse,
    BookingSummaryResponse,
)
from app.modules.bookings.services import booking_service
from app.modules.ratings.schemas import RatingCreate, RatingResponse
from app.modules.ratings.services import rating_service
from app.modules.users.models import User

router = APIRouter(prefix="/bookings", tags=["Bookings"])

SORT_BY_EVENT_DATE = "event_date"
ALLOWED_SORT_FIELDS = {SORT_BY_EVENT_DATE}


def parse_booking_filters(
    booking_status: Annotated[BookingStatus | None, Query(alias="status")] = None,
    from_date: Annotated[date | None, Query()] = None,
    sort_by: Annotated[str | None, Query()] = None,
    page: Annotated[int, Query(ge=MIN_PAGE)] = MIN_PAGE,
    page_size: Annotated[int, Query(ge=1, le=MAX_PAGE_SIZE)] = DEFAULT_PAGE_SIZE,
) -> BookingFilters:
    """Parse and validate booking filtering query parameters."""
    validated_sort = sort_by if sort_by in ALLOWED_SORT_FIELDS else None
    return BookingFilters(
        status=booking_status,
        from_date=from_date,
        sort_by=validated_sort,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/me/summary",
    response_model=BookingSummaryResponse,
    summary="Get booking summary for my organization",
)
async def get_my_summary(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> BookingSummaryResponse:
    """Get booking summary stats for the current user's org."""
    return await booking_service.get_my_summary(
        db=db,
        current_user=current_user,
    )


@router.get(
    "/me",
    response_model=BookingListResponse,
    summary="List my organization's bookings",
)
async def list_my_bookings(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
    filters: Annotated[BookingFilters, Depends(parse_booking_filters)],
) -> BookingListResponse:
    """List bookings for the current user's organization."""
    return await booking_service.list_my_bookings(
        db=db,
        current_user=current_user,
        filters=filters,
    )


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=BookingResponse,
    summary="Create a booking request",
)
async def create_booking(
    booking_data: BookingCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> BookingResponse:
    """Create a new booking request (student org only)."""
    return await booking_service.create_booking(
        db=db,
        booking_data=booking_data,
        current_user=current_user,
    )


@router.patch(
    "/{booking_id}/cancel",
    response_model=BookingResponse,
    summary="Cancel a booking",
)
async def cancel_booking(
    booking_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> BookingResponse:
    """Cancel a pending or confirmed booking (org owner only)."""
    return await booking_service.cancel_booking(
        db=db,
        booking_id=booking_id,
        current_user=current_user,
    )


@router.patch(
    "/{booking_id}/accept",
    response_model=BookingResponse,
    summary="Accept a booking request",
)
async def accept_booking(
    booking_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> BookingResponse:
    """Accept a pending booking request (venue owner only)."""
    return await booking_service.accept_booking(
        db=db,
        booking_id=booking_id,
        current_user=current_user,
    )


@router.patch(
    "/{booking_id}/decline",
    response_model=BookingResponse,
    summary="Decline a booking request",
)
async def decline_booking(
    booking_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> BookingResponse:
    """Decline a pending booking request (venue owner only)."""
    return await booking_service.decline_booking(
        db=db,
        booking_id=booking_id,
        current_user=current_user,
    )


@router.post(
    "/{booking_id}/rate",
    status_code=status.HTTP_201_CREATED,
    response_model=RatingResponse,
    summary="Rate a completed booking",
)
async def rate_booking(
    booking_id: UUID,
    rating_data: RatingCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> RatingResponse:
    """Rate a completed booking (org owner only)."""
    return await rating_service.create_rating(
        db=db,
        booking_id=booking_id,
        rating_data=rating_data,
        current_user=current_user,
    )
