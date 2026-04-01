/** Dashboard cache time in milliseconds (5 minutes) */
const CACHE_TIME_MS = 5 * 60 * 1000;

/**
 * Constants for the dashboard feature.
 * Includes cache configuration, query keys, and UI messages.
 */
export const DASHBOARD_CONSTANTS = {
  CACHE_TIME_MS,
  QUERY_KEYS: {
    UPCOMING_EVENTS: 'upcomingEvents',
    ORGANIZATION: 'organization',
    DASHBOARD_SUMMARY: 'dashboardSummary',
  },
  LABELS: {
    QUICK_ACTIONS: 'Quick Actions',
    UPCOMING_EVENTS: 'Upcoming Events',
  },
  MESSAGES: {
    GREETING: 'Dashboard',
    SUBTITLE: 'Manage your events and bookings',
    NO_EVENTS: 'No upcoming events',
    NO_EVENTS_SUBTITLE: 'Browse venues to book your next event!',
    LOADING_EVENTS: 'Loading events...',
    ERROR_LOADING: 'Failed to load events',
    RETRY: 'Try again',
  },
  /** @deprecated Stats are now fetched via useDashboardStats hook. */
  STATS: [] as { label: string; value: string; trend: string }[],
  API: {
    BOOKINGS_ENDPOINT: '/api/v1/bookings',
  },
  /** Number of skeleton cards to show during loading */
  SKELETON_COUNT: 3,
} as const;
