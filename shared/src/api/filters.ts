import type { VenueType, BookingStatus } from '../enums';
import type { PaginationParams } from './pagination';

/**
 * Query parameters for filtering the venue list endpoint.
 *
 * All filters are optional and can be combined.
 */
export interface VenueFilters extends PaginationParams {
  /** Filter by venue type */
  type?: VenueType | null;
  /** Search term for name/address (case-insensitive) */
  search?: string;
  /** Minimum capacity filter */
  minCapacity?: number;
  /** Maximum capacity filter */
  maxCapacity?: number;
  /** Minimum price in cents */
  minPrice?: number;
  /** Maximum price in cents */
  maxPrice?: number;
}

/**
 * Query parameters for filtering bookings.
 *
 * Used by both organization and venue admin booking lists.
 */
export interface BookingFilters extends PaginationParams {
  /** Filter by booking status */
  status?: BookingStatus | null;
  /** Filter by venue ID */
  venueId?: string;
  /** Filter by organization ID */
  organizationId?: string;
  /** Start date for date range filter (ISO 8601) */
  startDate?: string;
  /** End date for date range filter (ISO 8601) */
  endDate?: string;
}

/**
 * Internal venue filter state for UI components.
 *
 * Includes all values needed for the filter bar state.
 */
export interface VenueFilterState {
  /** Current venue type filter (null = all) */
  type: VenueType | null;
  /** Current search query */
  search: string;
  /** Current page number */
  page: number;
  /** Current page size */
  pageSize: number;
}
