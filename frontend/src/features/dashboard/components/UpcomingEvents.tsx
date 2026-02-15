import { memo, useCallback } from 'react';
import {
  Stack, Title, Alert, Button, Group,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useUpcomingEvents } from '../hooks/useUpcomingEvents';
import { EventCard } from './EventCard';
import { EventsEmptyState } from './EventsEmptyState';
import { EventsLoadingSkeleton } from './EventsLoadingSkeleton';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

export const UpcomingEvents = memo(() => {
  const {
    events, isLoading, isError, refetch,
  } = useUpcomingEvents();

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <Stack gap="md">
        <Title order={3}>Upcoming Events</Title>
        <EventsLoadingSkeleton />
      </Stack>
    );
  }

  if (isError) {
    return (
      <Stack gap="md">
        <Title order={3}>Upcoming Events</Title>
        <Alert color="red" icon={<IconAlertCircle size="1rem" />}>
          <Group justify="space-between">
            {DASHBOARD_CONSTANTS.MESSAGES.ERROR_LOADING}
            <Button size="xs" onClick={handleRetry}>
              {DASHBOARD_CONSTANTS.MESSAGES.RETRY}
            </Button>
          </Group>
        </Alert>
      </Stack>
    );
  }

  if (events.length === 0) {
    return (
      <Stack gap="md">
        <Title order={3}>Upcoming Events</Title>
        <EventsEmptyState />
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <Title order={3}>Upcoming Events</Title>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Stack>
  );
});
