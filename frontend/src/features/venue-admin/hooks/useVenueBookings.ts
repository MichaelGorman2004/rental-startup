import { useQuery } from '@tanstack/react-query';
import { getVenueBookings } from '@/lib/api/endpoints';
import { ADMIN_QUERY_KEYS, BOOKINGS_STALE_TIME_MS } from '../constants';

/**
 * Fetches booking requests for a venue admin.
 * Returns bookings sorted with pending requests first (handled by backend).
 */
export function useVenueBookings(venueId: string) {
  const query = useQuery({
    queryKey: ADMIN_QUERY_KEYS.BOOKINGS(venueId),
    queryFn: () => getVenueBookings(venueId),
    staleTime: BOOKINGS_STALE_TIME_MS,
    enabled: Boolean(venueId),
  });

  return {
    bookings: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
