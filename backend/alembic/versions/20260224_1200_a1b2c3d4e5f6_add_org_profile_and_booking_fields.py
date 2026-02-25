"""add org profile and booking fields

Revision ID: a1b2c3d4e5f6
Revises: 339f120d53f3
Create Date: 2026-02-24 12:00:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "a1b2c3d4e5f6"
down_revision: Union[str, Sequence[str], None] = "339f120d53f3"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add organization profile fields and booking event details."""
    # Organization profile columns
    op.add_column("organizations", sa.Column("description", sa.Text(), nullable=True))
    op.add_column("organizations", sa.Column("contact_email", sa.String(length=255), nullable=True))
    op.add_column("organizations", sa.Column("contact_phone", sa.String(length=50), nullable=True))
    op.add_column("organizations", sa.Column("member_count", sa.Integer(), nullable=True))
    op.add_column("organizations", sa.Column("website_url", sa.String(length=500), nullable=True))
    op.add_column("organizations", sa.Column("logo_url", sa.String(length=500), nullable=True))
    op.create_check_constraint(
        "org_member_count_positive_check",
        "organizations",
        "member_count > 0",
    )

    # Booking event detail columns
    op.add_column(
        "bookings",
        sa.Column("event_name", sa.String(length=100), nullable=False, server_default=""),
    )
    op.add_column("bookings", sa.Column("special_requests", sa.Text(), nullable=True))


def downgrade() -> None:
    """Remove organization profile fields and booking event details."""
    op.drop_column("bookings", "special_requests")
    op.drop_column("bookings", "event_name")
    op.drop_constraint("org_member_count_positive_check", "organizations", type_="check")
    op.drop_column("organizations", "logo_url")
    op.drop_column("organizations", "website_url")
    op.drop_column("organizations", "member_count")
    op.drop_column("organizations", "contact_phone")
    op.drop_column("organizations", "contact_email")
    op.drop_column("organizations", "description")
