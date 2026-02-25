"""Organization management API endpoints."""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.organizations.schemas import OrganizationResponse, OrganizationUpdate
from app.modules.organizations.services import organization_service
from app.modules.users.models import User

router = APIRouter(prefix="/organizations", tags=["Organizations"])


@router.get(
    "/me",
    response_model=OrganizationResponse,
    summary="Get current user's organization",
)
async def get_my_organization(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> OrganizationResponse:
    """Get the authenticated user's organization."""
    return await organization_service.get_my_org(
        db=db,
        current_user=current_user,
    )


@router.get(
    "/{org_id}",
    response_model=OrganizationResponse,
    summary="Get organization by ID",
)
async def get_organization(
    org_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    _current_user: Annotated[User, Depends(get_current_user)],
) -> OrganizationResponse:
    """Get a single organization by ID."""
    return await organization_service.get_org_by_id(db=db, org_id=org_id)


@router.patch(
    "/{org_id}",
    response_model=OrganizationResponse,
    summary="Update organization profile",
)
async def update_organization(
    org_id: UUID,
    update_data: OrganizationUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> OrganizationResponse:
    """Update an organization profile (owner only)."""
    return await organization_service.update_org(
        db=db,
        org_id=org_id,
        update_data=update_data,
        current_user=current_user,
    )
