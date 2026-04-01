"""Rating business logic layer (Service pattern)."""

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
from app.modules.bookings.repository import BookingRepository
from app.modules.organizations.repository import OrganizationRepository
from app.modules.ratings.constants import RatingError
from app.modules.ratings.models import Rating
from app.modules.ratings.repository import RatingRepository
from app.modules.ratings.schemas import (
    RatingCreate,
    RatingFilters,
    RatingListResponse,
    RatingResponse,
)
from app.modules.users.models import User
from app.modules.venues.repository import VenueRepository

BOOKING_RESOURCE = "Booking"
VENUE_RESOURCE = "Venue"
ORG_RESOURCE = "Organization"


def _to_rating_response(rating: Rating) -> RatingResponse:
    """Convert a Rating model to RatingResponse."""
    return RatingResponse(
        id=rating.id,
        booking_id=rating.booking_id,
        organization_id=rating.organization_id,
        venue_id=rating.venue_id,
        score=rating.score,
        comment=rating.comment,
        created_at=rating.created_at,
        organization_name=(rating.organization.name if rating.organization else ""),
    )


class RatingService:
    """Service layer for rating business logic."""

    @staticmethod
    async def create_rating(
        db: AsyncSession,
        booking_id: UUID,
        rating_data: RatingCreate,
        current_user: User,
    ) -> RatingResponse:
        """Create a rating for a completed booking (org owner only)."""
        if current_user.role != UserRole.student_org:
            raise AuthorizationError(RatingError.STUDENT_ORG_REQUIRED)

        org = await OrganizationRepository.get_by_owner_id(
            db,
            current_user.id,
        )
        if not org:
            raise ResourceNotFoundError(
                ORG_RESOURCE,
                RatingError.NO_ORGANIZATION,
            )

        booking = await BookingRepository.get_by_id(db, booking_id)
        if not booking:
            raise ResourceNotFoundError(
                BOOKING_RESOURCE,
                RatingError.BOOKING_NOT_FOUND,
            )

        if booking.organization_id != org.id:
            raise AuthorizationError(RatingError.NOT_BOOKING_OWNER)

        if booking.status != BookingStatus.completed:
            raise BusinessRuleError(RatingError.BOOKING_NOT_COMPLETED)

        existing = await RatingRepository.get_by_booking_id(db, booking_id)
        if existing:
            raise ConflictError(RatingError.ALREADY_RATED)

        rating = await RatingRepository.create(
            db=db,
            rating_data=rating_data,
            booking_id=booking_id,
            organization_id=org.id,
            venue_id=booking.venue_id,
        )
        return _to_rating_response(rating)

    @staticmethod
    async def list_venue_ratings(
        db: AsyncSession,
        venue_id: UUID,
        filters: RatingFilters,
    ) -> RatingListResponse:
        """List ratings for a venue (public, paginated)."""
        venue = await VenueRepository.get_by_id(db=db, venue_id=venue_id)
        if not venue:
            raise ResourceNotFoundError(
                VENUE_RESOURCE,
                RatingError.VENUE_NOT_FOUND,
            )

        ratings, total = await RatingRepository.get_by_venue_id(
            db,
            venue_id,
            filters,
        )
        total_pages = ceil(total / filters.page_size) if total > 0 else 0
        return RatingListResponse(
            items=[_to_rating_response(r) for r in ratings],
            total=total,
            page=filters.page,
            page_size=filters.page_size,
            total_pages=total_pages,
        )


rating_service = RatingService()
