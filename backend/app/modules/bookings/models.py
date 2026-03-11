"""Booking model for venue reservations.

Represents booking requests and confirmed reservations between student
organizations and venues. Implements a workflow state machine through the
BookingStatus enum.

Database constraints:
- Overlap detection via has_time_conflict (application-level, status-aware)
- Guest count must meet minimum group size (>= 10)
- Event end time must be after start time
- Foreign keys restrict deletion to preserve historical data
- Event date indexed for date range queries

Booking workflow:
    PENDING -> CONFIRMED (venue accepts)
    PENDING -> REJECTED (venue declines)
    CONFIRMED -> COMPLETED (event occurs)
    CONFIRMED -> CANCELLED (either party cancels)
    PENDING -> CANCELLED (org cancels before confirmation)
"""

from datetime import date, time, timedelta
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    Date,
    Enum,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    Time,
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
    - Guest count must meet minimum group size (>= 10)
    - Event end time must be after start time
    - Event date must not be in the past (enforced in BookingCreate schema)
    - Bookings cannot be deleted, only cancelled (audit trail)

    Attributes:
        id: UUID primary key
        venue_id: Foreign key to venue being booked
        organization_id: Foreign key to organization making booking
        event_date: Date of the event
        event_start_time: Start time of the event
        event_end_time: End time of the event
        event_duration: Computed duration of the event
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

    event_start_time: Mapped[time] = mapped_column(
        Time,
        nullable=False,
    )

    event_end_time: Mapped[time] = mapped_column(
        Time,
        nullable=False,
    )

    guest_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # Event details
    event_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    special_requests: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
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
        # Event name must not be empty
        CheckConstraint("length(event_name) > 0", name="booking_event_name_not_empty"),
        # Guest count must meet minimum group size
        CheckConstraint("guest_count >= 10", name="booking_guest_count_positive_check"),
        # Event end time must be after start time
        # Note: overnight events (crossing midnight) not supported in MVP
        CheckConstraint(
            "event_end_time > event_start_time",
            name="booking_end_after_start_check",
        ),
        # Composite index for venue availability queries
        Index(
            "ix_bookings_venue_date_time",
            "venue_id",
            "event_date",
            "event_start_time",
            "event_end_time",
        ),
    )

    @property
    def event_duration(self) -> timedelta:
        """Calculate the duration of the event from start and end times."""
        start_seconds = (
            self.event_start_time.hour * 3600
            + self.event_start_time.minute * 60
            + self.event_start_time.second
        )
        end_seconds = (
            self.event_end_time.hour * 3600
            + self.event_end_time.minute * 60
            + self.event_end_time.second
        )
        return timedelta(seconds=end_seconds - start_seconds)

    def __repr__(self) -> str:
        """String representation for debugging."""
        return (
            f"<Booking(id={self.id}, venue_id={self.venue_id}, "
            f"organization_id={self.organization_id}, "
            f"event_date={self.event_date}, status={self.status})>"
        )
