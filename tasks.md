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

## Clerk Dashboard Settings (Non-Code)

- [ ] Re-enable **"Verify at sign-up"** once TODO-1 is implemented
- [ ] Review **Attack Protection → Bot sign-up protection** before launch
