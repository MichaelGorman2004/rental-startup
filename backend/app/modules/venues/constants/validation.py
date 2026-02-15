"""Validation constants for venue management.

All validation constraints are defined here as constants to ensure consistency
across schema validation, business logic, and error messages. No magic numbers
allowed in the codebase.
"""

# Venue name constraints
NAME_MIN_LENGTH = 3
NAME_MAX_LENGTH = 100

# Capacity constraints (number of guests)
CAPACITY_MIN = 10
CAPACITY_MAX = 500

# Pricing constraints (in cents for precision)
BASE_PRICE_MIN_CENTS = 10000  # $100.00 minimum
BASE_PRICE_MAX_CENTS = 100000  # $1000.00 maximum

# Pagination defaults
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100
MIN_PAGE = 1

# Search constraints
SEARCH_MIN_LENGTH = 2
SEARCH_MAX_LENGTH = 100
