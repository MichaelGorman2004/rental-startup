/**
 * Format a Date to a readable booking date string.
 *
 * @example formatBookingDate(new Date('2026-03-15')) → "March 15, 2026"
 */
export function formatBookingDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * Format a time string (HH:MM) to a readable 12-hour format.
 *
 * @example formatBookingTime('20:00') → "8:00 PM"
 */
export function formatBookingTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  if (hours === undefined || minutes === undefined) return time;
  const date = new Date();
  date.setHours(hours, minutes);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}
