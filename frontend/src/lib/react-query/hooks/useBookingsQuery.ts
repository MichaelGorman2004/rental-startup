import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateBookingRequest } from '@/features/bookings/types';
import type { VenueStats } from '@/features/venue-admin/types';
import type { MyBooking } from '../../api/endpoints/bookings';
import {
  createBooking,
  getVenueBookings,
  getVenueStats,
  acceptBooking,
  declineBooking,
} from '../../api/endpoints/bookings';
import { queryKeys } from '../keys';
import { STALE_TIMES, REFETCH_INTERVALS } from '../constants';

/**
 * Mutation hook for creating a new booking request.
 * Invalidates booking list caches on success.
 */
export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation<MyBooking, unknown, CreateBookingRequest>({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
    },
  });
}

/**
 * Query hook for venue admin booking list.
 * Fetches bookings for a specific venue with 2-min stale time.
 */
export function useVenueBookingsQuery(venueId: string, page: number = 1, pageSize: number = 20) {
  return useQuery({
    queryKey: [...queryKeys.admin.bookings(venueId), page],
    queryFn: () => getVenueBookings(venueId, { page, page_size: pageSize }),
    staleTime: STALE_TIMES.BOOKINGS,
    enabled: Boolean(venueId),
  });
}

/**
 * Query hook for venue performance stats with auto-polling.
 * Refetches every 60 seconds for near-real-time data.
 */
export function useVenueStatsQuery(venueId: string) {
  return useQuery<VenueStats>({
    queryKey: queryKeys.admin.stats(venueId),
    queryFn: () => getVenueStats(venueId),
    staleTime: STALE_TIMES.STATS,
    refetchInterval: REFETCH_INTERVALS.STATS,
    enabled: Boolean(venueId),
  });
}

/**
 * Mutation hooks for accepting or declining bookings.
 * Invalidates booking and stats caches on settlement.
 */
export function useBookingActionMutations(venueId: string) {
  const queryClient = useQueryClient();
  const bookingsKey = queryKeys.admin.bookings(venueId);
  const statsKey = queryKeys.admin.stats(venueId);

  const acceptMutation = useMutation({
    mutationFn: acceptBooking,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookingsKey });
      queryClient.invalidateQueries({ queryKey: statsKey });
    },
  });

  const declineMutation = useMutation({
    mutationFn: declineBooking,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookingsKey });
      queryClient.invalidateQueries({ queryKey: statsKey });
    },
  });

  const handleAccept = useCallback(
    (bookingId: string) => acceptMutation.mutate(bookingId),
    [acceptMutation],
  );

  const handleDecline = useCallback(
    (bookingId: string) => declineMutation.mutate(bookingId),
    [declineMutation],
  );

  return {
    handleAccept,
    handleDecline,
    isPending: acceptMutation.isPending || declineMutation.isPending,
  };
}
