import { BookingStatus } from '../../bookings/types/booking.types';
import type { AdminBooking, VenueStats } from '../types/venue-admin.types';

/** Auto-refresh interval for venue stats in milliseconds (60 seconds). */
export const STATS_REFETCH_INTERVAL_MS = 60 * 1000;

/** Stale time for venue stats (1 minute — dynamic data). */
export const STATS_STALE_TIME_MS = 60 * 1000;

/** Stale time for venue bookings (2 minutes). */
export const BOOKINGS_STALE_TIME_MS = 2 * 60 * 1000;

/** Number of skeleton cards for stats loading state. */
export const STATS_SKELETON_COUNT = 4;

/** Number of skeleton cards for bookings loading state. */
export const BOOKINGS_SKELETON_COUNT = 3;

/** Mock mutation delay in milliseconds. */
export const MOCK_ACTION_DELAY_MS = 800;

/** Query key hierarchy for venue admin caches. */
export const ADMIN_QUERY_KEYS = {
  STATS: (venueId: string) => ['venue-admin', 'stats', venueId] as const,
  BOOKINGS: (venueId: string) => ['venue-admin', 'bookings', venueId] as const,
};

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

/** UI messages for the venue admin dashboard. */
export const ADMIN_MESSAGES = {
  PAGE_TITLE: 'Venue Dashboard',
  PAGE_SUBTITLE: 'Manage bookings and track performance',

  STATS_BOOKINGS: 'Bookings This Month',
  STATS_REVENUE: 'Revenue',
  STATS_RATING: 'Avg Rating',
  STATS_RATING_NONE: 'No reviews yet',
  STATS_OCCUPANCY: 'Occupancy',

  BOOKINGS_TITLE: 'Recent Bookings',
  BOOKINGS_EMPTY: 'No booking requests yet',
  BOOKINGS_EMPTY_SUBTITLE: 'When organizations request your venue, they will appear here.',
  BOOKINGS_ERROR: 'Failed to load bookings',

  ACTION_ACCEPT: 'Accept',
  ACTION_DECLINE: 'Decline',
  ACTION_SUCCESS_ACCEPT: 'Booking confirmed successfully',
  ACTION_SUCCESS_DECLINE: 'Booking declined',

  GUESTS_LABEL: 'guests',

  ACCESS_DENIED_TITLE: 'Access Denied',
  ACCESS_DENIED_SUBTITLE: 'This dashboard is only available to venue administrators.',
  BACK_TO_HOME: 'Go to Dashboard',
} as const;

/** Mock stats data for development. */
export const MOCK_VENUE_STATS: VenueStats = {
  bookingsThisMonth: 12,
  revenueCents: 540000,
  averageRating: 4.7,
  occupancyPercent: 78,
};

/** Mock bookings data for development. */
export const MOCK_ADMIN_BOOKINGS: AdminBooking[] = [
  {
    id: 'b1',
    organizationName: 'Alpha Phi Omega',
    eventName: 'Spring Social',
    eventDate: '2026-03-15',
    eventTime: '19:00',
    guestCount: 85,
    status: BookingStatus.Pending,
    createdAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 'b2',
    organizationName: 'Student Gov Association',
    eventName: 'Leadership Banquet',
    eventDate: '2026-03-22',
    eventTime: '18:30',
    guestCount: 120,
    status: BookingStatus.Pending,
    createdAt: '2026-02-19T14:30:00Z',
  },
  {
    id: 'b3',
    organizationName: 'Delta Sigma Theta',
    eventName: 'Charity Gala',
    eventDate: '2026-03-08',
    eventTime: '20:00',
    guestCount: 65,
    status: BookingStatus.Confirmed,
    createdAt: '2026-02-18T09:00:00Z',
  },
  {
    id: 'b4',
    organizationName: 'Engineering Club',
    eventName: 'Tech Mixer',
    eventDate: '2026-03-01',
    eventTime: '17:00',
    guestCount: 45,
    status: BookingStatus.Completed,
    createdAt: '2026-02-10T11:00:00Z',
  },
];
