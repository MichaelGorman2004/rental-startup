/**
 * @venuelink/shared - Shared types and constants for VenueLink
 *
 * This package provides type-safe definitions used across frontend and backend.
 * All enums match their PostgreSQL counterparts exactly.
 *
 * @example
 * ```ts
 * import {
 *   // Enums
 *   UserRole,
 *   VenueType,
 *   BookingStatus,
 *   // Entities
 *   Venue,
 *   Booking,
 *   // API types
 *   CreateBookingRequest,
 *   PaginatedResponse,
 *   // Constants
 *   VENUE_CAPACITY_MAX,
 *   // Guards
 *   isVenueType,
 * } from '@venuelink/shared';
 * ```
 */

// =============================================================================
// ENUMS
// =============================================================================
export {
  UserRole,
  USER_ROLE_VALUES,
  OrganizationType,
  ORGANIZATION_TYPE_VALUES,
  VenueType,
  VENUE_TYPE_VALUES,
  BookingStatus,
  BOOKING_STATUS_VALUES,
  ACTIVE_BOOKING_STATUSES,
  TERMINAL_BOOKING_STATUSES,
} from './enums';

// =============================================================================
// ENTITIES
// =============================================================================
export type {
  User,
  UserSummary,
  AuthenticatedUser,
  Organization,
  OrganizationSummary,
  OrganizationProfile,
  VenueAddress,
  Venue,
  VenueSummary,
  Booking,
  BookingWithDetails,
  AdminBookingView,
  BookingConfirmation,
  UpcomingEvent,
} from './entities';

// =============================================================================
// API TYPES
// =============================================================================
export { HttpStatus, ApiErrorCode } from './api';

export type {
  // Pagination
  PaginatedResponse,
  PaginationParams,
  PaginatedSortedParams,
  // Errors
  ApiError,
  BackendErrorResponse,
  // Filters
  VenueFilters,
  BookingFilters,
  VenueFilterState,
  // Requests
  CreateVenueRequest,
  UpdateVenueRequest,
  CreateBookingRequest,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  BookingActionType,
  BookingActionPayload,
  // Responses
  VenueListResponse,
  VenueDetailResponse,
  CreateVenueResponse,
  UpdateVenueResponse,
  CreateBookingResponse,
  OrganizationDetailResponse,
  CurrentOrganizationResponse,
  VenueStatsResponse,
  HealthCheckResponse,
} from './api';

// =============================================================================
// CONSTANTS
// =============================================================================
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
  // Field lengths
  USER_FIELD_LENGTHS,
  ORGANIZATION_FIELD_LENGTHS,
  VENUE_FIELD_LENGTHS,
  BOOKING_FIELD_LENGTHS,
} from './constants';

// =============================================================================
// TYPE GUARDS
// =============================================================================
export {
  isUserRole,
  assertUserRole,
  isOrganizationType,
  assertOrganizationType,
  isVenueType,
  assertVenueType,
  isBookingStatus,
  assertBookingStatus,
  isApiError,
  isApiErrorWithCode,
  isAuthenticationError,
  isAuthorizationError,
  isNotFoundError,
  isValidationError,
} from './guards';
