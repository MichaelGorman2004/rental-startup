import type { AxiosError } from 'axios';
import {
  type ApiError,
  type BackendErrorResponse,
  ApiErrorCode,
  HttpStatus,
} from './types';
import { ERROR_MESSAGES } from './constants';

/** Map HTTP status codes to machine-readable error codes. */
const STATUS_TO_ERROR_CODE: Record<number, ApiErrorCode> = {
  [HttpStatus.BadRequest]: ApiErrorCode.ValidationError,
  [HttpStatus.Unauthorized]: ApiErrorCode.AuthenticationError,
  [HttpStatus.Forbidden]: ApiErrorCode.AuthorizationError,
  [HttpStatus.NotFound]: ApiErrorCode.NotFoundError,
  [HttpStatus.Conflict]: ApiErrorCode.ConflictError,
  [HttpStatus.UnprocessableEntity]: ApiErrorCode.ValidationError,
  [HttpStatus.TooManyRequests]: ApiErrorCode.RateLimitError,
};

/** Map HTTP status codes to user-friendly fallback messages. */
const STATUS_TO_MESSAGE: Record<number, string> = {
  [HttpStatus.Unauthorized]: ERROR_MESSAGES.UNAUTHORIZED,
  [HttpStatus.Forbidden]: ERROR_MESSAGES.FORBIDDEN,
  [HttpStatus.NotFound]: ERROR_MESSAGES.NOT_FOUND,
  [HttpStatus.TooManyRequests]: ERROR_MESSAGES.RATE_LIMIT,
};

/** Check if an error is an Axios timeout. */
function isTimeoutError(error: AxiosError): boolean {
  return error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT';
}

/** Check if an error is a network failure (no response received). */
function isNetworkError(error: AxiosError): boolean {
  return !error.response && !isTimeoutError(error);
}

/** Parse the backend error body into a message string. */
function parseBackendMessage(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const body = data as Partial<BackendErrorResponse>;
  return body.error ?? null;
}

/** Parse an optional field name from the backend error body. */
function parseBackendField(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const body = data as Partial<BackendErrorResponse>;
  return body.field;
}

/**
 * Normalize any Axios error into a standardized ApiError.
 * Handles network failures, timeouts, and HTTP error responses.
 */
export function normalizeError(error: AxiosError): ApiError {
  if (isTimeoutError(error)) {
    return {
      message: ERROR_MESSAGES.TIMEOUT,
      code: ApiErrorCode.TimeoutError,
      statusCode: 0,
    };
  }

  if (isNetworkError(error)) {
    return {
      message: ERROR_MESSAGES.NETWORK,
      code: ApiErrorCode.NetworkError,
      statusCode: 0,
    };
  }

  const status = error.response?.status ?? 0;
  const data = error.response?.data;

  const isServerErrorStatus = status >= 500 && status < 600;

  return {
    message: parseBackendMessage(data)
      ?? STATUS_TO_MESSAGE[status]
      ?? (isServerErrorStatus ? ERROR_MESSAGES.SERVER : ERROR_MESSAGES.UNKNOWN),
    code: STATUS_TO_ERROR_CODE[status]
      ?? (isServerErrorStatus ? ApiErrorCode.ServerError : ApiErrorCode.UnknownError),
    statusCode: status,
    field: parseBackendField(data),
  };
}

/** Type guard to check if an unknown error is an ApiError. */
export function isApiError(error: unknown): error is ApiError {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as Record<string, unknown>;
  return typeof candidate['message'] === 'string'
    && typeof candidate['code'] === 'string'
    && typeof candidate['statusCode'] === 'number';
}
