/**
 * HTTP status codes used for error classification.
 *
 * Common status codes returned by the API.
 */
export enum HttpStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

/**
 * Machine-readable error codes for programmatic handling.
 *
 * Used to identify error types regardless of HTTP status.
 */
export enum ApiErrorCode {
  /** Network connectivity issues */
  NetworkError = 'NETWORK_ERROR',
  /** Request exceeded timeout */
  TimeoutError = 'TIMEOUT_ERROR',
  /** Input validation failed (400) */
  ValidationError = 'VALIDATION_ERROR',
  /** Authentication required or failed (401) */
  AuthenticationError = 'AUTHENTICATION_ERROR',
  /** Insufficient permissions (403) */
  AuthorizationError = 'AUTHORIZATION_ERROR',
  /** Resource not found (404) */
  NotFoundError = 'NOT_FOUND_ERROR',
  /** Resource conflict (409) */
  ConflictError = 'CONFLICT_ERROR',
  /** Too many requests (429) */
  RateLimitError = 'RATE_LIMIT_ERROR',
  /** Server error (5xx) */
  ServerError = 'SERVER_ERROR',
  /** Unclassified error */
  UnknownError = 'UNKNOWN_ERROR',
}

/**
 * Standardized error shape returned by all API calls.
 *
 * Normalized from various error sources (network, API, validation).
 */
export interface ApiError {
  /** Human-readable error message */
  message: string;
  /** Machine-readable error code */
  code: ApiErrorCode;
  /** HTTP status code (0 for network errors) */
  statusCode: number;
  /** Field name for validation errors (optional) */
  field?: string;
}

/**
 * Error response shape from the backend API.
 *
 * Raw error format before normalization.
 */
export interface BackendErrorResponse {
  /** Error message from backend */
  error: string;
  /** Error code from backend */
  code: string;
  /** Field name for validation errors (optional) */
  field?: string;
}
