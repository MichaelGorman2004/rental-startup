# VenueLink Repository Context

> **Last Updated**: 2026-02-22
> **Status**: Phase 2 - Core Features In Progress

---

## 📊 Project Status

### Completed Tasks
- ✅ **VL-001**: Monorepo Setup & Build Pipeline
- ✅ **VL-002**: Database Schema Design & Migration Infrastructure
- ✅ **VL-003**: Authentication Service Integration
- ✅ **VL-004**: Frontend Foundation & Mantine Setup
- ✅ **VL-005**: Authentication UI Implementation
- ✅ **VL-006**: Student Org Dashboard Foundation
- ✅ **VL-007**: Venue Management Backend API
- ✅ **VL-008**: Venue Discovery Frontend

### Current Phase
**Phase 2: Core Features** (Weeks 3-4)
- Progress: 8/16 tasks done (50%)
- Next Up: VL-009 - Venue Details Page

---

## 🏗️ Current Architecture

### Tech Stack
**Frontend**
- React 18 + TypeScript (strict mode)
- Vite dev server
- Mantine UI v7 (Configured)
- State management: Zustand (Layout), React Query v5 (Server State)
- Authentication: Clerk (React SDK)

**Backend**
- FastAPI (Python 3.11+)
- SQLAlchemy 2.0 (async ORM)
- Alembic (migrations)
- PostgreSQL database
- Pydantic validation
- Authentication: JWT (Clerk verification)

**Infrastructure**
- Monorepo structure (npm workspaces)
- GitHub Actions CI/CD
- Husky + lint-staged pre-commit hooks
- Railway (planned deployment)

---

## 📁 Repository Structure

```
rental-startup/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/      # ✅ Authentication Feature
│   │   │   │   ├── components/    # LoginForm, SignupForm, RoleSelector
│   │   │   │   ├── hooks/         # useLoginForm, useSignupForm
│   │   │   │   ├── types/         # Auth interfaces
│   │   │   │   └── constants/     # Validation rules
│   │   │   ├── dashboard/ # ✅ Dashboard Feature
│   │   │   │   ├── components/    # DashboardPage, ActionCard, EventCard, etc.
│   │   │   │   ├── hooks/         # useUpcomingEvents, useOrganization
│   │   │   │   ├── types/         # Dashboard interfaces
│   │   │   │   └── constants/     # Quick actions config
│   │   │   └── venues/    # ✅ Venue Discovery Feature (VL-008)
│   │   │       ├── components/    # VenueBrowse, VenueCard, VenueGrid, etc.
│   │   │       ├── hooks/         # useVenues, useVenueSearch, useVenueFilters
│   │   │       ├── types/         # Venue interfaces
│   │   │       ├── constants/     # Gradients, labels, query keys
│   │   │       └── utils/         # formatPrice, formatCapacity, formatAddress
│   │   ├── components/    # Shared UI components
│   │   ├── layout/        # Layout wrappers
│   │   ├── lib/           # External library configs (React Query)
│   │   ├── providers/     # QueryProvider
│   │   ├── utils/         # Pure utility functions
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # FastAPI + SQLAlchemy
│   ├── app/
│   │   ├── core/
│   │   │   ├── constants/
│   │   │   │   └── enums.py          # ✅ UserRole, VenueType, etc.
│   │   │   ├── database/
│   │   │   │   ├── base.py           # ✅ BaseModel, Mixins
│   │   │   │   └── session.py        # ✅ Async session factory
│   │   │   └── config.py             # ✅ Application settings
│   │   ├── modules/
│   │   │   ├── auth/                 # ✅ Auth Module
│   │   │   │   ├── services.py       # User sync logic
│   │   │   │   ├── dependencies.py   # JWT verification
│   │   │   │   ├── router.py         # /me endpoint
│   │   │   │   └── schemas.py        # Token payloads
│   │   │   ├── users/
│   │   │   │   └── models.py         # ✅ User model
│   │   │   ├── organizations/
│   │   │   │   └── models.py         # ✅ Organization model
│   │   │   ├── venues/                # ✅ Venue Management Module (VL-007)
│   │   │   │   ├── models.py         # ✅ Venue SQLAlchemy model
│   │   │   │   ├── schemas.py        # ✅ Pydantic schemas (Create, Update, Response)
│   │   │   │   ├── services.py       # ✅ Business logic (CRUD, RBAC)
│   │   │   │   ├── repository.py     # ✅ Data access layer (queries)
│   │   │   │   ├── router.py         # ✅ 5 RESTful endpoints
│   │   │   │   ├── dependencies.py   # ✅ FastAPI dependencies
│   │   │   │   ├── constants/
│   │   │   │   │   ├── validation.py # ✅ Min/max constraints
│   │   │   │   │   └── errors.py     # ✅ Error messages
│   │   │   │   └── utils/
│   │   │   │       └── __init__.py   # Utility functions
│   │   │   └── bookings/
│   │   │       └── models.py         # ✅ Booking model
│   │   └── main.py                   # ✅ FastAPI app with DB lifecycle
│   ├── alembic/                      # ✅ Migration infrastructure
│   ├── scripts.py                    # ✅ QA automation scripts
│   ├── pyproject.toml                # ✅ Poetry config + scripts
│   └── alembic.ini                   # ✅ Migration config
│
├── shared/                # Shared types (planned)
├── docs/
│   ├── ui-mockup.html    # UI design mockups
│   └── REPO.md           # This file
│
├── .github/
│   └── workflows/
│       └── ci.yml        # ✅ CI pipeline (lint, type-check)
│
├── package.json          # ✅ Root workspace config
├── tasks.md              # ✅ Detailed task tracking
├── README.md             # ✅ Setup & overview
├── BACKEND_RULES.md      # ✅ Backend architecture guide
└── FRONTEND_RULES.md     # ✅ Frontend architecture guide
```

