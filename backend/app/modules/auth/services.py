"""Authentication business logic."""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.modules.users.models import User
from app.modules.auth.schemas import UserCreate
from app.core.constants.enums import UserRole
from app.modules.auth.utils import is_valid_student_email
from app.modules.auth.constants import AuthError

class AuthService:
    """Service for handling user authentication and synchronization."""

    @staticmethod
    async def get_or_create_user(
        db: AsyncSession, 
        user_data: UserCreate
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
        if user_data.role == UserRole.STUDENT_ORG and not is_valid_student_email(user_data.email):
            raise ValueError(AuthError.STUDENT_EMAIL_REQUIRED)

        # 2. Check if user exists
        # We assume the ID from Clerk maps to our User.id (if using UUIDs consistent across)
        # OR we look up by email. For this implementation, let's look up by email first 
        # as Clerk IDs might be different formats unless configured carefully.
        # Ideally, we store the Clerk ID in the user record, but our current model uses UUID as PK.
        # Strategy: Use email as the stable identifier for now, or assume the ID passed IS the UUID 
        # if we control the ID generation, but usually Clerk generates its own IDs.
        # LIMITATION: The current User model has 'id' as UUID. Clerk IDs are strings like 'user_2xyz...'.
        # ADJUSTMENT: We will query by email. If it exists, return it.
        # If not, create a new User. We will let the DB generate the UUID.
        
        stmt = select(User).where(User.email == user_data.email)
        result = await db.execute(stmt)
        user = result.scalar_one_or_none()

        if user:
            return user

        # 3. Create new user if not exists
        new_user = User(
            email=user_data.email,
            role=user_data.role,
            email_verified=True # Assumed verified by Clerk
        )
        
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        
        return new_user

auth_service = AuthService()
