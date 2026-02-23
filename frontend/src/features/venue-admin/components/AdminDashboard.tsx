import {
  Container, Stack, Title, Text,
} from '@mantine/core';
import { useAdminDashboard } from '../hooks';
import { ADMIN_MESSAGES } from '../constants';
import { StatsGrid } from './StatsGrid';
import { BookingsList } from './BookingsList';
import { AccessDenied } from './AccessDenied';

/** Venue admin dashboard page with stats grid and bookings list. */
export function AdminDashboard() {
  const {
    isVenueAdmin, stats, isStatsLoading, isStatsError,
    bookings, isBookingsLoading, isBookingsError,
    handleAccept, handleDecline, isPending, activeBookingId,
  } = useAdminDashboard();

  if (!isVenueAdmin) {
    return (
      <Container size="sm" py="xl">
        <AccessDenied />
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={2}>{ADMIN_MESSAGES.PAGE_TITLE}</Title>
          <Text c="dimmed">{ADMIN_MESSAGES.PAGE_SUBTITLE}</Text>
        </Stack>

        <StatsGrid stats={stats} isLoading={isStatsLoading} isError={isStatsError} />

        <BookingsList
          bookings={bookings}
          isLoading={isBookingsLoading}
          isError={isBookingsError}
          onAccept={handleAccept}
          onDecline={handleDecline}
          isPending={isPending}
          activeBookingId={activeBookingId}
        />
      </Stack>
    </Container>
  );
}
