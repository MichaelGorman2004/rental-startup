# VenueLink Repository Context

> **Last Updated**: 2026-03-11
> **Status**: Phase 3 Complete + Signup Webhook Integration + UI Redesign

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
- ✅ **VL-015**: Bookings List & Management
- ✅ **VL-016**: Organization Profile Management
- ✅ **VL-017**: Settings & User Account Management
- ✅ **VL-018**: Role-Based Access Control (Frontend)
- ✅ **VL-019**: Database Schema Extension for New Features
- ✅ **VL-020**: Clerk Webhook Integration & Signup Sync

### Current Phase
**Phase 3: Supporting Systems** (Complete) + **Signup Webhook Integration**
- Progress: 20/20 core tasks done (100%)
- **NEW**: Clerk webhook refactored to BACKEND_RULES.md standards
- **NEW**: Users, Organizations, and Venues auto-created on signup
- UI Redesign: "Warm Night" design system — copper/bronze accents, DM Sans + Playfair Display, rounded 14px corners
- Booking Backend: Full API implementation with `event_start_time`/`event_end_time`, time conflict detection
- Blocker: Frontend venues still use mock data (booking fails UUID validation)
- Next Phase: Wire venues to real API, then Phase 4 - Testing & Refinement

---

## 🏗️ Current Architecture

