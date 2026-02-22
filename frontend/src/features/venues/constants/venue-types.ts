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
 * Each gradient creates a distinct visual identity for the category.
 */
export const VENUE_TYPE_GRADIENTS: Record<VenueType, { from: string; to: string }> = {
  [VenueType.Bar]: { from: '#f59e0b', to: '#ef4444' },
  [VenueType.Restaurant]: { from: '#06b6d4', to: '#3b82f6' },
  [VenueType.EventSpace]: { from: '#8b5cf6', to: '#ec4899' },
  [VenueType.Cafe]: { from: '#10b981', to: '#6ee7b7' },
};

/** Mantine color references for venue type badges. */
export const VENUE_TYPE_BADGE_COLORS: Record<VenueType, string> = {
  [VenueType.Bar]: 'orange',
  [VenueType.Restaurant]: 'cyan',
  [VenueType.EventSpace]: 'grape',
  [VenueType.Cafe]: 'teal',
};
