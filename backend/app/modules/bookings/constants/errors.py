"""Error messages for booking management."""

from enum import Enum


class BookingError(str, Enum):
    """Booking-specific error messages."""

    NOT_FOUND = "Booking not found."
    NOT_ORG_OWNER = "You do not own the organization for this booking."
    NOT_VENUE_OWNER = "You do not own the venue for this booking."
    CANNOT_CANCEL_STATUS = "Only pending or confirmed bookings can be cancelled."
    CANNOT_ACCEPT_STATUS = "Only pending bookings can be accepted."
    CANNOT_DECLINE_STATUS = "Only pending bookings can be declined."
    NO_ORGANIZATION = "You do not have an organization."
    STUDENT_ORG_REQUIRED = "Only student organization users can access bookings."
    VENUE_ADMIN_REQUIRED = "Only venue administrators can perform this action."
    VENUE_NOT_FOUND = "Venue not found."
    TIME_CONFLICT = "This time slot conflicts with an existing booking."
    END_BEFORE_START = "Event end time must be after start time."
