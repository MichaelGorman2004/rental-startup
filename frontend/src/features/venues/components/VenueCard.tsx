import { memo, useCallback } from 'react';
import {
  Card, Group, Text, Badge, Stack,
} from '@mantine/core';
import { IconUsers, IconMapPin } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { VENUE_TYPE_LABELS, VENUE_TYPE_BADGE_COLORS } from '../constants/venue-types';
import { VENUE_MESSAGES } from '../constants/venue-defaults';
import { formatPrice } from '../utils/format-price';
import { formatCapacity } from '../utils/format-capacity';
import { formatAddress } from '../utils/format-address';
import { VenueCardGradient } from './VenueCardGradient';
import type { Venue } from '../types/venue.types';

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard = memo(({ venue }: VenueCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/venues/${venue.id}`);
  }, [navigate, venue.id]);

  return (
    <Card
      withBorder
      onClick={handleClick}
      styles={{
        root: {
          cursor: 'pointer',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: 'var(--mantine-shadow-md)' },
        },
      }}
    >
      <VenueCardGradient venueType={venue.type} />
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <Text fw={600} size="lg" lineClamp={1}>{venue.name}</Text>
          <Badge color={VENUE_TYPE_BADGE_COLORS[venue.type]} variant="light">
            {VENUE_TYPE_LABELS[venue.type]}
          </Badge>
        </Group>
        <Group gap="lg">
          <Group gap="xs">
            <IconUsers size="1rem" stroke={1.5} />
            <Text size="sm" c="dimmed">
              {formatCapacity(venue.capacity)}
              {' '}
              {VENUE_MESSAGES.CAPACITY_UNIT}
            </Text>
          </Group>
          <Text size="sm" fw={600} c="indigo.6">
            {VENUE_MESSAGES.PRICE_PREFIX}
            {' '}
            {formatPrice(venue.basePriceCents)}
          </Text>
        </Group>
        <Group gap="xs">
          <IconMapPin size="1rem" stroke={1.5} color="gray" />
          <Text size="sm" c="dimmed" lineClamp={1}>
            {formatAddress(venue.addressStreet, venue.addressCity, venue.addressState)}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
});
