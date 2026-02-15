import { QueryClient } from '@tanstack/react-query';

/** Default stale time for queries (5 minutes) */
const DEFAULT_STALE_TIME_MS = 5 * 60 * 1000;

/** Default cache time for inactive queries (30 minutes) */
const DEFAULT_CACHE_TIME_MS = 30 * 60 * 1000;

/**
 * Configured QueryClient instance for the application.
 * Uses sensible defaults optimized for a dashboard experience.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME_MS,
      gcTime: DEFAULT_CACHE_TIME_MS,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
