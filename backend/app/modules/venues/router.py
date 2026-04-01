"""Venue management API endpoints.

Thin controllers that validate input, call services, and return responses.
No business logic in routers - everything delegates to the service layer.
"""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.bookings.router import parse_booking_filters
from app.modules.bookings.schemas import BookingFilters, BookingListResponse
from app.modules.bookings.services import booking_service
from app.modules.ratings.router import parse_rating_filters
from app.modules.ratings.schemas import RatingFilters, RatingListResponse
from app.modules.ratings.services import rating_service
from app.modules.users.models import User
from app.modules.venues.dependencies import parse_venue_filters
from app.modules.venues.schemas import (
    VenueCreate,
    VenueFilters,
    VenueListResponse,
    VenueResponse,
    VenueStatsResponse,
    VenueUpdate,
)
from app.modules.venues.services import venue_service

router = APIRouter(prefix="/venues", tags=["Venues"])


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=VenueResponse,
    summary="Create a new venue",
    description="Create a new venue listing. Requires venue admin role.",
)
async def create_venue(
    venue_data: VenueCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> VenueResponse:
    """Create a new venue (venue admin only)."""
    return await venue_service.create_venue(
        db=db,
        venue_data=venue_data,
        current_user=current_user,
    )


@router.get(
    "/me",
    response_model=VenueResponse,
    summary="Get current user's venue",
    description="Retrieve the venue owned by the authenticated user.",
)
async def get_my_venue(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> VenueResponse:
    """Get the current user's venue."""
    return await venue_service.get_my_venue(db=db, current_user=current_user)


@router.get(
    "/{venue_id}/stats",
    response_model=VenueStatsResponse,
    summary="Get venue stats",
    description="Get performance stats for a venue. Requires ownership.",
)
async def get_venue_stats(
    venue_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> VenueStatsResponse:
    """Get venue performance stats (owner only)."""
    return await venue_service.get_venue_stats(
        db=db,
        venue_id=venue_id,
        current_user=current_user,
    )


@router.get(
    "/{venue_id}",
    response_model=VenueResponse,
    summary="Get venue by ID",
    description="Retrieve a single venue by its UUID.",
)
async def get_venue(
    venue_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    _current_user: Annotated[User, Depends(get_current_user)],
) -> VenueResponse:
    """Get a single venue by ID.

    This endpoint is intentionally accessible to any authenticated user
    (no ownership check) so that student organizations can browse and
    discover venues before making a booking request.
    """
    return await venue_service.get_venue_by_id(db=db, venue_id=venue_id)


@router.get(
    "",
    response_model=VenueListResponse,
    summary="List venues with filters",
    description=(
        "List all venues with optional filtering by type, capacity, "
        "price, and search query. Supports pagination."
    ),
)
async def list_venues(
    db: Annotated[AsyncSession, Depends(get_db)],
    filters: Annotated[VenueFilters, Depends(parse_venue_filters)],
    _current_user: Annotated[User, Depends(get_current_user)],
) -> VenueListResponse:
    """List venues with filtering and pagination."""
    return await venue_service.list_venues(db=db, filters=filters)


@router.patch(
    "/{venue_id}",
    response_model=VenueResponse,
    summary="Update venue",
    description=(
        "Update an existing venue. Only provided fields will be updated. " "Requires ownership."
    ),
)
async def update_venue(
    venue_id: UUID,
    update_data: VenueUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> VenueResponse:
    """Update a venue (owner only)."""
    return await venue_service.update_venue(
        db=db,
        venue_id=venue_id,
        update_data=update_data,
        current_user=current_user,
    )


@router.post(
    "/{venue_id}/logo",
    response_model=VenueResponse,
    summary="Upload venue logo",
    description="Upload a logo image for a venue. Requires ownership.",
)
async def upload_venue_logo(
    venue_id: UUID,
    file: UploadFile,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> VenueResponse:
    """Upload a logo image for a venue (owner only)."""
    return await venue_service.upload_logo(
        db=db,
        venue_id=venue_id,
        file=file,
        current_user=current_user,
    )


@router.delete(
    "/{venue_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete venue",
    description=(
        "Soft delete a venue. The venue will be hidden but preserved for "
        "booking history. Requires ownership."
    ),
)
async def delete_venue(
    venue_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> None:
    """Soft delete a venue (owner only)."""
    await venue_service.delete_venue(
        db=db,
        venue_id=venue_id,
        current_user=current_user,
    )


@router.get(
    "/{venue_id}/bookings",
    response_model=BookingListResponse,
    summary="List venue bookings",
    description="List booking requests for a venue with pagination. Requires ownership.",
)
async def list_venue_bookings(
    venue_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
    filters: Annotated[BookingFilters, Depends(parse_booking_filters)],
) -> BookingListResponse:
    """List bookings for a venue with pagination (owner only)."""
    return await booking_service.list_venue_bookings(
        db=db,
        venue_id=venue_id,
        current_user=current_user,
        filters=filters,
    )


@router.get(
    "/{venue_id}/ratings",
    response_model=RatingListResponse,
    summary="List venue ratings",
    description="List ratings for a venue with pagination. Public endpoint.",
)
async def list_venue_ratings(
    venue_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    filters: Annotated[RatingFilters, Depends(parse_rating_filters)],
) -> RatingListResponse:
    """List ratings for a venue (public, paginated)."""
    return await rating_service.list_venue_ratings(
        db=db,
        venue_id=venue_id,
        filters=filters,
    )
