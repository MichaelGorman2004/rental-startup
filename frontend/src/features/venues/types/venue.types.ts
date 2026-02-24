/**
 * Venue types - re-exported from shared package for backward compatibility.
 *
 * NOTE: Prefer importing directly from '@venuelink/shared' for new code.
 * This file maintains backward compatibility during migration.
 */

import type { Venue as SharedVenue, VenueType } from '@venuelink/shared';

// Re-export shared types
export { VenueType } from '@venuelink/shared';
export type { Venue, VenueAddress, VenueSummary } from '@venuelink/shared';

/** Query parameters for filtering the venue list endpoint. */
export interface VenueFilters {
  type: VenueType | null;
  search: string;
  page: number;
  pageSize: number;
}

/** Paginated response shape from GET /api/v1/venues. */
export interface VenueListResponse {
  items: SharedVenue[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Filter chip option displayed in the filter bar. */
export interface VenueFilterOption {
  label: string;
  value: VenueType | null;
}
