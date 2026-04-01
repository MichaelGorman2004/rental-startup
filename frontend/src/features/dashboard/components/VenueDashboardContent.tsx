import { memo } from 'react';
import { Stack } from '@mantine/core';

import { useAdminDashboard } from '@/features/venue-admin/hooks';
import { StatsGrid, BookingCalendar, BookingsList } from '@/features/venue-admin/components';

/**
 * Dashboard content for venue admin users.
 * Reuses StatsGrid and BookingsList from venue-admin feature.
 */
export const VenueDashboardContent = memo(() => {
  const {
    stats, isStatsLoading, isStatsError,
    bookings, bookingsTotalPages, bookingsPage, setBookingsPage,
    isBookingsLoading, isBookingsError,
    handleAccept, handleDecline, isPending, activeBookingId,
  } = useAdminDashboard();

  return (
    <Stack gap="xl">
      <StatsGrid stats={stats} isLoading={isStatsLoading} isError={isStatsError} />
      <BookingCalendar bookings={bookings} />
      <BookingsList
        bookings={bookings}
        isLoading={isBookingsLoading}
        isError={isBookingsError}
        onAccept={handleAccept}
        onDecline={handleDecline}
        isPending={isPending}
        activeBookingId={activeBookingId}
        totalPages={bookingsTotalPages}
        page={bookingsPage}
        onPageChange={setBookingsPage}
      />
    </Stack>
  );
});
