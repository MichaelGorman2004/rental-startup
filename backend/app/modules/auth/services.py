"""Authentication business logic."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants.enums import UserRole
from app.modules.auth.constants import AuthError
from app.modules.auth.schemas import UserCreate
from app.modules.auth.utils import is_valid_student_email
from app.modules.users.models import User


class AuthService:
    """Service for handling user authentication and synchronization."""

    @staticmethod
    async def get_or_create_user(
        db: AsyncSession,
        user_data: UserCreate,
    ) -> User:
        """
        Get an existing user or create a new one based on auth provider data.

        Args:
            db: Database session.
            user_data: User data from auth provider.

        Returns:
            User: The authenticated user.

        Raises:
            ValueError: If validation fails (e.g. non-edu email for student org).
        """
        # 1. Validate constraints
        if (
            user_data.role == UserRole.STUDENT_ORG
            and not is_valid_student_email(user_data.email)
        ):
            raise ValueError(AuthError.STUDENT_EMAIL_REQUIRED)

        # 2. Check if user exists
        stmt = select(User).where(User.email == user_data.email)
        result = await db.execute(stmt)
        user = result.scalar_one_or_none()

        if user:
            return user

        # 3. Create new user if not exists
        new_user = User(
            email=user_data.email,
            role=user_data.role,
            email_verified=True,  # Assumed verified by Clerk
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        return new_user

auth_service = AuthService()
