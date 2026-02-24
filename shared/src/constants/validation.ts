/**
 * Shared validation constants.
 *
 * All numeric constraints must match their backend counterparts exactly.
 * Use these in both Zod schemas (frontend) and Pydantic schemas (backend).
 */

// =============================================================================
// VENUE VALIDATION
// @see backend/app/modules/venues/constants/validation.py
// =============================================================================

/** Minimum venue name length. */
export const VENUE_NAME_MIN_LENGTH = 3;

/** Maximum venue name length. */
export const VENUE_NAME_MAX_LENGTH = 100;

/** Minimum venue capacity (guests). */
export const VENUE_CAPACITY_MIN = 10;

/** Maximum venue capacity (guests). */
export const VENUE_CAPACITY_MAX = 500;

/** Minimum venue base price in cents ($100.00). */
export const VENUE_BASE_PRICE_MIN_CENTS = 10000;

/** Maximum venue base price in cents ($1000.00). */
export const VENUE_BASE_PRICE_MAX_CENTS = 100000;

// =============================================================================
// BOOKING VALIDATION
// @see frontend/src/features/bookings/constants/booking-defaults.ts
// =============================================================================

/** Minimum advance notice for bookings (days). */
export const BOOKING_MIN_NOTICE_DAYS = 7;

/** Maximum advance booking window (days). */
export const BOOKING_MAX_ADVANCE_DAYS = 90;

/** Minimum group size for bookings. */
export const BOOKING_MIN_GROUP_SIZE = 10;

/** Minimum event name length. */
export const EVENT_NAME_MIN_LENGTH = 3;

/** Maximum event name length. */
export const EVENT_NAME_MAX_LENGTH = 100;

/** Maximum special requests text length. */
export const SPECIAL_REQUESTS_MAX_LENGTH = 500;

/** Per-guest surcharge in cents ($5/guest). */
export const PER_GUEST_COST_CENTS = 500;

// =============================================================================
// PAGINATION
// @see backend/app/modules/venues/constants/validation.py
// =============================================================================

/** Default page size for paginated requests. */
export const DEFAULT_PAGE_SIZE = 20;

/** Maximum allowed page size. */
export const MAX_PAGE_SIZE = 100;

/** Minimum page number (1-indexed). */
export const MIN_PAGE = 1;

// =============================================================================
// SEARCH
// =============================================================================

/** Minimum search query length. */
export const SEARCH_MIN_LENGTH = 2;

/** Maximum search query length. */
export const SEARCH_MAX_LENGTH = 100;

/** Default debounce delay for search inputs (ms). */
export const SEARCH_DEBOUNCE_MS = 500;

// =============================================================================
// USER/AUTH
// =============================================================================

/** Minimum password length. */
export const PASSWORD_MIN_LENGTH = 12;

/** Maximum email length. */
export const EMAIL_MAX_LENGTH = 255;

// =============================================================================
// API CLIENT
// =============================================================================

/** Default request timeout in milliseconds. */
export const API_TIMEOUT_MS = 10000;

/** Maximum retry attempts for failed requests. */
export const API_MAX_RETRIES = 3;

/** Initial retry delay in milliseconds. */
export const API_RETRY_DELAY_MS = 1000;

/** Retry delay multiplier (exponential backoff). */
export const API_RETRY_BACKOFF_MULTIPLIER = 2;
