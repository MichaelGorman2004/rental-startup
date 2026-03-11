"""Clerk API constants for webhook handling.

Centralized constants for Clerk integration to prevent magic strings.
"""

# Clerk API configuration
CLERK_API_BASE = "https://api.clerk.com/v1"

# Webhook event types
EVENT_USER_CREATED = "user.created"

# Metadata keys
ROLE_METADATA_KEY = "role"
ORG_NAME_METADATA_KEY = "orgName"
