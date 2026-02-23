import { useEffect } from 'react';
import { useVenueFilters } from './useVenueFilters';
import { useVenueSearch } from './useVenueSearch';
import { useVenues } from './useVenues';

/**
 * Orchestrates venue browse page state: filters, debounced search, and data fetching.
 * Syncs debounced search value back to URL params after the debounce delay.
 */
export function useVenueBrowse() {
  const { filters, setTypeFilter, setSearchFilter } = useVenueFilters();
  const {
    inputValue, debouncedValue, handleSearchChange, clearSearch,
  } = useVenueSearch(filters.search);
  const {
    venues, isLoading, isError, refetch,
  } = useVenues({ ...filters, search: debouncedValue });

  useEffect(() => { setSearchFilter(debouncedValue); }, [debouncedValue, setSearchFilter]);

  return {
    filters,
    inputValue,
    venues,
    isLoading,
    isError,
    refetch,
    setTypeFilter,
    handleSearchChange,
    clearSearch,
  };
}
