import { memo } from 'react';
import {
  SimpleGrid, Card, Group, Text, ThemeIcon,
} from '@mantine/core';
import { IconUsers, IconCash } from '@tabler/icons-react';
import { VENUE_DETAIL_MESSAGES } from '../constants/venue-defaults';
import { formatPrice } from '../utils/format-price';
import { formatCapacity } from '../utils/format-capacity';

interface VenueInfoProps {
  capacity: number;
  basePriceCents: number;
}

/** Two-column info grid showing capacity and price stats. */
export const VenueInfo = memo(({ capacity, basePriceCents }: VenueInfoProps) => (
  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
    <Card withBorder>
      <Group gap="md">
        <ThemeIcon size="lg" radius="md" variant="light" color="indigo">
          <IconUsers size="1.25rem" stroke={1.5} />
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">{VENUE_DETAIL_MESSAGES.CAPACITY_LABEL}</Text>
          <Text fw={600}>
            {formatCapacity(capacity)}
            {' '}
            {VENUE_DETAIL_MESSAGES.CAPACITY_LABEL.toLowerCase()}
          </Text>
        </div>
      </Group>
    </Card>
    <Card withBorder>
      <Group gap="md">
        <ThemeIcon size="lg" radius="md" variant="light" color="green">
          <IconCash size="1.25rem" stroke={1.5} />
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">{VENUE_DETAIL_MESSAGES.PRICE_LABEL}</Text>
          <Text fw={600}>
            {formatPrice(basePriceCents)}
            {VENUE_DETAIL_MESSAGES.PRICE_SUFFIX}
          </Text>
        </div>
      </Group>
    </Card>
  </SimpleGrid>
));
