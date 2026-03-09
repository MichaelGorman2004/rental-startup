import { memo } from 'react';
import {
  Card, Group, Text, Stack,
} from '@mantine/core';
import { MapPin } from '@phosphor-icons/react';
import type { UpcomingEvent } from '../types/dashboard.types';
import classes from './EventCard.module.css';

interface EventCardProps {
  event: UpcomingEvent;
}

const formatEventDate = (dateStr: string, timeStr: string): string => {
  const date = new Date(`${dateStr}T${timeStr}`);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayNum = date.getDate();
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${day}, ${month} ${dayNum} \u2022 ${time}`;
};

export const EventCard = memo(({ event }: EventCardProps) => (
  <Card withBorder className={classes['card']}>
    <Stack gap="xs">
      <Text size="xs" fw={600} className={classes['date']}>
        {formatEventDate(event.eventDate, event.eventTime)}
      </Text>
      <Text fw={600}>{event.eventName}</Text>
      <Group gap="xs">
        <MapPin size="1rem" />
        <Text size="sm" c="dimmed">{event.venueName}</Text>
      </Group>
    </Stack>
  </Card>
));
