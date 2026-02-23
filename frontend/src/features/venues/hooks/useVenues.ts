import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Venue, VenueFilters, VenueListResponse } from '../types/venue.types';
import { VENUE_QUERY_KEYS, VENUE_STALE_TIME_MS } from '../constants/venue-defaults';
import { MOCK_VENUES } from '../constants/mock-venues';

/**
 * Filter venues by type and case-insensitive search query.
 * Search matches against venue name, city, and street address.
 * Returns all venues if no type or search is active.
 */
function filterVenues(venues: Venue[], filters: VenueFilters): Venue[] {
  return venues.filter((venue) => {
    if (filters.type && venue.type !== filters.type) return false;
    if (!filters.search) return true;
    const query = filters.search.toLowerCase();
    return venue.name.toLowerCase().includes(query)
      || venue.addressCity.toLowerCase().includes(query)
      || venue.addressStreet.toLowerCase().includes(query);
  });
}

/**
 * Paginate a filtered venue array into a VenueListResponse shape.
 * Slices the array based on page and pageSize, calculates total pages.
 * Mirrors the backend pagination contract for consistent API behavior.
 */
function paginateVenues(venues: Venue[], filters: VenueFilters): VenueListResponse {
  const start = (filters.page - 1) * filters.pageSize;
  const items = venues.slice(start, start + filters.pageSize);
  return {
    items,
    total: venues.length,
    page: filters.page,
    pageSize: filters.pageSize,
    totalPages: Math.ceil(venues.length / filters.pageSize),
  };
}

/**
 * Hook to fetch and filter venues using React Query.
 * Currently uses mock data; will be replaced with API call.
 */
export function useVenues(filters: VenueFilters) {
  const fetchVenues = useCallback(async (): Promise<VenueListResponse> => {
    await new Promise((resolve) => { setTimeout(resolve, 600); });

    const filtered = filterVenues(MOCK_VENUES, filters);
    return paginateVenues(filtered, filters);
  }, [filters]);

  const query = useQuery({
    queryKey: VENUE_QUERY_KEYS.list({
      type: filters.type,
      search: filters.search,
      page: filters.page,
    }),
    queryFn: fetchVenues,
    staleTime: VENUE_STALE_TIME_MS,
  });

  return {
    venues: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
