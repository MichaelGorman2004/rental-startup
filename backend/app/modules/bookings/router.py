"""Booking management API endpoints."""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import BookingStatus
from app.core.database.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.bookings.constants import DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE
from app.modules.bookings.schemas import BookingFilters, BookingListResponse, BookingResponse
from app.modules.bookings.services import booking_service
from app.modules.users.models import User

router = APIRouter(prefix="/bookings", tags=["Bookings"])


def parse_booking_filters(
    booking_status: Annotated[BookingStatus | None, Query(alias="status")] = None,
    page: Annotated[int, Query(ge=MIN_PAGE)] = MIN_PAGE,
    page_size: Annotated[int, Query(ge=1, le=MAX_PAGE_SIZE)] = DEFAULT_PAGE_SIZE,
) -> BookingFilters:
    """Parse and validate booking filtering query parameters."""
    return BookingFilters(
        status=booking_status,
        page=page,
        page_size=page_size,
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
