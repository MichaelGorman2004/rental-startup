# VenueLink Repository Context

> **Last Updated**: 2026-02-14
> **Status**: Phase 1 - Foundation Complete

---

## 📊 Project Status

### Completed Tasks
- ✅ **VL-001**: Monorepo Setup & Build Pipeline
- ✅ **VL-002**: Database Schema Design & Migration Infrastructure
- ✅ **VL-004**: Frontend Foundation & Mantine Setup

### Current Phase
**Phase 1: Foundation & Auth** (Weeks 1-2)
- Progress: 100% complete (3/3 tasks done)
- Next Up: VL-005 - Authentication UI Implementation

---

## 🏗️ Current Architecture

### Tech Stack
**Frontend**
- React 18 + TypeScript (strict mode)
- Vite dev server
- Mantine UI v7 (Configured)
- State management: Zustand (Layout)

**Backend**
- FastAPI (Python 3.11+)
- SQLAlchemy 2.0 (async ORM)
- Alembic (migrations)
- PostgreSQL database
- Pydantic validation

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
│   │   ├── features/      # Feature modules (empty - awaiting VL-003)
│   │   ├── components/    # Shared UI components
│   │   ├── layout/        # Layout wrappers
│   │   ├── lib/           # External library configs
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
│   │   │   ├── users/
│   │   │   │   └── models.py         # ✅ User model
│   │   │   ├── organizations/
│   │   │   │   └── models.py         # ✅ Organization model
│   │   │   ├── venues/
│   │   │   │   └── models.py         # ✅ Venue model
│   │   │   └── bookings/
│   │   │       └── models.py         # ✅ Booking model
│   │   └── main.py                   # ✅ FastAPI app with DB lifecycle
│   ├── alembic/                      # ✅ Migration infrastructure
│   │   ├── env.py                    # ✅ Async migration environment
│   │   └── versions/
│   │       └── 20260214_*.py         # ✅ Initial schema migration
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
- ⏳ **No `any` types**: Enforced (pending features)
- ⏳ **Component size**: < 200 lines (pending features)
- ⏳ **Function size**: < 50 lines (pending features)

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
```

---

## 🚀 Next Steps (VL-003)

### Authentication Service Integration
**Priority**: 🔴 Critical
**Effort**: 10 hours
**Dependencies**: VL-002 ✅

**Key Deliverables**:
1. Auth provider integration (Clerk/Auth0)
2. JWT middleware for FastAPI
3. `.edu` email validation for student orgs
4. Role-based access control (RBAC)
5. Frontend auth pages (Login, Signup, Role Selection)
6. Protected routes and API endpoints

**Files to Create**:
```
backend/app/modules/auth/
  - models.py (if needed beyond User)
  - schemas.py (Pydantic models)
  - services.py (business logic)
  - router.py (API endpoints)
  - middleware.py (JWT validation)
  - dependencies.py (get_current_user)

frontend/src/features/auth/
  - components/ (LoginForm, SignupForm, RoleSelector)
  - hooks/ (useAuth, useLogin, useSignup)
  - types/ (auth.types.ts)
  - constants/ (auth.constants.ts)
```

---

## 📊 Key Metrics

### Codebase Stats
- **Backend Python files**: 17
- **Database tables**: 4
- **Migration count**: 1
- **Type coverage**: 100%
- **Linting errors**: 0
- **Test coverage**: 0% (no tests yet)

### Quality Gates
- ✅ All commits pass pre-commit hooks
- ✅ All PRs pass CI pipeline
- ✅ Zero mypy errors (strict mode)
- ✅ Zero ruff violations
- ✅ Black formatting enforced

---

## 🔍 Important Patterns & Conventions

### Database
- **UUID v4** for all primary keys (generated in Python, not database)
- **UTC timezone** for all timestamps (using `datetime.UTC`)
- **Async everywhere**: No blocking database operations
- **Soft deletes**: Venues use `deleted_at` column
- **Foreign keys**: All use `ON DELETE RESTRICT` for data integrity
- **Enums**: Python enums (lowercase member names) synced with PostgreSQL

### Backend Code Organization
- **Module structure**: `modules/{feature}/models.py`
- **Constants**: Separate directory (`core/constants/`)
- **Mixins**: Reusable model patterns (UUIDMixin, TimestampMixin, SoftDeleteMixin)
- **Type hints**: Explicit `Mapped[]` on all columns
- **Docstrings**: Google-style docstrings on all public APIs

### Frontend Code Organization (Pending VL-003)
- **Feature-based**: `features/{feature}/components/`
- **Hooks for logic**: No business logic in components
- **Constants**: Separate files for each type
- **Barrel exports**: `index.ts` in each directory
- **Type safety**: No `any` types allowed

---

## 🐛 Known Issues / Tech Debt

None currently. All tasks completed to production standards.

---

## 📚 Reference Documentation

### Internal Docs
- [README.md](../README.md) - Setup and overview
- [tasks.md](../tasks.md) - Detailed task breakdown
- [BACKEND_RULES.md](../BACKEND_RULES.md) - Backend architecture guide
- [FRONTEND_RULES.md](../FRONTEND_RULES.md) - Frontend architecture guide

### External Resources
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [SQLAlchemy 2.0 Docs](https://docs.sqlalchemy.org/en/20/)
- [Alembic Tutorial](https://alembic.sqlalchemy.org/en/latest/tutorial.html)
- [Mantine UI v7](https://mantine.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## 🎯 Success Criteria (MVP)

### Phase 1 (Current) - Foundation ✅
- [x] Monorepo setup
- [x] Database schema
- [ ] Authentication (VL-003 in progress)

### Phase 2 (Weeks 3-4) - Venue Management
- [ ] Venue CRUD operations
- [ ] Image upload
- [ ] Venue discovery UI
- [ ] Venue details page

### Phase 3 (Weeks 5-6) - Booking Core
- [ ] Booking request flow
- [ ] Venue dashboard
- [ ] Availability calendar
- [ ] Double-booking prevention

### Phase 4-6 (Weeks 7-12)
- [ ] Messaging system
- [ ] Notifications
- [ ] Payments (Stripe)
- [ ] Analytics dashboards
- [ ] Production deployment

---

**Repository maintained by**: VenueLink Engineering Team
**Questions?**: See [Contributing Guidelines](../CONTRIBUTING.md) (coming soon)
