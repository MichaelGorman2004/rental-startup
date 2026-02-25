import { BookingStatus } from '@venuelink/shared';

/** UI messages for the My Bookings page. */
export const MY_BOOKINGS_MESSAGES = {
  PAGE_TITLE: 'My Bookings',
  PAGE_SUBTITLE: 'View and manage your organization\'s bookings',

  EMPTY_TITLE: 'No bookings yet',
  EMPTY_SUBTITLE: 'When you book a venue, it will appear here.',
  EMPTY_CTA: 'Browse Venues',

  CANCEL_TITLE: 'Cancel Booking',
  CANCEL_MESSAGE: 'Are you sure you want to cancel this booking? This action cannot be undone.',
  CANCEL_CONFIRM: 'Cancel Booking',
  CANCEL_DISMISS: 'Keep Booking',

  CANCEL_SUCCESS: 'Booking cancelled successfully',
  CANCEL_ERROR: 'Failed to cancel booking',

  ERROR_TITLE: 'Failed to load bookings',
  GUESTS_LABEL: 'guests',

  FILTER_ALL: 'All',
} as const;

/** Filter chip options for booking status. */
export const BOOKING_STATUS_FILTERS = [
  { label: MY_BOOKINGS_MESSAGES.FILTER_ALL, value: null },
  { label: 'Pending', value: BookingStatus.Pending },
  { label: 'Confirmed', value: BookingStatus.Confirmed },
  { label: 'Completed', value: BookingStatus.Completed },
  { label: 'Cancelled', value: BookingStatus.Cancelled },
] as const;

/** Number of skeleton cards for loading state. */
export const BOOKINGS_PAGE_SKELETON_COUNT = 3;
