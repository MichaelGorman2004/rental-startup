"""Validation constants for organization management."""

# Organization name constraints
NAME_MIN_LENGTH = 2
NAME_MAX_LENGTH = 255

# Description constraints
DESCRIPTION_MAX_LENGTH = 2000

# Contact constraints
CONTACT_EMAIL_MAX_LENGTH = 255
CONTACT_PHONE_MAX_LENGTH = 50

# URL constraints
WEBSITE_URL_MAX_LENGTH = 500

# Member count constraints
MEMBER_COUNT_MIN = 1
MEMBER_COUNT_MAX = 100000

# Pagination defaults
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100
MIN_PAGE = 1
