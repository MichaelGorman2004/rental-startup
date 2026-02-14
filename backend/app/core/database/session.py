"""Async database session management and connection pooling.

This module provides:
- Async SQLAlchemy engine with connection pooling
- Session factory for creating database sessions
- FastAPI dependency for dependency injection

Connection pooling configuration:
- pool_size=5: Maximum 5 persistent connections
- max_overflow=10: Allow up to 10 additional connections during spikes
- pool_pre_ping=True: Test connections before use to avoid stale connections

Usage in FastAPI routes:
    @router.get("/users")
    async def get_users(db: AsyncSession = Depends(get_db)):
        result = await db.execute(select(User))
        return result.scalars().all()
"""

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings

# Create async engine with connection pooling
# echo=True enables SQL query logging in development (useful for debugging)
# pool_pre_ping=True tests connections before use to avoid stale connections
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.ENVIRONMENT == "development",  # Log SQL in development only
    pool_size=5,  # Maximum number of persistent connections
    max_overflow=10,  # Allow up to 10 additional connections during traffic spikes
    pool_pre_ping=True,  # Verify connections are alive before using them
)

# Session factory for creating new async sessions
# expire_on_commit=False: Keep objects usable after commit (better for FastAPI)
# class_=AsyncSession: Use async session implementation
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,  # Don't expire objects on commit
    autoflush=False,  # Manual flush control for better performance
    autocommit=False,  # Explicit transaction control
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency that provides async database sessions.

    This dependency:
    1. Creates a new session for each request
    2. Automatically commits on success
    3. Automatically rolls back on exception
    4. Always closes the session to prevent leaks

    Usage:
        @router.get("/users")
        async def get_users(db: AsyncSession = Depends(get_db)):
            result = await db.execute(select(User))
            return result.scalars().all()

    Yields:
        AsyncSession: Database session for use in request handler
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()  # Commit if no exception occurred
        except Exception:
            await session.rollback()  # Rollback on any exception
            raise  # Re-raise exception for FastAPI error handling
        finally:
            await session.close()  # Always close session
