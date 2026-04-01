"""Application configuration using Pydantic Settings."""

import os

from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Default secret key used only in non-production environments
_DEV_SECRET_KEY = "dev-secret-key-change-in-production"

# Environment value that triggers production-level validation
PRODUCTION_ENV = "production"


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.

    This uses Pydantic's BaseSettings to automatically load and validate
    configuration from .env files or environment variables.

    Attributes:
        PROJECT_NAME: Display name for the application
        API_V1_STR: API version prefix for routes
        DATABASE_URL: PostgreSQL connection string (async driver)
        SECRET_KEY: Secret key for JWT token signing
        ACCESS_TOKEN_EXPIRE_MINUTES: JWT token expiration time
        ENVIRONMENT: Current environment (development/staging/production)
    """

    # Application settings
    PROJECT_NAME: str = "VenueLink"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Database configuration
    # Format: postgresql+asyncpg://user:password@host:port/database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/venuelink"

    # Security settings
    # In production, SECRET_KEY must be set via environment variable.
    # Use: openssl rand -hex 32
    SECRET_KEY: str = os.getenv("SECRET_KEY", _DEV_SECRET_KEY)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Clerk Authentication
    CLERK_SECRET_KEY: str = ""
    CLERK_PUBLISHABLE_KEY: str = ""
    CLERK_WEBHOOK_SECRET: str = ""

    # CORS origins (frontend URLs allowed to call this API)
    # Stored as a plain string to avoid pydantic-settings JSON-decoding issues.
    # Use comma-separated values: "https://example.com,http://localhost:3000"
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS_ORIGINS string into a list."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    @model_validator(mode="after")
    def normalize_database_url(self) -> "Settings":
        """Ensure DATABASE_URL uses the asyncpg driver scheme.

        Railway and other PaaS providers inject DATABASE_URL with the standard
        ``postgresql://`` scheme. SQLAlchemy async requires ``postgresql+asyncpg://``.
        This validator auto-converts at startup so no manual rewriting is needed.
        """
        url = self.DATABASE_URL
        if url.startswith("postgresql://"):
            self.DATABASE_URL = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgres://"):
            self.DATABASE_URL = url.replace("postgres://", "postgresql+asyncpg://", 1)
        return self

    @model_validator(mode="after")
    def validate_production_settings(self) -> "Settings":
        """Enforce strict security requirements in production.

        Ensures that SECRET_KEY and CLERK_PEM_PUBLIC_KEY are explicitly set
        when ENVIRONMENT is 'production'. Missing either value would allow
        insecure JWT handling, so we fail fast at startup.
        """
        if self.ENVIRONMENT != PRODUCTION_ENV:
            return self

        if not self.SECRET_KEY or self.SECRET_KEY == _DEV_SECRET_KEY:
            raise ValueError(
                "SECRET_KEY must be set to a secure value in production. "
                "Generate one with: openssl rand -hex 32"
            )

        if not os.getenv("CLERK_PEM_PUBLIC_KEY"):
            raise ValueError(
                "CLERK_PEM_PUBLIC_KEY must be set in production. "
                "Without it, JWT signatures are not verified."
            )

        return self

    model_config = SettingsConfigDict(
        # Load from .env file in the backend directory
        env_file=".env",
        # Allow extra fields in .env (flexibility for new settings)
        extra="ignore",
        # Make settings case-sensitive to prevent typos
        case_sensitive=True,
    )


# Global settings instance (singleton pattern)
# Import this in other modules: from app.core.config import settings
settings = Settings()