---

## 🗄️ Database Schema (Implemented)

### Tables (4)

**users**
- Primary key: UUID v4
- Columns: email (unique, indexed), email_verified, role (enum)
- Timestamps: created_at, updated_at (UTC)
- Constraint: Student orgs must use .edu email
- Relationships: → organizations, venues

**organizations**
- Primary key: UUID v4
- Columns: name, type (enum), university, owner_id (FK → users)
- Timestamps: created_at, updated_at
- Relationships: ← user (owner), → bookings

**venues**
- Primary key: UUID v4
- Columns: name, type (enum), capacity, base_price_cents, address fields, owner_id (FK → users)
- Timestamps: created_at, updated_at, deleted_at (soft delete)
- Constraints: capacity > 0, base_price_cents >= 0
- Relationships: ← user (owner), → bookings

**bookings**
- Primary key: UUID v4
- Columns: venue_id (FK), organization_id (FK), event_date, event_time, guest_count, status (enum)
- Timestamps: created_at, updated_at
- Constraints: UNIQUE(venue_id, event_date, event_time), guest_count > 0
- Relationships: ← venue, ← organization

### Enums (4 PostgreSQL types)
- `user_role`: student_org, venue_admin
- `organization_type`: fraternity, sorority, club, other
- `venue_type`: bar, restaurant, event_space, cafe
- `booking_status`: pending, confirmed, rejected, completed, cancelled

### Indexes (12)
- users.email (unique)
- users.role
- users(role, email) (composite)
- organizations.owner_id
- venues.owner_id
- bookings.venue_id
- bookings.organization_id
- bookings.event_date
- bookings.status
- bookings(venue_id, event_date, event_time) (composite, unique)

---

## 🎯 Venue Management API (VL-007)

### Implemented Endpoints
**Base Path**: `/api/v1/venues`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/venues` | venue_admin | Create new venue |
| GET | `/venues/{id}` | authenticated | Get single venue |
| GET | `/venues` | authenticated | List with filters & pagination |
| PATCH | `/venues/{id}` | owner | Update venue (partial) |
| DELETE | `/venues/{id}` | owner | Soft delete venue |

### Architecture
**Strict Separation of Concerns**:
- **Router** (`router.py`): Thin controllers (5-10 lines each)
- **Service** (`services.py`): Business logic, authorization, pagination
- **Repository** (`repository.py`): Data access layer, SQL queries
- **Schemas** (`schemas.py`): Pydantic validation (VenueBase, Create, Update, Response)
- **Dependencies** (`dependencies.py`): FastAPI dependency injection
- **Constants** (`constants/`): All magic values extracted

### Features
- ✅ Role-based access control (venue_admin only for create)
- ✅ Ownership verification (only owners can modify/delete)
- ✅ Advanced filtering (type, capacity range, price range, search)
- ✅ Pagination (configurable page size, max 100)
- ✅ Soft delete (deleted_at timestamp, not hard delete)
- ✅ Case-insensitive search on name + address fields
- ✅ 100% type hints (mypy strict mode)
- ✅ All validation via Pydantic schemas
- ✅ Google-style docstrings throughout
- ✅ Zero ruff linting errors

### Files Created (VL-007)
```
backend/app/modules/venues/
├── __init__.py              # Module export
├── models.py                # Venue ORM model (from VL-002)
├── schemas.py               # ~194 lines - Pydantic schemas
├── services.py              # ~230 lines - Business logic
├── repository.py            # ~215 lines - Data access
├── router.py                # ~123 lines - 5 endpoints
├── dependencies.py          # ~53 lines - Query parsing
├── constants/
│   ├── __init__.py         # Constants barrel export
│   ├── validation.py       # Min/max constraints
│   └── errors.py           # Error messages enum
└── utils/
    └── __init__.py         # Utility placeholder
```

**Total**: ~850 lines of production-ready Python code

---

## 🛠️ Development Workflow

### Backend Commands

```bash
# Quality assurance (runs all checks)
poetry run qa

# Individual checks
poetry run lint          # Ruff linter
poetry run lint-fix      # Auto-fix issues
poetry run typecheck     # mypy strict mode
poetry run format        # Black formatter

