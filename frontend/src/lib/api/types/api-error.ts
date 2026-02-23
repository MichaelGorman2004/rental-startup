/** HTTP status codes used for error classification. */
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

/** Machine-readable error codes for programmatic handling. */
export enum ApiErrorCode {
  NetworkError = 'NETWORK_ERROR',
  TimeoutError = 'TIMEOUT_ERROR',
  ValidationError = 'VALIDATION_ERROR',
  AuthenticationError = 'AUTHENTICATION_ERROR',
  AuthorizationError = 'AUTHORIZATION_ERROR',
  NotFoundError = 'NOT_FOUND_ERROR',
  ConflictError = 'CONFLICT_ERROR',
  RateLimitError = 'RATE_LIMIT_ERROR',
  ServerError = 'SERVER_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
}

/** Standardized error shape returned by all API calls. */
export interface ApiError {
  message: string;
  code: ApiErrorCode;
  statusCode: number;
  field?: string;
}

/** Shape of error responses from the backend. */
export interface BackendErrorResponse {
  error: string;
  code: string;
  field?: string;
}

/** Paginated list response wrapper from the backend. */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
