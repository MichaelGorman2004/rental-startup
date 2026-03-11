import { memo, useCallback } from 'react';
import {
  Stack, Title, Text, Button, Card, Group, ThemeIcon, Box,
} from '@mantine/core';
import {
  CheckCircle, CalendarBlank, Storefront, Clock,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import type { MyBooking } from '@/lib/api/endpoints';
import { BOOKING_MESSAGES } from '../constants';
import { formatBookingDate, formatTimeRange } from '../utils';

interface BookingSuccessProps {
  booking: MyBooking;
}

/** Success state displayed after a booking is submitted. */
export const BookingSuccess = memo(({ booking }: BookingSuccessProps) => {
  const navigate = useNavigate();

  const handleViewBookings = useCallback(() => {
    navigate('/bookings');
  }, [navigate]);

  const handleBrowseVenues = useCallback(() => {
    navigate('/venues');
  }, [navigate]);

  return (
    <Stack gap="xl" align="center" py="xl">
      <ThemeIcon size={80} radius="xl" variant="light" color="green">
        <CheckCircle size="2.5rem" />
      </ThemeIcon>

      <Stack gap="xs" align="center">
        <Title order={2} ta="center">{BOOKING_MESSAGES.SUCCESS_TITLE}</Title>
        <Text size="md" c="dimmed" ta="center" maw={400}>
          {BOOKING_MESSAGES.SUCCESS_SUBTITLE}
        </Text>
      </Stack>

      <Card withBorder p="lg" w="100%" maw={420}>
        <Stack gap="sm">
          <Group gap="xs">
            <Box c="dimmed"><CalendarBlank size="1rem" /></Box>
            <Text size="sm" fw={500}>{booking.eventName}</Text>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><CalendarBlank size="1rem" /></Box>
            <Text size="sm">{formatBookingDate(new Date(`${booking.eventDate}T00:00:00`))}</Text>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><Clock size="1rem" /></Box>
            <Text size="sm">
              {formatTimeRange(booking.eventStartTime, booking.eventEndTime)}
            </Text>
          </Group>
          {booking.venueName ? (
            <Group gap="xs">
              <Box c="dimmed"><Storefront size="1rem" /></Box>
              <Text size="sm" c="dimmed">{booking.venueName}</Text>
            </Group>
          ) : null}
        </Stack>
      </Card>

      <Group gap="md">
        <Button
          variant="filled"
          leftSection={<CalendarBlank size="1rem" />}
          onClick={handleViewBookings}
        >
          {BOOKING_MESSAGES.VIEW_BOOKINGS}
        </Button>
        <Button
          variant="light"
          leftSection={<Storefront size="1rem" />}
          onClick={handleBrowseVenues}
        >
          {BOOKING_MESSAGES.BROWSE_VENUES}
        </Button>
      </Group>
    </Stack>
  );
});
