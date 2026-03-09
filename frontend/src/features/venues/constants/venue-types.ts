import { VenueType } from '../types/venue.types';
import type { VenueFilterOption } from '../types/venue.types';

/** Filter chip options for the venue browse page. */
export const VENUE_FILTER_OPTIONS: VenueFilterOption[] = [
  { label: 'All', value: null },
  { label: 'Bars', value: VenueType.Bar },
  { label: 'Restaurants', value: VenueType.Restaurant },
  { label: 'Event Spaces', value: VenueType.EventSpace },
  { label: 'Cafes', value: VenueType.Cafe },
];

/** Human-readable labels for each venue type. */
export const VENUE_TYPE_LABELS: Record<VenueType, string> = {
  [VenueType.Bar]: 'Bar',
  [VenueType.Restaurant]: 'Restaurant',
  [VenueType.EventSpace]: 'Event Space',
  [VenueType.Cafe]: 'Cafe',
};

/**
 * Gradient pairs for venue card headers.
 * Hot, saturated palette with flame-inspired tones.
 */
export const VENUE_TYPE_GRADIENTS: Record<VenueType, { from: string; to: string }> = {
  [VenueType.Bar]: { from: '#ff6b1a', to: '#e8391c' },
  [VenueType.Restaurant]: { from: '#ff3d71', to: '#a8174e' },
  [VenueType.EventSpace]: { from: '#7b61ff', to: '#4318c4' },
  [VenueType.Cafe]: { from: '#ff9f43', to: '#d35400' },
};

/** Mantine color references for venue type badges. */
export const VENUE_TYPE_BADGE_COLORS: Record<VenueType, string> = {
  [VenueType.Bar]: 'copper',
  [VenueType.Restaurant]: 'pink',
  [VenueType.EventSpace]: 'violet',
  [VenueType.Cafe]: 'orange',
};
