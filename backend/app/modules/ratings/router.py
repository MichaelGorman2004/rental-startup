"""Rating management API endpoints."""

from typing import Annotated

from fastapi import APIRouter, Query

from app.modules.ratings.constants import DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE
from app.modules.ratings.schemas import (
    RatingFilters,
)

router = APIRouter(prefix="/ratings", tags=["Ratings"])


def parse_rating_filters(
    page: Annotated[int, Query(ge=MIN_PAGE)] = MIN_PAGE,
    page_size: Annotated[int, Query(ge=1, le=MAX_PAGE_SIZE)] = DEFAULT_PAGE_SIZE,
) -> RatingFilters:
    """Parse and validate rating filtering query parameters."""
    return RatingFilters(
        page=page,
        page_size=page_size,
    )
