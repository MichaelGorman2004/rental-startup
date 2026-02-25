"""Organization module for student organization management."""

from app.modules.organizations.models import Organization
from app.modules.organizations.router import router

__all__ = ["Organization", "router"]
