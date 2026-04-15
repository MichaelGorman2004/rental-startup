/** Dashboard cache time in milliseconds (5 minutes) */
const CACHE_TIME_MS = 5 * 60 * 1000;

/** Subtitle shown to venue admin users on the dashboard. */
export const VENUE_ADMIN_SUBTITLE = 'Manage your venue and bookings';

/** Label for the budget overview card. */
export const BUDGET_LABEL = 'Budget Overview';

/** Subtitle for the budget overview card. */
export const BUDGET_SUBTITLE = 'Total event spending to date';

/** Number of skeleton cards to show while DashboardStats is loading. */
export const SKELETON_COUNT = 3;

/** Height in pixels of each DashboardStats skeleton card. */
export const SKELETON_HEIGHT = 100;

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
    STATS_ERROR: 'Failed to load dashboard stats. Budget data may be unavailable.',
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
