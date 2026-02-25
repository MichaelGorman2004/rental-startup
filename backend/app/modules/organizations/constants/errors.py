"""Error messages for organization management."""

from enum import Enum


class OrgError(str, Enum):
    """Organization-specific error messages."""

    NOT_FOUND = "Organization not found."
    NOT_OWNER = "You do not own this organization."
    STUDENT_ORG_REQUIRED = "Only student organization users can perform this action."
    NO_ORGANIZATION = "You do not have an organization."
