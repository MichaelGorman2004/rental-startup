"""add prerelease_responses table

Revision ID: b2c3d4e5f6a7
Revises: a1b2c3d4e5f6
Create Date: 2026-03-09 14:00:00.000000

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "b2c3d4e5f6a7"
down_revision: Union[str, Sequence[str], None] = "a1b2c3d4e5f6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create prerelease_responses table for interest form submissions."""
    # Create respondent_type enum (IF NOT EXISTS for idempotency)
    op.execute(
        "DO $$ BEGIN "
        "CREATE TYPE respondent_type AS ENUM ('student_org', 'venue'); "
        "EXCEPTION WHEN duplicate_object THEN NULL; END $$"
    )

    # Create prerelease_responses table
    op.create_table(
        "prerelease_responses",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("first_name", sa.String(length=100), nullable=False),
        sa.Column("last_name", sa.String(length=100), nullable=False),
        sa.Column(
            "respondent_type",
            postgresql.ENUM(
                "student_org",
                "venue",
                name="respondent_type",
                create_type=False,  # Already created above
            ),
            nullable=False,
        ),
        sa.Column("org_or_venue_name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("personal_note", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    # Create indexes for common queries
    op.create_index(
        op.f("ix_prerelease_responses_email"),
        "prerelease_responses",
        ["email"],
        unique=False,
    )
    op.create_index(
        op.f("ix_prerelease_responses_respondent_type"),
        "prerelease_responses",
        ["respondent_type"],
        unique=False,
    )


def downgrade() -> None:
    """Remove prerelease_responses table."""
    op.drop_index(
        op.f("ix_prerelease_responses_respondent_type"),
        table_name="prerelease_responses",
    )
    op.drop_index(
        op.f("ix_prerelease_responses_email"),
        table_name="prerelease_responses",
    )
    op.drop_table("prerelease_responses")
    op.execute("DROP TYPE respondent_type")
