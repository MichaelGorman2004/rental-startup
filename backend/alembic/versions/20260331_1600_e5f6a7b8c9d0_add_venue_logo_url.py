"""add_venue_logo_url

Add logo_url column to venues table, matching the existing pattern
on the organizations table.

Revision ID: e5f6a7b8c9d0
Revises: d4e5f6a7b8c9
Create Date: 2026-03-31 16:00:00.000000

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op


# revision identifiers, used by Alembic.
revision: str = "e5f6a7b8c9d0"
down_revision: Union[str, Sequence[str], None] = "d4e5f6a7b8c9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add logo_url column to venues table."""
    op.add_column(
        "venues",
        sa.Column("logo_url", sa.String(length=500), nullable=True),
    )


def downgrade() -> None:
    """Remove logo_url column from venues table."""
    op.drop_column("venues", "logo_url")
