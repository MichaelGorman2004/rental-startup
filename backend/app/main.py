"""FastAPI application entry point for VenueLink backend."""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import settings
from app.core.database import engine
from app.modules.auth.router import router as auth_router
from app.modules.bookings.router import router as bookings_router
from app.modules.organizations.router import router as organizations_router
from app.modules.venues.router import router as venues_router


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Manage application lifecycle events.

    Startup:
    - Test database connection with a simple query
    - Log connection status

    Shutdown:
    - Dispose database engine connection pool
    - Clean up resources

    Args:
        app: FastAPI application instance

    Yields:
        None: Application runs during this yield
    """
    # Startup: Test database connection
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        print("✓ Database connection established")
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        raise

    yield  # Application runs here

    # Shutdown: Clean up database connection pool
    await engine.dispose()
    print("✓ Database connection pool disposed")


# Create FastAPI application instance with lifespan management
app = FastAPI(
    title="VenueLink API",
    description="API for connecting college organizations with local event venues",
    version="0.1.0",
    docs_url="/api/docs",  # Swagger UI at /api/docs
    redoc_url="/api/redoc",  # ReDoc at /api/redoc
    lifespan=lifespan,  # Database lifecycle management
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(bookings_router, prefix="/api/v1")
app.include_router(organizations_router, prefix="/api/v1")
app.include_router(venues_router, prefix="/api/v1")

# CORS middleware configuration
# Allows frontend to make API requests during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/api/health")
async def health_check() -> dict[str, str]:
    """
    Health check endpoint for monitoring and deployment verification.

    Returns:
        dict: Status message indicating API is operational
    """
    return {"status": "healthy", "service": "venuelink-api"}


@app.get("/")
async def root() -> dict[str, str]:
    """
    Root endpoint with API information.

    Returns:
        dict: Welcome message and documentation link
    """
    return {
        "message": "VenueLink API",
        "docs": "/api/docs",
    }
