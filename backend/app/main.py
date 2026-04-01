"""FastAPI application entry point for VenueLink backend."""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.core.config import settings
from app.core.database import engine
from app.core.exceptions import (
    AuthorizationError,
    BusinessRuleError,
    ConflictError,
    ResourceNotFoundError,
)
from app.core.uploads import UPLOAD_DIR
from app.modules.auth.router import router as auth_router
from app.modules.bookings.router import router as bookings_router
from app.modules.organizations.router import router as organizations_router
from app.modules.prerelease.router import router as prerelease_router
from app.modules.venues.router import router as venues_router
from app.modules.webhooks.router import router as webhooks_router


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
    # Startup: Test database connection (non-fatal — app still starts if DB is slow)
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        print("✓ Database connection established")
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        print("  App will start anyway — DB may become available later")

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


@app.exception_handler(ResourceNotFoundError)
async def not_found_handler(_request: Request, exc: ResourceNotFoundError) -> JSONResponse:
    """Convert ResourceNotFoundError to a 404 JSON response."""
    return JSONResponse(status_code=404, content={"error": exc.message, "code": exc.code})


@app.exception_handler(AuthorizationError)
async def authorization_handler(_request: Request, exc: AuthorizationError) -> JSONResponse:
    """Convert AuthorizationError to a 403 JSON response."""
    return JSONResponse(status_code=403, content={"error": exc.message, "code": exc.code})


@app.exception_handler(BusinessRuleError)
async def business_rule_handler(_request: Request, exc: BusinessRuleError) -> JSONResponse:
    """Convert BusinessRuleError to a 400 JSON response."""
    return JSONResponse(status_code=400, content={"error": exc.message, "code": exc.code})


@app.exception_handler(ConflictError)
async def conflict_handler(_request: Request, exc: ConflictError) -> JSONResponse:
    """Convert ConflictError to a 409 JSON response."""
    return JSONResponse(status_code=409, content={"error": exc.message, "code": exc.code})


app.include_router(auth_router, prefix="/api/v1")
app.include_router(bookings_router, prefix="/api/v1")
app.include_router(organizations_router, prefix="/api/v1")
app.include_router(prerelease_router, prefix="/api/v1")
app.include_router(venues_router, prefix="/api/v1")
app.include_router(webhooks_router, prefix="/webhooks")

# Serve uploaded files (logos, etc.) as static assets.
# The directory is created lazily by the upload utility; ensure it exists
# here so StaticFiles does not raise on startup.
uploads_path = Path(UPLOAD_DIR)
uploads_path.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_path)), name="uploads")

# CORS middleware configuration
# Allows configured frontend origins with production-safe method/header restrictions
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
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
