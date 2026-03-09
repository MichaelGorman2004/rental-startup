import { memo, useMemo } from 'react';
import {
  Card, Text, Stack, Box, Badge,
} from '@mantine/core';
import { MapPin } from '@phosphor-icons/react';
import type { UpcomingEvent } from '../types/dashboard.types';
import classes from './EventCard.module.css';

interface EventCardProps {
  event: UpcomingEvent;
}

function useFormattedDate(dateStr: string, timeStr: string) {
  return useMemo(() => {
    const date = new Date(`${dateStr}T${timeStr}`);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const dayNum = date.getDate();
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return { dateLabel: `${day}, ${month} ${dayNum}`, timeLabel: time };
  }, [dateStr, timeStr]);
}

export const EventCard = memo(({ event }: EventCardProps) => {
  const { dateLabel, timeLabel } = useFormattedDate(event.eventDate, event.eventTime);

  return (
    <Card withBorder className={classes['card']}>
      <Box className={classes['grid']}>
        <Stack gap={2}>
          <Text size="xs" fw={600} className={classes['date']}>
            {dateLabel}
          </Text>
          <Text size="xs" c="dimmed">{timeLabel}</Text>
        </Stack>

        <Stack gap={4}>
          <Text fw={500} size="sm">{event.eventName}</Text>
          <Box className={classes['venue']}>
            <MapPin size={12} />
            <Text size="xs" c="dimmed">{event.venueName}</Text>
          </Box>
        </Stack>

        <Box className={classes['meta']}>
          <Badge
            variant="outline"
            size="sm"
            className={classes['statusConfirmed']}
          >
            confirmed
          </Badge>
        </Box>
      </Box>
    </Card>
  );
});
