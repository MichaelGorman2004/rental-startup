import { useAuth, useUser } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { isApiError } from '@/lib/api/error-handler';
import { getMyVenue } from '@/lib/api/endpoints';
import { ApiErrorCode, type ApiError } from '@/lib/api/types';
import type { Venue } from '@/features/venues/types';

/** Query key for the current user's venue. */
const MY_VENUE_QUERY_KEY = ['venue-admin', 'my-venue'] as const;

/** Stale time for my venue data (5 minutes). */
const MY_VENUE_STALE_TIME_MS = 5 * 60 * 1000;

/**
 * Fetches the current user's venue.
 * Returns the venue, loading/error states, and a 404 flag.
 * Only runs when the user is authenticated as a venue admin.
 */
export function useMyVenue() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const isVenueAdmin = user?.publicMetadata?.['role'] === 'venue_admin';

  const query = useQuery<Venue | null, ApiError>({
    queryKey: MY_VENUE_QUERY_KEY,
    queryFn: async () => {
      try {
        return await getMyVenue();
      } catch (error) {
        if (isApiError(error) && error.code === ApiErrorCode.NotFoundError) {
          return null;
        }
        throw error;
      }
    },
    staleTime: MY_VENUE_STALE_TIME_MS,
    enabled: Boolean(isSignedIn) && isVenueAdmin,
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
