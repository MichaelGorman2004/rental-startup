"""Pydantic schemas for webhook payloads.

These schemas validate incoming webhook payloads from external services.
Only required fields are defined - optional fields are ignored.
"""

from pydantic import BaseModel, Field


class ClerkEmailAddress(BaseModel):
    """Email address object from Clerk webhook payload."""

    email_address: str


class ClerkUserData(BaseModel):
    """User data from Clerk webhook payload.

    Attributes:
        id: Clerk user ID (external identifier).
        email_addresses: List of user's email addresses.
        unsafe_metadata: Custom metadata set during signup (contains role).
    """

    id: str
    email_addresses: list[ClerkEmailAddress] = Field(default_factory=list)
    unsafe_metadata: dict[str, str] = Field(default_factory=dict)

    @property
    def primary_email(self) -> str | None:
        """Get the primary (first) email address."""
        if self.email_addresses:
            return self.email_addresses[0].email_address
        return None


class ClerkWebhookEvent(BaseModel):
    """Clerk webhook event payload structure.

    Attributes:
        type: Event type (e.g., 'user.created').
        data: Event-specific data payload.
    """

    type: str
    data: ClerkUserData
