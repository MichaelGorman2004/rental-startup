/**
 * Shared constants barrel export.
 *
 * All validation constants match their backend counterparts.
 * Use these for form validation, API requests, and display formatting.
 */

// Validation limits
export {
  // Venue validation
  VENUE_NAME_MIN_LENGTH,
  VENUE_NAME_MAX_LENGTH,
  VENUE_CAPACITY_MIN,
  VENUE_CAPACITY_MAX,
  VENUE_BASE_PRICE_MIN_CENTS,
  VENUE_BASE_PRICE_MAX_CENTS,
  // Booking validation
  BOOKING_MIN_NOTICE_DAYS,
  BOOKING_MAX_ADVANCE_DAYS,
  BOOKING_MIN_GROUP_SIZE,
  EVENT_NAME_MIN_LENGTH,
  EVENT_NAME_MAX_LENGTH,
  SPECIAL_REQUESTS_MAX_LENGTH,
  PER_GUEST_COST_CENTS,
  // Pagination
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE,
  // Search
  SEARCH_MIN_LENGTH,
  SEARCH_MAX_LENGTH,
  SEARCH_DEBOUNCE_MS,
  // Auth
  PASSWORD_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  // API Client
  API_TIMEOUT_MS,
  API_MAX_RETRIES,
  API_RETRY_DELAY_MS,
  API_RETRY_BACKOFF_MULTIPLIER,
} from './validation';

// Field length constraints
export {
  USER_FIELD_LENGTHS,
  ORGANIZATION_FIELD_LENGTHS,
  VENUE_FIELD_LENGTHS,
  BOOKING_FIELD_LENGTHS,
} from './field-lengths';
