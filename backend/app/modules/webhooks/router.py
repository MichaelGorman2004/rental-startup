"""Webhook router for handling external service callbacks."""

import httpx
from fastapi import APIRouter, HTTPException, Request, status
from svix.webhooks import Webhook, WebhookVerificationError

from app.core.config import settings
from app.modules.webhooks.schemas import ClerkWebhookEvent

router = APIRouter(prefix="/clerk", tags=["Webhooks"])

# Clerk API constants
CLERK_API_BASE = "https://api.clerk.com/v1"
CLERK_EVENT_USER_CREATED = "user.created"


async def sync_role_to_public_metadata(user_id: str, role: str) -> None:
    """
    Sync role from unsafeMetadata to publicMetadata via Clerk Backend API.

    Args:
        user_id: Clerk user ID.
        role: Role value to set in publicMetadata.
    """
    async with httpx.AsyncClient() as client:
        response = await client.patch(
            f"{CLERK_API_BASE}/users/{user_id}/metadata",
            headers={
                "Authorization": f"Bearer {settings.CLERK_SECRET_KEY}",
                "Content-Type": "application/json",
            },
            json={"public_metadata": {"role": role}},
        )
        response.raise_for_status()


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def handle_clerk_webhook(request: Request) -> None:
    """
    Handle Clerk webhook events.

    Listens for user.created events and syncs the role from
    unsafeMetadata to publicMetadata.
    """
    # Verify webhook signature (raw body required for cryptographic verification)
    payload = await request.body()
    headers = dict(request.headers)

    try:
        wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
        verified_payload = wh.verify(payload, headers)
    except WebhookVerificationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid webhook signature.",
        ) from e

    # Parse and validate payload
    event = ClerkWebhookEvent.model_validate(verified_payload)

    # Handle user.created event
    if event.type == CLERK_EVENT_USER_CREATED:
        role = event.data.unsafe_metadata.get("role")
        if role:
            await sync_role_to_public_metadata(event.data.id, role)
