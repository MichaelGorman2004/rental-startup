# Booking System Documentation

> Last updated: 2026-03-10

## Overview

The booking system enables student organizations to request venue reservations and allows venue administrators to accept or decline requests. The backend is fully implemented with real database persistence. The frontend booking flow calls real APIs, but venue data remains mocked.

---

## Backend Architecture

### File Structure
```
backend/app/modules/bookings/
├── models.py        # SQLAlchemy ORM
├── schemas.py       # Pydantic validation
├── services.py      # Business logic + authorization
├── repository.py    # Database queries
├── router.py        # API endpoints
└── constants/
    ├── errors.py    # Error messages
    └── validation.py # Validation constants
```

### Data Model

```python
class Booking:
    id: UUID                    # Primary key
    venue_id: UUID              # FK → venues
    organization_id: UUID       # FK → organizations
    event_date: date
    event_start_time: time
    event_end_time: time
    event_duration: timedelta   # Computed property
    guest_count: int
    event_name: str(100)
    special_requests: str | None
    status: BookingStatus       # pending/confirmed/rejected/completed/cancelled
    created_at: datetime
    updated_at: datetime
```

**Database Constraints:**
- Unique: `(venue_id, event_date, event_start_time)`
- Check: `guest_count > 0`
- Check: `event_end_time > event_start_time`

### Status Workflow

```
PENDING → CONFIRMED (venue accepts)
PENDING → REJECTED (venue declines)
PENDING → CANCELLED (org cancels)
CONFIRMED → COMPLETED (event occurs)
CONFIRMED → CANCELLED (either party cancels)
```

### API Endpoints

| Endpoint | Method | Purpose | Required Role |
|----------|--------|---------|---------------|
| `/bookings` | POST | Create booking | student_org |
| `/bookings/me` | GET | List my org's bookings | student_org |
| `/bookings/{id}/cancel` | PATCH | Cancel booking | org owner |
| `/bookings/{id}/accept` | PATCH | Accept booking | venue owner |
| `/bookings/{id}/decline` | PATCH | Decline booking | venue owner |
| `/venues/{id}/bookings` | GET | List venue bookings | venue owner |

### Service Layer Methods

| Method | Description |
|--------|-------------|
| `create_booking()` | Validates time conflicts, creates with PENDING status |
| `list_my_bookings()` | Returns paginated bookings for user's org |
| `cancel_booking()` | Cancels PENDING or CONFIRMED bookings |
| `accept_booking()` | Changes PENDING → CONFIRMED |
| `decline_booking()` | Changes PENDING → REJECTED |
| `list_venue_bookings()` | Returns all bookings for a venue (pending first) |

### Validation Rules

| Rule | Value |
|------|-------|
| Event name length | 2-100 chars |
| Guest count minimum | ≥ 1 |
| Special requests max | 2000 chars |
| Time conflict check | No overlapping PENDING/CONFIRMED bookings |

---

## Frontend Architecture

### File Structure
```
frontend/src/features/bookings/
├── components/
│   ├── BookingForm.tsx         # Multi-step wizard (3 steps)
│   ├── EventDetailsStep.tsx    # Step 1: name, date, time, guests
│   ├── AdditionalInfoStep.tsx  # Step 2: special requests, budget
│   ├── ReviewStep.tsx          # Step 3: review & submit
│   ├── BookingSuccess.tsx      # Confirmation screen
│   ├── BookingsPage.tsx        # My Bookings list
│   └── BookingHistoryCard.tsx  # Individual booking card
├── hooks/
│   ├── useBookingForm.ts       # Form state + Zod validation
│   ├── useBookingPage.ts       # Orchestrates booking form
│   ├── useCreateBooking.ts     # POST /bookings mutation
│   ├── useMyBookings.ts        # GET /bookings/me query
│   └── useCancelBooking.ts     # PATCH cancel mutation
├── types/
│   └── booking.types.ts
├── constants/
│   └── booking-defaults.ts
└── utils/
    └── format-booking-date.ts
```

### Venue Admin Structure
```
frontend/src/features/venue-admin/
├── components/
│   ├── AdminDashboard.tsx      # Main dashboard page
│   ├── BookingCard.tsx         # Card with accept/decline buttons
│   ├── BookingsList.tsx        # List of booking cards
│   └── StatsGrid.tsx           # 4 stat cards (mocked)
├── hooks/
│   ├── useAdminDashboard.ts    # Orchestrates admin page
│   ├── useVenueBookings.ts     # GET /venues/{id}/bookings
│   ├── useVenueStats.ts        # MOCKED
│   └── useBookingActions.ts    # Accept/decline mutations
└── types/
    └── venue-admin.types.ts
```

### Key Hooks

| Hook | Purpose | API Status |
|------|---------|------------|
| `useCreateBooking` | Create booking mutation | Real |
| `useMyBookings` | Fetch user's bookings | Real |
| `useCancelBooking` | Cancel booking mutation | Real |
| `useVenueBookings` | Fetch venue's bookings | Real |
| `useBookingActions` | Accept/decline mutations | Real |
| `useVenueStats` | Fetch venue stats | **Mocked** |
| `useVenues` | Fetch venue list | **Mocked** |
| `useVenueDetail` | Fetch single venue | **Mocked** |

### Frontend Validation (Zod)

| Rule | Value |
|------|-------|
| Event name | 3-100 chars |
| Event date | 7-90 days from today |
| Start/end time | Required, end > start |
| Guest count | 10 to venue capacity |
| Special requests | ≤ 500 chars |

