"""Booking model for venue reservations.

Represents booking requests and confirmed reservations between student
organizations and venues. Implements a workflow state machine through the
BookingStatus enum.

Database constraints:
- Unique constraint prevents double-booking (venue_id, event_date, event_time)
- Guest count must be positive (> 0)
- Foreign keys restrict deletion to preserve historical data
- Event date indexed for date range queries

Booking workflow:
    PENDING -> CONFIRMED (venue accepts)
    PENDING -> REJECTED (venue declines)
    CONFIRMED -> COMPLETED (event occurs)
    CONFIRMED -> CANCELLED (either party cancels)
    PENDING -> CANCELLED (org cancels before confirmation)
"""

from datetime import date, time
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    Date,
    Enum,
    ForeignKey,
    Index,
    Integer,
    Time,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.constants.enums import BookingStatus
from app.core.database import BaseModel, TimestampMixin, UUIDMixin

# Avoid circular imports
if TYPE_CHECKING:
    from app.modules.organizations.models import Organization
    from app.modules.venues.models import Venue


class Booking(BaseModel, UUIDMixin, TimestampMixin):
    """
    Booking model for venue reservations.

    Represents the relationship between organizations and venues for specific
    event dates/times. Tracks the booking lifecycle from initial request
    through completion or cancellation.

    Business rules:
    - One venue can only have one booking per date/time slot
    - Guest count must be positive
    - Event date/time must be in the future (enforced at application level)
    - Bookings cannot be deleted, only cancelled (audit trail)

    Attributes:
        id: UUID primary key
        venue_id: Foreign key to venue being booked
        organization_id: Foreign key to organization making booking
        event_date: Date of the event
        event_time: Start time of the event
        guest_count: Expected number of guests (must be > 0)
        status: Booking workflow state (PENDING, CONFIRMED, etc.)
        created_at: Booking request creation timestamp (UTC)
        updated_at: Last status change timestamp (UTC)
        venue: Venue being booked
        organization: Organization making the booking
    """

    __tablename__ = "bookings"

    # Foreign keys
    venue_id: Mapped[UUID] = mapped_column(
        ForeignKey("venues.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,  # Index for venue's booking list queries
    )

    organization_id: Mapped[UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,  # Index for organization's booking history
    )

    # Event details
    event_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
        index=True,  # Index for date range queries (e.g., "bookings this month")
    )

    event_time: Mapped[time] = mapped_column(
        Time,
        nullable=False,
    )

    guest_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # Booking workflow state
    status: Mapped[BookingStatus] = mapped_column(
        Enum(BookingStatus, name="booking_status", native_enum=True),
        default=BookingStatus.pending,
        nullable=False,
        index=True,  # Index for status-based queries (e.g., "pending bookings")
    )

    # Relationships
    venue: Mapped["Venue"] = relationship(
        "Venue",
        back_populates="bookings",
        lazy="joined",  # Always load venue with booking
    )

    organization: Mapped["Organization"] = relationship(
        "Organization",
        back_populates="bookings",
        lazy="joined",  # Always load organization with booking
    )

    # Table-level constraints and indexes
    __table_args__ = (
        # Prevent double-booking: same venue cannot have two bookings at same date/time
        UniqueConstraint(
            "venue_id",
            "event_date",
            "event_time",
            name="unique_venue_datetime_booking",
        ),
        # Guest count must be positive
        CheckConstraint("guest_count > 0", name="booking_guest_count_positive_check"),
        # Composite index for venue availability queries
        Index("ix_bookings_venue_date_time", "venue_id", "event_date", "event_time"),
    )

    def __repr__(self) -> str:
        """String representation for debugging."""
        return (
            f"<Booking(id={self.id}, venue_id={self.venue_id}, "
            f"organization_id={self.organization_id}, "
            f"event_date={self.event_date}, status={self.status})>"
        )
