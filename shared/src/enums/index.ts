/**
 * Shared enums barrel export.
 *
 * All enums match their PostgreSQL ENUM counterparts exactly.
 * Use these throughout the frontend to ensure type safety with backend.
 */

export {
  UserRole,
  USER_ROLE_VALUES,
} from './user-role';

export {
  OrganizationType,
  ORGANIZATION_TYPE_VALUES,
} from './organization-type';

export {
  VenueType,
  VENUE_TYPE_VALUES,
} from './venue-type';

export {
  BookingStatus,
  BOOKING_STATUS_VALUES,
  ACTIVE_BOOKING_STATUSES,
  TERMINAL_BOOKING_STATUSES,
} from './booking-status';
