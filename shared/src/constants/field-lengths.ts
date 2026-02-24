/**
 * String field length constraints.
 *
 * Used for form validation and database schema.
 * All values must match backend Pydantic/SQLAlchemy definitions.
 */

// =============================================================================
// USER FIELDS
// =============================================================================

export const USER_FIELD_LENGTHS = {
  EMAIL_MAX: 255,
  FIRST_NAME_MAX: 100,
  LAST_NAME_MAX: 100,
} as const;

// =============================================================================
// ORGANIZATION FIELDS
// =============================================================================

export const ORGANIZATION_FIELD_LENGTHS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  UNIVERSITY_MIN: 2,
  UNIVERSITY_MAX: 200,
  DESCRIPTION_MAX: 1000,
  CONTACT_EMAIL_MAX: 255,
  CONTACT_PHONE_MAX: 20,
  WEBSITE_URL_MAX: 500,
} as const;

// =============================================================================
// VENUE FIELDS
// =============================================================================

export const VENUE_FIELD_LENGTHS = {
  NAME_MIN: 3,
  NAME_MAX: 100,
  ADDRESS_STREET_MAX: 200,
  ADDRESS_CITY_MAX: 100,
  ADDRESS_STATE_LENGTH: 2,
  ADDRESS_ZIP_MAX: 10,
} as const;

// =============================================================================
// BOOKING FIELDS
// =============================================================================

export const BOOKING_FIELD_LENGTHS = {
  EVENT_NAME_MIN: 3,
  EVENT_NAME_MAX: 100,
  SPECIAL_REQUESTS_MAX: 500,
} as const;
