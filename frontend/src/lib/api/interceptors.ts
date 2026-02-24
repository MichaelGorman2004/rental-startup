import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { normalizeError } from './error-handler';
import { ApiErrorCode } from './types';
import {
  HEADERS,
  CONTENT_TYPES,
  MAX_RETRY_ATTEMPTS,
  RETRY_BASE_DELAY_MS,
  RETRYABLE_STATUS_CODES,
} from './constants';

/** Extended config to track retry state across attempts. */
interface RetryConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

/** Token provider function type — injected to avoid circular deps with Clerk. */
type GetTokenFn = () => Promise<string | null>;

/** Callback for handling authentication failures (e.g., redirect to login). */
type OnAuthFailureFn = () => void;

/** Wait for a duration using exponential backoff. */
function exponentialDelay(attempt: number): Promise<void> {
  const delay = (2 ** attempt) * RETRY_BASE_DELAY_MS;
  return new Promise((resolve) => { setTimeout(resolve, delay); });
}

/** Check if a status code is eligible for retry. */
function isRetryableStatus(status: number | undefined): boolean {
  return RETRYABLE_STATUS_CODES.includes(
    status as typeof RETRYABLE_STATUS_CODES[number],
  );
}

/**
 * Attach the auth token interceptor to an Axios instance.
 * Injects the JWT bearer token from the provided token function.
 */
export function attachAuthInterceptor(
  instance: AxiosInstance,
  getToken: GetTokenFn,
): void {
  instance.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.set(HEADERS.AUTHORIZATION, `Bearer ${token}`);
    }

    config.headers.set(HEADERS.CONTENT_TYPE, CONTENT_TYPES.JSON);
    config.headers.set(HEADERS.ACCEPT, CONTENT_TYPES.JSON);

    return config;
  });
}

/**
 * Attach the error normalization interceptor.
 * Transforms all Axios errors into standardized ApiError objects.
 * Triggers auth failure callback on 401 responses.
 */
export function attachErrorInterceptor(
  instance: AxiosInstance,
  onAuthFailure: OnAuthFailureFn,
): void {
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const apiError = normalizeError(error);

      if (apiError.code === ApiErrorCode.AuthenticationError) {
        onAuthFailure();
      }

      return Promise.reject(apiError);
    },
  );
}

/**
 * Attach the retry interceptor with exponential backoff.
 * Retries only on network errors and specific server error codes.
 */
export function attachRetryInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as RetryConfig | undefined;

      if (!config) return Promise.reject(error);

      const retryCount = config.retryCount ?? 0;
      const shouldRetry = retryCount < MAX_RETRY_ATTEMPTS
        && (isRetryableStatus(error.response?.status) || !error.response);

      if (!shouldRetry) return Promise.reject(error);

      config.retryCount = retryCount + 1;
      await exponentialDelay(retryCount);

      return instance(config);
    },
  );
}
