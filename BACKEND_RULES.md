# Backend Rules - S-Tier Quality Standards
> **Philosophy**: Clean architecture. Explicit > Implicit. Fail fast & loud. Type safety everywhere. If it's not testable, it's not acceptable.

---

## 1. Layer Architecture (STRICT)
```
modules/auth/
├── models.py        # SQLAlchemy ORM
├── schemas.py       # Pydantic validation
├── services.py      # Business logic (pure functions)
├── repository.py    # Data access layer
├── router.py        # API endpoints (thin, 5-10 lines)
├── dependencies.py  # FastAPI dependencies
├── constants/       # Enums, errors, config
└── utils/          # Pure helpers
```

**Flow**: Router → Service → Repository → Database
**Router**: Validate input → Call service → Return response (NO business logic)
**Service**: Pure functions, no DB access, fully testable
**Repository**: All SQLAlchemy queries isolated here

---

## 2. Python Standards
### Type Hints (100% Coverage)
```python
# ✅ PERFECT
from typing import Optional
from datetime import datetime

def create_booking(
    venue_id: str,
    org_id: str,
    event_date: datetime,
    guest_count: int
) -> Booking:
    """Create a new booking request."""
    # ...

# ❌ REJECT - No types
def create_booking(venue_id, org_id, event_date, guest_count):
    # ...
```

### Functions
- **Target**: <20 lines (backend allows slightly more than frontend)
- **Pure**: Services have no side effects (idempotent, testable)
- **Naming**: `verb_noun` - `validate_email`, `create_user`, `fetch_venues`

### Imports (Auto-Sorted)
```python
# 1. Standard library
from datetime import datetime
from typing import List, Optional
# 2. Third-party
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
# 3. Local absolute
from app.modules.auth.models import User
# 4. Relative (avoid)
```

---

## 3. FastAPI Best Practices
### Thin Controllers
```python
# ✅ PERFECT - Delegates to service
@router.post("/venues", response_model=VenueResponse)
async def create_venue(
    venue: VenueCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user)
) -> VenueResponse:
    venue_obj = await venue_service.create(db, venue, user.id)
    return VenueResponse.from_orm(venue_obj)

# ❌ REJECT - Logic in router
@router.post("/venues")
async def create_venue(venue_data: dict, db):
    if not venue_data.get("name"):  # Validation in router
        raise HTTPException(400)
    # ... 30 lines of business logic
```

### Status Codes (Semantic)
- `200` GET/PATCH success • `201` POST created • `204` DELETE success
- `400` Validation error • `401` Not authenticated • `403` Forbidden
- `404` Not found • `409` Conflict • `500` Server error

---

## 4. Pydantic Schemas
```python
# ✅ PERFECT - Clear separation
class VenueBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    capacity: int = Field(..., ge=10, le=500)

class VenueCreate(VenueBase):
    base_price_cents: int = Field(..., ge=10000)

class VenueUpdate(BaseModel):  # All optional
    name: Optional[str] = Field(None, min_length=3)
    capacity: Optional[int] = Field(None, ge=10)

class VenueResponse(VenueBase):
    id: str
    created_at: datetime
    class Config:
        from_attributes = True  # Pydantic v2
```

**Rules**: Define constraints in `Field()` • No magic numbers (use constants) • Separate Create/Update/Response schemas

---

## 5. SQLAlchemy Models (Async 2.0)
```python
from sqlalchemy.orm import Mapped, mapped_column
from uuid import uuid4

class Venue(Base):
    __tablename__ = "venues"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, nullable=False)

    # Foreign key + relationship
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"))
    owner: Mapped["User"] = relationship(back_populates="venues")

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    deleted_at: Mapped[Optional[datetime]] = mapped_column(default=None)  # Soft delete

    # Constraints
    __table_args__ = (CheckConstraint('capacity > 0'),)
```

### Repository Pattern
```python
class VenueRepository:
    @staticmethod
    async def get_by_id(db: AsyncSession, venue_id: str) -> Optional[Venue]:
        result = await db.execute(
            select(Venue).where(Venue.id == venue_id, Venue.deleted_at.is_(None))
        )
        return result.scalar_one_or_none()
```

**Rules**: UUID primary keys • Soft deletes (deleted_at) • All queries parameterized (never string interpolation)

---

## 6. Error Handling
### Custom Exceptions
```python
class VenueLinkException(Exception):
    def __init__(self, message: str, code: str):
        self.message = message
        self.code = code

class ResourceNotFoundError(VenueLinkException):
    def __init__(self, resource: str, id: str):
        super().__init__(f"{resource} {id} not found", "NOT_FOUND")
```

### Service Layer (Fail Fast)
```python
async def create_booking(db: AsyncSession, booking: BookingCreate):
    venue = await venue_repo.get_by_id(db, booking.venue_id)
    if not venue:
        raise ResourceNotFoundError("Venue", booking.venue_id)

    if booking.guest_count > venue.capacity:
        raise ValidationError(f"Exceeds capacity ({venue.capacity})")

    return await booking_repo.create(db, booking)
```

---

## 7. Security
### Password Hashing
```python
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)
```

### Input Validation
- **Pydantic**: Auto-validates types/constraints
- **SQL Injection**: SQLAlchemy prevents (use ORM, not raw SQL)
- **Email**: Use `EmailStr` type
```python
from pydantic import EmailStr
class UserCreate(BaseModel):
    email: EmailStr  # Validates format
```

---

## 8. Testing (Pytest)
```python
@pytest.mark.asyncio
async def test_create_venue_success(db_session, mock_user):
    # Arrange
    venue_data = VenueCreate(name="Test", type="bar", capacity=100)

    # Act
    venue = await create_venue(db_session, venue_data, mock_user.id)

    # Assert
    assert venue.name == "Test"
```

**Coverage**: Services 100% • Critical flows (auth, booking, payments) • Mock external services

---

## 9. Performance
- **Indexes**: Foreign keys, frequently queried columns
- **N+1**: Use `joinedload()`/`selectinload()`
- **Pagination**: Always limit (default 20, max 100)
- **Async**: Parallel operations with `asyncio.gather()`

```python
# ✅ Parallel
user, venues, bookings = await asyncio.gather(
    fetch_user(id), fetch_venues(), fetch_bookings()
)

# ❌ Sequential (slow)
user = await fetch_user(id)
venues = await fetch_venues()
```

---

## 10. Auto-Reject Checklist
1. Missing type hints
2. Business logic in routers
3. Raw SQL (use ORM)
4. Magic numbers/strings
5. Functions >20 lines
6. Swallowed exceptions
7. Missing docstrings
8. Hardcoded secrets
9. Unused imports
10. SQL injection risks

---

## Pre-Commit (Automated)
```bash
ruff check .      # Zero violations
mypy .            # Zero type errors (strict)
black .           # Auto-formatted
pytest --cov      # >90% coverage
```

---

## Quick Reference
```
✅ DO                           ❌ DON'T
───────────────────────────────────────────
Type hints everywhere          Implicit types
Router → Service → Repo        Logic in routers
Pydantic validation           Manual validation
Async/await                   Blocking ops
Custom exceptions             Generic Exception
Parameterized queries         String interpolation
Environment variables         Hardcoded config
UUID primary keys             Auto-increment
```

**Remember**: Explicit is better than implicit. Simple is better than complex.
