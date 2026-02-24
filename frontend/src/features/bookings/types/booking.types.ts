/**
 * Booking types - re-exported from shared package for backward compatibility.
 *
 * NOTE: Prefer importing directly from '@venuelink/shared' for new code.
 * This file maintains backward compatibility during migration.
 */

// Re-export shared types
export { BookingStatus } from '@venuelink/shared';
export type { BookingConfirmation, UpcomingEvent } from '@venuelink/shared';

// Local types not in shared package (form-specific)

/** Raw form values managed by react-hook-form (pre-validation). */
export interface BookingFormValues {
  eventName: string;
  eventDate: Date | null;
  eventTime: string;
  guestCount: number | undefined;
  specialRequests: string;
  budgetCents: number | null;
}

/** Validated booking data after Zod parsing (all required fields present). */
export interface ValidatedBookingData {
  eventName: string;
  eventDate: Date;
  eventTime: string;
  guestCount: number;
  specialRequests: string;
  budgetCents: number | null;
}

/** API request body for creating a booking. */
export interface CreateBookingRequest {
  venueId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  specialRequests: string;
  budgetCents: number | null;
}
