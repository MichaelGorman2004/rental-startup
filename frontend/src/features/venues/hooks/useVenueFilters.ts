import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VenueType } from '../types/venue.types';
import type { VenueFilters } from '../types/venue.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/venue-defaults';

/** URL search param keys for venue filters. */
const PARAM_KEYS = {
  TYPE: 'type',
  SEARCH: 'search',
  PAGE: 'page',
} as const;

/** Validate that a string is a valid VenueType enum value. */
function isValidVenueType(value: string): value is VenueType {
  return Object.values(VenueType).includes(value as VenueType);
}

/**
 * Parse venue filters from URL search parameters.
 * Performs type-safe extraction with fallbacks:
 * - type: Validated against VenueType enum, defaults to null (all)
 * - search: Raw string, defaults to empty
 * - page: Parsed as int, clamped to minimum DEFAULT_PAGE
 */
function parseFiltersFromParams(params: URLSearchParams): VenueFilters {
  const typeParam = params.get(PARAM_KEYS.TYPE);
  const pageParam = params.get(PARAM_KEYS.PAGE);

  return {
    type: typeParam && isValidVenueType(typeParam) ? typeParam : null,
    search: params.get(PARAM_KEYS.SEARCH) ?? '',
    page: pageParam ? Math.max(DEFAULT_PAGE, parseInt(pageParam, 10)) : DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  };
}

/**
 * Hook to manage venue filter state synced with URL search params.
 * Enables shareable/bookmarkable filter URLs (e.g., /venues?type=bar&search=rooftop).
 *
 * Filter changes reset pagination to page 1 to avoid empty result pages.
 * Each setter updates URL params without full-page navigation (SPA behavior).
 */
export function useVenueFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseFiltersFromParams(searchParams);

  const setTypeFilter = useCallback((type: VenueType | null) => {
    setSearchParams((prev) => {
      if (type) prev.set(PARAM_KEYS.TYPE, type);
      else prev.delete(PARAM_KEYS.TYPE);
      prev.delete(PARAM_KEYS.PAGE);
      return prev;
    });
  }, [setSearchParams]);

  const setSearchFilter = useCallback((search: string) => {
    setSearchParams((prev) => {
      if (search) prev.set(PARAM_KEYS.SEARCH, search);
      else prev.delete(PARAM_KEYS.SEARCH);
      prev.delete(PARAM_KEYS.PAGE);
      return prev;
    });
  }, [setSearchParams]);

  const setPage = useCallback((page: number) => {
    setSearchParams((prev) => {
      if (page > DEFAULT_PAGE) prev.set(PARAM_KEYS.PAGE, String(page));
      else prev.delete(PARAM_KEYS.PAGE);
      return prev;
    });
  }, [setSearchParams]);

  return {
    filters, setTypeFilter, setSearchFilter, setPage,
  };
}
