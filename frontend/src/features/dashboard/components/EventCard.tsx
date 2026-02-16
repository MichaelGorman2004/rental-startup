import { memo } from 'react';
import {
  Card, Group, Text, Stack,
} from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import type { UpcomingEvent } from '../types/dashboard.types';

interface EventCardProps {
  event: UpcomingEvent;
}

const formatEventDate = (dateStr: string, timeStr: string): string => {
  const date = new Date(`${dateStr}T${timeStr}`);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayNum = date.getDate();
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${day}, ${month} ${dayNum} • ${time}`;
};

export const EventCard = memo(({ event }: EventCardProps) => (
  <Card withBorder>
    <Stack gap="xs">
      <Text size="xs" c="dimmed" fw={600}>
        {formatEventDate(event.eventDate, event.eventTime)}
      </Text>
      <Text fw={600}>{event.eventName}</Text>
      <Group gap="xs">
        <IconMapPin size="1rem" stroke={1.5} color="gray" />
        <Text size="sm" c="dimmed">{event.venueName}</Text>
      </Group>
    </Stack>
  </Card>
));
