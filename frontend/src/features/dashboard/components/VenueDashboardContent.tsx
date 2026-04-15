import { Stack, Text, Skeleton } from '@mantine/core';

import { useAdminDashboard } from '@/features/venue-admin/hooks';
import { StatsGrid, BookingCalendar, BookingsList } from '@/features/venue-admin/components';

/**
 * Dashboard content for venue admin users.
 * Reuses StatsGrid and BookingsList from venue-admin feature.
 */
export function VenueDashboardContent() {
  const {
    isVenueLoading, isVenueNotFound,
    stats, isStatsLoading, isStatsError,
    bookings, bookingsTotalPages, bookingsPage, setBookingsPage,
    isBookingsLoading, isBookingsError,
    handleAccept, handleDecline, isPending, activeBookingId,
  } = useAdminDashboard();

  if (isVenueLoading) {
    return (
      <Stack gap="md">
        <Skeleton height={90} radius="md" />
        <Skeleton height={90} radius="md" />
      </Stack>
    );
  }

  if (isVenueNotFound) {
    return (
      <Text c="dimmed" size="sm">
        No venue set up yet. Go to Settings to create your venue profile.
      </Text>
    );
  }

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
}
