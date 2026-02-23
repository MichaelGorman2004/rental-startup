import { memo } from 'react';
import { Box } from '@mantine/core';
import { VENUE_TYPE_GRADIENTS } from '../constants/venue-types';
import { CARD_GRADIENT_HEIGHT } from '../constants/venue-defaults';
import type { VenueType } from '../types/venue.types';

interface VenueCardGradientProps {
  venueType: VenueType;
}

/** Gradient header for venue cards, colored by venue type. */
export const VenueCardGradient = memo(({ venueType }: VenueCardGradientProps) => {
  const gradient = VENUE_TYPE_GRADIENTS[venueType];

  return (
    <Box
      h={CARD_GRADIENT_HEIGHT}
      style={{
        background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
        borderRadius: 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
        margin: 'calc(var(--mantine-spacing-md) * -1)',
        marginBottom: 'var(--mantine-spacing-md)',
      }}
    />
  );
});
