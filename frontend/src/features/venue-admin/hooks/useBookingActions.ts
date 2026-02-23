import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookingStatus } from '../../bookings';
import type {
  AdminBooking, BookingAction, ActionPayload,
} from '../types';
import {
  ADMIN_QUERY_KEYS,
  MOCK_ACTION_DELAY_MS,
} from '../constants';

/** Map action type to the resulting booking status. */
function getNewStatus(action: BookingAction): BookingStatus {
  return action === 'accept'
    ? BookingStatus.Confirmed
    : BookingStatus.Rejected;
}

/** Simulate booking action API call. Replace with PATCH /api/v1/bookings/:id/(accept|decline). */
async function performBookingAction(
  payload: ActionPayload,
): Promise<ActionPayload> {
  await new Promise((resolve) => { setTimeout(resolve, MOCK_ACTION_DELAY_MS); });
  return payload;
}

/**
 * Provides accept/decline mutation for venue booking requests.
 * Uses optimistic updates for instant UI feedback.
 */
export function useBookingActions(venueId: string) {
  const queryClient = useQueryClient();
  const bookingsKey = ADMIN_QUERY_KEYS.BOOKINGS(venueId);

  const mutation = useMutation({
    mutationFn: performBookingAction,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: bookingsKey });
      const previous = queryClient.getQueryData<AdminBooking[]>(bookingsKey);
      queryClient.setQueryData<AdminBooking[]>(
        bookingsKey,
        (old) => (old ?? []).map((b) => (
          b.id === payload.bookingId
            ? { ...b, status: getNewStatus(payload.action) }
            : b
        )),
      );
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(bookingsKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookingsKey });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.STATS(venueId),
      });
    },
  });

  const handleAccept = useCallback((bookingId: string) => {
    mutation.mutate({ bookingId, action: 'accept', venueId });
  }, [mutation, venueId]);

  const handleDecline = useCallback((bookingId: string) => {
    mutation.mutate({ bookingId, action: 'decline', venueId });
  }, [mutation, venueId]);

  return {
    handleAccept,
    handleDecline,
    isPending: mutation.isPending,
    activeBookingId: mutation.variables?.bookingId ?? null,
  };
}
