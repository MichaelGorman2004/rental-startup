"""Application-wide enumerations for type-safe domain modeling.

All enums inherit from str to enable:
1. JSON serialization in FastAPI responses
2. Direct comparison with string values
3. Synchronization with PostgreSQL ENUM types

These Python enums are the single source of truth. The database ENUM types
are created by Alembic migrations to match these definitions.
"""

from enum import Enum as PyEnum


class UserRole(str, PyEnum):
    """
    User role types for role-based access control (RBAC).

    Attributes:
        student_org: College student organization administrator
        venue_admin: Venue owner/manager with listing management permissions
    """

    student_org = "student_org"
    venue_admin = "venue_admin"


class OrganizationType(str, PyEnum):
    """
    Classification of student organizations.

    Used for filtering and categorization in search/discovery features.

    Attributes:
        fraternity: Greek life - fraternity
        sorority: Greek life - sorority
        club: General student club or special interest group
        other: Other organization types not covered above
    """

    fraternity = "fraternity"
    sorority = "sorority"
    club = "club"
    other = "other"


class VenueType(str, PyEnum):
    """
    Venue category classification.

    Used for filtering venue searches and setting default attributes.

    Attributes:
        bar: Bar or pub with alcohol service
        restaurant: Restaurant with food service
        event_space: Dedicated event or conference space
        cafe: Coffee shop or cafe
    """

    bar = "bar"
    restaurant = "restaurant"
    event_space = "event_space"
    cafe = "cafe"


class BookingStatus(str, PyEnum):
    """
    Booking lifecycle states for workflow management.

    State transitions:
        pending -> confirmed (venue accepts)
        pending -> rejected (venue declines)
        confirmed -> completed (event occurs successfully)
        confirmed -> cancelled (either party cancels)
        pending -> cancelled (organization cancels before confirmation)

    Attributes:
        pending: Booking request submitted, awaiting venue approval
        confirmed: Venue has accepted the booking
        rejected: Venue has declined the booking
        completed: Event has occurred successfully
        cancelled: Booking cancelled by either party
    """

    pending = "pending"
    confirmed = "confirmed"
    rejected = "rejected"
    completed = "completed"
    cancelled = "cancelled"