---

## Real vs Mocked Status

### Real API Calls

| Feature | Hook | Endpoint |
|---------|------|----------|
| Create booking | `useCreateBooking` | `POST /bookings` |
| List my bookings | `useMyBookings` | `GET /bookings/me` |
| Cancel booking | `useCancelBooking` | `PATCH /bookings/{id}/cancel` |
| Accept booking | `useBookingActions` | `PATCH /bookings/{id}/accept` |
| Decline booking | `useBookingActions` | `PATCH /bookings/{id}/decline` |
| List venue bookings | `useVenueBookings` | `GET /venues/{id}/bookings` |

### Mocked Data

| Feature | Location | Details |
|---------|----------|---------|
| Venue stats | `useVenueStats` | Returns `MOCK_VENUE_STATS` constant |
| Venue ID | `useAdminDashboard` | Hardcoded `MOCK_VENUE_ID = '1'` |
| Venue list | `useVenues` | Uses `MOCK_VENUES` array |
| Venue detail | `useVenueDetail` | Uses `MOCK_VENUES.find()` |

---

## Pages Using Mock Venue Data

| Page | Route | Mock Source | Impact |
|------|-------|-------------|--------|
| Venue Browse | `/venues` | `MOCK_VENUES` in `useVenues` | Shows fake venues |
| Venue Detail | `/venues/:id` | `MOCK_VENUES` in `useVenueDetail` | Shows fake venue |
| Booking Form | `/venues/:id/book` | `MOCK_VENUES` in `useVenueDetail` | Venue info is fake |
| Admin Dashboard | `/admin` | `MOCK_VENUE_ID` in `useAdminDashboard` | Wrong venue ID |
| Admin Stats | `/admin` | `MOCK_VENUE_STATS` in `useVenueStats` | Fake statistics |
| Landing Page | `/` (signed out) | `MOCK_VENUES` in `FeaturedVenues` | Marketing only |
| Demo Venues | `/demo/venues` | `MOCK_VENUES` in `useDemoVenues` | Demo feature |

---

## Implementation Status

### Completed

- [x] Backend `Booking` model with all fields and constraints
- [x] Backend schemas: `BookingCreate`, `BookingResponse`, `BookingListResponse`
- [x] Backend service layer with authorization checks
- [x] Backend repository with time conflict detection
- [x] Backend endpoints: create, list, cancel, accept, decline
- [x] Alembic migration for `event_start_time` / `event_end_time` split
- [x] Frontend booking form with 3-step wizard
- [x] Frontend Zod validation schema
- [x] Frontend `useCreateBooking` calling real API
- [x] Frontend `useMyBookings` calling real API
- [x] Frontend `useCancelBooking` calling real API
- [x] Frontend `useVenueBookings` calling real API
- [x] Frontend `useBookingActions` with optimistic updates
- [x] Frontend booking success confirmation screen
- [x] Frontend My Bookings page with filtering

### Remaining: Core Tasks (for full end-to-end testing)

- [ ] Seed test venues to database
- [ ] Wire `useVenues` to `GET /venues` API
- [ ] Wire `useVenueDetail` to `GET /venues/:id` API
- [ ] Replace `MOCK_VENUE_ID` with real venue lookup in admin

### Remaining: Additional Tasks (stats feature)

- [ ] Implement `GET /venues/:id/stats` backend endpoint
- [ ] Wire `useVenueStats` to `GET /venues/:id/stats` API

### Current Blocker

**Booking creation fails with 422 Unprocessable Entity** because:

1. Frontend venues page shows mock venues with IDs like `'1'`, `'2'`
2. User clicks "Book" on mock venue
3. Frontend sends `POST /bookings` with `venue_id: '1'`
4. Backend expects `venue_id: UUID` format
5. Pydantic validation fails → 422 error

**Fix:** Either seed real venues to database and wire frontend, or revert booking to mock until venues are connected.

---

## Data Flow

### Create Booking

```text
User → /venues/:id/book
  → useVenueDetail (MOCK) loads venue
  → useBookingForm manages 3-step wizard
  → User fills form, clicks Submit
  → useCreateBooking.mutate()
  → POST /bookings (real API)
  → Backend validates: role, org, time conflicts
  → Returns BookingResponse (status=PENDING)
  → Shows BookingSuccess screen
```

### Accept/Decline Booking

```text
Admin → /admin
  → useVenueBookings fetches GET /venues/{id}/bookings
  → BookingCard shows Accept/Decline for PENDING
  → Admin clicks Accept
  → Optimistic update: UI shows CONFIRMED immediately
  → PATCH /bookings/{id}/accept (real API)
  → Backend validates: role, venue ownership, status
  → Returns 200 OK
  → Query cache invalidated
```

---

## Quick Reference

### Backend Files

- Model: `backend/app/modules/bookings/models.py`
- Schemas: `backend/app/modules/bookings/schemas.py`
- Service: `backend/app/modules/bookings/services.py`
- Repository: `backend/app/modules/bookings/repository.py`
- Router: `backend/app/modules/bookings/router.py`

### Frontend Files

- Form: `frontend/src/features/bookings/components/BookingForm.tsx`
- Create hook: `frontend/src/features/bookings/hooks/useCreateBooking.ts`
- API client: `frontend/src/lib/api/endpoints/bookings.ts`
- Admin dashboard: `frontend/src/features/venue-admin/components/AdminDashboard.tsx`
- Mock venues: `frontend/src/features/venues/constants/mock-venues.ts`
