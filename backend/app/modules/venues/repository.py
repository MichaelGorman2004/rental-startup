"""Venue data access layer (Repository pattern).

All database queries are isolated here. Repository methods return domain models,
not raw database rows. This layer has no business logic.
"""

from uuid import UUID

from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.venues.models import Venue
from app.modules.venues.schemas import VenueCreate, VenueFilters, VenueUpdate


class VenueRepository:
    """Repository for venue data access operations."""

    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        venue_id: UUID,
        include_deleted: bool = False,
    ) -> Venue | None:
        """
        Retrieve a single venue by ID.

        Args:
            db: Database session
            venue_id: Venue UUID
            include_deleted: Whether to include soft-deleted venues

        Returns:
            Venue if found, None otherwise
        """
        query = select(Venue).where(Venue.id == venue_id)

        if not include_deleted:
            query = query.where(Venue.deleted_at.is_(None))

        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_all(
        db: AsyncSession,
        filters: VenueFilters,
    ) -> tuple[list[Venue], int]:
        """
        Retrieve venues with filtering and pagination.

        Args:
            db: Database session
            filters: Query filters and pagination params

        Returns:
            Tuple of (venues list, total count)
        """
        # Base query (exclude soft-deleted venues)
        query = select(Venue).where(Venue.deleted_at.is_(None))

        # Apply type filter
        if filters.type:
            query = query.where(Venue.type == filters.type)

        # Apply capacity filters
        if filters.min_capacity:
            query = query.where(Venue.capacity >= filters.min_capacity)
        if filters.max_capacity:
            query = query.where(Venue.capacity <= filters.max_capacity)

        # Apply price filter
        if filters.max_price_cents:
            query = query.where(Venue.base_price_cents <= filters.max_price_cents)

        # Apply search filter (name or address fields, case-insensitive)
        if filters.search:
            search_pattern = f"%{filters.search.lower()}%"
            query = query.where(
                or_(
                    func.lower(Venue.name).like(search_pattern),
                    func.lower(Venue.address_street).like(search_pattern),
                    func.lower(Venue.address_city).like(search_pattern),
                )
            )

        # Get total count before pagination
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await db.execute(count_query)
        total = total_result.scalar_one()

        # Apply pagination
        offset = (filters.page - 1) * filters.page_size
        query = query.offset(offset).limit(filters.page_size)

        # Order by created_at descending (newest first)
        query = query.order_by(Venue.created_at.desc())

        # Execute query
        result = await db.execute(query)
        venues = list(result.scalars().all())

        return venues, total

    @staticmethod
    async def create(
        db: AsyncSession,
        venue_data: VenueCreate,
        owner_id: UUID,
    ) -> Venue:
        """
        Create a new venue.

        Args:
            db: Database session
            venue_data: Venue creation data
            owner_id: Owner user ID

        Returns:
            Created venue
        """
        venue = Venue(
            name=venue_data.name,
            type=venue_data.type,
            capacity=venue_data.capacity,
            base_price_cents=venue_data.base_price_cents,
            address_street=venue_data.address_street,
            address_city=venue_data.address_city,
            address_state=venue_data.address_state,
            address_zip=venue_data.address_zip,
            owner_id=owner_id,
        )

        db.add(venue)
        await db.commit()
        await db.refresh(venue)

        return venue

    @staticmethod
    async def update(
        db: AsyncSession,
        venue: Venue,
        update_data: VenueUpdate,
    ) -> Venue:
        """
        Update an existing venue.

        Args:
            db: Database session
            venue: Venue to update
            update_data: Fields to update (only provided fields)

        Returns:
            Updated venue
        """
        # Update only provided fields (exclude_unset=True)
        update_dict = update_data.model_dump(exclude_unset=True)

        for field, value in update_dict.items():
            setattr(venue, field, value)

        await db.commit()
        await db.refresh(venue)

        return venue

    @staticmethod
    async def soft_delete(
        db: AsyncSession,
        venue: Venue,
    ) -> None:
        """
        Soft delete a venue by setting deleted_at timestamp.

        Args:
            db: Database session
            venue: Venue to delete
        """
        from datetime import UTC, datetime

        venue.deleted_at = datetime.now(UTC)

        await db.commit()

    @staticmethod
    async def verify_ownership(
        db: AsyncSession,
        venue_id: UUID,
        user_id: UUID,
    ) -> bool:
        """
        Check if a user owns a venue.

        Args:
            db: Database session
            venue_id: Venue UUID
            user_id: User UUID

        Returns:
            True if user owns venue, False otherwise
        """
        query = select(Venue).where(
            and_(
                Venue.id == venue_id,
                Venue.owner_id == user_id,
                Venue.deleted_at.is_(None),
            )
        )

        result = await db.execute(query)
        venue = result.scalar_one_or_none()

        return venue is not None
