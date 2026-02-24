import type { ApiError } from '../api';
import { ApiErrorCode } from '../api';

/**
 * Type guard for ApiError interface.
 *
 * Use to check if an unknown error is a normalized ApiError.
 *
 * @param value - Value to check
 * @returns True if value is a valid ApiError
 *
 * @example
 * ```ts
 * try {
 *   await fetchData();
 * } catch (error) {
 *   if (isApiError(error)) {
 *     // error is typed as ApiError
 *     showErrorToast(error.message);
 *   }
 * }
 * ```
 */
export function isApiError(value: unknown): value is ApiError {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check required properties exist and have correct types
  // Using 'in' operator for compatibility with strict index signature checks
  const hasMessage = 'message' in value && typeof value.message === 'string';
  const hasStatusCode =
    'statusCode' in value && typeof value.statusCode === 'number';
  const hasCode =
    'code' in value &&
    typeof value.code === 'string' &&
    Object.values(ApiErrorCode).includes(value.code as ApiErrorCode);

  return hasMessage && hasStatusCode && hasCode;
}

/**
 * Check if an error is a specific type of API error.
 *
 * @param error - Error to check
 * @param code - Expected error code
 * @returns True if error matches the expected code
 */
export function isApiErrorWithCode(
  error: unknown,
  code: ApiErrorCode
): error is ApiError {
  return isApiError(error) && error.code === code;
}

/**
 * Check if an error is an authentication error.
 *
 * @param error - Error to check
 * @returns True if error is an authentication error
 */
export function isAuthenticationError(error: unknown): error is ApiError {
  return isApiErrorWithCode(error, ApiErrorCode.AuthenticationError);
}

/**
 * Check if an error is an authorization error.
 *
 * @param error - Error to check
 * @returns True if error is an authorization error
 */
export function isAuthorizationError(error: unknown): error is ApiError {
  return isApiErrorWithCode(error, ApiErrorCode.AuthorizationError);
}

/**
 * Check if an error is a not found error.
 *
 * @param error - Error to check
 * @returns True if error is a not found error
 */
export function isNotFoundError(error: unknown): error is ApiError {
  return isApiErrorWithCode(error, ApiErrorCode.NotFoundError);
}

/**
 * Check if an error is a validation error.
 *
 * @param error - Error to check
 * @returns True if error is a validation error
 */
export function isValidationError(error: unknown): error is ApiError {
  return isApiErrorWithCode(error, ApiErrorCode.ValidationError);
}