### Tech Stack
**Frontend**
- React 18 + TypeScript (strict mode)
- Vite dev server
- Mantine UI v7 ("Warm Night" theme — copper primary, dark scheme forced)
- Icons: Phosphor Icons (`@phosphor-icons/react`)
- Typography: DM Sans (body) + Playfair Display (headings) via Google Fonts
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
│   │   │   │   ├── components/    # DashboardPage, DashboardStats, StatCard, ActionCard, EventCard, QuickActionsGrid, UpcomingEvents
│   │   │   │   ├── hooks/         # useUpcomingEvents, useOrganization
│   │   │   │   ├── types/         # Dashboard interfaces (QuickAction, OrganizationData)
│   │   │   │   └── constants/     # Quick actions config, stat definitions, labels
│   │   │   ├── venues/    # ✅ Venue Discovery Feature (VL-008/009)
│   │   │   │   ├── components/    # VenueBrowse, VenueCard, VenueDetail, etc.
│   │   │   │   ├── hooks/         # useVenues, useVenueSearch, useVenueFilters, useVenueDetail
│   │   │   │   ├── types/         # Venue interfaces
│   │   │   │   ├── constants/     # Gradients, labels, query keys, mock data
│   │   │   │   └── utils/         # formatPrice, formatCapacity, formatAddress, buildMapsUrl
│   │   │   ├── bookings/ # ✅ Booking Request Form (VL-010) + Management (VL-015)
│   │   │   │   ├── components/    # BookingForm, BookingsPage, BookingHistoryCard, FilterBar, etc.
│   │   │   │   ├── hooks/         # useBookingForm, useCreateBooking, useBookingsPage, useCancelBooking
│   │   │   │   ├── types/         # Booking interfaces, BookingStatus enum
│   │   │   │   ├── constants/     # Validation rules, messages, step config
│   │   │   │   └── utils/         # calculateCost, validateDate, formatBookingDate
│   │   │   ├── organization/ # ✅ Organization Profile Management (VL-016)
│   │   │   │   ├── components/    # OrgProfilePage, OrgProfileForm, OrgProfileCard, Skeleton
│   │   │   │   ├── hooks/         # useOrgProfile, useOrgProfilePage, useUpdateOrg
│   │   │   │   ├── types/         # Organization interfaces
│   │   │   │   └── constants/     # Organization UI defaults
│   │   │   ├── settings/ # ✅ Settings & Account Management (VL-017)
│   │   │   │   ├── components/    # SettingsPage, AccountTab, OrganizationTab, SignOutButton
│   │   │   │   ├── hooks/         # useSettingsPage
│   │   │   │   ├── types/         # Settings interfaces
│   │   │   │   └── constants/     # Settings UI defaults
│   │   │   ├── venue-admin/ # ✅ Venue Admin Dashboard (VL-011)
│   │   │   │   ├── components/    # AdminDashboard, StatsGrid, BookingCard, etc.
│   │   │   │   ├── hooks/         # useVenueStats, useVenueBookings, useBookingActions
│   │   │   │   ├── types/         # VenueStats, AdminBooking interfaces
│   │   │   │   └── constants/     # Status colors, labels, mock data
│   │   │   └── landing/     # ✅ Landing Page + Prerelease Interest Form
│   │   │       ├── components/    # LandingPage, Hero, FeaturedVenues, InterestForm
│   │   │       ├── hooks/         # useScrollAnimation, useInterestForm
│   │   │       ├── types/         # Landing page interfaces
│   │   │       └── constants/     # Landing page content, form config
│   │   ├── components/    # Shared UI components
│   │   ├── layout/        # Layout wrappers (VL-018)
│   │   │   ├── components/    # AppShell, Header (top-nav), Sidebar (mobile drawer), HeaderUserMenu, RoleGuard
│   │   │   └── index.ts       # Layout exports
│   │   ├── lib/
│   │   │   ├── api/             # ✅ Type-Safe API Client (VL-013, VL-015, VL-016)
│   │   │   │   ├── client.ts          # Axios instance with deferred init
│   │   │   │   ├── constants.ts       # Timeout, retry config, error messages
│   │   │   │   ├── error-handler.ts   # Error normalization (ApiError shape)
│   │   │   │   ├── interceptors.ts    # Auth, error, retry interceptors
│   │   │   │   ├── types/             # ApiError, HttpStatus, ApiErrorCode
│   │   │   │   └── endpoints/         # Typed API functions (venues, bookings, organizations)
│   │   │   ├── constants/       # ✅ Shared UI Constants (VL-015, VL-018)
│   │   │   │   └── booking-status.ts  # Booking status colors, labels
│   │   │   └── react-query/     # ✅ React Query Infrastructure (VL-014)
│   │   │       ├── client.ts          # QueryClient with optimized defaults
│   │   │       ├── constants.ts       # Stale times, GC times, refetch intervals
│   │   │       ├── keys/              # Centralized query key factory
│   │   │       └── hooks/             # Query/mutation hooks (venues, bookings, organizations)
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
│   │   │   ├── bookings/             # ✅ Booking Management Module (VL-015)
│   │   │   │   ├── models.py         # ✅ Booking SQLAlchemy model
│   │   │   │   ├── schemas.py        # ✅ Pydantic schemas
│   │   │   │   ├── services.py       # ✅ Business logic
│   │   │   │   ├── repository.py     # ✅ Data access layer
│   │   │   │   ├── router.py         # ✅ API endpoints
│   │   │   │   ├── constants/
│   │   │   │   │   ├── errors.py     # ✅ Error messages
│   │   │   │   │   └── validation.py # ✅ Validation rules
│   │   │   │   └── __init__.py
│   │   │   ├── organizations/        # ✅ Organization Module (VL-016)
│   │   │   │   ├── models.py         # ✅ Organization model (type/university nullable)
│   │   │   │   ├── schemas.py        # ✅ Pydantic schemas
│   │   │   │   ├── services.py       # ✅ Business logic
│   │   │   │   ├── repository.py     # ✅ Data access layer + create()
│   │   │   │   ├── router.py         # ✅ API endpoints
│   │   │   │   ├── dependencies.py   # ✅ Dependency injection
│   │   │   │   ├── constants/
│   │   │   │   │   ├── errors.py     # ✅ Error messages
│   │   │   │   │   └── validation.py # ✅ Validation rules
│   │   │   │   └── __init__.py
│   │   │   └── webhooks/             # ✅ Clerk Webhook Module (VL-020)
│   │   │       ├── router.py         # ✅ Thin controller, POST /clerk
│   │   │       ├── services.py       # ✅ Business logic (sync user/org/venue)
│   │   │       ├── schemas.py        # ✅ ClerkWebhookEvent, ClerkUserData
│   │   │       ├── constants/
│   │   │       │   ├── clerk.py      # ✅ Clerk API constants
│   │   │       │   └── errors.py     # ✅ Webhook error messages
│   │   │       └── __init__.py
│   │   └── main.py                   # ✅ FastAPI app with all routers
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
│   ├── BOOKINGS.md       # Booking system architecture documentation
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
- Columns: name (required), type (enum, nullable), university (nullable), owner_id (FK → users)
- Timestamps: created_at, updated_at
- Relationships: ← user (owner), → bookings
- Note: type/university nullable for minimal signup, completed in profile

