"""Organization constants barrel exports."""

from app.modules.organizations.constants.errors import OrgError
from app.modules.organizations.constants.validation import (
    CONTACT_EMAIL_MAX_LENGTH,
    CONTACT_PHONE_MAX_LENGTH,
    DEFAULT_PAGE_SIZE,
    DESCRIPTION_MAX_LENGTH,
    MAX_PAGE_SIZE,
    MEMBER_COUNT_MAX,
    MEMBER_COUNT_MIN,
    MIN_PAGE,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    WEBSITE_URL_MAX_LENGTH,
)

__all__ = [
    "OrgError",
    "NAME_MIN_LENGTH",
    "NAME_MAX_LENGTH",
    "DESCRIPTION_MAX_LENGTH",
    "CONTACT_EMAIL_MAX_LENGTH",
    "CONTACT_PHONE_MAX_LENGTH",
    "MEMBER_COUNT_MIN",
    "MEMBER_COUNT_MAX",
    "WEBSITE_URL_MAX_LENGTH",
    "DEFAULT_PAGE_SIZE",
    "MAX_PAGE_SIZE",
    "MIN_PAGE",
]
