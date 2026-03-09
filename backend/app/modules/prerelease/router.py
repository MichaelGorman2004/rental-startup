"""Prerelease interest form API endpoints.

Public endpoints for collecting interest before platform launch.
No authentication required.
"""

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.modules.prerelease.schemas import PrereleaseCreate, PrereleaseResponseSchema
from app.modules.prerelease.services import prerelease_service

router = APIRouter(prefix="/prerelease", tags=["Prerelease"])


@router.post(
    "/interest",
    response_model=PrereleaseResponseSchema,
    status_code=status.HTTP_201_CREATED,
    summary="Submit prerelease interest form",
)
async def submit_interest(
    data: PrereleaseCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> PrereleaseResponseSchema:
    """
    Submit interest in VenueLink before launch.

    Public endpoint - no authentication required.
    Collects contact information from potential users
    (student organizations and venue owners).
    """
    return await prerelease_service.submit_interest(db=db, data=data)