**venues**
- Primary key: UUID v4
- Columns: name (required), type (enum, nullable), capacity (nullable), base_price_cents (nullable), address fields, owner_id (FK → users)
- Timestamps: created_at, updated_at, deleted_at (soft delete)
- Constraints: capacity > 0 when set, base_price_cents >= 0 when set
- Relationships: ← user (owner), → bookings
- Note: type/capacity/price nullable for minimal signup, completed in profile

**bookings**
- Primary key: UUID v4
- Columns: venue_id (FK), organization_id (FK), event_date, event_start_time, event_end_time, guest_count, event_name, special_requests, status (enum)
- Computed: event_duration (from start/end times)
- Timestamps: created_at, updated_at
- Constraints: UNIQUE(venue_id, event_date, event_start_time), guest_count > 0, event_end_time > event_start_time
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
- bookings(venue_id, event_date, event_start_time) (composite, unique)
- bookings(venue_id, event_date, event_start_time, event_end_time) (composite, for conflict detection)

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

## 🔗 Clerk Webhook Integration (VL-020)

### Overview
Clerk webhook handles `user.created` events to:
1. Sync role from `unsafeMetadata` to `publicMetadata` in Clerk (for JWT claims)
2. Create User record in PostgreSQL database
3. Create Organization (student_org) or Venue (venue_admin) based on role

### Architecture
**Follows BACKEND_RULES.md pattern:**
- **Router** (`router.py`): Thin controller, webhook signature verification
- **Service** (`services.py`): Business logic for syncing to Clerk API and database
- **Schemas** (`schemas.py`): Pydantic models for Clerk webhook payload
- **Constants** (`constants/`): Clerk API URLs, metadata keys, error messages

### Webhook Flow
```
Clerk user.created → POST /api/v1/webhooks/clerk
  ├── Verify svix signature
  ├── Parse ClerkWebhookEvent
  ├── Sync role to Clerk publicMetadata (API call)
  └── Create in PostgreSQL:
      ├── User record
      └── Organization (student_org) OR Venue (venue_admin)
```

### Files Created
```
backend/app/modules/webhooks/
├── __init__.py              # Module export
├── router.py                # ~50 lines - Webhook endpoint
├── services.py              # ~130 lines - Sync logic
├── schemas.py               # ~45 lines - Payload models
└── constants/
    ├── __init__.py         # Barrel export
    ├── clerk.py            # API URL, event types, metadata keys
    └── errors.py           # Error message enum
```

### Database Changes
**Migration**: `make_org_venue_fields_nullable`
- Organizations: `type`, `university` → nullable
- Venues: `type`, `capacity`, `base_price_cents` → nullable
- Check constraints updated to allow NULL

### Repository Methods Added
- `OrganizationRepository.create(db, name, owner_id)` - Minimal creation
- `VenueRepository.create_minimal(db, name, owner_id)` - Minimal creation
- `VenueRepository.get_by_owner_id(db, owner_id)` - Lookup for idempotency

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
- ✅ **TypeScript strict mode**: Enabled (`noImplicitAny`, `strictNullChecks`, `noPropertyAccessFromIndexSignature`)
- ✅ **ESLint**: Airbnb + React Hooks rules
- ✅ **Prettier**: Consistent formatting
- ✅ **No `any` types**: Enforced
- ✅ **Component size**: < 150 lines per FRONTEND_RULES.md
- ✅ **Function size**: < 15 lines per FRONTEND_RULES.md
- ✅ **No raw HTML**: Mantine primitives only (Box, Text, Button, etc.)
- ✅ **No hardcoded colors/values**: Theme tokens + CSS variables
- ✅ **CSS modules**: Component-scoped styles, no global overrides or `!important`

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

### Phase 3: Supporting Systems (Complete)
- ~~**VL-012**: Shared TypeScript Types & Constants~~ ✅
- ~~**VL-013**: API Client & Error Handling~~ ✅
- ~~**VL-014**: React Query Setup & Cache Strategy~~ ✅
- ~~**VL-015**: Bookings List & Management~~ ✅
- ~~**VL-016**: Organization Profile Management~~ ✅
- ~~**VL-017**: Settings & User Account Management~~ ✅
- ~~**VL-018**: Role-Based Access Control (Frontend)~~ ✅
- ~~**VL-019**: Database Schema Extension for New Features~~ ✅
- ~~**VL-020**: Clerk Webhook Integration & Signup Sync~~ ✅

