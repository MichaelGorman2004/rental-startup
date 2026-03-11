"""change event_time to event_start_time and add event_end_time

Revision ID: c3d4e5f6a7b8
Revises: b2c3d4e5f6a7
Create Date: 2026-03-09 15:00:00.000000

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c3d4e5f6a7b8"
down_revision: Union[str, Sequence[str], None] = "b2c3d4e5f6a7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Rename event_time to event_start_time and add event_end_time."""
    # Drop existing constraints and indexes that reference event_time
    op.drop_constraint("unique_venue_datetime_booking", "bookings", type_="unique")
    op.drop_index("ix_bookings_venue_date_time", table_name="bookings")

    # Rename event_time to event_start_time
    op.alter_column(
        "bookings",
        "event_time",
        new_column_name="event_start_time",
        existing_type=sa.Time(),
        existing_nullable=False,
    )

    # Add event_end_time column (default to 1 hour after start for existing rows)
    op.add_column(
        "bookings",
        sa.Column("event_end_time", sa.Time(), nullable=True),
    )

    # Set default value for existing rows: end_time = start_time + 1 hour
    op.execute("UPDATE bookings SET event_end_time = event_start_time + INTERVAL '1 hour'")

    # Make event_end_time non-nullable after populating existing rows
    op.alter_column(
        "bookings",
        "event_end_time",
        existing_type=sa.Time(),
        nullable=False,
    )

    # Create new composite index with start and end times
    op.create_index(
        "ix_bookings_venue_date_time",
        "bookings",
        ["venue_id", "event_date", "event_start_time", "event_end_time"],
    )

    # Add check constraint: end_time must be after start_time
    op.create_check_constraint(
        "booking_end_after_start_check",
        "bookings",
        "event_end_time > event_start_time",
    )


def downgrade() -> None:
    """Revert to single event_time column."""
    # Drop new constraints and indexes
    op.drop_constraint("booking_end_after_start_check", "bookings", type_="check")
    op.drop_index("ix_bookings_venue_date_time", table_name="bookings")

    # Drop event_end_time column
    op.drop_column("bookings", "event_end_time")

    # Rename event_start_time back to event_time
    op.alter_column(
        "bookings",
        "event_start_time",
        new_column_name="event_time",
        existing_type=sa.Time(),
        existing_nullable=False,
    )

    # Recreate original composite index
    op.create_index(
        "ix_bookings_venue_date_time",
        "bookings",
        ["venue_id", "event_date", "event_time"],
    )
