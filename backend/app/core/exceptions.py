"""Custom domain exceptions for VenueLink.

Services raise these instead of FastAPI's HTTPException so that business
logic stays framework-agnostic and fully testable.  Exception handlers
registered in main.py convert them to HTTP responses.
"""


class VenueLinkError(Exception):
    """Base exception for all VenueLink domain errors."""

    def __init__(self, message: str, code: str) -> None:
        self.message = message
        self.code = code
        super().__init__(message)


class ResourceNotFoundError(VenueLinkError):
    """Raised when a requested resource does not exist."""

    def __init__(self, resource: str, detail: str) -> None:
        super().__init__(f"{resource}: {detail}", "NOT_FOUND")


class AuthorizationError(VenueLinkError):
    """Raised when the user lacks permission to perform an action."""

    def __init__(self, message: str) -> None:
        super().__init__(message, "FORBIDDEN")


class BusinessRuleError(VenueLinkError):
    """Raised when a business rule constraint is violated."""

    def __init__(self, message: str) -> None:
        super().__init__(message, "BUSINESS_RULE_VIOLATION")


class ConflictError(VenueLinkError):
    """Raised when an action conflicts with existing state."""

    def __init__(self, message: str) -> None:
        super().__init__(message, "CONFLICT")
