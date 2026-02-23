import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CreateBookingRequest,
  BookingConfirmation,
} from '@/features/bookings/types';
import type { AdminBooking, VenueStats } from '@/features/venue-admin/types';
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

  return useMutation<BookingConfirmation, unknown, CreateBookingRequest>({
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
export function useVenueBookingsQuery(venueId: string) {
  return useQuery<AdminBooking[]>({
    queryKey: queryKeys.admin.bookings(venueId),
    queryFn: () => getVenueBookings(venueId),
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
 * Provides optimistic updates and automatic cache invalidation.
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
