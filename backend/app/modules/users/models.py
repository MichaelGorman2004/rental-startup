"""User model for authentication and role-based access control.

This model represents both student organization administrators and venue owners.
Role-based access control (RBAC) is enforced through the UserRole enum.

Database constraints:
- Email must be unique and valid
- Student org users (.edu email requirement enforced at database level)
- Email verification status tracked for future email confirmation flow

Relationships:
- One user can own multiple organizations (role=STUDENT_ORG)
- One user can own multiple venues (role=VENUE_ADMIN)
- Deletion is restricted if user owns organizations or venues
"""

from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, Enum, Index, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.constants.enums import UserRole
from app.core.database import BaseModel, TimestampMixin, UUIDMixin

# Avoid circular imports while maintaining type hints
if TYPE_CHECKING:
    from app.modules.organizations.models import Organization
    from app.modules.venues.models import Venue

# Constants for database column constraints
EMAIL_MAX_LENGTH = 255


class User(BaseModel, UUIDMixin, TimestampMixin):
    """
    User model for authentication and authorization.

    Supports two user types:
    1. Student organization administrators (STUDENT_ORG role)
       - Must use .edu email address (enforced by CHECK constraint)
       - Can create and manage student organizations
    2. Venue administrators (VENUE_ADMIN role)
       - Can use any email address
       - Can create and manage venue listings

    Attributes:
        id: UUID primary key
        email: Unique email address for authentication
        email_verified: Whether email has been confirmed (for future email verification flow)
        role: User role (STUDENT_ORG or VENUE_ADMIN)
        created_at: Account creation timestamp (UTC)
        updated_at: Last modification timestamp (UTC)
        organizations: Organizations owned by this user (STUDENT_ORG only)
        venues: Venues owned by this user (VENUE_ADMIN only)
    """

    __tablename__ = "users"

    # Core fields
    email: Mapped[str] = mapped_column(
        String(EMAIL_MAX_LENGTH),
        unique=True,
        nullable=False,
        index=True,  # Index for fast authentication lookups
    )

    email_verified: Mapped[bool] = mapped_column(
        default=False,
        nullable=False,
    )

    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role", native_enum=True),
        nullable=False,
        index=True,  # Index for role-based queries
    )

    # Relationships (lazy loaded to avoid circular imports)
    organizations: Mapped[list["Organization"]] = relationship(
        "Organization",
        back_populates="owner",
        lazy="selectin",  # Eager load organizations with user
    )

    venues: Mapped[list["Venue"]] = relationship(
        "Venue",
        back_populates="owner",
        lazy="selectin",  # Eager load venues with user
    )

    # Table-level constraints and indexes
    __table_args__ = (
        # Student org users MUST use .edu email addresses
        CheckConstraint(
            "(role != 'student_org') OR (email LIKE '%@%.edu')",
            name="student_org_edu_email_check",
        ),
        # Composite index for common query patterns (optional, single column indexes may suffice)
        Index("ix_users_role_email", "role", "email"),
    )

    def __repr__(self) -> str:
        """String representation for debugging."""
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
