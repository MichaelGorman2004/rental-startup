import { memo, useCallback } from 'react';
import {
  Stack, Title, Text, Button, Card, Group, ThemeIcon, Badge, Box,
} from '@mantine/core';
import {
  CheckCircle, CalendarBlank, Storefront,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import type { BookingConfirmation } from '../types';
import { BOOKING_MESSAGES } from '../constants';

interface BookingSuccessProps {
  confirmation: BookingConfirmation;
}

/** Success state displayed after a booking is submitted. */
export const BookingSuccess = memo(({ confirmation }: BookingSuccessProps) => {
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
          <Group justify="space-between">
            <Text size="sm" c="dimmed">{BOOKING_MESSAGES.SUCCESS_REFERENCE}</Text>
            <Badge size="lg" variant="light" color="flame" fw={700}>
              {confirmation.referenceNumber}
            </Badge>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><CalendarBlank size="1rem" /></Box>
            <Text size="sm">{confirmation.eventName}</Text>
          </Group>
          <Group gap="xs">
            <Box c="dimmed"><CalendarBlank size="1rem" /></Box>
            <Text size="sm">{confirmation.eventDate}</Text>
          </Group>
          {confirmation.venueName ? (
            <Group gap="xs">
              <Box c="dimmed"><Storefront size="1rem" /></Box>
              <Text size="sm" c="dimmed">{confirmation.venueName}</Text>
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
