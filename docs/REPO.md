# VenueLink Repository Context

> **Last Updated**: 2026-02-23
> **Status**: Phase 3 - Supporting Systems In Progress

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
- ✅ **VL-009**: Venue Details Page
- ✅ **VL-010**: Booking Request Form
- ✅ **VL-011**: Venue Admin Dashboard
- ✅ **VL-012**: Shared TypeScript Types & Constants
- ✅ **VL-013**: API Client & Error Handling
- ✅ **VL-014**: React Query Setup & Cache Strategy

### Current Phase
**Phase 3: Supporting Systems** (Weeks 5-6)
- Progress: 14/16 tasks done (88%)
- Next Up: VL-015 - Form Validation & Input Components

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
│   │   │   ├── venues/    # ✅ Venue Discovery Feature (VL-008/009)
│   │   │   │   ├── components/    # VenueBrowse, VenueCard, VenueDetail, etc.
│   │   │   │   ├── hooks/         # useVenues, useVenueSearch, useVenueFilters, useVenueDetail
│   │   │   │   ├── types/         # Venue interfaces
│   │   │   │   ├── constants/     # Gradients, labels, query keys, mock data
│   │   │   │   └── utils/         # formatPrice, formatCapacity, formatAddress, buildMapsUrl
│   │   │   ├── bookings/ # ✅ Booking Request Form (VL-010)
│   │   │   │   ├── components/    # BookingForm, EventDetailsStep, ReviewStep, etc.
│   │   │   │   ├── hooks/         # useBookingForm, useCreateBooking, useBookingPage
│   │   │   │   ├── types/         # Booking interfaces, BookingStatus enum
│   │   │   │   ├── constants/     # Validation rules, messages, step config
│   │   │   │   └── utils/         # calculateCost, validateDate, formatBookingDate
│   │   │   └── venue-admin/ # ✅ Venue Admin Dashboard (VL-011)
│   │   │       ├── components/    # AdminDashboard, StatsGrid, BookingCard, etc.
│   │   │       ├── hooks/         # useVenueStats, useVenueBookings, useBookingActions
│   │   │       ├── types/         # VenueStats, AdminBooking interfaces
│   │   │       └── constants/     # Status colors, labels, mock data
│   │   ├── components/    # Shared UI components
│   │   ├── layout/        # Layout wrappers
│   │   ├── lib/
│   │   │   ├── api/             # ✅ Type-Safe API Client (VL-013)
│   │   │   │   ├── client.ts          # Axios instance with deferred init
│   │   │   │   ├── constants.ts       # Timeout, retry config, error messages
│   │   │   │   ├── error-handler.ts   # Error normalization (ApiError shape)
│   │   │   │   ├── interceptors.ts    # Auth, error, retry interceptors
│   │   │   │   ├── types/             # ApiError, HttpStatus, ApiErrorCode
│   │   │   │   └── endpoints/         # Typed API functions (venues, bookings)
│   │   │   └── react-query/     # ✅ React Query Infrastructure (VL-014)
│   │   │       ├── client.ts          # QueryClient with optimized defaults
│   │   │       ├── constants.ts       # Stale times, GC times, refetch intervals
│   │   │       ├── keys/              # Centralized query key factory
│   │   │       └── hooks/             # Query/mutation hooks (venues, bookings)
│   │   ├── providers/     # QueryProvider + ReactQueryDevtools
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
├── shared/                # ✅ Shared TypeScript Types (VL-012)
│   └── src/
│       ├── enums/         # UserRole, OrganizationType, VenueType, BookingStatus
│       ├── entities/      # User, Organization, Venue, Booking interfaces
│       ├── api/           # Pagination, errors, filters, requests, responses
│       ├── constants/     # Validation limits, field lengths
│       ├── guards/        # Type guards for runtime validation
│       └── index.ts       # Main barrel export
│
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

## 🌐 API Client & Data Layer (VL-013 + VL-014)

### API Client Architecture
**Layered design with strict separation of concerns:**
- **Types** (`types/`): ApiError, HttpStatus, ApiErrorCode, PaginatedResponse
- **Constants** (`constants.ts`): Timeout, retry config, error messages, base URL
- **Error Handler** (`error-handler.ts`): Normalizes all failure modes into ApiError shape
- **Interceptors** (`interceptors.ts`): Auth token injection, error normalization, retry with backoff
- **Client** (`client.ts`): Axios singleton with deferred initialization
- **Endpoints** (`endpoints/`): Typed API functions with snake→camel transformation

