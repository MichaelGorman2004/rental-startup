import { useQuery } from '@tanstack/react-query';
import { getVenues } from '@/lib/api/endpoints';
import type { VenueFilters } from '../types/venue.types';
import { VENUE_QUERY_KEYS, VENUE_STALE_TIME_MS } from '../constants/venue-defaults';

/**
 * Hook to fetch and filter venues using React Query.
 * Calls GET /api/v1/venues with server-side filtering and pagination.
 */
export function useVenues(filters: VenueFilters) {
  const {
    type, search, page, pageSize,
  } = filters;

  const query = useQuery({
    queryKey: VENUE_QUERY_KEYS.list({
      type, search, page, pageSize,
    }),
    queryFn: () => getVenues({
      type: type ?? undefined,
      search: search || undefined,
      page,
      page_size: pageSize,
    }),
    staleTime: VENUE_STALE_TIME_MS,
  });

  return {
    venues: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
