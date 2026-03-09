"""Error messages for prerelease module."""

from enum import Enum


class PrereleaseError(str, Enum):
    """Prerelease-specific error messages."""

    SUBMISSION_FAILED = "Failed to submit interest form. Please try again."
