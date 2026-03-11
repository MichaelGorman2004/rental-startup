import { useQuery } from '@tanstack/react-query';
import { getMyVenue } from '@/lib/api/endpoints';
import type { Venue } from '@/features/venues/types';

/** Query key for the current user's venue. */
const MY_VENUE_QUERY_KEY = ['venue-admin', 'my-venue'] as const;

/** Stale time for my venue data (5 minutes). */
const MY_VENUE_STALE_TIME_MS = 5 * 60 * 1000;

/**
 * Fetches the current user's venue.
 * Returns the venue, loading/error states, and a 404 flag.
 */
export function useMyVenue() {
  const query = useQuery<Venue | null>({
    queryKey: MY_VENUE_QUERY_KEY,
    queryFn: async () => {
      try {
        return await getMyVenue();
      } catch (error) {
        if ((error as { status?: number }).status === 404) {
          return null;
        }
        throw error;
      }
    },
    staleTime: MY_VENUE_STALE_TIME_MS,
  });

  return {
    venue: query.data ?? null,
    venueId: query.data?.id ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    isNotFound: !query.isLoading && !query.isError && query.data === null,
    refetch: query.refetch,
  };
}
