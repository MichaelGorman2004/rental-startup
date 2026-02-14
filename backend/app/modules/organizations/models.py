"""Organization model for college student groups.

Represents student organizations (fraternities, sororities, clubs) that book
venues for events. Each organization is owned by a student user and can create
multiple bookings.

Database constraints:
- Must have a valid owner (FK to users table)
- Organization type categorizes the group
- University name required for filtering/search

Relationships:
- Belongs to one user (owner)
- Has many bookings
- Deletion restricted if organization has bookings
"""

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.constants.enums import OrganizationType
from app.core.database import BaseModel, TimestampMixin, UUIDMixin

# Avoid circular imports
if TYPE_CHECKING:
    from app.modules.bookings.models import Booking
    from app.modules.users.models import User

# Constants for column constraints
NAME_MAX_LENGTH = 255
UNIVERSITY_MAX_LENGTH = 255


class Organization(BaseModel, UUIDMixin, TimestampMixin):
    """
    Student organization model.

    Represents college student groups that book venues for events:
    - Greek life (fraternities/sororities)
    - Student clubs
    - Special interest groups

    Attributes:
        id: UUID primary key
        name: Organization name (e.g., "Alpha Beta Gamma", "Chess Club")
        type: Organization classification (FRATERNITY, SORORITY, CLUB, OTHER)
        university: University/college name (e.g., "University of California, Berkeley")
        owner_id: Foreign key to user who manages this organization
        created_at: Organization creation timestamp (UTC)
        updated_at: Last modification timestamp (UTC)
        owner: User who manages this organization (STUDENT_ORG role)
        bookings: Venue bookings made by this organization
    """

    __tablename__ = "organizations"

    # Core fields
    name: Mapped[str] = mapped_column(
        String(NAME_MAX_LENGTH),
        nullable=False,
    )

    type: Mapped[OrganizationType] = mapped_column(
        Enum(OrganizationType, name="organization_type", native_enum=True),
        nullable=False,
    )

    university: Mapped[str] = mapped_column(
        String(UNIVERSITY_MAX_LENGTH),
        nullable=False,
    )

    # Foreign keys
    owner_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,  # Index for owner lookup
    )

    # Relationships
    owner: Mapped["User"] = relationship(
        "User",
        back_populates="organizations",
        lazy="joined",  # Always load owner with organization
    )

    bookings: Mapped[list["Booking"]] = relationship(
        "Booking",
        back_populates="organization",
        lazy="selectin",  # Eager load bookings
    )

    def __repr__(self) -> str:
        """String representation for debugging."""
        return (
            f"<Organization(id={self.id}, name={self.name}, "
            f"type={self.type}, university={self.university})>"
        )
