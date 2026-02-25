"""Pydantic schemas for organization management API."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.core.constants.enums import OrganizationType
from app.modules.organizations.constants import (
    CONTACT_EMAIL_MAX_LENGTH,
    CONTACT_PHONE_MAX_LENGTH,
    DESCRIPTION_MAX_LENGTH,
    MEMBER_COUNT_MAX,
    MEMBER_COUNT_MIN,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    WEBSITE_URL_MAX_LENGTH,
)


class OrganizationBase(BaseModel):
    """Base organization schema with shared fields."""

    name: str = Field(
        ...,
        min_length=NAME_MIN_LENGTH,
        max_length=NAME_MAX_LENGTH,
    )
    type: OrganizationType
    university: str = Field(..., max_length=255)


class OrganizationUpdate(BaseModel):
    """Schema for updating an organization profile. All fields optional."""

    name: str | None = Field(
        None,
        min_length=NAME_MIN_LENGTH,
        max_length=NAME_MAX_LENGTH,
    )
    type: OrganizationType | None = None
    university: str | None = Field(None, max_length=255)
    description: str | None = Field(None, max_length=DESCRIPTION_MAX_LENGTH)
    contact_email: EmailStr | None = Field(None, max_length=CONTACT_EMAIL_MAX_LENGTH)
    contact_phone: str | None = Field(None, max_length=CONTACT_PHONE_MAX_LENGTH)
    member_count: int | None = Field(
        None,
        ge=MEMBER_COUNT_MIN,
        le=MEMBER_COUNT_MAX,
    )
    website_url: str | None = Field(None, max_length=WEBSITE_URL_MAX_LENGTH)


class OrganizationResponse(OrganizationBase):
    """Schema for organization responses with all profile fields."""

    id: UUID
    owner_id: UUID
    description: str | None = None
    contact_email: str | None = None
    contact_phone: str | None = None
    member_count: int | None = None
    website_url: str | None = None
    logo_url: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
