"""Authentication constants and error messages."""

from enum import Enum

# Student email validation
STUDENT_EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.edu$"

# JWT Claims
CLERK_ISSUER = "https://clerk.venuelink.com"  # Placeholder, should be env var
ROLE_CLAIM_KEY = "org_role"  # Key in JWT metadata

class AuthError(str, Enum):
    """Authentication error messages."""
    INVALID_TOKEN = "Invalid authentication token."  # noqa: S105
    EXPIRED_TOKEN = "Authentication token has expired."  # noqa: S105
    INVALID_HEADER = "Invalid authentication header."
    USER_NOT_FOUND = "User not found."
    EMAIL_REQUIRED = "Email is required in token claims."
    INVALID_ROLE = "Invalid user role."
    STUDENT_EMAIL_REQUIRED = "Student organizations must use a .edu email address."
    FORBIDDEN = "You do not have permission to access this resource."
