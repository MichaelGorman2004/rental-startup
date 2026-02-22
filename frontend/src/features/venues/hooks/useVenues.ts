import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VenueType } from '../types/venue.types';
import type { Venue, VenueFilters, VenueListResponse } from '../types/venue.types';
import { VENUE_QUERY_KEYS, VENUE_STALE_TIME_MS } from '../constants/venue-defaults';

/**
 * Mock venue data for development.
 * Replace with actual API call when backend integration is ready.
 */
const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'The Blue Dog Tavern',
    type: VenueType.Bar,
    capacity: 120,
    basePriceCents: 35000,
    addressStreet: '123 Main St',
    addressCity: 'Austin',
    addressState: 'TX',
    addressZip: '78701',
    ownerId: 'owner-1',
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '2',
    name: "Mario's Ristorante",
    type: VenueType.Restaurant,
    capacity: 80,
    basePriceCents: 55000,
    addressStreet: '456 Oak Ave',
    addressCity: 'Austin',
    addressState: 'TX',
    addressZip: '78702',
    ownerId: 'owner-2',
    createdAt: '2026-01-20T00:00:00Z',
    updatedAt: '2026-01-20T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '3',
    name: 'Grand Ballroom at The Driskill',
    type: VenueType.EventSpace,
    capacity: 350,
    basePriceCents: 95000,
    addressStreet: '604 Brazos St',
    addressCity: 'Austin',
    addressState: 'TX',
    addressZip: '78701',
    ownerId: 'owner-3',
    createdAt: '2026-01-25T00:00:00Z',
    updatedAt: '2026-01-25T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '4',
    name: 'Brew & Bean Cafe',
    type: VenueType.Cafe,
    capacity: 45,
    basePriceCents: 20000,
    addressStreet: '789 South Congress',
    addressCity: 'Austin',
    addressState: 'TX',
    addressZip: '78704',
    ownerId: 'owner-4',
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '5',
    name: 'Sixth Street Saloon',
    type: VenueType.Bar,
    capacity: 200,
    basePriceCents: 45000,
    addressStreet: '321 E 6th St',
    addressCity: 'Austin',
    addressState: 'TX',
    addressZip: '78701',
    ownerId: 'owner-5',
    createdAt: '2026-02-05T00:00:00Z',
    updatedAt: '2026-02-05T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '6',
    name: 'The Rooftop Terrace',
    type: VenueType.EventSpace,
    capacity: 150,
    basePriceCents: 75000,
    addressStreet: '500 W 2nd St',
    addressCity: 'Austin',
    addressState: 'TX',
    addressZip: '78701',
    ownerId: 'owner-6',
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z',
    deletedAt: null,
  },
];

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