### Features
- ✅ Type-safe API calls with request/response contracts
- ✅ Automatic JWT injection via Clerk `getToken()`
- ✅ Error normalization (network, timeout, HTTP status → ApiError)
- ✅ Retry with exponential backoff (3 attempts, 1s/2s/4s)
- ✅ 401 triggers auth failure callback (logout + redirect)
- ✅ Environment variable validation on startup
- ✅ Snake-to-camel case transformation per endpoint

### React Query Cache Strategy
| Entity | Stale Time | GC Time | Refetch |
|--------|-----------|---------|---------|
| Venues | 10 min | 30 min | On window focus |
| Bookings | 2 min | 30 min | On window focus |
| Stats | 1 min | 30 min | Auto-poll (60s) |
| User Profile | 15 min | 30 min | On window focus |
| Events | 5 min | 30 min | On window focus |

### Files Created
```
frontend/src/lib/
├── api/                         # Type-Safe API Client
│   ├── client.ts               # Axios instance + initializeApiClient()
│   ├── constants.ts            # Config values, error messages
│   ├── error-handler.ts        # normalizeError(), isApiError()
│   ├── interceptors.ts         # Auth, error, retry interceptors
│   ├── types/
│   │   └── api-error.ts       # ApiError, HttpStatus, ApiErrorCode
│   ├── endpoints/
│   │   ├── venues.ts          # 5 typed venue API functions
│   │   └── bookings.ts        # 5 typed booking API functions
│   └── index.ts               # Barrel export
└── react-query/                # React Query Infrastructure
    ├── client.ts              # QueryClient with optimized defaults
    ├── constants.ts           # Stale times, GC times, refetch intervals
    ├── keys/
    │   └── query-keys.ts     # Centralized key factory (4 entities)
    ├── hooks/
    │   ├── useVenuesQuery.ts # Query + detail + prefetch hooks
    │   └── useBookingsQuery.ts # Mutation + query hooks
    └── index.ts              # Barrel export
```

---

## 📦 Shared Types Package (VL-012)

### Package Overview
**Name**: `@venuelink/shared`
**Location**: `shared/src/`

Centralized TypeScript types and constants used across frontend.
All enums match PostgreSQL ENUM types exactly.

### Exports

| Category | Count | Examples |
|----------|-------|----------|
| Enums | 4 | `UserRole`, `VenueType`, `BookingStatus`, `OrganizationType` |
| Entities | 15+ | `User`, `Venue`, `Booking`, `Organization`, summaries |
| API Types | 20+ | `PaginatedResponse<T>`, `ApiError`, `CreateBookingRequest` |
| Constants | 25+ | `VENUE_CAPACITY_MAX`, `BOOKING_MIN_NOTICE_DAYS` |
| Type Guards | 10 | `isVenueType()`, `isApiError()`, `assertUserRole()` |

### Usage

```typescript
// Direct import from shared package
import {
  UserRole,
  VenueType,
  Venue,
  isVenueType,
  VENUE_CAPACITY_MAX
} from '@venuelink/shared';

// Feature types re-export from shared for backward compatibility
import { VenueType, Venue } from '@/features/venues/types';
```

### Key Features
- ✅ All enums use string values matching PostgreSQL
- ✅ JSDoc on all interfaces and enums
- ✅ Type guards for runtime validation
- ✅ Validation constants matching backend Pydantic schemas
- ✅ Barrel exports for clean imports
- ✅ Zero `any` types, strict mode enabled

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
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🚀 Next Steps

### Phase 2: Core Features (Complete)
- ~~**VL-006**: Student Org Dashboard Foundation~~ ✅
- ~~**VL-007**: Venue Management Backend API~~ ✅
- ~~**VL-008**: Venue Discovery Frontend~~ ✅
- ~~**VL-009**: Venue Details Page~~ ✅
- ~~**VL-010**: Booking Request Form~~ ✅
- ~~**VL-011**: Venue Admin Dashboard~~ ✅

### Phase 3: Supporting Systems (In Progress)
- ~~**VL-012**: Shared TypeScript Types & Constants~~ ✅
- ~~**VL-013**: API Client & Error Handling~~ ✅
- ~~**VL-014**: React Query Setup & Cache Strategy~~ ✅
- **VL-015**: Form Validation & Input Components

---

## 📊 Key Metrics

