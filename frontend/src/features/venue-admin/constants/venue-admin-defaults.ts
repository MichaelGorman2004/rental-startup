export { STATUS_BADGE_COLORS, STATUS_LABELS } from '@/lib/constants';

/** Auto-refresh interval for venue stats in milliseconds (60 seconds). */
export const STATS_REFETCH_INTERVAL_MS = 60 * 1000;

/** Stale time for venue stats (1 minute — dynamic data). */
export const STATS_STALE_TIME_MS = 60 * 1000;

/** Stale time for venue bookings (2 minutes). */
export const BOOKINGS_STALE_TIME_MS = 2 * 60 * 1000;

/** Number of skeleton cards for stats loading state. */
export const STATS_SKELETON_COUNT = 3;

/** Number of skeleton cards for bookings loading state. */
export const BOOKINGS_SKELETON_COUNT = 3;

/** Default number of admin bookings per page. */
export const ADMIN_BOOKINGS_PAGE_SIZE = 20;

/** Query key hierarchy for venue admin caches. */
export const ADMIN_QUERY_KEYS = {
  STATS: (venueId: string | null) => ['venue-admin', 'stats', venueId] as const,
  BOOKINGS: (venueId: string | null) => ['venue-admin', 'bookings', venueId] as const,
};

/** UI messages for the venue admin dashboard. */
export const ADMIN_MESSAGES = {
  PAGE_TITLE: 'Venue Dashboard',
  PAGE_SUBTITLE: 'Manage bookings and track performance',

  STATS_BOOKINGS: 'Bookings This Month',
  STATS_REVENUE: 'Revenue',
  STATS_OCCUPANCY: 'Occupancy',

  BOOKINGS_TITLE: 'Recent Bookings',
  BOOKINGS_EMPTY: 'No booking requests yet',
  BOOKINGS_EMPTY_SUBTITLE: 'When organizations request your venue, they will appear here.',
  BOOKINGS_ERROR: 'Failed to load bookings',
  BOOKINGS_PAGE_INFO: (page: number, totalPages: number) => `Page ${page} of ${totalPages}`,

  ACTION_ACCEPT: 'Accept',
  ACTION_DECLINE: 'Decline',
  ACTION_SUCCESS_ACCEPT: 'Booking confirmed successfully',
  ACTION_SUCCESS_DECLINE: 'Booking declined',

  GUESTS_LABEL: 'guests',

  ACCESS_DENIED_TITLE: 'Access Denied',
  ACCESS_DENIED_SUBTITLE: 'This dashboard is only available to venue administrators.',
  BACK_TO_HOME: 'Go to Dashboard',
} as const;

/** Number of columns in the calendar grid. */
export const CALENDAR_DAYS_IN_WEEK = 7;

/** Short day labels for the calendar header row. */
export const CALENDAR_DAY_LABELS = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
] as const;

/** UI messages for the booking calendar section. */
export const CALENDAR_MESSAGES = {
  SECTION_TITLE: 'Booking Calendar',
  PREVIOUS_MONTH: 'Go to previous month',
  NEXT_MONTH: 'Go to next month',
  GO_TO_TODAY: 'Go to today',
  NO_BOOKINGS_ON_DATE: 'No bookings on this date',
} as const;
