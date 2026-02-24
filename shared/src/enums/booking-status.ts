/**
 * Booking lifecycle states for workflow management.
 *
 * State transitions:
 * - pending -> confirmed (venue accepts)
 * - pending -> rejected (venue declines)
 * - confirmed -> completed (event occurs successfully)
 * - confirmed -> cancelled (either party cancels)
 * - pending -> cancelled (organization cancels before confirmation)
 *
 * Values must match PostgreSQL `booking_status` ENUM exactly.
 * @see backend/app/core/constants/enums.py#BookingStatus
 */
export enum BookingStatus {
  /** Booking request submitted, awaiting venue approval */
  Pending = 'pending',
  /** Venue has accepted the booking */
  Confirmed = 'confirmed',
  /** Venue has declined the booking */
  Rejected = 'rejected',
  /** Event has occurred successfully */
  Completed = 'completed',
  /** Booking cancelled by either party */
  Cancelled = 'cancelled',
}

/** Array of all valid BookingStatus values for iteration/validation. */
export const BOOKING_STATUS_VALUES = Object.values(
  BookingStatus
) as BookingStatus[];

/** Statuses that indicate an active/upcoming booking. */
export const ACTIVE_BOOKING_STATUSES: BookingStatus[] = [
  BookingStatus.Pending,
  BookingStatus.Confirmed,
];

/** Statuses that indicate a terminated booking. */
export const TERMINAL_BOOKING_STATUSES: BookingStatus[] = [
  BookingStatus.Rejected,
  BookingStatus.Completed,
  BookingStatus.Cancelled,
];
