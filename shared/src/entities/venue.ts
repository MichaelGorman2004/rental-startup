import type { VenueType } from '../enums';

/**
 * Address fields for a venue location.
 *
 * Separated from Venue for reusability in forms and display.
 */
export interface VenueAddress {
  /** Street address line */
  street: string;
  /** City name */
  city: string;
  /** Two-letter state code (e.g., "CA", "NY") */
  state: string;
  /** ZIP code (5 digits or 5+4 format) */
  zip: string;
}

/**
 * Venue entity as returned by the API.
 *
 * Fields match the backend VenueResponse Pydantic schema.
 * Address fields are flattened (not nested) to match backend.
 * @see backend/app/modules/venues/schemas.py#VenueResponse
 */
export interface Venue {
  /** UUID v4 primary key */
  id: string;
  /** Venue display name */
  name: string;
  /** Venue category classification */
  type: VenueType;
  /** Maximum guest capacity */
  capacity: number;
  /** Base rental price in cents (e.g., 50000 = $500.00) */
  basePriceCents: number;
  /** Street address (flattened from address object) */
  addressStreet: string;
  /** City (flattened from address object) */
  addressCity: string;
  /** State code (flattened from address object) */
  addressState: string;
  /** ZIP code (flattened from address object) */
  addressZip: string;
  /** UUID of the venue owner */
  ownerId: string;
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
  /** ISO 8601 timestamp of soft delete (null if active) */
  deletedAt: string | null;
}

/**
 * Venue summary for cards and lists.
 *
 * Minimal venue data for browse/search results.
 */
export interface VenueSummary {
  /** UUID v4 identifier */
  id: string;
  /** Venue display name */
  name: string;
  /** Venue category */
  type: VenueType;
  /** Maximum guest capacity */
  capacity: number;
  /** Base rental price in cents */
  basePriceCents: number;
  /** City for location display */
  addressCity: string;
  /** State for location display */
  addressState: string;
}
