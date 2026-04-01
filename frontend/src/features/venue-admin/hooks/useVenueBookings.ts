import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getVenueBookings } from '@/lib/api/endpoints';
import type { AdminBookingsResponse } from '@/lib/api/endpoints';
import { ADMIN_QUERY_KEYS, BOOKINGS_STALE_TIME_MS, ADMIN_BOOKINGS_PAGE_SIZE } from '../constants';

/**
 * Fetches booking requests for a venue admin with pagination.
 * Returns bookings sorted with pending requests first (handled by backend).
 */
export function useVenueBookings(venueId: string | null) {
  const [page, setPage] = useState(1);

  const query = useQuery<AdminBookingsResponse>({
    queryKey: [...ADMIN_QUERY_KEYS.BOOKINGS(venueId), page],
    queryFn: () => {
      if (!venueId) throw new Error('venueId is required');
      return getVenueBookings(venueId, {
        page,
        page_size: ADMIN_BOOKINGS_PAGE_SIZE,
      });
    },
    staleTime: BOOKINGS_STALE_TIME_MS,
    enabled: Boolean(venueId),
  });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    bookings: query.data?.items ?? [],
    totalPages: query.data?.totalPages ?? 0,
    page,
    setPage: handlePageChange,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
