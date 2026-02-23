import { useMutation } from '@tanstack/react-query';
import { BookingStatus } from '../types/booking.types';
import type { CreateBookingRequest, BookingConfirmation } from '../types/booking.types';
import { MOCK_SUBMISSION_DELAY_MS } from '../constants/booking-defaults';

/** Generate a mock reference number for booking confirmations. */
function generateReferenceNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]);
  return `VL-${segments.join('')}`;
}

/** Simulate booking creation API call. Replace with POST /api/v1/bookings. */
async function createBookingApi(request: CreateBookingRequest): Promise<BookingConfirmation> {
  await new Promise((resolve) => { setTimeout(resolve, MOCK_SUBMISSION_DELAY_MS); });
  return {
    id: crypto.randomUUID(),
    referenceNumber: generateReferenceNumber(),
    venueName: '',
    eventName: request.eventName,
    eventDate: request.eventDate,
    eventTime: request.eventTime,
    guestCount: request.guestCount,
    estimatedCostCents: 0,
    status: BookingStatus.Pending,
  };
}

/**
 * Hook for creating a booking via API mutation.
 * Currently uses mock data; will be replaced with real API call.
 */
export function useCreateBooking() {
  return useMutation({
    mutationFn: createBookingApi,
  });
}
