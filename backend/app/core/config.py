"""Application configuration using Pydantic Settings."""

from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


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
    # TODO: Generate a secure random key for production
    # Use: openssl rand -hex 32
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Clerk Authentication
    CLERK_SECRET_KEY: str = ""
    CLERK_PUBLISHABLE_KEY: str = ""
    CLERK_WEBHOOK_SECRET: str = ""

    # CORS origins (frontend URLs allowed to call this API)
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

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
