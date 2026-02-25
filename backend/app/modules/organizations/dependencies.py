"""FastAPI dependencies for organization endpoints."""

from typing import Annotated

from fastapi import Depends

from app.core.constants.enums import UserRole
from app.modules.auth.dependencies import require_role
from app.modules.users.models import User

# Role-based dependency for student org users
get_student_org_user = Annotated[User, Depends(require_role(UserRole.student_org))]
