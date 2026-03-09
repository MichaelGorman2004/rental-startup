"""Prerelease-specific enumerations.

All enums inherit from str to enable:
1. JSON serialization in FastAPI responses
2. Direct comparison with string values
3. Synchronization with PostgreSQL ENUM types
"""

from enum import Enum as PyEnum


class RespondentType(str, PyEnum):
    """
    Type of prerelease interest respondent.

    Attributes:
        student_org: College student organization interested in booking venues
        venue: Rental venue interested in listing on the platform
    """

    student_org = "student_org"
    venue = "venue"
