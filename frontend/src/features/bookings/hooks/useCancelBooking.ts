import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { cancelBooking as cancelBookingApi } from '@/lib/api/endpoints';
import { queryKeys } from '@/lib/react-query';
import { MY_BOOKINGS_MESSAGES } from '../constants/bookings-page-defaults';

/** Hook for cancel booking mutation with confirmation modal state. */
export function useCancelBooking() {
  const queryClient = useQueryClient();
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: cancelBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      notifications.show({ message: MY_BOOKINGS_MESSAGES.CANCEL_SUCCESS, color: 'green' });
      setCancelTarget(null);
    },
    onError: () => {
      notifications.show({ message: MY_BOOKINGS_MESSAGES.CANCEL_ERROR, color: 'red' });
    },
  });

  const openCancelModal = useCallback((bookingId: string) => {
    setCancelTarget(bookingId);
  }, []);

  const closeCancelModal = useCallback(() => {
    setCancelTarget(null);
  }, []);

  const confirmCancel = useCallback(() => {
    if (cancelTarget) mutation.mutate(cancelTarget);
  }, [cancelTarget, mutation]);

  return {
    cancelTarget,
    openCancelModal,
    closeCancelModal,
    confirmCancel,
    isCancelling: mutation.isPending,
  };
}
