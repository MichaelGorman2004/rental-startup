import { useMutation } from '@tanstack/react-query';
import { createBooking } from '@/lib/api/endpoints';
import type { CreateBookingRequest } from '../types';

/**
 * Hook for creating a booking via API mutation.
 */
export function useCreateBooking() {
  return useMutation({
    mutationFn: (request: CreateBookingRequest) => createBooking(request),
  });
}
