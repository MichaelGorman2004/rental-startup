import { useQuery } from '@tanstack/react-query';
import type { VenueStats } from '../types';
import {
  ADMIN_QUERY_KEYS,
  STATS_STALE_TIME_MS,
  STATS_REFETCH_INTERVAL_MS,
  MOCK_VENUE_STATS,
} from '../constants';

/** Simulate fetching venue stats. Replace with GET /api/v1/venues/:id/stats. */
async function fetchVenueStats(): Promise<VenueStats> {
  await new Promise((resolve) => { setTimeout(resolve, 500); });
  return MOCK_VENUE_STATS;
}

/**
 * Fetches venue performance stats with auto-refresh.
 * Polls every 60 seconds for near-real-time data.
 */
export function useVenueStats(venueId: string) {
  const query = useQuery({
    queryKey: ADMIN_QUERY_KEYS.STATS(venueId),
    queryFn: fetchVenueStats,
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
