"""Rating model for venue reviews.

Organizations can rate venues after a completed booking. Each booking
can only be rated once, enforced by a unique constraint on booking_id.

Database constraints:
- Score must be between 1 and 5
- Comment max length is 1000 characters
- One rating per booking (unique booking_id)
- Foreign keys restrict deletion to preserve historical data

Relationships:
- Belongs to one booking
- Belongs to one organization (the rater)
- Belongs to one venue (the rated)
"""

from datetime import UTC, datetime
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import BaseModel, UUIDMixin
from app.modules.ratings.constants import COMMENT_MAX_LENGTH, SCORE_MAX, SCORE_MIN

# Avoid circular imports
if TYPE_CHECKING:
    from app.modules.bookings.models import Booking
    from app.modules.organizations.models import Organization
    from app.modules.venues.models import Venue


class Rating(BaseModel, UUIDMixin):
    """
    Rating model for venue reviews.

    Represents a review left by an organization after a completed booking.

    Business rules:
    - Only one rating per booking (unique constraint)
    - Score must be 1-5
    - Comment is optional, max 1000 characters
    - Only the booking's organization can create the rating

    Attributes:
        id: UUID primary key
        booking_id: Foreign key to the completed booking
        organization_id: Foreign key to the reviewing organization
        venue_id: Foreign key to the reviewed venue
        score: Rating score (1-5)
        comment: Optional review text (max 1000 chars)
        created_at: Rating creation timestamp (UTC)
    """

    __tablename__ = "ratings"

    # Foreign keys
    booking_id: Mapped[UUID] = mapped_column(
        ForeignKey("bookings.id", ondelete="RESTRICT"),
        nullable=False,
        unique=True,
        index=True,
    )

    organization_id: Mapped[UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    venue_id: Mapped[UUID] = mapped_column(
        ForeignKey("venues.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    # Rating fields
    score: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    comment: Mapped[str | None] = mapped_column(
        String(COMMENT_MAX_LENGTH),
        nullable=True,
    )

    # Timestamp (ratings are immutable, so only created_at)
    created_at: Mapped[datetime] = mapped_column(
        nullable=False,
        default=lambda: datetime.now(UTC),
    )

    # Relationships
    booking: Mapped["Booking"] = relationship(
        "Booking",
        lazy="joined",
    )

    organization: Mapped["Organization"] = relationship(
        "Organization",
        lazy="joined",
    )

    venue: Mapped["Venue"] = relationship(
        "Venue",
        lazy="joined",
    )

    # Table-level constraints
    __table_args__ = (
        CheckConstraint(
            f"score >= {SCORE_MIN} AND score <= {SCORE_MAX}",
            name="rating_score_range_check",
        ),
        UniqueConstraint("booking_id", name="rating_one_per_booking"),
    )

    def __repr__(self) -> str:
        """String representation for debugging."""
        return (
            f"<Rating(id={self.id}, booking_id={self.booking_id}, "
            f"venue_id={self.venue_id}, score={self.score})>"
        )