### Phase 4: Testing & Refinement (Next)
- **VL-021**: Unit Tests - Backend API
- **VL-022**: Unit Tests - Frontend Components
- **VL-023**: Integration Tests - API Flows
- **VL-024**: E2E Tests - Critical User Paths
- **VL-025**: Performance & Error Handling Refinement

---

## 📊 Key Metrics

### Codebase Stats
- **Backend Python files**: ~70+ (venues, bookings, organizations, webhooks modules)
- **Frontend feature files**: ~150+ (auth, dashboard, venues, bookings, organization, settings, venue-admin)
- **Database tables**: 4
- **Migration count**: 4 (includes make_org_venue_fields_nullable)
- **API endpoints**: 21 (auth: 1, venues: 6, bookings: 6, organizations: 3, webhooks: 1, plus utilities)
- **Frontend API functions**: 16+ typed endpoints (venues, bookings, organizations)
- **Type coverage**: 100% (mypy strict mode, TypeScript strict mode)
- **Linting errors**: 0 (ruff + ESLint clean)
- **Test coverage**: 0% (no tests yet)
- **Lines of code (Python)**: ~2700+ (venues, bookings, organizations, webhooks modules)

### Dashboard Feature Stats
- **Components**: 9 (DashboardPage, DashboardStats, StatCard, ActionCard, QuickActionsGrid, EventCard, UpcomingEvents, EventsEmptyState, EventsLoadingSkeleton)
- **Hooks**: 2 (useUpcomingEvents, useOrganization)
- **Sections**: Stats row (3-column), Quick Actions (4-column with descriptions), Upcoming Events (horizontal cards with status)
- **React Query**: Configured with 5-min stale time

### Venue Feature Stats (VL-008 + VL-009)
- **Components**: 16 (Browse + Detail page components)
- **Hooks**: 6 (useVenues, useVenueSearch, useVenueFilters, useVenueDetail, useVenueBrowse, useVenueDetailPage)
- **Utilities**: 4 (formatPrice, formatCapacity, formatAddress, buildMapsUrl)

### Booking Feature Stats (VL-010 + VL-015)
- **Components**: 14+ (BookingForm, EventDetailsStep, ReviewStep, BookingsPage, BookingHistoryCard, BookingsFilterBar, BookingsEmptyState, BookingsPageSkeleton, etc.)
- **Hooks**: 6 (useBookingForm, useCreateBooking, useBookingPage, useBookingsPage, useMyBookings, useCancelBooking)
- **Utilities**: 6 (calculateCost, getMinBookingDate, getMaxBookingDate, formatBookingDate, formatBookingTime, formatDateToISO)
- **Validation**: React Hook Form + Zod, progressive per-step validation
- **Form**: 3-step Mantine Stepper with DatePickerInput, 2x TimeInput (start/end), NumberInput
- **API Functions**: createBooking, getMyBookings (paginated), cancelBooking, acceptBooking, declineBooking, getVenueBookings
- **Backend Integration**: All booking APIs wired to real endpoints (venues still mocked)
- **Documentation**: See `docs/BOOKINGS.md` for full architecture details

### Organization Feature Stats (VL-016)
- **Components**: 4 (OrgProfilePage, OrgProfileForm, OrgProfileCard, OrgProfileSkeleton)
- **Hooks**: 3 (useOrgProfile, useOrgProfilePage, useUpdateOrg)
- **API Functions**: getMyOrganization, getOrganization, updateOrganization
- **React Query**: Organization entity with me() endpoint

### Settings Feature Stats (VL-017)
- **Components**: 4 (SettingsPage, AccountTab, OrganizationTab, SignOutButton)
- **Hooks**: 1 (useSettingsPage)
- **Features**: Tabbed interface with account and organization management
- **Integrations**: Clerk signOut, organization profile management

### Layout & RBAC Stats (VL-018)
- **Components**: 5 (AppShell, Header, Sidebar, RoleGuard, HeaderUserMenu)
- **Layout**: Top-nav header (64px, sticky, backdrop blur) + mobile drawer sidebar
- **Features**: Role-based route protection, role-filtered nav items, user avatar menu with account/signout
- **Routes Protected**: student_org and venue_admin specific routes

