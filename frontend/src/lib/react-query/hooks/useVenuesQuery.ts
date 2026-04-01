import {
  useQuery, useQueryClient, useMutation,
} from '@tanstack/react-query';
import { useCallback } from 'react';
import type { Venue, VenueFilters, VenueListResponse } from '@/features/venues/types';
import { VenueType } from '@/features/venues/types/venue.types';
import {
  getVenues, getVenue, updateVenue, uploadVenueLogo,
} from '../../api/endpoints/venues';
import { queryKeys } from '../keys';
import { STALE_TIMES } from '../constants';

/** Build API params from frontend filter shape. */
function toApiParams(filters: VenueFilters) {
  return {
    type: filters.type,
    search: filters.search || undefined,
    page: filters.page,
    page_size: filters.pageSize,
  };
}

/**
 * Query hook for fetching a paginated, filtered venue list.
 * Uses the centralized API client and query key factory.
 */
export function useVenuesQuery(filters: VenueFilters) {
  const normalizedSearch = filters.search || undefined;

  return useQuery<VenueListResponse>({
    queryKey: queryKeys.venues.list({
      type: filters.type,
      search: normalizedSearch,
      page: filters.page,
      pageSize: filters.pageSize,
    }),
    queryFn: () => getVenues(toApiParams(filters)),
    staleTime: STALE_TIMES.VENUES,
  });
}

/**
 * Query hook for fetching a single venue by ID.
 * Enabled only when a valid venueId is provided.
 */
export function useVenueDetailQuery(venueId: string) {
  return useQuery<Venue>({
    queryKey: queryKeys.venues.detail(venueId),
    queryFn: () => getVenue(venueId),
    staleTime: STALE_TIMES.VENUES,
    enabled: Boolean(venueId),
  });
}

/**
 * Prefetch a venue detail into the cache on hover.
 * Returns a stable callback suitable for onMouseEnter handlers.
 */
export function usePrefetchVenue() {
  const queryClient = useQueryClient();

  return useCallback(
    (venueId: string) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.venues.detail(venueId),
        queryFn: () => getVenue(venueId),
        staleTime: STALE_TIMES.VENUES,
      });
    },
    [queryClient],
  );
}

/** Payload shape for the venue update mutation (snake_case for backend). */
interface UpdateVenueMutationInput {
  id: string;
  data: Partial<{
    name: string;
    type: VenueType;
    capacity: number;
    base_price_cents: number;
    address_street: string;
    address_city: string;
    address_state: string;
    address_zip: string;
  }>;
}

/** Mutation hook for updating a venue profile. */
export function useUpdateVenueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateVenueMutationInput) => updateVenue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.venues.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.all });
    },
  });
}

/** Mutation hook for uploading a venue logo. */
export function useUploadVenueLogoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ venueId, file }: { venueId: string; file: File }) => (
      uploadVenueLogo(venueId, file)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.venues.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.all });
    },
  });
}
