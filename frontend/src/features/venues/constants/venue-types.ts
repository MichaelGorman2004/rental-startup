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
 * Gradient pairs for venue card headers, keyed by venue type.
 * Warm palette: amber/copper tones that complement the "Warm Night" theme.
 */
export const VENUE_TYPE_GRADIENTS: Record<VenueType, { from: string; to: string }> = {
  [VenueType.Bar]: { from: '#e2a052', to: '#d4634a' },
  [VenueType.Restaurant]: { from: '#c77dba', to: '#7c5cbf' },
  [VenueType.EventSpace]: { from: '#5b8def', to: '#8b5cf6' },
  [VenueType.Cafe]: { from: '#4ead8a', to: '#2d8f6f' },
};

/** Mantine color references for venue type badges. */
export const VENUE_TYPE_BADGE_COLORS: Record<VenueType, string> = {
  [VenueType.Bar]: 'orange',
  [VenueType.Restaurant]: 'grape',
  [VenueType.EventSpace]: 'indigo',
  [VenueType.Cafe]: 'teal',
};
