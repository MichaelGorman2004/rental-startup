import { QueryClient } from '@tanstack/react-query';
import {
  DEFAULT_STALE_TIME_MS,
  DEFAULT_GC_TIME_MS,
  DEFAULT_RETRY_COUNT,
} from './constants';

/**
 * Configured QueryClient instance for the application.
 * Uses sensible defaults optimized for a dashboard experience:
 * - 5 min stale time to reduce unnecessary refetches
 * - 30 min GC time to preserve cache during navigation
 * - Single retry for transient failures
 * - Window focus refetch enabled for fresh data on tab switch
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME_MS,
      gcTime: DEFAULT_GC_TIME_MS,
      retry: DEFAULT_RETRY_COUNT,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
