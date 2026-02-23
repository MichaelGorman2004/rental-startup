import { memo } from 'react';
import {
  Stack, Text, Title, Skeleton, ThemeIcon,
} from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';
import type { AdminBooking } from '../types/venue-admin.types';
import {
  ADMIN_MESSAGES,
  BOOKINGS_SKELETON_COUNT,
} from '../constants/venue-admin-defaults';
import { BookingCard } from './BookingCard';

interface BookingsListProps {
  bookings: AdminBooking[];
  isLoading: boolean;
  isError: boolean;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isPending: boolean;
  activeBookingId: string | null;
}

/** Loading skeleton for the bookings list. */
function BookingsLoadingSkeleton() {
  return (
    <Stack gap="md">
      {Array.from({ length: BOOKINGS_SKELETON_COUNT }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={i} height={120} radius="md" />
      ))}
    </Stack>
  );
}

/** Empty state when no bookings exist. */
function BookingsEmptyState() {
  return (
    <Stack align="center" gap="sm" py="xl">
      <ThemeIcon size={48} radius="xl" variant="light" color="gray">
        <IconInbox size="1.5rem" stroke={1.5} />
      </ThemeIcon>
      <Text fw={500}>{ADMIN_MESSAGES.BOOKINGS_EMPTY}</Text>
      <Text size="sm" c="dimmed" ta="center" maw={300}>
        {ADMIN_MESSAGES.BOOKINGS_EMPTY_SUBTITLE}
      </Text>
    </Stack>
  );
}

/** List of booking request cards with accept/decline actions. */
export const BookingsList = memo(({
  bookings, isLoading, isError,
  onAccept, onDecline, isPending, activeBookingId,
}: BookingsListProps) => {
  if (isLoading) return <BookingsLoadingSkeleton />;

  if (isError) {
    return <Text c="red" size="sm">{ADMIN_MESSAGES.BOOKINGS_ERROR}</Text>;
  }

  return (
    <Stack gap="md">
      <Title order={4}>{ADMIN_MESSAGES.BOOKINGS_TITLE}</Title>
      {bookings.length === 0 ? <BookingsEmptyState /> : (
        <Stack gap="sm">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onAccept={onAccept}
              onDecline={onDecline}
              isActionPending={isPending && activeBookingId === booking.id}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
});
