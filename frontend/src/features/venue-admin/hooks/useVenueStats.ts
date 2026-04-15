import { useQuery } from '@tanstack/react-query';

import { getVenueStats } from '@/lib/api/endpoints/bookings';
import type { VenueStats } from '../types';
import {
  ADMIN_QUERY_KEYS,
  STATS_STALE_TIME_MS,
  STATS_REFETCH_INTERVAL_MS,
} from '../constants';

/**
 * Fetches venue performance stats with auto-refresh.
 * Calls GET /venues/:id/stats. Polls every 60 seconds.
 */
export function useVenueStats(venueId: string | null) {
  const query = useQuery<VenueStats>({
    queryKey: ADMIN_QUERY_KEYS.STATS(venueId),
    queryFn: () => getVenueStats(venueId!),
    staleTime: STATS_STALE_TIME_MS,
    refetchInterval: STATS_REFETCH_INTERVAL_MS,
    enabled: Boolean(venueId),
  });

  return {
    stats: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
