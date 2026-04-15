import {
  Stack, Group, Text, Paper, Badge,
} from '@mantine/core';
import type { AdminBookingView } from '@venuelink/shared';
import { CALENDAR_MESSAGES, STATUS_BADGE_COLORS, STATUS_LABELS } from '../constants';

interface SelectedDayBookingsProps {
  bookings: AdminBookingView[];
}

/** List of bookings for the selected calendar day. */
export function SelectedDayBookings({ bookings }: SelectedDayBookingsProps) {
  if (bookings.length === 0) {
    return (
      <Text c="dimmed" size="sm" ta="center" py="md">
        {CALENDAR_MESSAGES.NO_BOOKINGS_ON_DATE}
      </Text>
    );
  }

  return (
    <Stack gap="xs">
      {bookings.map((booking) => (
        <Paper key={booking.id} p="sm" radius="sm" withBorder>
          <Group justify="space-between" wrap="wrap">
            <Stack gap={2}>
              <Text fw={500} size="sm">{booking.eventName}</Text>
              <Text size="xs" c="dimmed">{booking.organizationName}</Text>
            </Stack>
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                {`${booking.eventStartTime} - ${booking.eventEndTime}`}
              </Text>
              <Badge
                size="sm"
                color={STATUS_BADGE_COLORS[booking.status]}
                variant="light"
              >
                {STATUS_LABELS[booking.status]}
              </Badge>
            </Group>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
