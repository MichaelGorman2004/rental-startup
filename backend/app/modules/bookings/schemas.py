"""Pydantic schemas for booking management API."""

from datetime import UTC, date, datetime, time
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, Field, field_validator, model_validator

from app.core.constants.enums import BookingStatus
from app.modules.bookings.constants import (
    DEFAULT_PAGE_SIZE,
    EVENT_DURATION_MAX_MINUTES,
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

    @field_validator("event_date")
    @classmethod
    def event_date_not_in_past(cls, v: date) -> date:
        """Ensure event date is not in the past (same-day bookings allowed)."""
        if v < datetime.now(tz=UTC).date():
            msg = "Event date must not be in the past"
            raise ValueError(msg)
        return v

    @model_validator(mode="after")
    def validate_time_range(self) -> "BookingCreate":
        """Validate end > start and duration is within allowed range."""
        if self.event_end_time <= self.event_start_time:
            msg = "Event end time must be after start time."
            raise ValueError(msg)
        start_mins = self.event_start_time.hour * 60 + self.event_start_time.minute
        end_mins = self.event_end_time.hour * 60 + self.event_end_time.minute
        duration = end_mins - start_mins
        if duration < EVENT_DURATION_MIN_MINUTES:
            msg = f"Event must be at least {EVENT_DURATION_MIN_MINUTES} minutes."
            raise ValueError(msg)
        if duration > EVENT_DURATION_MAX_MINUTES:
            msg = f"Event must not exceed {EVENT_DURATION_MAX_MINUTES} minutes."
            raise ValueError(msg)
        return self


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


class BookingSummaryResponse(BaseModel):
    """Schema for org booking summary stats (dashboard)."""

    upcoming_events_count: int = Field(..., ge=0)
    total_bookings: int = Field(..., ge=0)
    budget_used_cents: int = Field(..., ge=0)


class BookingFilters(BaseModel):
    """Schema for booking filtering and pagination query parameters."""

    status: BookingStatus | None = None
    from_date: date | None = None
    sort_by: Literal["event_date"] | None = None
    page: int = Field(MIN_PAGE, ge=MIN_PAGE)
    page_size: int = Field(DEFAULT_PAGE_SIZE, ge=1, le=MAX_PAGE_SIZE)
