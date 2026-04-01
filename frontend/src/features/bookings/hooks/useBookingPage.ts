import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useVenueDetail } from '../../venues';
import type { ValidatedBookingData } from '../types';
import { useBookingForm } from './useBookingForm';
import { useCreateBooking } from './useCreateBooking';
import { calculateEstimatedCost, formatDateToISO } from '../utils';

/**
 * Orchestrates the booking page: route params, venue data, form state, and submission.
 * Extracts all logic from BookingForm component.
 */
export function useBookingPage() {
  const { id = '' } = useParams<{ id: string }>();
  const {
    venue, isLoading, isError, isNotFound, refetch,
  } = useVenueDetail(id);
  const bookingForm = useBookingForm(venue?.capacity ?? 0);
  const createBooking = useCreateBooking();

  const guestCount = bookingForm.form.watch('guestCount');

  const estimatedCostCents = useMemo(
    () => calculateEstimatedCost(venue?.basePriceCents ?? 0, guestCount),
    [venue?.basePriceCents, guestCount],
  );

  const handleSubmit = useCallback(() => {
    bookingForm.handleFormSubmit((data: ValidatedBookingData) => {
      createBooking.mutate({
        venueId: id,
        eventName: data.eventName,
        eventDate: formatDateToISO(data.eventDate),
        eventStartTime: data.eventStartTime,
        eventEndTime: data.eventEndTime,
        guestCount: data.guestCount,
        specialRequests: data.specialRequests,
      });
    })();
  }, [bookingForm, createBooking, id]);

  return {
    venue,
    isLoading,
    isError,
    isNotFound,
    refetch,
    ...bookingForm,
    estimatedCostCents,
    isSubmitting: createBooking.isPending,
    isSuccess: createBooking.isSuccess,
    isConflict: createBooking.isConflict,
    resetBookingError: createBooking.reset,
    confirmation: createBooking.data ?? null,
    handleSubmit,
  };
}
