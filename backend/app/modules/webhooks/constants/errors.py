"""Error messages for webhook handling.

Centralized error messages following the pattern from other modules.
All error strings are defined here to prevent hardcoded strings in business logic.
"""

from enum import Enum


class WebhookError(str, Enum):
    """Webhook-specific error messages for consistent API responses."""

    # Verification errors
    INVALID_SIGNATURE = "Invalid webhook signature."

    # Processing errors
    MISSING_EMAIL = "User email not found in webhook payload."
    MISSING_ROLE = "User role not found in webhook metadata."
    INVALID_ROLE = "Invalid user role in webhook metadata."

    # Clerk API errors
    CLERK_SYNC_FAILED = "Failed to sync metadata to Clerk."
