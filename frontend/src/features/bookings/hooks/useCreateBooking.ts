import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '@/lib/api/endpoints';
import { isApiError } from '@/lib/api';
import { ApiErrorCode } from '@/lib/api/types';
import { queryKeys } from '@/lib/react-query';

/** Result of the useCreateBooking hook. */
export interface UseCreateBookingResult {
  mutate: ReturnType<typeof useMutation<Awaited<ReturnType<typeof createBooking>>, unknown, Parameters<typeof createBooking>[0]>>['mutate'];
  isPending: boolean;
  isSuccess: boolean;
  isConflict: boolean;
  data: Awaited<ReturnType<typeof createBooking>> | undefined;
  reset: () => void;
}

/**
 * Hook for creating a booking via API mutation.
 * Invalidates booking caches on success so lists stay fresh.
 * Detects 409 Conflict errors for inline time-slot feedback.
 */
export function useCreateBooking(): UseCreateBookingResult {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
    },
  });

  const isConflict =
    mutation.isError &&
    isApiError(mutation.error) &&
    mutation.error.code === ApiErrorCode.ConflictError;

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isConflict,
    data: mutation.data,
    reset: mutation.reset,
  };
}
