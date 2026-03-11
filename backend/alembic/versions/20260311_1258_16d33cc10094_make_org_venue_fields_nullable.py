"""make_org_venue_fields_nullable

Make organization and venue fields nullable to allow creation during signup
with only name and owner_id. Users can complete their profile later.

Revision ID: 16d33cc10094
Revises: c3d4e5f6a7b8
Create Date: 2026-03-11 12:58:44.645255

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "16d33cc10094"
down_revision: Union[str, Sequence[str], None] = "c3d4e5f6a7b8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Make type, university, capacity, base_price_cents nullable."""
    # Organizations - make type and university nullable
    op.alter_column("organizations", "type", nullable=True)
    op.alter_column("organizations", "university", nullable=True)

    # Venues - make type, capacity, base_price_cents nullable
    op.alter_column("venues", "type", nullable=True)
    op.alter_column("venues", "capacity", nullable=True)
    op.alter_column("venues", "base_price_cents", nullable=True)

    # Drop existing check constraints
    op.drop_constraint("venue_capacity_positive_check", "venues", type_="check")
    op.drop_constraint("venue_price_non_negative_check", "venues", type_="check")

    # Add new constraints that allow NULL but validate when present
    op.create_check_constraint(
        "venue_capacity_positive_check",
        "venues",
        "capacity IS NULL OR capacity > 0",
    )
    op.create_check_constraint(
        "venue_price_non_negative_check",
        "venues",
        "base_price_cents IS NULL OR base_price_cents >= 0",
    )


def downgrade() -> None:
    """Revert fields to NOT NULL (requires all existing rows to have values)."""
    # Drop the nullable constraints
    op.drop_constraint("venue_capacity_positive_check", "venues", type_="check")
    op.drop_constraint("venue_price_non_negative_check", "venues", type_="check")

    # Restore original constraints
    op.create_check_constraint(
        "venue_capacity_positive_check",
        "venues",
        "capacity > 0",
    )
    op.create_check_constraint(
        "venue_price_non_negative_check",
        "venues",
        "base_price_cents >= 0",
    )

    # Make columns NOT NULL again (will fail if NULL values exist)
    op.alter_column("venues", "base_price_cents", nullable=False)
    op.alter_column("venues", "capacity", nullable=False)
    op.alter_column("venues", "type", nullable=False)

    op.alter_column("organizations", "university", nullable=False)
    op.alter_column("organizations", "type", nullable=False)
