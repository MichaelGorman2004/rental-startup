"""Pydantic schemas for rating management API."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.modules.ratings.constants import (
    COMMENT_MAX_LENGTH,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    SCORE_MAX,
    SCORE_MIN,
)


class RatingCreate(BaseModel):
    """Schema for creating a new rating."""

    score: int = Field(
        ...,
        ge=SCORE_MIN,
        le=SCORE_MAX,
        description=f"Rating score ({SCORE_MIN}-{SCORE_MAX})",
    )
    comment: str | None = Field(
        default=None,
        max_length=COMMENT_MAX_LENGTH,
        description=f"Optional review comment (max {COMMENT_MAX_LENGTH} chars)",
    )


class RatingResponse(BaseModel):
    """Schema for rating responses."""

    id: UUID
    booking_id: UUID
    organization_id: UUID
    venue_id: UUID
    score: int
    comment: str | None = None
    created_at: datetime
    organization_name: str = ""

    model_config = {"from_attributes": True}


class RatingListResponse(BaseModel):
    """Schema for paginated rating list responses."""

    items: list[RatingResponse]
    total: int
    page: int = Field(..., ge=MIN_PAGE)
    page_size: int = Field(..., ge=1, le=MAX_PAGE_SIZE)
    total_pages: int


class RatingFilters(BaseModel):
    """Schema for rating filtering and pagination query parameters."""

    page: int = Field(MIN_PAGE, ge=MIN_PAGE)
    page_size: int = Field(DEFAULT_PAGE_SIZE, ge=1, le=MAX_PAGE_SIZE)
