"""Pydantic schemas for booking management API."""

from datetime import date, datetime, time
from uuid import UUID

from pydantic import BaseModel, Field

from app.core.constants.enums import BookingStatus
from app.modules.bookings.constants import (
    DEFAULT_PAGE_SIZE,
    EVENT_DURATION_MIN_MINUTES,
    EVENT_NAME_MAX_LENGTH,
    EVENT_NAME_MIN_LENGTH,
    GUEST_COUNT_MIN,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    SPECIAL_REQUESTS_MAX_LENGTH,
)


class BookingCreate(BaseModel):
    """Schema for creating a new booking request."""

    venue_id: UUID
    event_name: str = Field(
        ...,
        min_length=EVENT_NAME_MIN_LENGTH,
        max_length=EVENT_NAME_MAX_LENGTH,
    )
    event_date: date
    event_start_time: time
    event_end_time: time
    guest_count: int = Field(..., ge=GUEST_COUNT_MIN)
    special_requests: str | None = Field(
        default=None,
        max_length=SPECIAL_REQUESTS_MAX_LENGTH,
    )


class BookingResponse(BaseModel):
    """Schema for booking responses with related entity names."""

    id: UUID
    venue_id: UUID
    organization_id: UUID
    event_name: str
    event_date: date
    event_start_time: time
    event_end_time: time
    event_duration_minutes: int = Field(..., ge=EVENT_DURATION_MIN_MINUTES)
    guest_count: int = Field(..., ge=GUEST_COUNT_MIN)
    status: BookingStatus
    special_requests: str | None = None
    created_at: datetime
    updated_at: datetime
    venue_name: str = ""
    organization_name: str = ""

    model_config = {"from_attributes": True}


class BookingListResponse(BaseModel):
    """Schema for paginated booking list responses."""

    items: list[BookingResponse]
    total: int
    page: int = Field(..., ge=MIN_PAGE)
    page_size: int = Field(..., ge=1, le=MAX_PAGE_SIZE)
    total_pages: int


class BookingFilters(BaseModel):
    """Schema for booking filtering and pagination query parameters."""

    status: BookingStatus | None = None
    page: int = Field(MIN_PAGE, ge=MIN_PAGE)
    page_size: int = Field(DEFAULT_PAGE_SIZE, ge=1, le=MAX_PAGE_SIZE)
