"""FastAPI dependencies for venue endpoints.

Dependencies handle cross-cutting concerns like authentication, authorization,
and request validation. They can be composed for complex requirements.
"""

from typing import Annotated

from fastapi import Depends, Query

from app.core.constants.enums import UserRole, VenueType
from app.modules.auth.dependencies import require_role
from app.modules.users.models import User
from app.modules.venues.constants import DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE
from app.modules.venues.schemas import VenueFilters

# Create venue admin dependency using role factory
get_venue_admin = Annotated[User, Depends(require_role(UserRole.venue_admin))]


def parse_venue_filters(  # noqa: PLR0913
    venue_type: Annotated[VenueType | None, Query(alias="type")] = None,
    min_capacity: Annotated[int | None, Query(ge=1)] = None,
    max_capacity: Annotated[int | None, Query(ge=1)] = None,
    max_price_cents: Annotated[int | None, Query(ge=0)] = None,
    search: Annotated[str | None, Query()] = None,
    page: Annotated[int, Query(ge=MIN_PAGE)] = MIN_PAGE,
    page_size: Annotated[int, Query(ge=1, le=MAX_PAGE_SIZE)] = DEFAULT_PAGE_SIZE,
) -> VenueFilters:
    """
    Parse and validate venue filtering query parameters.

    Args:
        venue_type: Filter by venue type
        min_capacity: Minimum capacity filter
        max_capacity: Maximum capacity filter
        max_price_cents: Maximum price filter (in cents)
        search: Search query for name/address
        page: Page number (1-indexed)
        page_size: Items per page

    Returns:
        Validated VenueFilters object
    """
    return VenueFilters(
        type=venue_type,
        min_capacity=min_capacity,
        max_capacity=max_capacity,
        max_price_cents=max_price_cents,
        search=search,
        page=page,
        page_size=page_size,
    )
