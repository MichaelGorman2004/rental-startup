import { memo } from 'react';
import {
  Card, Stack, Text, Group, Badge, ThemeIcon, Box,
} from '@mantine/core';
import { IconUsers, IconCash, IconMapPin } from '@tabler/icons-react';
import type { Venue } from '../../venues/types/venue.types';
import { VENUE_TYPE_LABELS, VENUE_TYPE_BADGE_COLORS, VENUE_TYPE_GRADIENTS } from '../../venues/constants/venue-types';
import { formatPrice } from '../../venues/utils/format-price';
import { formatCapacity } from '../../venues/utils/format-capacity';
import { formatAddress } from '../../venues/utils/format-address';
import { BOOKING_MESSAGES } from '../constants/booking-defaults';

interface VenueSummaryCardProps {
  venue: Venue;
}

/** Compact venue summary shown alongside the booking form. */
export const VenueSummaryCard = memo(({ venue }: VenueSummaryCardProps) => {
  const gradient = VENUE_TYPE_GRADIENTS[venue.type];

  return (
    <Card withBorder p={0}>
      <Box
        h={100}
        style={{
          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
          borderRadius: 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
        }}
      />
      <Stack gap="sm" p="md">
        <Group justify="space-between">
          <Text fw={600} size="lg">{venue.name}</Text>
          <Badge color={VENUE_TYPE_BADGE_COLORS[venue.type]} variant="light">
            {VENUE_TYPE_LABELS[venue.type]}
          </Badge>
        </Group>

        <Text size="xs" fw={600} c="dimmed" tt="uppercase" mt="xs">
          {BOOKING_MESSAGES.VENUE_SUMMARY_TITLE}
        </Text>

        <Group gap="sm">
          <ThemeIcon size="sm" variant="transparent" c="dimmed">
            <IconUsers size="1rem" stroke={1.5} />
          </ThemeIcon>
          <Text size="sm">
            {formatCapacity(venue.capacity)}
            {' '}
            guests max
          </Text>
        </Group>

        <Group gap="sm">
          <ThemeIcon size="sm" variant="transparent" c="dimmed">
            <IconCash size="1rem" stroke={1.5} />
          </ThemeIcon>
          <Text size="sm">
            {formatPrice(venue.basePriceCents)}
            /event
          </Text>
        </Group>

        <Group gap="sm">
          <ThemeIcon size="sm" variant="transparent" c="dimmed">
            <IconMapPin size="1rem" stroke={1.5} />
          </ThemeIcon>
          <Text size="sm" c="dimmed">
            {formatAddress(venue.addressStreet, venue.addressCity, venue.addressState)}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
});
