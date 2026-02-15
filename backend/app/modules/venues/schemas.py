"""Pydantic schemas for venue management API.

Defines request and response models with comprehensive validation.
Follows the pattern: Base → Create/Update → Response hierarchy.
"""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field, field_validator

from app.core.constants.enums import VenueType
from app.modules.venues.constants import (
    BASE_PRICE_MAX_CENTS,
    BASE_PRICE_MIN_CENTS,
    CAPACITY_MAX,
    CAPACITY_MIN,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    SEARCH_MAX_LENGTH,
    SEARCH_MIN_LENGTH,
)


class VenueBase(BaseModel):
    """Base venue schema with shared fields."""

    name: str = Field(
        ...,
        min_length=NAME_MIN_LENGTH,
        max_length=NAME_MAX_LENGTH,
        description="Venue name (e.g., 'The Corner Pub')",
    )
    type: VenueType = Field(
        ...,
        description="Venue category (bar, restaurant, event_space, cafe)",
    )
    capacity: int = Field(
        ...,
        ge=CAPACITY_MIN,
        le=CAPACITY_MAX,
        description=f"Maximum guest capacity ({CAPACITY_MIN}-{CAPACITY_MAX})",
    )
    base_price_cents: int = Field(
        ...,
        ge=BASE_PRICE_MIN_CENTS,
        le=BASE_PRICE_MAX_CENTS,
        description=(
            f"Base price in cents " f"(${BASE_PRICE_MIN_CENTS//100}-${BASE_PRICE_MAX_CENTS//100})"
        ),
    )
    address_street: str = Field(
        ...,
        max_length=255,
        description="Street address",
    )
    address_city: str = Field(
        ...,
        max_length=100,
        description="City",
    )
    address_state: str = Field(
        ...,
        min_length=2,
        max_length=2,
        description="Two-letter state code (e.g., CA, NY)",
    )
    address_zip: str = Field(
        ...,
        max_length=10,
        description="ZIP code",
    )

    @field_validator("address_state")
    @classmethod
    def validate_state_code(cls, v: str | None) -> str | None:
        """Ensure state code is uppercase if provided."""
        if v is not None:
            return v.upper()
        return v


class VenueCreate(VenueBase):
    """Schema for creating a new venue.

    Inherits all fields from VenueBase. Owner is set from authenticated user.
    """


class VenueUpdate(BaseModel):
    """Schema for updating an existing venue.

    All fields are optional to support partial updates (PATCH).
    Only provided fields will be updated.
    """

    name: str | None = Field(
        None,
        min_length=NAME_MIN_LENGTH,
        max_length=NAME_MAX_LENGTH,
    )
    type: VenueType | None = None
    capacity: int | None = Field(
        None,
        ge=CAPACITY_MIN,
        le=CAPACITY_MAX,
    )
    base_price_cents: int | None = Field(
        None,
        ge=BASE_PRICE_MIN_CENTS,
        le=BASE_PRICE_MAX_CENTS,
    )
    address_street: str | None = Field(None, max_length=255)
    address_city: str | None = Field(None, max_length=100)
    address_state: str | None = Field(None, min_length=2, max_length=2)
    address_zip: str | None = Field(None, max_length=10)

    @field_validator("address_state")
    @classmethod
    def validate_state_code(cls, v: str | None) -> str | None:
        """Ensure state code is uppercase if provided."""
        if v is not None:
            return v.upper()
        return v


class VenueResponse(VenueBase):
    """Schema for venue responses.

    Includes all base fields plus metadata (id, timestamps, owner).
    """

    id: UUID
    owner_id: UUID
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None

    model_config = {"from_attributes": True}


class VenueListResponse(BaseModel):
    """Schema for paginated venue list responses."""

    items: list[VenueResponse]
    total: int = Field(..., description="Total number of venues matching filters")
    page: int = Field(..., ge=MIN_PAGE, description="Current page number")
    page_size: int = Field(..., ge=1, le=MAX_PAGE_SIZE, description="Items per page")
    total_pages: int = Field(..., description="Total number of pages")


class VenueFilters(BaseModel):
    """Schema for venue filtering and pagination query parameters."""

    type: VenueType | None = Field(
        None,
        description="Filter by venue type",
    )
    min_capacity: int | None = Field(
        None,
        ge=CAPACITY_MIN,
        description=f"Minimum capacity (>= {CAPACITY_MIN})",
    )
    max_capacity: int | None = Field(
        None,
        le=CAPACITY_MAX,
        description=f"Maximum capacity (<= {CAPACITY_MAX})",
    )
    max_price_cents: int | None = Field(
        None,
        ge=0,
        description="Maximum price in cents",
    )
    search: str | None = Field(
        None,
        min_length=SEARCH_MIN_LENGTH,
        max_length=SEARCH_MAX_LENGTH,
        description="Search venue name and address (case-insensitive)",
    )
    page: int = Field(
        MIN_PAGE,
        ge=MIN_PAGE,
        description="Page number (1-indexed)",
    )
    page_size: int = Field(
        DEFAULT_PAGE_SIZE,
        ge=1,
        le=MAX_PAGE_SIZE,
        description=f"Items per page (max {MAX_PAGE_SIZE})",
    )
