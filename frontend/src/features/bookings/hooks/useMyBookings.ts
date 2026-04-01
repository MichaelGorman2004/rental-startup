import { useQuery } from '@tanstack/react-query';
import type { BookingStatus } from '@venuelink/shared';
import { getMyBookings } from '@/lib/api/endpoints';
import type { MyBookingsResponse } from '@/lib/api/endpoints';
import { queryKeys, STALE_TIMES } from '@/lib/react-query';
import { BOOKINGS_PAGE_SIZE } from '../constants/bookings-page-defaults';

/** Hook to fetch the current user's organization bookings with filters. */
export function useMyBookings(status: BookingStatus | null, page: number = 1) {
  return useQuery<MyBookingsResponse>({
    queryKey: queryKeys.bookings.list({ scope: 'me', status, page }),
    queryFn: () => getMyBookings({
      status: status ?? undefined,
      page,
      page_size: BOOKINGS_PAGE_SIZE,
    }),
    staleTime: STALE_TIMES.BOOKINGS,
  });
}
