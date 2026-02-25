"""Error messages for booking management."""

from enum import Enum


class BookingError(str, Enum):
    """Booking-specific error messages."""

    NOT_FOUND = "Booking not found."
    NOT_ORG_OWNER = "You do not own the organization for this booking."
    CANNOT_CANCEL_STATUS = "Only pending or confirmed bookings can be cancelled."
    NO_ORGANIZATION = "You do not have an organization."
    STUDENT_ORG_REQUIRED = "Only student organization users can access bookings."
