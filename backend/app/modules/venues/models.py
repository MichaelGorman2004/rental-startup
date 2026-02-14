"""Venue model for event space listings.

Represents physical venues (bars, restaurants, event spaces) available for
student organization bookings. Venues are owned by venue administrators and
can be soft-deleted to preserve booking history.

Database constraints:
- Capacity must be positive (> 0)
- Base price must be non-negative (>= 0)
- Soft delete pattern preserves booking references
- Address fields are optional (not all venues may provide full addresses initially)

Relationships:
- Belongs to one user (owner with VENUE_ADMIN role)
- Has many bookings
- Deletion is soft (deleted_at timestamp) to preserve historical bookings
"""

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import CheckConstraint, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.constants.enums import VenueType
from app.core.database import BaseModel, SoftDeleteMixin, TimestampMixin, UUIDMixin

# Avoid circular imports
if TYPE_CHECKING:
    from app.modules.bookings.models import Booking
    from app.modules.users.models import User

# Constants for column constraints
NAME_MAX_LENGTH = 255
ADDRESS_STREET_MAX_LENGTH = 255
ADDRESS_CITY_MAX_LENGTH = 100
ADDRESS_STATE_MAX_LENGTH = 2  # Two-letter state code (e.g., "CA", "NY")
ADDRESS_ZIP_MAX_LENGTH = 10  # ZIP+4 format (e.g., "94720-1234")


class Venue(BaseModel, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    """
    Venue model for event space listings.

    Represents venues available for booking by student organizations:
    - Bars and pubs
    - Restaurants
    - Dedicated event spaces
    - Cafes

    Soft delete pattern:
    - deleted_at=NULL: Venue is active and bookable
    - deleted_at=<timestamp>: Venue is deleted but preserved for booking history

    Attributes:
        id: UUID primary key
        name: Venue name (e.g., "The Corner Pub")
        type: Venue category (BAR, RESTAURANT, EVENT_SPACE, CAFE)
        capacity: Maximum guest capacity (must be > 0)
        base_price_cents: Base price in cents for pricing transparency (must be >= 0)
        address_street: Street address (optional)
        address_city: City (optional)
        address_state: Two-letter state code (optional)
        address_zip: ZIP code (optional)
        owner_id: Foreign key to user who manages this venue
        created_at: Venue listing creation timestamp (UTC)
        updated_at: Last modification timestamp (UTC)
        deleted_at: Soft delete timestamp (NULL if active)
        owner: User who manages this venue (VENUE_ADMIN role)
        bookings: Bookings for this venue
    """

    __tablename__ = "venues"

    # Core fields
    name: Mapped[str] = mapped_column(
        String(NAME_MAX_LENGTH),
        nullable=False,
    )

    type: Mapped[VenueType] = mapped_column(
        Enum(VenueType, name="venue_type", native_enum=True),
        nullable=False,
    )

    capacity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    base_price_cents: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # Address fields (optional - venues can be added without complete addresses)
    address_street: Mapped[str | None] = mapped_column(
        String(ADDRESS_STREET_MAX_LENGTH),
        nullable=True,
    )

    address_city: Mapped[str | None] = mapped_column(
        String(ADDRESS_CITY_MAX_LENGTH),
        nullable=True,
    )

    address_state: Mapped[str | None] = mapped_column(
        String(ADDRESS_STATE_MAX_LENGTH),
        nullable=True,
    )

    address_zip: Mapped[str | None] = mapped_column(
        String(ADDRESS_ZIP_MAX_LENGTH),
        nullable=True,
    )

    # Foreign keys
    owner_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,  # Index for owner lookup (venue admin dashboard)
    )

    # Relationships
    owner: Mapped["User"] = relationship(
        "User",
        back_populates="venues",
        lazy="joined",  # Always load owner with venue
    )

    bookings: Mapped[list["Booking"]] = relationship(
        "Booking",
        back_populates="venue",
        lazy="selectin",  # Eager load bookings
    )

    # Table-level constraints
    __table_args__ = (
        # Capacity must be positive
        CheckConstraint("capacity > 0", name="venue_capacity_positive_check"),
        # Price must be non-negative
        CheckConstraint("base_price_cents >= 0", name="venue_price_non_negative_check"),
    )

    def __repr__(self) -> str:
        """String representation for debugging."""
        deleted_status = " [DELETED]" if self.deleted_at else ""
        return (
            f"<Venue(id={self.id}, name={self.name}, "
            f"type={self.type}, capacity={self.capacity}){deleted_status}>"
        )
