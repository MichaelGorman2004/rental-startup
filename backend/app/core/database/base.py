"""SQLAlchemy declarative base and reusable model mixins.

This module provides the foundation for all database models:
- BaseModel: Declarative base that all models inherit from
- UUIDMixin: Adds UUID primary key with automatic generation
- TimestampMixin: Adds created_at/updated_at with automatic management
- SoftDeleteMixin: Adds deleted_at for soft delete pattern

Design decisions:
- UUID v4 for primary keys (generated in Python, not database) for better
  testability and multi-database compatibility
- UTC timezone enforcement for all timestamps to prevent timezone bugs
- Explicit type hints (Mapped[]) for full mypy strict mode compatibility
"""

from datetime import UTC, datetime
from typing import Any, ClassVar
from uuid import UUID, uuid4

from sqlalchemy import DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class BaseModel(DeclarativeBase):
    """
    Base class for all SQLAlchemy models.

    Provides the declarative base with type annotation support.
    All models must inherit from this class.
    """

    # Type map for Python types to SQLAlchemy types
    # This enables automatic type inference for common Python types
    type_annotation_map: ClassVar[dict[type, Any]] = {
        datetime: DateTime(timezone=True),  # Always use timezone-aware datetime
    }


class UUIDMixin:
    """
    Mixin that adds a UUID primary key column.

    The UUID is generated in Python using uuid4() rather than database-side
    generation. This provides:
    - Consistent behavior across different databases
    - Ability to know the ID before database insert
    - Better testability (can create predictable UUIDs in tests)

    Usage:
        class User(BaseModel, UUIDMixin):
            ...
    """

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=uuid4,  # Generate UUID in Python
        nullable=False,
    )


class TimestampMixin:
    """
    Mixin that adds created_at and updated_at timestamp columns.

    Timestamps are automatically managed:
    - created_at: Set once on record creation
    - updated_at: Updated on every record modification

    All timestamps use UTC timezone to prevent timezone-related bugs.

    Usage:
        class User(BaseModel, UUIDMixin, TimestampMixin):
            ...
    """

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),  # Auto-update on modification
        nullable=False,
    )


class SoftDeleteMixin:
    """
    Mixin that adds soft delete functionality via deleted_at column.

    Soft deletes preserve data while marking it as deleted:
    - deleted_at=NULL: Record is active
    - deleted_at=<timestamp>: Record is soft-deleted

    Benefits:
    - Preserve referential integrity (bookings can reference deleted venues)
    - Audit trail for compliance
    - Recovery capability
    - Historical data analysis

    Application code must filter deleted records:
        query = select(Venue).where(Venue.deleted_at.is_(None))

    Usage (typically for Venue model):
        class Venue(BaseModel, UUIDMixin, TimestampMixin, SoftDeleteMixin):
            ...
    """

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        default=None,
        nullable=True,
    )
