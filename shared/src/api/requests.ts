import type { VenueType, OrganizationType } from '../enums';

/**
 * Request body for creating a new venue.
 *
 * All required fields for POST /api/v1/venues.
 */
export interface CreateVenueRequest {
  /** Venue display name (3-100 chars) */
  name: string;
  /** Venue category */
  type: VenueType;
  /** Maximum guest capacity (10-500) */
  capacity: number;
  /** Base rental price in cents (10000-100000) */
  basePriceCents: number;
  /** Street address */
  addressStreet: string;
  /** City */
  addressCity: string;
  /** State code (2 letters) */
  addressState: string;
  /** ZIP code */
  addressZip: string;
}

/**
 * Request body for updating a venue.
 *
 * All fields optional for PATCH /api/v1/venues/:id.
 */
export interface UpdateVenueRequest {
  /** Venue display name (3-100 chars) */
  name?: string;
  /** Venue category */
  type?: VenueType;
  /** Maximum guest capacity (10-500) */
  capacity?: number;
  /** Base rental price in cents (10000-100000) */
  basePriceCents?: number;
  /** Street address */
  addressStreet?: string;
  /** City */
  addressCity?: string;
  /** State code (2 letters) */
  addressState?: string;
  /** ZIP code */
  addressZip?: string;
}

/**
 * Request body for creating a booking.
 *
 * Sent to POST /api/v1/bookings.
 */
export interface CreateBookingRequest {
  /** UUID of the venue to book */
  venueId: string;
  /** Event name/title */
  eventName: string;
  /** Event date in ISO 8601 format (YYYY-MM-DD) */
  eventDate: string;
  /** Event start time in HH:MM format */
  eventTime: string;
  /** Expected number of guests */
  guestCount: number;
  /** Special requests or notes (optional) */
  specialRequests?: string;
  /** Budget range in cents (optional) */
  budgetCents?: number | null;
}

/**
 * Request body for creating an organization.
 *
 * Sent to POST /api/v1/organizations.
 */
export interface CreateOrganizationRequest {
  /** Organization display name */
  name: string;
  /** Organization classification */
  type: OrganizationType;
  /** University name */
  university: string;
}

/**
 * Request body for updating an organization profile.
 *
 * All fields optional for PATCH /api/v1/organizations/:id.
 */
export interface UpdateOrganizationRequest {
  /** Organization display name */
  name?: string;
  /** Organization classification */
  type?: OrganizationType;
  /** University name */
  university?: string;
  /** Organization description/bio */
  description?: string;
  /** Public contact email */
  contactEmail?: string;
  /** Contact phone number */
  contactPhone?: string;
  /** Organization size */
  memberCount?: number;
  /** Organization website URL */
  websiteUrl?: string;
}

/**
 * Action type for booking status updates.
 *
 * Used by venue admins to accept or decline bookings.
 */
export type BookingActionType = 'accept' | 'decline';

/**
 * Payload for booking accept/decline action.
 */
export interface BookingActionPayload {
  /** UUID of the booking */
  bookingId: string;
  /** Action to perform */
  action: BookingActionType;
  /** UUID of the venue (for cache invalidation) */
  venueId: string;
}
