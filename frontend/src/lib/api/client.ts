import axios from 'axios';
import { getApiBaseUrl, REQUEST_TIMEOUT_MS } from './constants';
import {
  attachAuthInterceptor,
  attachErrorInterceptor,
  attachRetryInterceptor,
} from './interceptors';

/**
 * Create and configure the Axios API client instance.
 * Interceptors are attached in order: retry → auth → error normalization.
 * Retry runs first so retried requests also get fresh auth tokens.
 */
function createApiClient() {
  const instance = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: REQUEST_TIMEOUT_MS,
  });

  return instance;
}

/** Singleton Axios instance for all API calls. */
export const apiClient = createApiClient();

/**
 * Initialize the API client with auth and error handling.
 * Must be called once during app startup after Clerk is available.
 * Separating initialization from creation avoids circular dependencies.
 */
export function initializeApiClient(
  getToken: () => Promise<string | null>,
  onAuthFailure: () => void,
): void {
  attachRetryInterceptor(apiClient);
  attachAuthInterceptor(apiClient, getToken);
  attachErrorInterceptor(apiClient, onAuthFailure);
}
