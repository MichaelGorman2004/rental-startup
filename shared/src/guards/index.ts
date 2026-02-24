/**
 * Shared type guards barrel export.
 *
 * Type guards provide runtime validation for enum values and API responses.
 * Use these to safely narrow types when handling dynamic data.
 */

export { isUserRole, assertUserRole } from './is-user-role';

export { isOrganizationType, assertOrganizationType } from './is-organization-type';

export { isVenueType, assertVenueType } from './is-venue-type';

export { isBookingStatus, assertBookingStatus } from './is-booking-status';

export {
  isApiError,
  isApiErrorWithCode,
  isAuthenticationError,
  isAuthorizationError,
  isNotFoundError,
  isValidationError,
} from './is-api-error';
