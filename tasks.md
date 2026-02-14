# VenueLink Development Tasks

> **Code Quality Standard**: Every line of code must meet Google-level engineering standards. Zero tolerance for shortcuts, magic values, or architectural compromises.

---

## Task 1: Project Foundation & Monorepo Setup

**ID**: `VL-001`
**Title**: Initialize Monorepo Structure with Build Pipeline
**Priority**: 🔴 Critical
**Estimated Effort**: 6 hours
**Dependencies**: None

### Description
Establish the foundational monorepo architecture using industry-standard tooling. This includes workspace configuration, linting, formatting, type checking, and CI/CD pipeline setup.

### Technical Requirements
- **Monorepo**: Configure workspace structure (frontend/, backend/, shared/)
- **Frontend**: Vite + React 18 + TypeScript (strict mode)
- **Backend**: FastAPI + Python 3.11+ with async support
- **Linting**: ESLint (Airbnb config + React Hooks), Ruff (Python)
- **Formatting**: Prettier (frontend), Black (backend)
- **Type Checking**: TypeScript strict mode, mypy for Python
- **Git Hooks**: Husky + lint-staged for pre-commit validation
- **CI/CD**: GitHub Actions workflow (lint, type-check, test)

### Acceptance Criteria
- [ ] Monorepo structure matches architectural spec in README.md
- [ ] `npm run lint` passes with zero warnings/errors (frontend)
- [ ] `ruff check .` passes with zero violations (backend)
- [ ] `npm run type-check` completes successfully with strict mode enabled
- [ ] Pre-commit hooks prevent commits with linting/formatting violations
- [ ] CI pipeline runs on every PR and blocks merge on failure
- [ ] All configuration files have comprehensive inline comments explaining choices
- [ ] Package.json scripts are well-documented with descriptions
- [ ] Lock files (package-lock.json, poetry.lock) are committed
- [ ] .gitignore and .dockerignore are comprehensive and follow best practices
- [ ] README includes setup instructions that work on fresh clone

### Code Quality Checkpoints
- ✅ Zero ESLint warnings (enforce as errors)
- ✅ TypeScript strict mode enabled (noImplicitAny, strictNullChecks, etc.)
- ✅ Consistent code formatting (Prettier + Black)
- ✅ Pre-commit hooks block non-compliant code
- ✅ All scripts use absolute imports (no relative path hell)

---

## Task 2: Database Schema Design & Migration Infrastructure

**ID**: `VL-002`
**Title**: PostgreSQL Schema with SQLAlchemy Models & Alembic
**Priority**: 🔴 Critical
**Estimated Effort**: 8 hours
**Dependencies**: `VL-001`

### Description
Design and implement the complete database schema for Users, Organizations, Venues, and Bookings. Utilize SQLAlchemy 2.0+ async patterns with rigorous type safety and constraint enforcement.

### Schema Requirements
**Tables:**
1. **users**
   - id (UUID, PK)
   - email (VARCHAR, UNIQUE, NOT NULL)
   - email_verified (BOOLEAN, DEFAULT false)
   - role (ENUM: 'student_org', 'venue_admin')
   - created_at, updated_at (TIMESTAMP)
   - Constraint: `CHECK (email LIKE '%@%.edu')` for student_org role

2. **organizations**
   - id (UUID, PK)
   - name (VARCHAR, NOT NULL)
   - type (ENUM: 'fraternity', 'sorority', 'club', 'other')
   - university (VARCHAR, NOT NULL)
   - owner_id (UUID, FK → users.id)
   - created_at, updated_at

3. **venues**
   - id (UUID, PK)
   - name (VARCHAR, NOT NULL)
   - type (ENUM: 'bar', 'restaurant', 'event_space', 'cafe')
   - capacity (INTEGER, NOT NULL)
   - base_price_cents (INTEGER, NOT NULL)
   - address_street, address_city, address_state, address_zip
   - owner_id (UUID, FK → users.id)
   - created_at, updated_at, deleted_at (soft delete)
   - Constraint: `CHECK (capacity > 0)`
   - Constraint: `CHECK (base_price_cents >= 0)`

4. **bookings**
   - id (UUID, PK)
   - venue_id (UUID, FK → venues.id)
   - organization_id (UUID, FK → organizations.id)
   - event_date (DATE, NOT NULL)
   - event_time (TIME, NOT NULL)
   - guest_count (INTEGER, NOT NULL)
   - status (ENUM: 'pending', 'confirmed', 'rejected', 'completed', 'cancelled')
   - created_at, updated_at
   - UNIQUE(venue_id, event_date, event_time) to prevent double-booking

### Technical Implementation
- **ORM**: SQLAlchemy 2.0 async models with proper type hints
- **Migrations**: Alembic with descriptive migration names
- **Indexes**: Strategic indexes on foreign keys and query-heavy columns
- **Constraints**: Database-level enforcement (NOT application-level only)
- **Enums**: Python Enums synced with PostgreSQL ENUM types
- **UUID**: Use UUID v4 for all primary keys (security + distribution)

### Acceptance Criteria
- [ ] All models use SQLAlchemy 2.0 async patterns (AsyncSession)
- [ ] Every column has explicit type hints (no implicit Any)
- [ ] All foreign keys have ON DELETE/ON UPDATE behavior specified
- [ ] Database constraints match application validation rules
- [ ] Indexes created for: user.email, venue.owner_id, booking.venue_id, booking.event_date
- [ ] Alembic migration creates schema cleanly on empty database
- [ ] Alembic downgrade fully reverses migration
- [ ] Models include __repr__ methods for debugging
- [ ] Enums are imported from shared constants (no duplication)
- [ ] All datetime fields use UTC timezone
- [ ] Soft delete implemented for venues (deleted_at column)

