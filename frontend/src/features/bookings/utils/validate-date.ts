import { MIN_NOTICE_DAYS, MAX_ADVANCE_DAYS } from '../constants/booking-defaults';

/**
 * Get the earliest allowed booking date (today + MIN_NOTICE_DAYS).
 *
 * @example getMinBookingDate() → Date (7 days from now)
 */
export function getMinBookingDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + MIN_NOTICE_DAYS);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Get the latest allowed booking date (today + MAX_ADVANCE_DAYS).
 *
 * @example getMaxBookingDate() → Date (90 days from now)
 */
export function getMaxBookingDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + MAX_ADVANCE_DAYS);
  date.setHours(23, 59, 59, 999);
  return date;
}
