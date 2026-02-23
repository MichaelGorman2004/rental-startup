import { memo } from 'react';
import {
  Box, Stack, Group, Title, Badge,
} from '@mantine/core';
import { VENUE_TYPE_GRADIENTS, VENUE_TYPE_BADGE_COLORS, VENUE_TYPE_LABELS } from '../constants/venue-types';
import { HERO_GRADIENT_HEIGHT } from '../constants/venue-defaults';
import type { VenueType } from '../types/venue.types';

interface VenueHeroProps {
  name: string;
  venueType: VenueType;
}

/** Hero section with full-width gradient banner and venue name overlay. */
export const VenueHero = memo(({ name, venueType }: VenueHeroProps) => {
  const gradient = VENUE_TYPE_GRADIENTS[venueType];

  return (
    <Stack gap="md">
      <Box
        h={HERO_GRADIENT_HEIGHT}
        style={{
          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
          borderRadius: 'var(--mantine-radius-md)',
        }}
      />
      <Group justify="space-between" align="flex-start">
        <Title order={2}>{name}</Title>
        <Badge size="lg" color={VENUE_TYPE_BADGE_COLORS[venueType]} variant="light">
          {VENUE_TYPE_LABELS[venueType]}
        </Badge>
      </Group>
    </Stack>
  );
});
