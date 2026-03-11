"""Webhook router for handling external service callbacks.

Thin controller layer - delegates all business logic to services.
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from svix.webhooks import Webhook, WebhookVerificationError

from app.core.config import settings
from app.core.database.session import get_db
from app.modules.webhooks.constants import EVENT_USER_CREATED, WebhookError
from app.modules.webhooks.schemas import ClerkWebhookEvent
from app.modules.webhooks.services import webhook_service

router = APIRouter(prefix="/clerk", tags=["Webhooks"])


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def handle_clerk_webhook(
    request: Request,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> None:
    """
    Handle Clerk webhook events.

    Listens for user.created events and delegates to service layer.
    """
    # Verify webhook signature
    payload = await request.body()
    headers = dict(request.headers)

    try:
        wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
        verified_payload = wh.verify(payload, headers)
    except WebhookVerificationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=WebhookError.INVALID_SIGNATURE,
        ) from e

    # Parse and validate payload
    event = ClerkWebhookEvent.model_validate(verified_payload)

    # Delegate to service layer (all business logic there)
    if event.type == EVENT_USER_CREATED:
        await webhook_service.handle_user_created(db, event.data)
