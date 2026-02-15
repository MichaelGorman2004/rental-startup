"""Venue management API endpoints.

Thin controllers that validate input, call services, and return responses.
No business logic in routers - everything delegates to the service layer.
"""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.users.models import User
from app.modules.venues.dependencies import parse_venue_filters
from app.modules.venues.schemas import (
    VenueCreate,
    VenueFilters,
    VenueListResponse,
    VenueResponse,
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
    """Get a single venue by ID."""
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
