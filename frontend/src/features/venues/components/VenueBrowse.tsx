import { useEffect } from 'react';
import {
  Stack, Title, Text, Container,
} from '@mantine/core';
import { VENUE_MESSAGES } from '../constants/venue-defaults';
import { useVenueFilters } from '../hooks/useVenueFilters';
import { useVenueSearch } from '../hooks/useVenueSearch';
import { useVenues } from '../hooks/useVenues';
import { VenueSearchBar } from './VenueSearchBar';
import { VenueFilters } from './VenueFilters';
import { VenueGrid } from './VenueGrid';

/** Main venue discovery page composing search, filters, and grid. */
export function VenueBrowse() {
  const { filters, setTypeFilter, setSearchFilter } = useVenueFilters();
  const {
    inputValue, debouncedValue, handleSearchChange, clearSearch,
  } = useVenueSearch(filters.search);
  const {
    venues, isLoading, isError, refetch,
  } = useVenues({ ...filters, search: debouncedValue });

  useEffect(() => { setSearchFilter(debouncedValue); }, [debouncedValue, setSearchFilter]);

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Stack gap="xs">
          <Title order={2}>{VENUE_MESSAGES.PAGE_TITLE}</Title>
          <Text c="dimmed">{VENUE_MESSAGES.PAGE_SUBTITLE}</Text>
        </Stack>
        <VenueSearchBar value={inputValue} onChange={handleSearchChange} onClear={clearSearch} />
        <VenueFilters activeType={filters.type} onTypeChange={setTypeFilter} />
        <VenueGrid venues={venues} isLoading={isLoading} isError={isError} onRetry={refetch} />
      </Stack>
    </Container>
  );
}
