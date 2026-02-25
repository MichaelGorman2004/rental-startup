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

from sqlalchemy import CheckConstraint, Enum, ForeignKey, Integer, String, Text
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
DESCRIPTION_MAX_LENGTH = 2000
CONTACT_EMAIL_MAX_LENGTH = 255
CONTACT_PHONE_MAX_LENGTH = 50
WEBSITE_URL_MAX_LENGTH = 500
LOGO_URL_MAX_LENGTH = 500


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

    # Profile fields (optional)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    contact_email: Mapped[str | None] = mapped_column(
        String(CONTACT_EMAIL_MAX_LENGTH),
        nullable=True,
    )

    contact_phone: Mapped[str | None] = mapped_column(
        String(CONTACT_PHONE_MAX_LENGTH),
        nullable=True,
    )

    member_count: Mapped[int | None] = mapped_column(Integer, nullable=True)

    website_url: Mapped[str | None] = mapped_column(
        String(WEBSITE_URL_MAX_LENGTH),
        nullable=True,
    )

    logo_url: Mapped[str | None] = mapped_column(
        String(LOGO_URL_MAX_LENGTH),
        nullable=True,
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

    # Table-level constraints
    __table_args__ = (
        CheckConstraint("member_count > 0", name="org_member_count_positive_check"),
    )

    def __repr__(self) -> str:
        """String representation for debugging."""
        return (
            f"<Organization(id={self.id}, name={self.name}, "
            f"type={self.type}, university={self.university})>"
        )
