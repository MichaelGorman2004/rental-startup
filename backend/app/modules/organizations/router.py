"""Organization management API endpoints."""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.organizations.schemas import (
    OrganizationCreate,
    OrganizationResponse,
    OrganizationUpdate,
)
from app.modules.organizations.services import organization_service
from app.modules.users.models import User

router = APIRouter(prefix="/organizations", tags=["Organizations"])


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=OrganizationResponse,
    summary="Create organization profile",
)
async def create_organization(
    create_data: OrganizationCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> OrganizationResponse:
    """Create a new organization for the current user (student_org only)."""
    return await organization_service.create_org(
        db=db,
        create_data=create_data,
        current_user=current_user,
    )


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
    current_user: Annotated[User, Depends(get_current_user)],
) -> OrganizationResponse:
    """Get a single organization by ID (owner only)."""
    return await organization_service.get_org_by_id(
        db=db,
        org_id=org_id,
        current_user=current_user,
    )


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


@router.post(
    "/{org_id}/logo",
    response_model=OrganizationResponse,
    summary="Upload organization logo",
)
async def upload_organization_logo(
    org_id: UUID,
    file: UploadFile,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> OrganizationResponse:
    """Upload a logo image for an organization (owner only)."""
    return await organization_service.upload_logo(
        db=db,
        org_id=org_id,
        file=file,
        current_user=current_user,
    )
