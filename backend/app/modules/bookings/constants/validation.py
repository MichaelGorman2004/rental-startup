"""Validation constants for booking management."""

# Event name constraints
EVENT_NAME_MIN_LENGTH = 3
EVENT_NAME_MAX_LENGTH = 100

# Guest count constraints
GUEST_COUNT_MIN = 10

# Event duration constraints (in minutes)
EVENT_DURATION_MIN_MINUTES = 30
EVENT_DURATION_MAX_MINUTES = 720  # 12 hours

# Special requests constraints
SPECIAL_REQUESTS_MAX_LENGTH = 500

# Pagination defaults
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100
MIN_PAGE = 1