### Code Quality Checkpoints
- ✅ Zero mypy errors with strict mode
- ✅ All magic numbers extracted to constants (e.g., VARCHAR(255) → EMAIL_MAX_LENGTH)
- ✅ Comprehensive docstrings on all models (purpose, constraints, relationships)
- ✅ Type hints on all ORM relationships
- ✅ Migration files include comments explaining schema decisions

---

## Task 3: Authentication Service Integration

**ID**: `VL-003`
**Title**: Implement Auth Provider with .edu Email Validation
**Priority**: 🔴 Critical
**Estimated Effort**: 10 hours
**Dependencies**: `VL-002`

### Description
Integrate managed authentication provider (Clerk/Auth0/Supabase) with strict `.edu` email enforcement for student organizations. Implement role-based access control (RBAC) middleware.

### Technical Requirements
- **Provider**: Clerk (recommended for college student auth)
- **Email Validation**: Server-side `.edu` domain check on signup
- **Role Management**: Store user role in JWT claims
- **Session Management**: Secure HTTP-only cookies
- **CSRF Protection**: Token-based CSRF prevention
- **Rate Limiting**: Login attempts limited (5 per 15 min)

### Backend Implementation
**File Structure:**
```
backend/app/modules/auth/
├── __init__.py
├── models.py              # User SQLAlchemy model
├── schemas.py             # Pydantic request/response models
├── services.py            # Business logic (email validation, role assignment)
├── router.py              # API endpoints
├── middleware.py          # JWT validation, RBAC
├── dependencies.py        # FastAPI dependencies (get_current_user)
├── constants/
│   ├── __init__.py
│   └── auth-errors.ts     # Error messages, status codes
└── utils/
    ├── __init__.py
    └── email-validator.ts # .edu domain validation logic
```

### Frontend Implementation
**File Structure:**
```
frontend/src/features/auth/
├── components/
│   ├── LoginForm.tsx      # <15 lines, logic in hook
│   ├── SignupForm.tsx
│   └── RoleSelector.tsx
├── hooks/
│   ├── useAuth.ts         # All auth state/logic
│   ├── useLogin.ts
│   └── useSignup.ts
├── types/
│   └── auth.types.ts      # User, AuthState interfaces
├── constants/
│   └── auth.constants.ts  # Error messages, field names
└── index.ts               # Barrel exports
```

