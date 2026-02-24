/**
 * API error types - re-exported from shared package for backward compatibility.
 *
 * NOTE: Prefer importing directly from '@venuelink/shared' for new code.
 * This file maintains backward compatibility during migration.
 */

// Re-export all API error types from shared package
export {
  HttpStatus,
  ApiErrorCode,
} from '@venuelink/shared';

export type {
  ApiError,
  BackendErrorResponse,
  PaginatedResponse,
} from '@venuelink/shared';
