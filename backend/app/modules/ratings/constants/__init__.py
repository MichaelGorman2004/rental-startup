"""Rating constants barrel exports."""

from app.modules.ratings.constants.errors import RATING_RESOURCE, RatingError
from app.modules.ratings.constants.validation import (
    COMMENT_MAX_LENGTH,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    SCORE_MAX,
    SCORE_MIN,
)

__all__ = [
    "RATING_RESOURCE",
    "RatingError",
    "SCORE_MIN",
    "SCORE_MAX",
    "COMMENT_MAX_LENGTH",
    "DEFAULT_PAGE_SIZE",
    "MAX_PAGE_SIZE",
    "MIN_PAGE",
]
