import type { BookingStatus } from '../enums';

/**
 * Booking entity as stored in the database.
 *
 * Represents a venue booking request with its current status.
 * @see backend/app/modules/bookings/models.py#Booking
 */
export interface Booking {
  /** UUID v4 primary key */
  id: string;
  /** UUID of the booked venue */
  venueId: string;
  /** UUID of the booking organization */
  organizationId: string;
  /** Event date in ISO 8601 format (YYYY-MM-DD) */
  eventDate: string;
  /** Event start time in HH:MM:SS format */
  eventTime: string;
  /** Expected number of guests */
  guestCount: number;
  /** Current booking status */
  status: BookingStatus;
  /** Event name/title */
  eventName: string;
  /** Special requests or notes (optional) */
  specialRequests?: string;
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Extended booking with related entity names.
 *
 * Used for display in lists/cards where venue and org names are needed.
 */
export interface BookingWithDetails extends Booking {
  /** Venue name for display */
  venueName: string;
  /** Organization name for display */
  organizationName: string;
}

/**
 * Booking data for admin dashboard display.
 *
 * Includes organization context for venue admin review.
 */
export interface AdminBookingView {
  /** UUID v4 identifier */
  id: string;
  /** Organization name for display */
  organizationName: string;
  /** Event name/title */
  eventName: string;
  /** Event date in ISO 8601 format */
  eventDate: string;
  /** Event time in HH:MM format */
  eventTime: string;
  /** Expected number of guests */
  guestCount: number;
  /** Current booking status */
  status: BookingStatus;
  /** ISO 8601 timestamp of creation */
  createdAt: string;
}

/**
 * Booking confirmation returned after successful creation.
 *
 * Includes computed fields and formatted data for display.
 */
export interface BookingConfirmation {
  /** UUID v4 identifier */
  id: string;
  /** Human-readable reference number */
  referenceNumber: string;
  /** Venue name for display */
  venueName: string;
  /** Event name/title */
  eventName: string;
  /** Event date in ISO 8601 format */
  eventDate: string;
  /** Event time in HH:MM format */
  eventTime: string;
  /** Expected number of guests */
  guestCount: number;
  /** Estimated total cost in cents */
  estimatedCostCents: number;
  /** Booking status (typically 'pending' after creation) */
  status: BookingStatus;
}

/**
 * Upcoming event display data for dashboard.
 *
 * Combines booking and venue info for event cards.
 */
export interface UpcomingEvent {
  /** Booking UUID */
  id: string;
  /** Event date in ISO 8601 format */
  eventDate: string;
  /** Event time in HH:MM format */
  eventTime: string;
  /** Event name/title */
  eventName: string;
  /** Venue name */
  venueName: string;
  /** Formatted venue address for display */
  venueAddress: string;
}
