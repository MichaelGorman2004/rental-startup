/**
 * Shared entity types barrel export.
 *
 * All entity interfaces match their backend SQLAlchemy models.
 * Property names use camelCase (transformed from snake_case in API layer).
 */

export type {
  User,
  UserSummary,
  AuthenticatedUser,
} from './user';

export type {
  Organization,
  OrganizationSummary,
  OrganizationProfile,
} from './organization';

export type {
  VenueAddress,
  Venue,
  VenueSummary,
} from './venue';

export type {
  Booking,
  BookingWithDetails,
  AdminBookingView,
  BookingConfirmation,
  UpcomingEvent,
} from './booking';