# Development
poetry run dev           # Start FastAPI server

# Database
poetry run alembic upgrade head          # Apply migrations
poetry run alembic downgrade -1          # Rollback one migration
poetry run alembic revision -m "desc"    # Create migration
```

### Frontend Commands

```bash
# Development
npm run dev:frontend     # Start Vite dev server

# Quality assurance
npm run lint             # ESLint
npm run type-check       # TypeScript strict mode
npm run format           # Prettier
```

### Root Commands

```bash
# Run everything in parallel
npm run dev              # Frontend + Backend

# CI checks
npm run lint             # Lint both frontend and backend
npm run type-check       # Type check both
npm run format           # Format both
```

---

## 📋 Code Quality Standards

### Backend (Python)
- ✅ **mypy strict mode**: 100% type coverage, no `Any` types
- ✅ **Ruff**: Zero linting errors/warnings
- ✅ **Black**: Line length 100, consistent formatting
- ✅ **SQLAlchemy 2.0**: Async patterns, `Mapped[]` type hints
- ✅ **Constants**: All magic numbers/strings extracted
- ✅ **Docstrings**: Comprehensive documentation on all models/functions
- ✅ **Error handling**: Explicit, never silent failures

### Frontend (TypeScript)
- ✅ **TypeScript strict mode**: Enabled
- ✅ **ESLint**: Airbnb + React Hooks rules
- ✅ **Prettier**: Consistent formatting
- ✅ **No `any` types**: Enforced (pending features)
- ✅ **Component size**: < 200 lines (pending features)
- ✅ **Function size**: < 50 lines (pending features)

### Shared Standards
- ✅ **Pre-commit hooks**: Block non-compliant code
- ✅ **CI pipeline**: Fails on lint/type errors
- ✅ **Zero tolerance**: No warnings in production code
- ✅ **Documentation**: Inline comments on complex logic

---

## 🔐 Environment Configuration

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/venuelink

# Security
SECRET_KEY=dev-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CLERK_PEM_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----..."

# Application
ENVIRONMENT=development
PROJECT_NAME=VenueLink
API_V1_STR=/api/v1

# CORS
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

---

## 🚀 Next Steps

### Phase 2: Core Features (In Progress)
- ~~**VL-006**: Student Org Dashboard Foundation~~ ✅
- ~~**VL-007**: Venue Management Backend API~~ ✅
- ~~**VL-008**: Venue Discovery Frontend~~ ✅
- **VL-009**: Venue Details Page (VL-008)
- **VL-010**: Booking Request Form (VL-009)
- **VL-011**: Venue Admin Dashboard (VL-007)

### Venue Details Page (VL-009) - Next Up
**Priority**: 🟡 High
**Effort**: 8 hours
**Dependencies**: VL-008

**Key Deliverables**:
1. Venue detail view with hero section
2. Address with Google Maps link
3. "Request Booking" CTA button
4. Breadcrumb navigation

### Phase 3: Supporting Systems (Planned)
- **VL-012**: Shared TypeScript Types & Constants
- **VL-013**: API Client & Error Handling
- **VL-014**: React Query Setup & Cache Strategy
- **VL-015**: Form Validation & Input Components

---

## 📊 Key Metrics

### Codebase Stats
- **Backend Python files**: ~35 (includes venues module)
- **Frontend feature files**: ~53 (auth + dashboard + venues)
- **Database tables**: 4
- **Migration count**: 1
- **API endpoints**: 13 (auth: 1, venues: 5, plus 7 planned)
- **Type coverage**: 100% (mypy strict mode, TypeScript strict mode)
- **Linting errors**: 0 (ruff + ESLint clean)
- **Test coverage**: 0% (no tests yet)
- **Lines of code (Python)**: ~850 (venues module alone)

### Dashboard Feature Stats
- **Components**: 7 (DashboardPage, ActionCard, QuickActionsGrid, EventCard, UpcomingEvents, EventsEmptyState, EventsLoadingSkeleton)
- **Hooks**: 2 (useUpcomingEvents, useOrganization)
- **React Query**: Configured with 5-min stale time

### Venue Discovery Feature Stats (VL-008)
- **Components**: 9 (VenueBrowse, VenueCard, VenueCardGradient, VenueCardSkeleton, VenueEmptyState, VenueErrorState, VenueFilters, VenueGrid, VenueSearchBar)
- **Hooks**: 3 (useVenues, useVenueSearch, useVenueFilters)
- **Utilities**: 3 (formatPrice, formatCapacity, formatAddress)
- **React Query**: 10-min stale time for venue data
- **URL-synced**: Filter state in search params (?type=bar&search=rooftop)

### Quality Gates
- ✅ All commits pass pre-commit hooks
- ✅ All PRs pass CI pipeline
- ✅ Zero mypy errors (strict mode)
- ✅ Zero ruff violations
- ✅ Black formatting enforced

---

**Repository maintained by**: VenueLink Engineering Team