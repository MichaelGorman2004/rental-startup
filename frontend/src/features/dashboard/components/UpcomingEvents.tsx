import { memo, useCallback } from 'react';
import {
  Stack, Text, Alert, Button, Group,
} from '@mantine/core';
import { WarningCircle } from '@phosphor-icons/react';
import { useUpcomingEvents } from '../hooks/useUpcomingEvents';
import { EventCard } from './EventCard';
import { EventsEmptyState } from './EventsEmptyState';
import { EventsLoadingSkeleton } from './EventsLoadingSkeleton';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

const SectionLabel = memo(() => (
  <Text size="xs" fw={600} tt="uppercase" c="dimmed" lts="0.12em">
    {DASHBOARD_CONSTANTS.LABELS.UPCOMING_EVENTS}
  </Text>
));

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
        <SectionLabel />
        <EventsLoadingSkeleton />
      </Stack>
    );
  }

  if (isError) {
    return (
      <Stack gap="md">
        <SectionLabel />
        <Alert color="red" icon={<WarningCircle size={16} />}>
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
        <SectionLabel />
        <EventsEmptyState />
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <SectionLabel />
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Stack>
  );
});
