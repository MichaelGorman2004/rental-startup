"""Error messages for venue management.

Centralized error messages following the pattern from auth module.
All error strings are defined here to prevent hardcoded strings in business logic.
"""

from enum import Enum


class VenueError(str, Enum):
    """Venue-specific error messages for consistent API responses."""

    # Not found errors
    VENUE_NOT_FOUND = "Venue not found."
    VENUE_ALREADY_DELETED = "Venue has already been deleted."

    # Authorization errors
    NOT_VENUE_OWNER = "You do not own this venue."
    VENUE_ADMIN_REQUIRED = "Only venue administrators can perform this action."

    # Validation errors
    INVALID_CAPACITY = "Capacity must be between {min} and {max}."
    INVALID_PRICE = "Price must be between ${min} and ${max}."
    INVALID_VENUE_TYPE = "Invalid venue type."
    INVALID_PAGE_SIZE = "Page size must be between 1 and {max}."
    INVALID_PAGE = "Page must be at least 1."
    SEARCH_TOO_SHORT = "Search query must be at least {min} characters."

    # Business logic errors
    CANNOT_UPDATE_DELETED = "Cannot update a deleted venue."
    CANNOT_DELETE_DELETED = "Cannot delete a venue that is already deleted."
