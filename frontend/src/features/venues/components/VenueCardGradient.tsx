import { memo } from 'react';
import { Box } from '@mantine/core';
import { VENUE_TYPE_GRADIENTS } from '../constants/venue-types';
import { CARD_GRADIENT_HEIGHT } from '../constants/venue-defaults';
import type { VenueType } from '../types/venue.types';
import classes from './VenueCardGradient.module.css';

interface VenueCardGradientProps {
  venueType: VenueType;
}

/** Gradient header for venue cards, colored by venue type. */
export const VenueCardGradient = memo(({ venueType }: VenueCardGradientProps) => {
  const gradient = VENUE_TYPE_GRADIENTS[venueType];

  return (
    <Box
      h={CARD_GRADIENT_HEIGHT}
      className={classes['gradient']}
      style={{ '--gradient-from': gradient.from, '--gradient-to': gradient.to } as React.CSSProperties}
    />
  );
});
