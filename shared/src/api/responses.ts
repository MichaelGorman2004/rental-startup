import type { Venue, Organization, BookingConfirmation } from '../entities';
import type { PaginatedResponse } from './pagination';

/**
 * Response from GET /api/v1/venues (paginated list).
 */
export type VenueListResponse = PaginatedResponse<Venue>;

/**
 * Response from GET /api/v1/venues/:id (single venue).
 */
export type VenueDetailResponse = Venue;

/**
 * Response from POST /api/v1/venues (created venue).
 */
export type CreateVenueResponse = Venue;

/**
 * Response from PATCH /api/v1/venues/:id (updated venue).
 */
export type UpdateVenueResponse = Venue;

/**
 * Response from POST /api/v1/bookings (created booking).
 */
export type CreateBookingResponse = BookingConfirmation;

/**
 * Response from GET /api/v1/organizations/:id (single org).
 */
export type OrganizationDetailResponse = Organization;

/**
 * Response from GET /api/v1/organizations/me (current user's org).
 */
export type CurrentOrganizationResponse = Organization;

/**
 * Venue statistics for admin dashboard.
 *
 * Returned from GET /api/v1/venues/:id/stats.
 */
export interface VenueStatsResponse {
  /** Number of bookings this month */
  bookingsThisMonth: number;
  /** Total revenue in cents */
  revenueCents: number;
  /** Average rating (null if no reviews) */
  averageRating: number | null;
  /** Occupancy percentage (0-100) */
  occupancyPercent: number;
}

/**
 * Health check response.
 *
 * Returned from GET /api/v1/health.
 */
export interface HealthCheckResponse {
  /** Service status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** ISO 8601 timestamp */
  timestamp: string;
  /** Service version */
  version: string;
}
