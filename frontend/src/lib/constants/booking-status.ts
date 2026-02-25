import { BookingStatus } from '@venuelink/shared';

/** Mantine color references for booking status badges. */
export const STATUS_BADGE_COLORS: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: 'yellow',
  [BookingStatus.Confirmed]: 'green',
  [BookingStatus.Rejected]: 'red',
  [BookingStatus.Completed]: 'blue',
  [BookingStatus.Cancelled]: 'gray',
};

/** Human-readable labels for booking statuses. */
export const STATUS_LABELS: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: 'Pending',
  [BookingStatus.Confirmed]: 'Confirmed',
  [BookingStatus.Rejected]: 'Declined',
  [BookingStatus.Completed]: 'Completed',
  [BookingStatus.Cancelled]: 'Cancelled',
};
