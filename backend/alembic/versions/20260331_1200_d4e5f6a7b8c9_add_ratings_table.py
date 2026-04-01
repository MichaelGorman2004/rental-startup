"""add ratings table

Revision ID: d4e5f6a7b8c9
Revises: c3d4e5f6a7b8
Create Date: 2026-03-31 12:00:00.000000

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "d4e5f6a7b8c9"
down_revision: Union[str, Sequence[str], None] = "c3d4e5f6a7b8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create ratings table."""
    op.create_table(
        "ratings",
        sa.Column("booking_id", sa.Uuid(), nullable=False),
        sa.Column("organization_id", sa.Uuid(), nullable=False),
        sa.Column("venue_id", sa.Uuid(), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("comment", sa.String(length=1000), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.CheckConstraint(
            "score >= 1 AND score <= 5",
            name="rating_score_range_check",
        ),
        sa.ForeignKeyConstraint(
            ["booking_id"],
            ["bookings.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["organization_id"],
            ["organizations.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["venue_id"],
            ["venues.id"],
            ondelete="RESTRICT",
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("booking_id", name="rating_one_per_booking"),
    )
    op.create_index(
        op.f("ix_ratings_booking_id"),
        "ratings",
        ["booking_id"],
        unique=True,
    )
    op.create_index(
        op.f("ix_ratings_organization_id"),
        "ratings",
        ["organization_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_ratings_venue_id"),
        "ratings",
        ["venue_id"],
        unique=False,
    )


def downgrade() -> None:
    """Drop ratings table."""
    op.drop_index(op.f("ix_ratings_venue_id"), table_name="ratings")
    op.drop_index(op.f("ix_ratings_organization_id"), table_name="ratings")
    op.drop_index(op.f("ix_ratings_booking_id"), table_name="ratings")
    op.drop_table("ratings")
