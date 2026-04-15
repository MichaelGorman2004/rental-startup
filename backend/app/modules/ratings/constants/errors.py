"""Error messages for rating management."""

from enum import Enum

RATING_RESOURCE = "Rating"


class RatingError(str, Enum):
    """Rating-specific error messages."""

    NOT_FOUND = "Rating not found."
    BOOKING_NOT_FOUND = "Booking not found."
    BOOKING_NOT_COMPLETED = "Only completed bookings can be rated."
    NOT_BOOKING_OWNER = "You do not own this booking."
    ALREADY_RATED = "This booking has already been rated."
    STUDENT_ORG_REQUIRED = "Only student organization users can rate venues."
    NO_ORGANIZATION = "You do not have an organization."
    VENUE_NOT_FOUND = "Venue not found."
