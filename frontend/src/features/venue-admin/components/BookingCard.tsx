import { memo, useCallback } from 'react';
import {
  Card, Group, Stack, Text, Badge, Button, Box,
} from '@mantine/core';
import {
  Calendar, Clock, Users, Check, X,
} from '@phosphor-icons/react';
import { BookingStatus } from '../../bookings';
import type { BookingCardProps } from '../types';
import {
  STATUS_BADGE_COLORS,
  STATUS_LABELS,
  ADMIN_MESSAGES,
} from '../constants';
import { formatBookingDate, formatTimeRange } from '../utils';

/** Single booking request card with status badge and action buttons. */
export const BookingCard = memo(({
  booking, onAccept, onDecline, isActionPending,
}: BookingCardProps) => {
  const isPending = booking.status === BookingStatus.Pending;

  const handleAccept = useCallback(() => {
    onAccept(booking.id);
  }, [onAccept, booking.id]);

  const handleDecline = useCallback(() => {
    onDecline(booking.id);
  }, [onDecline, booking.id]);

  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between" wrap="nowrap">
          <Stack gap={2}>
            <Text fw={600} size="md">{booking.eventName}</Text>
            <Text size="sm" c="dimmed">{booking.organizationName}</Text>
          </Stack>
          <Badge
            color={STATUS_BADGE_COLORS[booking.status]}
            variant="light"
            size="sm"
          >
            {STATUS_LABELS[booking.status]}
          </Badge>
        </Group>

        <Group gap="lg">
          <Group gap="xs">
            <Box c="dimmed"><Calendar size="0.875rem" /></Box>
            <Text size="sm">{formatBookingDate(new Date(`${booking.eventDate}T00:00:00`))}</Text>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><Clock size="0.875rem" /></Box>
            <Text size="sm">
              {formatTimeRange(booking.eventStartTime, booking.eventEndTime)}
            </Text>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><Users size="0.875rem" /></Box>
            <Text size="sm">
              {booking.guestCount}
              {' '}
              {ADMIN_MESSAGES.GUESTS_LABEL}
            </Text>
          </Group>
        </Group>

        {isPending ? (
          <Group gap="sm" mt="xs">
            <Button
              size="xs"
              color="green"
              variant="light"
              leftSection={<Check size="0.875rem" />}
              onClick={handleAccept}
              loading={isActionPending}
              aria-label={`${ADMIN_MESSAGES.ACTION_ACCEPT} ${booking.eventName}`}
            >
              {ADMIN_MESSAGES.ACTION_ACCEPT}
            </Button>
            <Button
              size="xs"
              color="red"
              variant="light"
              leftSection={<X size="0.875rem" />}
              onClick={handleDecline}
              loading={isActionPending}
              aria-label={`${ADMIN_MESSAGES.ACTION_DECLINE} ${booking.eventName}`}
            >
              {ADMIN_MESSAGES.ACTION_DECLINE}
            </Button>
          </Group>
        ) : null}
      </Stack>
    </Card>
  );
});
