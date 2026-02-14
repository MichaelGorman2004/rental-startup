"""Alembic migration environment with async support.

This module configures Alembic to work with SQLAlchemy 2.0 async engine
and imports all models for autogenerate detection.

Key features:
- Async database operations using asyncio
- Automatic model detection from BaseModel.metadata
- Database URL from application settings (not hardcoded)
- Support for both online and offline migration modes
"""

import asyncio
from logging.config import fileConfig
from typing import Any

from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

# Import application config and database base
from app.core.config import settings
from app.core.database import BaseModel

# Import ALL models to register them with BaseModel.metadata
# This is critical for autogenerate to detect schema changes
from app.modules.bookings.models import Booking  # noqa: F401
from app.modules.organizations.models import Organization  # noqa: F401
from app.modules.users.models import User  # noqa: F401
from app.modules.venues.models import Venue  # noqa: F401

# Alembic Config object (provides access to alembic.ini values)
config = context.config

# Override database URL from application settings
# This ensures migrations use the same database as the application
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Configure Python logging from alembic.ini
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set target metadata for autogenerate support
# BaseModel.metadata contains all registered SQLAlchemy models
target_metadata = BaseModel.metadata


def run_migrations_offline() -> None:
    """
    Run migrations in 'offline' mode.

    This configures the context with just a URL and not an Engine.
    Calls to context.execute() emit SQL strings to the script output.

    Offline mode is useful for generating SQL scripts without a database connection.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Any) -> None:  # noqa: ANN401
    """
    Run migrations with the provided connection.

    Args:
        connection: SQLAlchemy connection object
    """
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        # Compare type changes (e.g., String length modifications)
        compare_type=True,
        # Compare server defaults
        compare_server_default=True,
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """
    Run migrations in 'online' mode with async engine.

    Creates an async Engine and associates a connection with the context.
    This is the standard mode for running migrations against a live database.
    """
    # Create async engine from config
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,  # No connection pooling for migrations
    )

    # Run migrations in async context
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    # Dispose engine after migrations complete
    await connectable.dispose()


def run_migrations_online() -> None:
    """
    Run migrations in 'online' mode (wrapper for async execution).

    Uses asyncio.run() to execute async migrations.
    """
    asyncio.run(run_async_migrations())


# Determine which mode to run in (offline or online)
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
