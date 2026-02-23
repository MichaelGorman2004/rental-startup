/** Default stale time for queries (5 minutes). */
export const DEFAULT_STALE_TIME_MS = 5 * 60 * 1000;

/** Default garbage collection time for inactive queries (30 minutes). */
export const DEFAULT_GC_TIME_MS = 30 * 60 * 1000;

/** Default number of retries for failed queries. */
export const DEFAULT_RETRY_COUNT = 1;

/**
 * Entity-specific stale times.
 * Shorter intervals for frequently-changing data, longer for stable data.
 */
export const STALE_TIMES = {
  /** Venues change infrequently (10 minutes). */
  VENUES: 10 * 60 * 1000,
  /** Bookings update moderately often (2 minutes). */
  BOOKINGS: 2 * 60 * 1000,
  /** User profile rarely changes (15 minutes). */
  USER_PROFILE: 15 * 60 * 1000,
  /** Dashboard stats are dynamic (1 minute). */
  STATS: 60 * 1000,
  /** Upcoming events for dashboard (5 minutes). */
  EVENTS: 5 * 60 * 1000,
} as const;

/** Auto-refresh intervals for polling queries. */
export const REFETCH_INTERVALS = {
  /** Venue admin stats poll every 60 seconds. */
  STATS: 60 * 1000,
} as const;
