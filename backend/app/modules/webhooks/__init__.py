"""Webhook handlers for external service integrations.

This module handles incoming webhooks from:
- Clerk: User authentication events (user.created, etc.)
"""

from app.modules.webhooks.router import router

__all__ = ["router"]