### Acceptance Criteria
- [ ] Student org signup requires valid `.edu` email (server-side validation)
- [ ] Email validation uses regex pattern stored in constants (no inline regex)
- [ ] Venue admin signup has no email restriction
- [ ] Role selection persisted in JWT claims and user record
- [ ] Invalid login returns specific error (not generic "invalid credentials")
- [ ] Password requirements enforced: min 12 chars, 1 uppercase, 1 number, 1 special
- [ ] All auth endpoints return standardized error response schema
- [ ] Frontend auth state managed in custom hook (not component state)
- [ ] Protected routes redirect to login with return URL
- [ ] Logout clears all client-side tokens and invalidates session
- [ ] RBAC middleware blocks cross-role access (student org can't access venue endpoints)

### Code Quality Checkpoints
- ✅ Zero hardcoded strings (error messages in constants)
- ✅ Email validator extracted to pure function (testable)
- ✅ All auth components < 15 lines (logic in hooks)
- ✅ useAuth hook returns memoized values
- ✅ Error boundaries wrap auth feature
- ✅ No `any` types in auth flow
- ✅ Middleware functions < 15 lines (extracted helpers)
- ✅ JWT validation errors logged with structured logging

---

## Task 4: Frontend Foundation & Mantine Setup

**ID**: `VL-004`
**Title**: Configure Mantine UI Theme System & Layout Architecture
**Priority**: 🔴 Critical
**Estimated Effort**: 6 hours
**Dependencies**: `VL-001`

### Description
Establish the Mantine UI foundation with custom theme configuration, layout primitives, and reusable component architecture adhering to FRONTEND_RULES.md.

### Technical Requirements
**Theme Configuration:**
- Custom color palette (dark mode primary)
- Spacing scale (4px base unit)
- Typography scale (Inter font family)
- Border radius tokens
- Shadow tokens

**Layout System:**
```
frontend/src/layout/
├── components/
│   ├── AppShell.tsx       # Root layout wrapper
│   ├── Header.tsx         # Top navigation
│   ├── Sidebar.tsx        # Side navigation (collapsed on mobile)
│   └── Footer.tsx
├── hooks/
│   └── useLayout.ts       # Layout state management
├── types/
│   └── layout.types.ts
└── index.ts
```

**Shared Components:**
```
frontend/src/components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Input/
│   ├── Card/
│   └── Badge/
└── index.ts
```

### Mantine Usage Standards
- **NO** raw HTML elements (`div`, `span`) - use `Box`, `Text`
- **NO** hardcoded colors - use `theme.colors`
- **NO** pixel values - use `theme.spacing`
- **NO** inline styles - use Mantine style props
- Wrap Mantine primitives in domain components for customization

### Acceptance Criteria
- [ ] MantineProvider configured with custom theme
- [ ] Theme tokens defined for: colors (8), spacing (7), fontSizes (6), radius (4)
- [ ] All layout components use Mantine primitives (AppShell, Stack, Group)
- [ ] Zero `div` or `span` elements in component files
- [ ] Custom Button component wraps Mantine Button with project defaults
- [ ] All spacing uses theme tokens (e.g., `mt="md"`, not `mt={16}`)
- [ ] Color references use theme paths (e.g., `c="gray.5"`, not `c="#888"`)
- [ ] Mobile-responsive breakpoints defined in theme
- [ ] AppShell implements collapsed sidebar on mobile (<768px)
- [ ] All components use strict TypeScript interfaces for props

### Code Quality Checkpoints
- ✅ Zero hardcoded style values (colors, spacing, sizes)
- ✅ Theme configuration file has comments explaining each token
- ✅ All components < 150 lines (extraction if exceeded)
- ✅ Layout hooks use Zustand for global state (not Context)
- ✅ Components wrapped in React.memo where appropriate
- ✅ No prop drilling (layout state via hook)

---

## Task 5: Authentication UI Implementation

**ID**: `VL-005`
**Title**: Build Login/Signup Forms with Role Selection
**Priority**: 🔴 Critical
**Estimated Effort**: 8 hours
**Dependencies**: `VL-003`, `VL-004`

### Description
Implement pixel-perfect authentication UI matching the mockup design with client-side validation, error handling, and role-based routing.

### UI Screens (from mockup)
1. **Login Screen**
   - VenueLink logo + tagline
   - Role selector (Student Org / Venue)
   - Email + Password inputs
   - Sign In button
   - Link to signup

2. **Signup Screen**
   - Same layout as login
   - Additional fields: Name, Organization/Venue Name
   - .edu email validation hint for Student Org role
   - Terms & Privacy checkboxes

### Component Architecture
```
features/auth/components/
├── LoginForm.tsx          # 10-15 lines, calls useLogin
├── SignupForm.tsx         # 10-15 lines, calls useSignup
├── RoleSelector.tsx       # Toggle between roles
├── AuthLayout.tsx         # Centered card layout
└── EmailInput.tsx         # Custom input with .edu validation hint
```

### Form Validation Strategy
- **Library**: React Hook Form + Zod schema validation
- **Validation**: Client-side (immediate feedback) + Server-side (authoritative)
- **Error Display**: Field-level errors below inputs
- **Debouncing**: Email availability check debounced 500ms

### Acceptance Criteria
- [ ] Login/Signup UI matches mockup pixel-perfectly (colors, spacing, typography)
- [ ] Role selector uses Mantine SegmentedControl (not custom implementation)
- [ ] Email field shows real-time validation (format + .edu for students)
- [ ] Password field has strength indicator (weak/medium/strong)
- [ ] Submit button disabled during API request (loading state)
- [ ] Error messages pulled from constants (no inline strings)
- [ ] Success redirects to appropriate dashboard (org vs venue)
- [ ] Form inputs use controlled components (React Hook Form)
- [ ] Validation schema defined in types file (not inline)
- [ ] All form logic in custom hooks (useLogin, useSignup)
- [ ] Components use Mantine Input/Button components (not custom)
- [ ] Loading states use Mantine Loader component
- [ ] Error boundaries catch form submission failures

### Code Quality Checkpoints
- ✅ LoginForm.tsx < 15 lines (all logic in useLogin hook)
- ✅ SignupForm.tsx < 15 lines (all logic in useSignup hook)
- ✅ Zero inline event handlers (use named handler functions)
- ✅ All handlers wrapped in useCallback
- ✅ Validation schema uses Zod (typed, reusable)
- ✅ Error messages in constants file
- ✅ No magic strings (field names, error codes)
- ✅ Form submission uses optimistic updates

---

## Task 6: Student Org Dashboard Foundation

**ID**: `VL-006`
**Title**: Build Dashboard Layout with Quick Actions Grid
**Priority**: 🟡 High
**Estimated Effort**: 6 hours
**Dependencies**: `VL-004`, `VL-005`

### Description
Implement the student organization dashboard home screen with navigation header, quick action cards, and upcoming events section matching the mockup design.

### UI Components (from mockup)
1. **Header**
   - VenueLink logo (left)
   - Organization badge showing org name
   - User avatar (right)

2. **Quick Actions Grid**
   - 2x2 grid of action cards
   - Cards: Browse Venues, My Bookings, Budget Tracker, Settings
   - Each card has icon + title

3. **Upcoming Events**
   - List of confirmed bookings
   - Each item: Date, Event Name, Venue Name

### Component Architecture
```
features/dashboard/
├── components/
│   ├── DashboardHeader.tsx     # Header with org badge
│   ├── QuickActionsGrid.tsx    # 2x2 action cards
│   ├── ActionCard.tsx          # Single action card
│   ├── UpcomingEvents.tsx      # Events list
│   └── EventItem.tsx           # Single event card
├── hooks/
│   ├── useDashboard.ts         # Dashboard state
│   └── useUpcomingEvents.ts    # Fetch upcoming bookings
├── types/
│   └── dashboard.types.ts
├── constants/
│   └── quick-actions.ts        # Action card data
└── index.ts
```

### Data Requirements
- **Quick Actions**: Static config array (icon, title, route)
- **Upcoming Events**: API endpoint `/api/v1/bookings?status=confirmed&org_id={id}`
- **User Context**: Current org name from auth context

### Acceptance Criteria
- [ ] Dashboard matches mockup layout and styling
- [ ] Header displays current organization name from auth state
- [ ] Quick actions grid uses Mantine Grid component (not custom CSS)
- [ ] Action cards navigate to respective routes on click
- [ ] Upcoming events fetched on mount using React Query
- [ ] Events sorted chronologically (soonest first)
- [ ] Empty state shown if no upcoming events ("No upcoming events")
- [ ] All icons use Tabler Icons (Mantine default)
- [ ] Action card data defined in constants file
- [ ] Loading skeleton displayed while fetching events
- [ ] Error state handled gracefully (retry button)
- [ ] All components responsive (mobile: 1 column, desktop: 2 columns)

### Code Quality Checkpoints
- ✅ DashboardHeader.tsx < 15 lines
- ✅ QuickActionsGrid.tsx < 15 lines (maps over constants)
- ✅ ActionCard.tsx < 15 lines
- ✅ Event fetching logic in useUpcomingEvents hook
- ✅ Quick actions config in constants/quick-actions.ts
- ✅ No hardcoded action data in components
- ✅ React Query cache configured (staleTime: 5 min)
- ✅ Components wrapped in React.memo
- ✅ No prop drilling (use context for org data)

---

## Task 7: Venue Management Backend API

**ID**: `VL-007`
**Title**: Implement Venue CRUD Endpoints with Validation
**Priority**: 🟡 High
**Estimated Effort**: 10 hours
**Dependencies**: `VL-002`, `VL-003`

### Description
Build RESTful API endpoints for venue profile management (Create, Read, Update, Delete) with role-based authorization and comprehensive input validation.

### API Endpoints
**Base Path**: `/api/v1/venues`

1. **POST /venues** - Create venue
   - Auth: Venue admin only
   - Body: name, type, capacity, base_price_cents, address
   - Returns: Created venue object

2. **GET /venues/:id** - Get single venue
   - Auth: Public (authenticated)
   - Returns: Full venue details

3. **GET /venues** - List venues with filters
   - Auth: Public (authenticated)
   - Query params: type, min_capacity, max_price, search
   - Returns: Paginated venue list

4. **PATCH /venues/:id** - Update venue
   - Auth: Venue admin (owner only)
   - Body: Partial venue fields
   - Returns: Updated venue object

5. **DELETE /venues/:id** - Soft delete venue
   - Auth: Venue admin (owner only)
   - Returns: 204 No Content

### Backend Architecture
```
backend/app/modules/venues/
├── models.py              # Venue SQLAlchemy model
├── schemas.py             # Pydantic request/response schemas
├── services.py            # Business logic (ownership check, filtering)
├── repository.py          # Data access layer
├── router.py              # API endpoints
├── dependencies.py        # Venue ownership verification
├── constants/
│   ├── venue-types.py     # Enum values
│   └── validation.py      # Min/max constraints
└── utils/
    ├── filters.py         # Query filter builders
    └── pagination.py      # Pagination helpers
```

### Validation Rules
- **name**: 3-100 chars, alphanumeric + spaces
- **type**: Must be in ENUM ('bar', 'restaurant', 'event_space', 'cafe')
- **capacity**: 10-500 (inclusive)
- **base_price_cents**: 10000-100000 ($100-$1000)
- **address**: All fields required

### Acceptance Criteria
- [ ] All endpoints follow RESTful conventions (proper HTTP verbs/status codes)
- [ ] Pydantic schemas validate all inputs (no invalid data reaches DB)
- [ ] PATCH endpoint updates only provided fields (not full replacement)
- [ ] DELETE performs soft delete (sets deleted_at, not hard delete)
- [ ] Ownership check prevents cross-venue modifications
- [ ] Pagination implemented (default: 20 per page, max: 100)
- [ ] Filtering supports multiple query params (combinable)
- [ ] Search param searches name + address fields (case-insensitive)
- [ ] All business logic in services.py (not in router.py)
- [ ] Repository pattern isolates DB queries
- [ ] Each function < 15 lines (extract helpers)
- [ ] OpenAPI docs auto-generated (visible at /docs)
- [ ] Error responses follow standard schema: {error: string, code: string}

### Code Quality Checkpoints
- ✅ Zero validation logic in router (use Pydantic schemas)
- ✅ All constants extracted (capacity limits, price limits)
- ✅ Repository functions return domain models (not DB rows)
- ✅ Services layer pure functions (testable without DB)
- ✅ All functions have docstrings (Google style)
- ✅ Type hints on all function signatures
- ✅ No magic numbers (e.g., 20 → DEFAULT_PAGE_SIZE)
- ✅ SQL injection prevention (parameterized queries)

---

## Task 8: Venue Discovery Frontend

**ID**: `VL-008`
**Title**: Build Venue Browse UI with Search & Filters
**Priority**: 🟡 High
**Estimated Effort**: 10 hours
**Dependencies**: `VL-004`, `VL-007`

### Description
Implement the venue browsing interface with real-time search, filter chips, and responsive venue cards matching the mockup design.

### UI Components (from mockup)
1. **Search Bar**
   - Debounced search input (500ms)
   - Search icon (Tabler Icons)
   - Placeholder: "Search venues..."

2. **Filter Chips**
   - Horizontal scrollable chip row
   - Chips: All (default), Bars, Restaurants, Event Spaces, Cafes
   - Active state styling

3. **Venue Grid**
   - Masonry-style grid (responsive)
   - Each card: Image, Name, Type, Capacity, Price
   - Hover effect (elevation + border)

### Component Architecture
```
features/venues/
├── components/
│   ├── VenueBrowse.tsx        # Main container
│   ├── VenueSearchBar.tsx     # Search input
│   ├── VenueFilters.tsx       # Filter chips
│   ├── VenueGrid.tsx          # Grid layout
│   ├── VenueCard.tsx          # Single venue card
│   └── VenueCardSkeleton.tsx  # Loading skeleton
├── hooks/
│   ├── useVenues.ts           # Fetch + filter logic
│   ├── useVenueSearch.ts      # Search state + debounce
│   └── useVenueFilters.ts     # Filter state
├── types/
│   └── venue.types.ts
├── constants/
│   ├── venue-types.ts         # Filter options
│   └── venue-defaults.ts      # Default values
└── index.ts
```

### State Management Strategy
- **Search**: Local state in useVenueSearch hook (debounced)
- **Filters**: URL query params (shareable, bookmarkable)
- **Venues**: React Query cache (invalidation on filter change)

### Acceptance Criteria
- [ ] Search input debounced 500ms before API call
- [ ] Filter chips update URL query params (e.g., ?type=bar)
- [ ] Venue cards match mockup styling (image placeholder, info layout)
- [ ] Grid responsive: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- [ ] Loading state shows skeleton cards (not spinner)
- [ ] Empty state displayed if no results ("No venues match your filters")
- [ ] Venue card click navigates to details page (/venues/:id)
- [ ] All icons use Tabler Icons
- [ ] Filter chips use Mantine Chip component
- [ ] Search input uses Mantine TextInput with icon
- [ ] Price displayed as formatted currency ($450, not 45000 cents)
- [ ] Capacity formatted with comma separator (1,200 not 1200)
- [ ] Image placeholders use gradient backgrounds (from mockup)

### Code Quality Checkpoints
- ✅ VenueBrowse.tsx < 15 lines (composes smaller components)
- ✅ Search debounce logic in custom hook (not inline)
- ✅ Filter state synced with URL params (not local state)
- ✅ All venue data fetching in useVenues hook
- ✅ Currency formatting extracted to utility function
- ✅ Venue type labels in constants (not hardcoded)
- ✅ No inline event handlers (use named functions)
- ✅ All callbacks wrapped in useCallback
- ✅ VenueCard memoized (prevents unnecessary re-renders)
- ✅ Grid uses Mantine Grid component (not custom CSS)

---

## Task 9: Venue Details Page

**ID**: `VL-009`
**Title**: Create Venue Detail View with Booking CTA
**Priority**: 🟡 High
**Estimated Effort**: 8 hours
**Dependencies**: `VL-008`

### Description
Build a comprehensive venue detail page displaying all venue information with a prominent "Request Booking" call-to-action button.

### Page Sections
1. **Hero Section**
   - Venue image (or gradient placeholder)
   - Venue name (large typography)
   - Venue type badge
   - Capacity + Price

2. **Details Section**
   - Address (with "Open in Maps" link)
   - Amenities list (if applicable)
   - Description
   - Operating hours

3. **Booking Section**
   - "Request Booking" button (primary CTA)
   - Minimum notice period disclaimer
   - Cancellation policy

### Component Architecture
```
features/venues/
├── components/
│   ├── VenueDetail.tsx          # Main container
│   ├── VenueHero.tsx            # Image + title section
│   ├── VenueInfo.tsx            # Details grid
│   ├── VenueAddress.tsx         # Address with map link
│   └── BookingCTA.tsx           # Booking button section
├── hooks/
│   └── useVenueDetail.ts        # Fetch single venue
└── ...
```

### Data Requirements
- **API**: GET /api/v1/venues/:id
- **Response**: Full venue object with all fields
- **Error Handling**: 404 if venue not found or deleted

### Acceptance Criteria
- [ ] Page fetches venue data on mount using React Query
- [ ] Loading state shows hero + details skeleton
- [ ] 404 error shows "Venue not found" message with back button
- [ ] Venue image uses gradient placeholder matching venue type
- [ ] "Open in Maps" link generates Google Maps URL from address
- [ ] Price displayed as currency ($450/event)
- [ ] Capacity displayed with "people" unit (80 people)
- [ ] Breadcrumb navigation (Home > Browse Venues > {Venue Name})
- [ ] "Request Booking" button navigates to booking form
- [ ] Button disabled if user is not student org (show tooltip)
- [ ] Page is mobile-responsive (stacked layout on mobile)
- [ ] Back button navigates to venue browse page

### Code Quality Checkpoints
- ✅ VenueDetail.tsx < 15 lines (composition pattern)
- ✅ Google Maps URL generation in utility function
- ✅ Currency/capacity formatting reuses utilities
- ✅ All text content in constants (no hardcoded strings)
- ✅ Breadcrumb component reusable (not venue-specific)
- ✅ Image placeholder gradient matches mockup
- ✅ Components use Mantine layout primitives
- ✅ Error boundary wraps detail page
- ✅ React Query cache prevents redundant fetches

---

## Task 10: Booking Request Form

**ID**: `VL-010`
**Title**: Implement Event Booking Request Flow
**Priority**: 🟡 High
**Estimated Effort**: 12 hours
**Dependencies**: `VL-009`

### Description
Build the multi-step booking request form allowing student organizations to propose events at venues with date/time selection and guest count.

### Form Steps
1. **Event Details**
   - Event name
   - Event date (date picker)
   - Event time (time picker)
   - Guest count (number input)

2. **Additional Info**
   - Special requests (textarea)
   - Budget constraints (optional)

3. **Review & Submit**
   - Summary of all details
   - Estimated cost display
   - Submit button

### Backend API
**Endpoint**: POST /api/v1/bookings
**Body**:
```json
{
  "venue_id": "uuid",
  "organization_id": "uuid",
  "event_date": "2026-02-14",
  "event_time": "20:00:00",
  "guest_count": 65,
  "special_requests": "string"
}
```

### Component Architecture
```
features/bookings/
├── components/
│   ├── BookingForm.tsx          # Multi-step form container
│   ├── EventDetailsStep.tsx     # Step 1
│   ├── AdditionalInfoStep.tsx   # Step 2
│   ├── ReviewStep.tsx           # Step 3
│   └── BookingSummary.tsx       # Summary card
├── hooks/
│   ├── useBookingForm.ts        # Form state management
│   ├── useCreateBooking.ts      # API mutation
│   └── useAvailability.ts       # Check venue availability
├── types/
│   └── booking.types.ts
└── ...
```

### Validation Rules
- **event_date**: Must be >= today + 7 days (minimum notice)
- **event_date**: Must be <= today + 90 days (max advance booking)
- **event_time**: Valid time format (HH:MM)
- **guest_count**: Must be <= venue capacity
- **guest_count**: Must be >= 10 (minimum group size)

### Acceptance Criteria
- [ ] Form uses multi-step wizard pattern (Mantine Stepper)
- [ ] Date picker prevents selection of past dates
- [ ] Date picker disables dates < 7 days from today
- [ ] Guest count validation checks against venue capacity
- [ ] Guest count input shows capacity limit hint
- [ ] Availability check runs on date/time change (debounced)
- [ ] Conflicting bookings show "unavailable" error
- [ ] Review step displays all entered data
- [ ] Estimated cost calculated from venue base_price + guest_count
- [ ] Submit button disabled during API request
- [ ] Success redirects to "My Bookings" with success message
- [ ] Error displays field-level validation messages
- [ ] All form logic in useBookingForm hook
- [ ] Form state persisted in session storage (prevents data loss)

### Code Quality Checkpoints
- ✅ Each step component < 15 lines
- ✅ Validation rules in constants (MIN_NOTICE_DAYS = 7)
- ✅ Date validation logic in utility function
- ✅ Availability check debounced 500ms
- ✅ All calculations in pure functions (testable)
- ✅ Form submission uses optimistic updates
- ✅ Error messages in constants
- ✅ No magic numbers (10 → MIN_GROUP_SIZE)
- ✅ React Hook Form + Zod schema validation

---

## Task 11: Venue Admin Dashboard

**ID**: `VL-011`
**Title**: Build Venue Admin Dashboard with Stats & Bookings
**Priority**: 🟡 High
**Estimated Effort**: 10 hours
**Dependencies**: `VL-007`

### Description
Implement the venue administrator dashboard showing key metrics (bookings, revenue, occupancy) and a list of recent booking requests with accept/decline actions.

### UI Sections (from mockup)
1. **Stats Grid (2x2)**
   - This Month Bookings (count)
   - Revenue (formatted currency)
   - Avg Rating (if reviews implemented)
   - Occupancy % (calculated)

2. **Recent Bookings List**
   - Each booking card shows:
     - Organization name
     - Status badge (Pending/Confirmed)
     - Date, Time, Guest count
   - Action buttons for pending requests (Accept/Decline)

### Component Architecture
```
features/venue-admin/
├── components/
│   ├── AdminDashboard.tsx       # Main container
│   ├── StatsGrid.tsx            # 2x2 stats cards
│   ├── StatCard.tsx             # Single stat
│   ├── BookingsList.tsx         # Recent bookings
│   ├── BookingCard.tsx          # Single booking
│   └── BookingActions.tsx       # Accept/Decline buttons
├── hooks/
│   ├── useVenueStats.ts         # Fetch stats
│   ├── useVenueBookings.ts      # Fetch bookings
│   └── useBookingActions.ts     # Accept/Decline mutations
└── ...
```

### Backend API
1. **GET /api/v1/venues/:id/stats**
   - Returns: bookings_count, revenue_cents, avg_rating, occupancy_rate

2. **GET /api/v1/venues/:id/bookings?status=pending**
   - Returns: Paginated booking requests

3. **PATCH /api/v1/bookings/:id/accept**
   - Updates booking status to 'confirmed'

4. **PATCH /api/v1/bookings/:id/decline**
   - Updates booking status to 'rejected'

### Acceptance Criteria
- [ ] Dashboard only accessible to venue admin role
- [ ] Stats fetched on mount and auto-refresh every 60 seconds
- [ ] Revenue displayed as formatted currency ($5,400, not 540000 cents)
- [ ] Occupancy rate calculated as (booked_days / total_days * 100)
- [ ] Bookings list shows pending first, then confirmed
- [ ] Accept/Decline buttons disabled during mutation
- [ ] Optimistic UI update (status changes before API response)
- [ ] Success toast notification on accept/decline
- [ ] Booking list auto-refreshes after action
- [ ] Status badge colors match mockup (green confirmed, yellow pending)
- [ ] All stats display loading skeletons initially
- [ ] Error state handled for stats/bookings fetch failures

### Code Quality Checkpoints
- ✅ AdminDashboard.tsx < 15 lines
- ✅ All data fetching in custom hooks
- ✅ Stats calculation logic in utility functions
- ✅ Currency formatting reused from shared utilities
- ✅ Status badge colors in theme tokens
- ✅ Optimistic updates use React Query mutations
- ✅ Auto-refresh uses React Query refetch interval
- ✅ Components wrapped in React.memo
- ✅ No hardcoded colors (use theme)
- ✅ Booking actions in separate hook (useBookingActions)

---

## Task 12: Shared TypeScript Types & Constants

**ID**: `VL-012`
**Title**: Create Shared Type Library for Frontend/Backend
**Priority**: 🟡 High
**Estimated Effort**: 6 hours
**Dependencies**: `VL-001`

### Description
Establish a shared types package containing TypeScript interfaces, enums, and constants used across frontend and backend to ensure type safety and consistency.

### Shared Types
```
shared/types/
├── user.types.ts              # User, Role enums
├── venue.types.ts             # Venue, VenueType enums
├── booking.types.ts           # Booking, BookingStatus enums
├── organization.types.ts      # Organization, OrgType enums
├── api.types.ts               # API request/response shapes
└── index.ts                   # Barrel exports
```

### Type Definitions
**Example**: `booking.types.ts`
```typescript
export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Rejected = 'rejected',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export interface Booking {
  id: string;
  venueId: string;
  organizationId: string;
  eventDate: string;  // ISO 8601
  eventTime: string;  // HH:MM:SS
  guestCount: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  venueId: string;
  organizationId: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  specialRequests?: string;
}
```

### Acceptance Criteria
- [ ] All enums use string values (not numeric)
- [ ] Every interface has JSDoc comment explaining purpose
- [ ] Date/time fields documented with format (ISO 8601, HH:MM, etc.)
- [ ] Shared types package imported by frontend and backend
- [ ] No duplicate type definitions across codebase
- [ ] All API request/response bodies have defined types
- [ ] Enums match database enum values exactly
- [ ] Optional fields marked with `?` operator
- [ ] No `any` types (use `unknown` if necessary)
- [ ] Barrel exports provide clean API (single import point)

### Code Quality Checkpoints
- ✅ All types documented with JSDoc
- ✅ Strict null checking enabled
- ✅ No circular type dependencies
- ✅ Enums exported as const enums (tree-shakeable)
- ✅ Complex types broken into smaller interfaces
- ✅ Utility types used where appropriate (Pick, Omit, Partial)
- ✅ Type guards defined for runtime validation

---

## Task 13: API Client & Error Handling

**ID**: `VL-013`
**Title**: Implement Type-Safe API Client with Interceptors
**Priority**: 🟡 High
**Estimated Effort**: 8 hours
**Dependencies**: `VL-003`, `VL-012`

### Description
Create a centralized, type-safe API client using Axios with request/response interceptors, error handling, retry logic, and authentication token management.

### API Client Architecture
```
frontend/src/lib/api/
├── client.ts              # Axios instance configuration
├── interceptors.ts        # Request/response interceptors
├── error-handler.ts       # Error parsing and normalization
├── endpoints/
│   ├── auth.ts            # Auth API calls
│   ├── venues.ts          # Venue API calls
│   ├── bookings.ts        # Booking API calls
│   └── index.ts
├── types/
│   └── api-error.ts       # Error response types
└── index.ts
```

### Features
- **Base URL**: Environment variable (VITE_API_BASE_URL)
- **Auth Interceptor**: Attach JWT to Authorization header
- **Error Interceptor**: Parse API errors into standard format
- **Retry Logic**: Retry failed requests (3 attempts, exponential backoff)
- **Timeout**: Request timeout (10 seconds)
- **CSRF**: Include CSRF token in headers

### Error Handling Strategy
**Standardized Error Response**:
```typescript
interface ApiError {
  message: string;
  code: string;
  field?: string;  // For validation errors
  statusCode: number;
}
```

**Error Types**:
- Network errors (offline, timeout)
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

### Acceptance Criteria
- [ ] Axios instance configured with baseURL from env var
- [ ] Request interceptor adds Authorization header if token exists
- [ ] Response interceptor normalizes all errors to ApiError shape
- [ ] Retry logic implemented for network failures (max 3 attempts)
- [ ] Exponential backoff between retries (1s, 2s, 4s)
- [ ] 401 errors trigger logout and redirect to login
- [ ] All API methods strongly typed (request + response)
- [ ] Environment variables validated on startup (fail if missing)
- [ ] Timeout set to 10 seconds (configurable via constant)
- [ ] CSRF token retrieved from cookie and included in headers
- [ ] Loading states managed via React Query (not Axios interceptors)

### Code Quality Checkpoints
- ✅ All API functions return typed promises
- ✅ Error codes defined in constants (no magic strings)
- ✅ Retry logic extracted to utility function
- ✅ Interceptors use arrow functions (preserve `this` context)
- ✅ Base URL validated (must end with `/api/v1`)
- ✅ All timeouts/delays in constants (not hardcoded)
- ✅ Error messages never expose sensitive data
- ✅ API methods use consistent naming (getVenues, createBooking)

---

## Task 14: React Query Setup & Cache Strategy

**ID**: `VL-014`
**Title**: Configure React Query with Optimized Cache Policies
**Priority**: 🟡 High
**Estimated Effort**: 6 hours
**Dependencies**: `VL-013`

### Description
Set up React Query (TanStack Query) with intelligent caching, background refetching, and optimistic updates for a performant data-fetching layer.

### Configuration
```
frontend/src/lib/react-query/
├── client.ts              # QueryClient configuration
├── hooks/
│   ├── useVenuesQuery.ts  # Venue queries
│   ├── useBookingsQuery.ts
│   └── mutations.ts       # Shared mutation logic
├── keys/
│   └── query-keys.ts      # Query key factory
└── index.ts
```

### Cache Strategy
**Query Defaults**:
- staleTime: 5 minutes (data considered fresh)
- cacheTime: 30 minutes (keep unused data)
- refetchOnWindowFocus: true (refresh on tab focus)
- retry: 1 (failed queries retry once)

**Entity-Specific Policies**:
- **Venues**: staleTime 10 min (rarely change)
- **Bookings**: staleTime 2 min (frequently updated)
- **User Profile**: staleTime 15 min (rarely change)
- **Stats**: staleTime 1 min (dynamic data)

### Query Key Pattern
```typescript
const venueKeys = {
  all: ['venues'] as const,
  lists: () => [...venueKeys.all, 'list'] as const,
  list: (filters: VenueFilters) => [...venueKeys.lists(), filters] as const,
  details: () => [...venueKeys.all, 'detail'] as const,
  detail: (id: string) => [...venueKeys.details(), id] as const,
};
```

### Acceptance Criteria
- [ ] QueryClient configured with global defaults
- [ ] DevTools enabled in development mode
- [ ] Query keys follow hierarchical structure (easy invalidation)
- [ ] Mutations invalidate related queries on success
- [ ] Optimistic updates implemented for booking actions
- [ ] Error handling with retry logic (exponential backoff)
- [ ] Loading/error states handled in useQuery hooks
- [ ] Prefetching implemented for venue detail hover (faster navigation)
- [ ] Query key factory prevents typos and ensures consistency
- [ ] Cache persistence configured (localStorage for offline support)

### Code Quality Checkpoints
- ✅ All stale/cache times in constants
- ✅ Query keys defined in centralized factory
- ✅ No string literals for query keys (use factory)
- ✅ Mutation onSuccess callbacks invalidate cache
- ✅ Optimistic updates properly roll back on error
- ✅ DevTools only included in dev build (tree-shaken in prod)
- ✅ Type-safe hooks (useQuery typed with response shape)

---

## Task 15: Form Validation & Input Components

**ID**: `VL-015`
**Title**: Build Reusable Form Components with Validation
**Priority**: 🟢 Medium
**Estimated Effort**: 8 hours
**Dependencies**: `VL-004`

### Description
Create a library of reusable, validated form input components wrapping Mantine primitives with consistent styling, error handling, and accessibility.

### Component Library
```
frontend/src/components/forms/
├── TextInput/
│   ├── TextInput.tsx
│   ├── TextInput.types.ts
│   └── index.ts
├── EmailInput/            # Email-specific validation
├── PasswordInput/         # Strength indicator
├── DatePicker/
├── TimePicker/
├── NumberInput/
├── Select/
├── Textarea/
├── Checkbox/
├── FormField/             # Wrapper with label + error
└── index.ts
```

### Validation Strategy
- **Library**: Zod schemas
- **Integration**: React Hook Form + Mantine
- **Real-time**: Validate on blur (not on every keystroke)
- **Submission**: Full validation on form submit

### Common Validation Rules
```typescript
// constants/validation.ts
export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  eduEmail: {
    pattern: /^[^\s@]+@[^\s@]+\.edu$/,
    message: 'Must be a .edu email address',
  },
  password: {
    minLength: 12,
    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    message: 'Password must contain uppercase, number, and special char',
  },
  phone: {
    pattern: /^\d{3}-\d{3}-\d{4}$/,
    message: 'Format: 123-456-7890',
  },
} as const;
```

### Acceptance Criteria
- [ ] All form components wrap Mantine inputs (not custom)
- [ ] Validation rules defined in constants (reusable)
- [ ] Error messages shown below inputs (consistent placement)
- [ ] Required fields marked with asterisk (*)
- [ ] Email input auto-lowercases input
- [ ] Password input has show/hide toggle
- [ ] Password strength indicator (weak/medium/strong)
- [ ] Date picker prevents past dates (configurable)
- [ ] Number input has min/max validation
- [ ] All inputs have proper ARIA labels
- [ ] Error state styling matches design system
- [ ] Focus management (auto-focus first error on submit)

### Code Quality Checkpoints
- ✅ Each component < 15 lines (composition pattern)
- ✅ Validation schemas extracted to separate files
- ✅ No inline regex patterns (use constants)
- ✅ All components fully typed (no `any` props)
- ✅ Components use Mantine theming (no hardcoded styles)
- ✅ Accessibility tested (keyboard navigation, screen readers)
- ✅ Error messages in constants (no hardcoded strings)
- ✅ Components memoized (prevent unnecessary re-renders)

---

## Priority Matrix

| Priority | Tasks |
|----------|-------|
| 🔴 Critical | VL-001, VL-002, VL-003, VL-004, VL-005 |
| 🟡 High | VL-006, VL-007, VL-008, VL-009, VL-010, VL-011, VL-012, VL-013, VL-014 |
| 🟢 Medium | VL-015 |

## Dependency Graph

```
VL-001 (Monorepo Setup)
├── VL-002 (Database)
│   ├── VL-003 (Auth Service)
│   │   ├── VL-005 (Auth UI)
│   │   │   └── VL-006 (Dashboard)
│   │   └── VL-013 (API Client)
│   │       └── VL-014 (React Query)
│   └── VL-007 (Venue API)
│       └── VL-008 (Venue Browse)
│           ├── VL-009 (Venue Detail)
│           │   └── VL-010 (Booking Form)
│           └── VL-011 (Venue Admin)
├── VL-004 (Mantine Setup)
│   ├── VL-005 (Auth UI)
│   ├── VL-008 (Venue Browse)
│   └── VL-015 (Form Components)
└── VL-012 (Shared Types)
    └── VL-013 (API Client)
```

## Total Estimated Effort
**119 hours** (~3 weeks for 2 engineers working in parallel)

---

## Code Review Checklist (Apply to Every PR)

Before approving any code:
- [ ] All functions < 15 lines
- [ ] No hardcoded values (colors, strings, numbers)
- [ ] No `any` types in TypeScript
- [ ] All components use Mantine primitives (no raw HTML)
- [ ] Business logic extracted to hooks (not in components)
- [ ] Constants/types/utils in separate files
- [ ] All imports organized (built-ins → external → internal)
- [ ] useCallback/useMemo applied where needed
- [ ] Components < 150 lines
- [ ] Comprehensive JSDoc on all public functions
- [ ] Zero linting errors/warnings
- [ ] Error boundaries implemented
- [ ] Loading/error states handled
- [ ] Mobile-responsive (tested at 320px, 768px, 1024px)
- [ ] Accessibility: keyboard navigation + screen reader tested

---

**Remember**: Code quality is non-negotiable. If a Google engineer would notice it, it's unacceptable.
