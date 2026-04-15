# VenueLink — Outstanding Tasks

---

## TODO-1: Email Verification at Sign-Up

**Priority**: 🟡 High (required before production)

Clerk v5 supports email OTP verification at sign-up. Currently disabled in the Clerk Dashboard for dev speed, but must be implemented before launch.

### What needs to be done
Add a two-step sign-up flow in `useSignupForm.ts`:
1. `signUp.create(...)` — if status is `missing_requirements` due to email verification, call `signUp.prepareEmailAddressVerification({ strategy: 'email_code' })`
2. Show an OTP input UI (new `VerifyEmailForm` component)
3. On code submission: `signUp.attemptEmailAddressVerification({ code })` → if `status === 'complete'` → `setActive(...)` → `navigate('/')`

### Files to change
- `frontend/src/features/auth/hooks/useSignupForm.ts` — add verification state + two-step logic
- `frontend/src/features/auth/components/SignupForm.tsx` — conditionally render OTP input step
- `frontend/src/features/auth/constants/auth.constants.ts` — add OTP messages
- Clerk Dashboard — re-enable "Verify at sign-up"

---

## TODO-2: Venue Logo — VenueLink Branding (`VL-020`)

**Priority**: 🟢 Medium

**ID**: `VL-020`

Create a VenueLink SVG logo and integrate it into the Header, Sidebar, auth pages, and as a favicon.

### What needs to be done
- Design SVG logo (minimal, works at 24–48px, light + dark backgrounds)
- Place in `frontend/src/assets/`
- Add to `Header.tsx` and `Sidebar.tsx` alongside the "VENUELINK" text
- Add to `AuthLayout.tsx` (login/signup pages)
- Update `index.html` favicon
- Create reusable `Logo` component (accepts `size` prop)

---

## TODO-3: Booking Stats Inconsistency

**Priority**: 🟢 Medium

`count_venue_bookings_this_month()` counts bookings of **all statuses** (including pending/rejected/cancelled), while `sum_venue_revenue_cents()` and `sum_venue_booked_hours()` only include confirmed/completed bookings (`BUDGET_STATUSES`). This makes the dashboard stats internally inconsistent.

### Fix
- `backend/app/modules/bookings/repository.py` — add a status filter to `count_venue_bookings_this_month` to match `BUDGET_STATUSES`, OR document intentionally broader count.
- Also fix the docstring on `sum_venue_revenue_cents` (currently says "sum `total_cost_cents`" but actually sums `Venue.base_price_cents`).

---

## TODO-4: UTC Date Bug in Upcoming Events

**Priority**: 🟢 Medium

`getTodayISO()` in `frontend/src/features/dashboard/hooks/useUpcomingEvents.ts` uses `new Date().toISOString().slice(0, 10)`, which is UTC-based. For users in timezones behind UTC (e.g. US), this returns tomorrow's date and can hide today's events.

### Fix
Replace with a locale-safe date helper (e.g., `dayjs().format('YYYY-MM-DD')`) or a custom function that uses local time.

---

## TODO-5: Onboarding Tooltip Race Condition

**Priority**: 🟢 Medium

`useOnboardingTooltip.ts` computes `visible` once in `useState` from `userRole`. If Clerk hasn't loaded the user's metadata yet (role is undefined initially), `visible` is set to `false` and never updates — so the tooltip never appears.

### Fix
- `frontend/src/features/onboarding/hooks/useOnboardingTooltip.ts` — derive `visible` via `useMemo` (or an effect) so it reacts to `userRole` changing after Clerk loads.
- `frontend/src/features/onboarding/components/OnboardingTooltip.tsx` — remove `onClick={dismiss}` from `Popover.Target` wrapper; dismiss should only happen via the explicit "Got it" button to avoid premature dismissal.

---

## TODO-6: Ratings Router Dead Code

**Priority**: 🟡 Low

`backend/app/modules/ratings/router.py` defines an `APIRouter` that is never mounted in `app/main.py`. `parse_rating_filters` is also duplicated in `app/modules/ratings/dependencies` (which is what the rest of the app imports).

### Fix
Either mount the router in `app/main.py` or delete the file. Remove the duplicate `parse_rating_filters` definition.

---

## TODO-7: Query Key Missing `pageSize`

**Priority**: 🟡 Low

`useVenueBookingsQuery` in `frontend/src/lib/react-query/hooks/useBookingsQuery.ts` includes `page` in the query key but not `pageSize`. If a caller ever passes a non-default `pageSize`, React Query treats it as the same cache entry and can return stale/wrong data.

### Fix
Add `pageSize` to the query key alongside `page`.

---

## TODO-8: Optimistic Update Targets Wrong Cache Key

**Priority**: 🟡 Low

`useBookingActions.ts` optimistic update writes to the unpaged key (`ADMIN_QUERY_KEYS.BOOKINGS(venueId)`), but `useVenueBookings` caches under the paged key (`[...BOOKINGS(venueId), page]`). The optimistic update has no visible effect and creates a stale orphan cache entry.

### Fix
- `frontend/src/features/venue-admin/hooks/useBookingActions.ts` — change the optimistic update to target the correct paged query key and update `response.items` (not a flat array).

---

## Clerk Dashboard Settings (Non-Code)

- [ ] Re-enable **"Verify at sign-up"** once TODO-1 is implemented
- [ ] Review **Attack Protection → Bot sign-up protection** before launch
