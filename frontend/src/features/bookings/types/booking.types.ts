/** Booking status values matching the PostgreSQL booking_status enum. */
export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Rejected = 'rejected',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

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

/** Confirmation data returned after successful booking creation. */
export interface BookingConfirmation {
  id: string;
  referenceNumber: string;
  venueName: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  estimatedCostCents: number;
  status: BookingStatus;
}
