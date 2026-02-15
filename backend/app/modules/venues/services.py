"""Venue business logic layer (Service pattern).

All business logic is here. Services are pure functions with no direct database
access - they call repository methods. This makes them fully testable without
mocking the database.
"""

from math import ceil
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import UserRole
from app.modules.users.models import User
from app.modules.venues.constants import VenueError
from app.modules.venues.repository import VenueRepository
from app.modules.venues.schemas import (
    VenueCreate,
    VenueFilters,
    VenueListResponse,
    VenueResponse,
    VenueUpdate,
)


class VenueService:
    """Service layer for venue business logic."""

    @staticmethod
    async def create_venue(
        db: AsyncSession,
        venue_data: VenueCreate,
        current_user: User,
    ) -> VenueResponse:
        """
        Create a new venue listing.

        Args:
            db: Database session
            venue_data: Venue creation data
            current_user: Authenticated user

        Returns:
            Created venue response

        Raises:
            HTTPException: If user is not a venue admin
        """
        # Verify user is venue admin
        if current_user.role != UserRole.venue_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=VenueError.VENUE_ADMIN_REQUIRED,
            )

        # Create venue
        venue = await VenueRepository.create(
            db=db,
            venue_data=venue_data,
            owner_id=current_user.id,
        )

        return VenueResponse.model_validate(venue)

    @staticmethod
    async def get_venue_by_id(
        db: AsyncSession,
        venue_id: UUID,
    ) -> VenueResponse:
        """
        Retrieve a single venue by ID.

        Args:
            db: Database session
            venue_id: Venue UUID

        Returns:
            Venue response

        Raises:
            HTTPException: If venue not found
        """
        venue = await VenueRepository.get_by_id(db=db, venue_id=venue_id)

        if not venue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=VenueError.VENUE_NOT_FOUND,
            )

        return VenueResponse.model_validate(venue)

    @staticmethod
    async def list_venues(
        db: AsyncSession,
        filters: VenueFilters,
    ) -> VenueListResponse:
        """
        List venues with filtering and pagination.

        Args:
            db: Database session
            filters: Query filters and pagination

        Returns:
            Paginated venue list response
        """
        venues, total = await VenueRepository.get_all(db=db, filters=filters)

        # Calculate total pages
        total_pages = ceil(total / filters.page_size) if total > 0 else 0

        return VenueListResponse(
            items=[VenueResponse.model_validate(v) for v in venues],
            total=total,
            page=filters.page,
            page_size=filters.page_size,
            total_pages=total_pages,
        )

    @staticmethod
    async def update_venue(
        db: AsyncSession,
        venue_id: UUID,
        update_data: VenueUpdate,
        current_user: User,
    ) -> VenueResponse:
        """
        Update an existing venue.

        Args:
            db: Database session
            venue_id: Venue UUID
            update_data: Fields to update
            current_user: Authenticated user

        Returns:
            Updated venue response

        Raises:
            HTTPException: If venue not found, already deleted, or user not owner
        """
        # Get venue
        venue = await VenueRepository.get_by_id(
            db=db,
            venue_id=venue_id,
            include_deleted=True,
        )

        if not venue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=VenueError.VENUE_NOT_FOUND,
            )

        # Check if already deleted
        if venue.deleted_at:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=VenueError.CANNOT_UPDATE_DELETED,
            )

        # Verify ownership
        if venue.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=VenueError.NOT_VENUE_OWNER,
            )

        # Update venue
        updated_venue = await VenueRepository.update(
            db=db,
            venue=venue,
            update_data=update_data,
        )

        return VenueResponse.model_validate(updated_venue)

    @staticmethod
    async def delete_venue(
        db: AsyncSession,
        venue_id: UUID,
        current_user: User,
    ) -> None:
        """
        Soft delete a venue.

        Args:
            db: Database session
            venue_id: Venue UUID
            current_user: Authenticated user

        Raises:
            HTTPException: If venue not found, already deleted, or user not owner
        """
        # Get venue
        venue = await VenueRepository.get_by_id(
            db=db,
            venue_id=venue_id,
            include_deleted=True,
        )

        if not venue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=VenueError.VENUE_NOT_FOUND,
            )

        # Check if already deleted
        if venue.deleted_at:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=VenueError.CANNOT_DELETE_DELETED,
            )

        # Verify ownership
        if venue.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=VenueError.NOT_VENUE_OWNER,
            )

        # Soft delete
        await VenueRepository.soft_delete(db=db, venue=venue)


# Singleton instance
venue_service = VenueService()
