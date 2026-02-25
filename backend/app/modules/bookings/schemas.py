"""Pydantic schemas for booking management API."""

from datetime import date, datetime, time
from uuid import UUID

from pydantic import BaseModel, Field

from app.core.constants.enums import BookingStatus
from app.modules.bookings.constants import DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE


class BookingResponse(BaseModel):
    """Schema for booking responses with related entity names."""

    id: UUID
    venue_id: UUID
    organization_id: UUID
    event_name: str
    event_date: date
    event_time: time
    guest_count: int
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
