export { apiClient, initializeApiClient } from './client';
export { normalizeError, isApiError } from './error-handler';

export type {
  ApiError,
  BackendErrorResponse,
  PaginatedResponse,
} from './types';

export { ApiErrorCode, HttpStatus } from './types';

export {
  getVenues,
  getVenue,
  createVenue,
  updateVenue,
  deleteVenue,
  createBooking,
  getVenueBookings,
  getVenueStats,
  acceptBooking,
  declineBooking,
} from './endpoints';
