import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { Venue, VenueFilters, VenueListResponse } from '@/features/venues/types';
import { getVenues, getVenue } from '../../api/endpoints/venues';
import { queryKeys } from '../keys';
import { STALE_TIMES } from '../constants';

/** Build API params from frontend filter shape. */
function toApiParams(filters: VenueFilters) {
  return {
    type: filters.type,
    search: filters.search || undefined,
    page: filters.page,
    page_size: filters.pageSize,
  };
}

/**
 * Query hook for fetching a paginated, filtered venue list.
 * Uses the centralized API client and query key factory.
 */
export function useVenuesQuery(filters: VenueFilters) {
  return useQuery<VenueListResponse>({
    queryKey: queryKeys.venues.list({
      type: filters.type,
      search: filters.search,
      page: filters.page,
    }),
    queryFn: () => getVenues(toApiParams(filters)),
    staleTime: STALE_TIMES.VENUES,
  });
}

/**
 * Query hook for fetching a single venue by ID.
 * Enabled only when a valid venueId is provided.
 */
export function useVenueDetailQuery(venueId: string) {
  return useQuery<Venue | null>({
    queryKey: queryKeys.venues.detail(venueId),
    queryFn: () => getVenue(venueId),
    staleTime: STALE_TIMES.VENUES,
    enabled: Boolean(venueId),
  });
}

/**
 * Prefetch a venue detail into the cache on hover.
 * Returns a stable callback suitable for onMouseEnter handlers.
 */
export function usePrefetchVenue() {
  const queryClient = useQueryClient();

  return useCallback(
    (venueId: string) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.venues.detail(venueId),
        queryFn: () => getVenue(venueId),
        staleTime: STALE_TIMES.VENUES,
      });
    },
    [queryClient],
  );
}
