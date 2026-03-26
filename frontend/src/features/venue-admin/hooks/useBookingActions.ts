import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptBooking, declineBooking } from '@/lib/api/endpoints';
import { BookingStatus } from '../../bookings';
import type { AdminBooking, BookingAction, ActionPayload } from '../types';
import { ADMIN_QUERY_KEYS } from '../constants';

/** Map action type to the resulting booking status. */
function getNewStatus(action: BookingAction): BookingStatus {
  return action === 'accept' ? BookingStatus.Confirmed : BookingStatus.Rejected;
}

/** Call the appropriate API based on action type. */
async function performBookingAction(payload: ActionPayload): Promise<void> {
  if (payload.action === 'accept') {
    await acceptBooking(payload.bookingId);
  } else {
    await declineBooking(payload.bookingId);
  }
}

/**
 * Provides accept/decline mutation for venue booking requests.
 * Uses optimistic updates for instant UI feedback.
 */
export function useBookingActions(venueId: string | null) {
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
    },
  });

  const { mutate } = mutation;

  const handleAccept = useCallback((bookingId: string) => {
    if (!venueId) return;
    mutate({ bookingId, action: 'accept', venueId });
  }, [mutate, venueId]);

  const handleDecline = useCallback((bookingId: string) => {
    if (!venueId) return;
    mutate({ bookingId, action: 'decline', venueId });
  }, [mutate, venueId]);

  return {
    handleAccept,
    handleDecline,
    isPending: mutation.isPending,
    activeBookingId: mutation.variables?.bookingId ?? null,
  };
}
