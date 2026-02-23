/**
 * Centralized query key factory for all React Query caches.
 * Hierarchical keys enable precise cache invalidation at any level.
 *
 * Pattern: entity → scope → parameters
 * Example: ['venues', 'list', { type: 'bar' }]
 *
 * Invalidation examples:
 *   queryKeys.venues.all       → invalidates all venue queries
 *   queryKeys.venues.lists()   → invalidates all venue lists (not details)
 *   queryKeys.venues.detail(id) → invalidates one specific venue
 */
export const queryKeys = {
  /** Venue-related query keys. */
  venues: {
    all: ['venues'] as const,
    lists: () => [...queryKeys.venues.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [
      ...queryKeys.venues.lists(),
      filters,
    ] as const,
    details: () => [...queryKeys.venues.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.venues.details(), id] as const,
  },

  /** Booking-related query keys. */
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [
      ...queryKeys.bookings.lists(),
      filters,
    ] as const,
    details: () => [...queryKeys.bookings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.bookings.details(), id] as const,
  },

  /** Venue admin dashboard query keys. */
  admin: {
    all: ['venue-admin'] as const,
    stats: (venueId: string) => [
      ...queryKeys.admin.all,
      'stats',
      venueId,
    ] as const,
    bookings: (venueId: string) => [
      ...queryKeys.admin.all,
      'bookings',
      venueId,
    ] as const,
  },

  /** Dashboard query keys. */
  dashboard: {
    all: ['dashboard'] as const,
    events: () => [...queryKeys.dashboard.all, 'events'] as const,
  },
} as const;
