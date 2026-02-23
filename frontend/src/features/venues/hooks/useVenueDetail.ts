import { useQuery } from '@tanstack/react-query';
import type { Venue } from '../types/venue.types';
import { VENUE_QUERY_KEYS, VENUE_STALE_TIME_MS } from '../constants/venue-defaults';
import { MOCK_VENUES } from '../constants/mock-venues';

/**
 * Hook to fetch a single venue by ID using React Query.
 * Returns the venue data, loading/error states, and a 404 flag.
 * Currently uses mock data; will be replaced with GET /api/v1/venues/:id.
 */
export function useVenueDetail(venueId: string) {
  const query = useQuery({
    queryKey: VENUE_QUERY_KEYS.detail(venueId),
    queryFn: async (): Promise<Venue | null> => {
      await new Promise((resolve) => { setTimeout(resolve, 400); });
      return MOCK_VENUES.find((v) => v.id === venueId) ?? null;
    },
    staleTime: VENUE_STALE_TIME_MS,
    enabled: Boolean(venueId),
  });

  return {
    venue: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    isNotFound: !query.isLoading && !query.isError && query.data === null,
    refetch: query.refetch,
  };
}
