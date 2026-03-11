import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '@/lib/api/endpoints';
import { queryKeys } from '@/lib/react-query';

/**
 * Hook for creating a booking via API mutation.
 * Invalidates booking caches on success so lists stay fresh.
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
    },
  });
}
