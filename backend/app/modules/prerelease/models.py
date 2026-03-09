"""Prerelease response model for interest form submissions.

Represents interest form submissions from potential users before launch.
This data is separate from core app data and used for pre-launch outreach.

Database constraints:
- Email indexed for lookup/duplicate checking
- Respondent type indexed for filtering
"""

from sqlalchemy import Enum, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel, TimestampMixin, UUIDMixin
from app.modules.prerelease.constants import RespondentType

# Constants for column constraints
NAME_MAX_LENGTH = 100
ORG_VENUE_NAME_MAX_LENGTH = 255
EMAIL_MAX_LENGTH = 255
PHONE_MAX_LENGTH = 50


class PrereleaseResponse(BaseModel, UUIDMixin, TimestampMixin):
    """
    Prerelease interest form submission.

    Captures interest from potential users (student organizations and venues)
    before the platform launches.

    Attributes:
        id: UUID primary key
        first_name: Respondent's first name
        last_name: Respondent's last name
        respondent_type: Whether respondent is a student org or venue
        org_or_venue_name: Name of the organization or venue they represent
        email: Contact email address
        phone: Optional phone number
        personal_note: Optional comments, questions, or concerns
        created_at: Submission timestamp (UTC)
        updated_at: Last modification timestamp (UTC)
    """

    __tablename__ = "prerelease_responses"

    first_name: Mapped[str] = mapped_column(
        String(NAME_MAX_LENGTH),
        nullable=False,
    )

    last_name: Mapped[str] = mapped_column(
        String(NAME_MAX_LENGTH),
        nullable=False,
    )

    respondent_type: Mapped[RespondentType] = mapped_column(
        Enum(RespondentType, name="respondent_type", native_enum=True),
        nullable=False,
        index=True,
    )

    org_or_venue_name: Mapped[str] = mapped_column(
        String(ORG_VENUE_NAME_MAX_LENGTH),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(EMAIL_MAX_LENGTH),
        nullable=False,
        index=True,
    )

    phone: Mapped[str | None] = mapped_column(
        String(PHONE_MAX_LENGTH),
        nullable=True,
    )

    personal_note: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    def __repr__(self) -> str:
        """String representation for debugging."""
        return (
            f"<PrereleaseResponse(id={self.id}, email={self.email}, "
            f"type={self.respondent_type}, org={self.org_or_venue_name})>"
        )
