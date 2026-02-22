/** Debounce delay for search input in milliseconds. */
export const SEARCH_DEBOUNCE_MS = 500;

/** Default page size for venue list pagination. */
export const DEFAULT_PAGE_SIZE = 20;

/** Default page number (1-indexed). */
export const DEFAULT_PAGE = 1;

/** Number of skeleton cards to display during loading. */
export const SKELETON_COUNT = 6;

/** Height of the gradient placeholder on venue cards in pixels. */
export const CARD_GRADIENT_HEIGHT = 140;

/** Venue cache time (10 minutes — venues change infrequently). */
export const VENUE_STALE_TIME_MS = 10 * 60 * 1000;

/** Query key hierarchy for venue-related React Query caches. */
export const VENUE_QUERY_KEYS = {
  ALL: ['venues'] as const,
  LISTS: ['venues', 'list'] as const,
  list: (filters: Record<string, unknown>) => ['venues', 'list', filters] as const,
  DETAILS: ['venues', 'detail'] as const,
  detail: (id: string) => ['venues', 'detail', id] as const,
};

/** UI messages for the venue browse feature. */
export const VENUE_MESSAGES = {
  PAGE_TITLE: 'Browse Venues',
  PAGE_SUBTITLE: 'Find the perfect space for your next event',
  SEARCH_PLACEHOLDER: 'Search venues by name or location...',
  NO_RESULTS_TITLE: 'No venues found',
  NO_RESULTS_SUBTITLE: 'Try adjusting your search or filters',
  ERROR_LOADING: 'Failed to load venues',
  RETRY: 'Try again',
  CAPACITY_UNIT: 'guests',
  PRICE_PREFIX: 'From',
} as const;
