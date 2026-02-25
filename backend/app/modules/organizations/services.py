"""Organization business logic layer (Service pattern)."""

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import UserRole
from app.modules.organizations.constants import OrgError
from app.modules.organizations.repository import OrganizationRepository
from app.modules.organizations.schemas import (
    OrganizationResponse,
    OrganizationUpdate,
)
from app.modules.users.models import User


class OrganizationService:
    """Service layer for organization business logic."""

    @staticmethod
    async def get_org_by_id(
        db: AsyncSession,
        org_id: UUID,
    ) -> OrganizationResponse:
        """Retrieve a single organization by ID."""
        org = await OrganizationRepository.get_by_id(db=db, org_id=org_id)

        if not org:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=OrgError.NOT_FOUND,
            )

        return OrganizationResponse.model_validate(org)

    @staticmethod
    async def get_my_org(
        db: AsyncSession,
        current_user: User,
    ) -> OrganizationResponse:
        """Retrieve the current user's organization (student_org only)."""
        if current_user.role != UserRole.student_org:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=OrgError.STUDENT_ORG_REQUIRED,
            )

        org = await OrganizationRepository.get_by_owner_id(
            db=db,
            owner_id=current_user.id,
        )

        if not org:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=OrgError.NO_ORGANIZATION,
            )

        return OrganizationResponse.model_validate(org)

    @staticmethod
    async def update_org(
        db: AsyncSession,
        org_id: UUID,
        update_data: OrganizationUpdate,
        current_user: User,
    ) -> OrganizationResponse:
        """Update an organization profile (owner only)."""
        org = await OrganizationRepository.get_by_id(db=db, org_id=org_id)

        if not org:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=OrgError.NOT_FOUND,
            )

        if org.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=OrgError.NOT_OWNER,
            )

        updated_org = await OrganizationRepository.update(
            db=db,
            org=org,
            update_data=update_data,
        )

        return OrganizationResponse.model_validate(updated_org)


organization_service = OrganizationService()
