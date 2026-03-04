"""Pydantic schemas for webhook payloads."""

from pydantic import BaseModel, Field


class ClerkUserData(BaseModel):
    """User data from Clerk webhook payload."""

    id: str
    unsafe_metadata: dict[str, str] = Field(default_factory=dict)


class ClerkWebhookEvent(BaseModel):
    """Clerk webhook event payload structure."""

    type: str
    data: ClerkUserData