### UI Design System ("Warm Night")
- **Theme file**: `frontend/src/theme/index.ts` — Mantine v7 `createTheme()` with custom `copper` + `surface` color palettes
- **CSS variables**: `frontend/src/theme/css-variables.ts` — 17 custom `--vl-*` tokens via `cssVariablesResolver`
- **Global styles**: `frontend/src/global.css` — noise grain overlay, fade-up keyframes, custom scrollbar
- **Color scheme**: Forced dark mode, deep charcoal backgrounds (#0e0e10, #1a1a20), warm copper accents (#d4845a)
- **Typography**: DM Sans (body, variable font), Playfair Display (headings, serif)
- **Radius**: 14px default, consistent rounded corners via theme
- **Icons**: Phosphor Icons (`@phosphor-icons/react`) — lightweight, consistent weight system
- **Patterns**: CSS modules for component styles, `Component.extend()` for global defaults, CSS custom property pattern for dynamic values
- **Animations**: Staggered `vl-fade-up` on page load, `translateY`/`translateX` hover transitions, gradient glow overlays on action cards

### Landing Page Feature Stats
- **Components**: 8+ (LandingPage, Hero, FeaturedVenues, InterestForm, Footer, etc.)
- **Hooks**: 2 (useScrollAnimation, useInterestForm)
- **Features**: Prerelease interest form, featured venues showcase, scroll animations
- **Form**: Email/name capture for early access waitlist
- **Design**: "Warm Night" theme, responsive hero section, fade-up animations

### Venue Admin Feature Stats (VL-011)
- **Components**: 6 (AdminDashboard, StatsGrid, StatCard, BookingsList, BookingCard, AccessDenied)
- **Hooks**: 4 (useVenueStats, useVenueBookings, useBookingActions, useAdminDashboard)
- **Features**: Optimistic updates, 60s auto-refresh, role-based access guard
- **Shared UI**: Reusable Breadcrumbs component (components/ui/Breadcrumbs/)
- **React Query**: 10-min stale time, detail query keyed by venue ID
- **URL-synced**: Filter state in search params (?type=bar&search=rooftop)

### API Client Stats (VL-013, VL-015, VL-016)
- **Files**: 11+ (client, constants, error-handler, interceptors, types, 3 endpoint files, barrels)
- **Typed endpoints**: 16+ (venues: 5, bookings: 7, organizations: 4)
- **Bookings endpoints**: getMyBookings (paginated), cancelBooking, plus existing create/admin endpoints
- **Organizations endpoints**: getMyOrganization, getOrganization, updateOrganization
- **Error codes**: 10 (network, timeout, validation, auth, authz, not-found, conflict, rate-limit, server, unknown)
- **Interceptors**: 3 (auth token, error normalization, retry with exponential backoff)
- **Retry**: Max 3 attempts, exponential backoff (1s, 2s, 4s), retryable status codes only

### React Query Infrastructure Stats (VL-014, VL-015, VL-016)
- **Files**: 8+ (client, constants, query-keys, 3 hooks, 2 barrels)
- **Query hooks**: 8+ (venues: 3, bookings: 3, organizations: 2, admin: 3)
- **Mutation hooks**: 4+ (createBooking, bookingActions, updateOrganization, organizations)
- **Query key entities**: 5 (venues, bookings, organizations, admin, dashboard)
- **Stale times**: Venues (10m), Bookings (2m), Stats (1m), Organizations (15m), Events (5m)
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

### Webhook Module Stats (VL-020)
- **Files**: 6 (router, services, schemas, 3 constants files)
- **Lines of code**: ~225 Python
- **Features**: Svix signature verification, idempotent user/org/venue creation
- **External APIs**: Clerk Backend API (PATCH /users/{id}/metadata)
- **Database operations**: User, Organization, Venue creation via repositories

### Quality Gates
- ✅ All commits pass pre-commit hooks
- ✅ All PRs pass CI pipeline
- ✅ Zero mypy errors (strict mode)
- ✅ Zero ruff violations
- ✅ Black formatting enforced

---

**Repository maintained by**: VenueLink Engineering Team