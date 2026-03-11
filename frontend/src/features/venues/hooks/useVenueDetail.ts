import { useQuery } from '@tanstack/react-query';
import { getVenue } from '@/lib/api/endpoints';
import type { Venue } from '../types/venue.types';
import { VENUE_QUERY_KEYS, VENUE_STALE_TIME_MS } from '../constants/venue-defaults';

/**
 * Hook to fetch a single venue by ID using React Query.
 * Returns the venue data, loading/error states, and a 404 flag.
 */
export function useVenueDetail(venueId: string) {
  const query = useQuery({
    queryKey: VENUE_QUERY_KEYS.detail(venueId),
    queryFn: async (): Promise<Venue | null> => {
      try {
        return await getVenue(venueId);
      } catch (error) {
        if ((error as { status?: number }).status === 404) {
          return null;
        }
        throw error;
      }
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
