/**
 * Venue category classification.
 *
 * Used for filtering venue searches and setting default attributes.
 * Values must match PostgreSQL `venue_type` ENUM exactly.
 * @see backend/app/core/constants/enums.py#VenueType
 */
export enum VenueType {
  /** Bar or pub with alcohol service */
  Bar = 'bar',
  /** Restaurant with food service */
  Restaurant = 'restaurant',
  /** Dedicated event or conference space */
  EventSpace = 'event_space',
  /** Coffee shop or cafe */
  Cafe = 'cafe',
}

/** Array of all valid VenueType values for iteration/validation. */
export const VENUE_TYPE_VALUES = Object.values(VenueType) as VenueType[];
