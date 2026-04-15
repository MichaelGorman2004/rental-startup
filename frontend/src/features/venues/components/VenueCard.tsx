import { memo } from 'react';
import {
  Card, Group, Text, Badge, Stack,
} from '@mantine/core';
import { Users, MapPin } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { VENUE_TYPE_LABELS, VENUE_TYPE_BADGE_COLORS } from '../constants/venue-types';
import { VENUE_MESSAGES } from '../constants/venue-defaults';
import { formatPrice } from '../utils/format-price';
import { formatCapacity } from '../utils/format-capacity';
import { formatAddress } from '../utils/format-address';
import { VenueCardGradient } from './VenueCardGradient';
import type { Venue } from '../types/venue.types';
import classes from './VenueCard.module.css';

interface VenueCardProps {
  venue: Venue;
  basePath?: string;
}

export const VenueCard = memo(({ venue, basePath = '/venues' }: VenueCardProps) => (
  <Card
    withBorder
    component={Link}
    to={`${basePath}/${venue.id}`}
    className={classes['card']}
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
          <Users size={16} />
          <Text size="sm" c="dimmed">
            {formatCapacity(venue.capacity)}
            {' '}
            {VENUE_MESSAGES.CAPACITY_UNIT}
          </Text>
        </Group>
        <Text size="sm" fw={600} className={classes['price']}>
          {VENUE_MESSAGES.PRICE_PREFIX}
          {' '}
          {formatPrice(venue.basePriceCents)}
        </Text>
      </Group>
      <Group gap="xs">
        <MapPin size={16} />
        <Text size="sm" c="dimmed" lineClamp={1}>
          {formatAddress(venue.addressStreet, venue.addressCity, venue.addressState)}
        </Text>
      </Group>
    </Stack>
  </Card>
));
