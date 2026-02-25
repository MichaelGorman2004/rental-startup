import { useState, useCallback } from 'react';
import type { BookingStatus } from '@venuelink/shared';
import { useMyBookings } from './useMyBookings';
import { useCancelBooking } from './useCancelBooking';

/** Page orchestration hook for the My Bookings page. */
export function useBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMyBookings(statusFilter, page);
  const cancel = useCancelBooking();

  const handleStatusChange = useCallback((status: BookingStatus | null) => {
    setStatusFilter(status);
    setPage(1);
  }, []);

  return {
    bookings: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    page,
    setPage,
    statusFilter,
    handleStatusChange,
    isLoading,
    isError,
    ...cancel,
  };
}
