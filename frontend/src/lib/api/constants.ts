/** Environment variable key for the API base URL. */
const API_BASE_URL_KEY = 'VITE_API_BASE_URL';

/** Expected API path suffix for base URL validation. */
const API_PATH_SUFFIX = '/api/v1';

/** Request timeout in milliseconds (10 seconds). */
export const REQUEST_TIMEOUT_MS = 10_000;

/** Maximum number of retry attempts for failed requests. */
export const MAX_RETRY_ATTEMPTS = 3;

/** Base delay between retries in milliseconds (1 second). */
export const RETRY_BASE_DELAY_MS = 1_000;

/** HTTP status codes that should trigger a retry. */
export const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504] as const;

/** Header names used by the API client. */
export const HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
} as const;

/** Content type values. */
export const CONTENT_TYPES = {
  JSON: 'application/json',
} as const;

/** Human-readable error messages for common failure modes. */
export const ERROR_MESSAGES = {
  NETWORK: 'Unable to connect to the server. Please check your internet connection.',
  TIMEOUT: 'The request timed out. Please try again.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
  SERVER: 'An unexpected server error occurred. Please try again later.',
  UNKNOWN: 'An unexpected error occurred.',
  MISSING_BASE_URL: `Missing environment variable: ${API_BASE_URL_KEY}`,
} as const;

/**
 * Resolve and validate the API base URL from environment variables.
 * Ensures the URL ends with the expected API version path.
 */
export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env[API_BASE_URL_KEY] as string | undefined;

  if (!baseUrl) {
    throw new Error(ERROR_MESSAGES.MISSING_BASE_URL);
  }

  return baseUrl.endsWith(API_PATH_SUFFIX)
    ? baseUrl
    : `${baseUrl}${API_PATH_SUFFIX}`;
}
