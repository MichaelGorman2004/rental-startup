import { useQuery } from '@tanstack/react-query';
import { BookingStatus } from '../../bookings/types/booking.types';
import type { AdminBooking } from '../types/venue-admin.types';
import {
  ADMIN_QUERY_KEYS,
  BOOKINGS_STALE_TIME_MS,
  MOCK_ADMIN_BOOKINGS,
} from '../constants/venue-admin-defaults';

/** Sort bookings: pending first, then by date descending. */
function sortBookings(bookings: AdminBooking[]): AdminBooking[] {
  return [...bookings].sort((a, b) => {
    const aPending = a.status === BookingStatus.Pending ? 0 : 1;
    const bPending = b.status === BookingStatus.Pending ? 0 : 1;
    if (aPending !== bPending) return aPending - bPending;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

/** Simulate fetching venue bookings. Replace with GET /api/v1/venues/:id/bookings. */
async function fetchVenueBookings(): Promise<AdminBooking[]> {
  await new Promise((resolve) => { setTimeout(resolve, 600); });
  return sortBookings(MOCK_ADMIN_BOOKINGS);
}

/**
 * Fetches booking requests for a venue admin.
 * Returns bookings sorted with pending requests first.
 */
export function useVenueBookings(venueId: string) {
  const query = useQuery({
    queryKey: ADMIN_QUERY_KEYS.BOOKINGS(venueId),
    queryFn: fetchVenueBookings,
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