### Codebase Stats
- **Backend Python files**: ~35 (includes venues module)
- **Frontend feature files**: ~100+ (auth + dashboard + venues + bookings + venue-admin + shared UI)
- **Database tables**: 4
- **Migration count**: 1
- **API endpoints**: 13 (auth: 1, venues: 5, plus 7 planned)
- **Frontend API functions**: 10 typed endpoints (5 venues, 5 bookings)
- **Type coverage**: 100% (mypy strict mode, TypeScript strict mode)
- **Linting errors**: 0 (ruff + ESLint clean)
- **Test coverage**: 0% (no tests yet)
- **Lines of code (Python)**: ~850 (venues module alone)

### Dashboard Feature Stats
- **Components**: 7 (DashboardPage, ActionCard, QuickActionsGrid, EventCard, UpcomingEvents, EventsEmptyState, EventsLoadingSkeleton)
- **Hooks**: 2 (useUpcomingEvents, useOrganization)
- **React Query**: Configured with 5-min stale time

### Venue Feature Stats (VL-008 + VL-009)
- **Components**: 16 (Browse + Detail page components)
- **Hooks**: 6 (useVenues, useVenueSearch, useVenueFilters, useVenueDetail, useVenueBrowse, useVenueDetailPage)
- **Utilities**: 4 (formatPrice, formatCapacity, formatAddress, buildMapsUrl)

### Booking Feature Stats (VL-010)
- **Components**: 9 (BookingForm, EventDetailsStep, AdditionalInfoStep, ReviewStep, BookingSummary, BookingSuccess, VenueSummaryCard, BookingFormSkeleton, BookingNotFound)
- **Hooks**: 3 (useBookingForm, useCreateBooking, useBookingPage)
- **Utilities**: 5 (calculateCost, getMinBookingDate, getMaxBookingDate, formatBookingDate, formatBookingTime)
- **Validation**: React Hook Form + Zod, progressive per-step validation
- **Form**: 3-step Mantine Stepper with DatePickerInput, TimeInput, NumberInput

### Venue Admin Feature Stats (VL-011)
- **Components**: 6 (AdminDashboard, StatsGrid, StatCard, BookingsList, BookingCard, AccessDenied)
- **Hooks**: 4 (useVenueStats, useVenueBookings, useBookingActions, useAdminDashboard)
- **Features**: Optimistic updates, 60s auto-refresh, role-based access guard
- **Shared UI**: Reusable Breadcrumbs component (components/ui/Breadcrumbs/)
- **React Query**: 10-min stale time, detail query keyed by venue ID
- **URL-synced**: Filter state in search params (?type=bar&search=rooftop)

### API Client Stats (VL-013)
- **Files**: 8 (client, constants, error-handler, interceptors, types, 2 endpoints, barrel)
- **Typed endpoints**: 10 (getVenues, getVenue, createVenue, updateVenue, deleteVenue, createBooking, getVenueBookings, getVenueStats, acceptBooking, declineBooking)
- **Error codes**: 10 (network, timeout, validation, auth, authz, not-found, conflict, rate-limit, server, unknown)
- **Interceptors**: 3 (auth token, error normalization, retry with exponential backoff)
- **Retry**: Max 3 attempts, exponential backoff (1s, 2s, 4s), retryable status codes only

### React Query Infrastructure Stats (VL-014)
- **Files**: 7 (client, constants, query-keys, 2 hooks, 2 barrels)
- **Query hooks**: 5 (useVenuesQuery, useVenueDetailQuery, useVenueBookingsQuery, useVenueStatsQuery, usePrefetchVenue)
- **Mutation hooks**: 3 (useCreateBookingMutation, useBookingActionMutations)
- **Query key entities**: 4 (venues, bookings, admin, dashboard)
- **Stale times**: Venues (10m), Bookings (2m), Stats (1m), User Profile (15m), Events (5m)
- **DevTools**: Integrated in development, tree-shaken in production

### Shared Types Package Stats (VL-012)
- **Files**: 26 (5 enums, 4 entities, 5 API types, 2 constants, 5 guards, 5 barrels)
- **Enums**: 4 (UserRole, OrganizationType, VenueType, BookingStatus)
- **Entity interfaces**: 15 (User, Organization, Venue, Booking + variants)
- **API types**: 20+ (requests, responses, pagination, filters, errors)
- **Validation constants**: 25+ (all matching backend Pydantic schemas)
- **Type guards**: 10 (isVenueType, isUserRole, isApiError, etc. + assert variants)
- **Package size**: ~1,700 lines TypeScript
- **Exports**: ~150 named exports via barrel files

### Quality Gates
- ✅ All commits pass pre-commit hooks
- ✅ All PRs pass CI pipeline
- ✅ Zero mypy errors (strict mode)
- ✅ Zero ruff violations
- ✅ Black formatting enforced

---

**Repository maintained by**: VenueLink Engineering Team