import { BookingStatus, BOOKING_STATUS_VALUES } from '../enums';

/**
 * Type guard for BookingStatus enum.
 *
 * Use for runtime validation of API responses or user input.
 *
 * @param value - Value to check
 * @returns True if value is a valid BookingStatus
 *
 * @example
 * ```ts
 * const status = booking.status;
 * if (isBookingStatus(status)) {
 *   // status is typed as BookingStatus
 *   updateUI(status);
 * }
 * ```
 */
export function isBookingStatus(value: unknown): value is BookingStatus {
  return (
    typeof value === 'string' && BOOKING_STATUS_VALUES.includes(value as BookingStatus)
  );
}

/**
 * Assert that a value is a valid BookingStatus.
 *
 * Throws if the value is not a valid BookingStatus.
 *
 * @param value - Value to assert
 * @param message - Optional error message
 * @throws Error if value is not a valid BookingStatus
 */
export function assertBookingStatus(
  value: unknown,
  message = 'Invalid booking status'
): asserts value is BookingStatus {
  if (!isBookingStatus(value)) {
    throw new Error(`${message}: ${String(value)}`);
  }
}
