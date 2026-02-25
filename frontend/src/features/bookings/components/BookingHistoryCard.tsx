import { memo, useCallback } from 'react';
import {
  Card, Group, Stack, Text, Badge, Button, Box,
} from '@mantine/core';
import { IconCalendar, IconClock, IconUsers } from '@tabler/icons-react';
import { BookingStatus } from '@venuelink/shared';
import type { MyBooking } from '@/lib/api/endpoints';
import { STATUS_BADGE_COLORS, STATUS_LABELS } from '@/lib/constants';
import { formatBookingDate, formatBookingTime } from '../utils';
import { MY_BOOKINGS_MESSAGES } from '../constants/bookings-page-defaults';

interface BookingHistoryCardProps {
  booking: MyBooking;
  onCancel: (id: string) => void;
}

/** Single booking card for the My Bookings page. */
export const BookingHistoryCard = memo(({ booking, onCancel }: BookingHistoryCardProps) => {
  const canCancel = booking.status === BookingStatus.Pending
    || booking.status === BookingStatus.Confirmed;

  const handleCancel = useCallback(() => {
    onCancel(booking.id);
  }, [onCancel, booking.id]);

  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between" wrap="nowrap">
          <Stack gap={2}>
            <Text fw={600} size="md">{booking.eventName}</Text>
            <Text size="sm" c="dimmed">{booking.venueName}</Text>
          </Stack>
          <Badge color={STATUS_BADGE_COLORS[booking.status]} variant="light" size="sm">
            {STATUS_LABELS[booking.status]}
          </Badge>
        </Group>

        <Group gap="lg">
          <Group gap="xs">
            <Box c="dimmed"><IconCalendar size="0.875rem" stroke={1.5} /></Box>
            <Text size="sm">{formatBookingDate(new Date(`${booking.eventDate}T00:00:00Z`))}</Text>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><IconClock size="0.875rem" stroke={1.5} /></Box>
            <Text size="sm">{formatBookingTime(booking.eventTime)}</Text>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><IconUsers size="0.875rem" stroke={1.5} /></Box>
            <Text size="sm">
              {`${booking.guestCount} ${MY_BOOKINGS_MESSAGES.GUESTS_LABEL}`}
            </Text>
          </Group>
        </Group>

        {canCancel ? (
          <Button size="xs" color="red" variant="light" onClick={handleCancel}>
            {MY_BOOKINGS_MESSAGES.CANCEL_TITLE}
          </Button>
        ) : null}
      </Stack>
    </Card>
  );
});
