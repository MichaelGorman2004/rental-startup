"""Pydantic schemas for prerelease interest form API."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.modules.prerelease.constants import (
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    NOTE_MAX_LENGTH,
    ORG_VENUE_NAME_MAX_LENGTH,
    ORG_VENUE_NAME_MIN_LENGTH,
    PHONE_MAX_LENGTH,
    RespondentType,
)


class PrereleaseCreate(BaseModel):
    """Schema for submitting prerelease interest form."""

    first_name: str = Field(
        ...,
        min_length=NAME_MIN_LENGTH,
        max_length=NAME_MAX_LENGTH,
        description="Respondent's first name",
    )
    last_name: str = Field(
        ...,
        min_length=NAME_MIN_LENGTH,
        max_length=NAME_MAX_LENGTH,
        description="Respondent's last name",
    )
    respondent_type: RespondentType = Field(
        ...,
        description="Whether respondent is a student org or venue",
    )
    org_or_venue_name: str = Field(
        ...,
        min_length=ORG_VENUE_NAME_MIN_LENGTH,
        max_length=ORG_VENUE_NAME_MAX_LENGTH,
        description="Name of the organization or venue they represent",
    )
    email: EmailStr = Field(
        ...,
        description="Contact email address",
    )
    phone: str | None = Field(
        None,
        max_length=PHONE_MAX_LENGTH,
        description="Optional phone number",
    )
    personal_note: str | None = Field(
        None,
        max_length=NOTE_MAX_LENGTH,
        description="Optional comments, questions, or concerns",
    )


class PrereleaseResponseSchema(BaseModel):
    """Schema for prerelease form submission response."""

    id: UUID
    first_name: str
    last_name: str
    respondent_type: RespondentType
    org_or_venue_name: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}
