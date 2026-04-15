"""Organization business logic layer (Service pattern)."""

from uuid import UUID

from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import UserRole
from app.core.exceptions import AuthorizationError, ConflictError, ResourceNotFoundError
from app.core.uploads import save_upload
from app.modules.organizations.constants import OrgError
from app.modules.organizations.models import Organization
from app.modules.organizations.repository import OrganizationRepository
from app.modules.organizations.schemas import (
    OrganizationCreate,
    OrganizationResponse,
    OrganizationUpdate,
)
from app.modules.users.models import User

ORG_RESOURCE = "Organization"
ORG_UPLOAD_SUBFOLDER = "organizations"


async def _require_org_owner(
    db: AsyncSession,
    org_id: UUID,
    user_id: UUID,
) -> Organization:
    """Fetch org by ID, raise 404 if missing, raise 403 if not owner."""
    org = await OrganizationRepository.get_by_id(db=db, org_id=org_id)
    if not org:
        raise ResourceNotFoundError(ORG_RESOURCE, OrgError.NOT_FOUND)
    if org.owner_id != user_id:
        raise AuthorizationError(OrgError.NOT_OWNER)
    return org


class OrganizationService:
    """Service layer for organization business logic."""

    @staticmethod
    async def create_org(
        db: AsyncSession,
        create_data: OrganizationCreate,
        current_user: User,
    ) -> OrganizationResponse:
        """Create a new organization for the current user (student_org only)."""
        if current_user.role != UserRole.student_org:
            raise AuthorizationError(OrgError.STUDENT_ORG_REQUIRED)

        existing = await OrganizationRepository.get_by_owner_id(db, current_user.id)
        if existing:
            raise ConflictError(OrgError.ALREADY_HAS_ORGANIZATION)

        org = await OrganizationRepository.create(
            db=db,
            name=create_data.name,
            owner_id=current_user.id,
            org_type=create_data.type,
            university=create_data.university,
        )
        return OrganizationResponse.model_validate(org)

    @staticmethod
    async def get_org_by_id(
        db: AsyncSession,
        org_id: UUID,
        current_user: User,
    ) -> OrganizationResponse:
        """Retrieve a single organization by ID (owner only)."""
        org = await _require_org_owner(db, org_id, current_user.id)
        return OrganizationResponse.model_validate(org)

    @staticmethod
    async def get_my_org(
        db: AsyncSession,
        current_user: User,
    ) -> OrganizationResponse:
        """Retrieve the current user's organization (student_org only)."""
        if current_user.role != UserRole.student_org:
            raise AuthorizationError(OrgError.STUDENT_ORG_REQUIRED)

        org = await OrganizationRepository.get_by_owner_id(
            db=db,
            owner_id=current_user.id,
        )

        if not org:
            raise ResourceNotFoundError(ORG_RESOURCE, OrgError.NO_ORGANIZATION)

        return OrganizationResponse.model_validate(org)

    @staticmethod
    async def update_org(
        db: AsyncSession,
        org_id: UUID,
        update_data: OrganizationUpdate,
        current_user: User,
    ) -> OrganizationResponse:
        """Update an organization profile (owner only)."""
        org = await _require_org_owner(db, org_id, current_user.id)

        updated_org = await OrganizationRepository.update(
            db=db,
            org=org,
            update_data=update_data,
        )

        return OrganizationResponse.model_validate(updated_org)

    @staticmethod
    async def upload_logo(
        db: AsyncSession,
        org_id: UUID,
        file: UploadFile,
        current_user: User,
    ) -> OrganizationResponse:
        """Upload and set a logo for an organization (owner only)."""
        org = await _require_org_owner(db, org_id, current_user.id)

        logo_url = await save_upload(file, ORG_UPLOAD_SUBFOLDER)

        updated_org = await OrganizationRepository.update_logo_url(
            db=db,
            org=org,
            logo_url=logo_url,
        )

        return OrganizationResponse.model_validate(updated_org)


organization_service = OrganizationService()
