import {
  Stack, Title, Text, Container,
} from '@mantine/core';
import { VENUE_MESSAGES } from '../constants/venue-defaults';
import { useVenueBrowse } from '../hooks/useVenueBrowse';
import { VenueSearchBar } from './VenueSearchBar';
import { VenueFilters } from './VenueFilters';
import { VenueGrid } from './VenueGrid';

/** Main venue discovery page composing search, filters, and grid. */
export function VenueBrowse() {
  const {
    filters, inputValue, venues, isLoading, isError,
    refetch, setTypeFilter, handleSearchChange, clearSearch,
  } = useVenueBrowse();

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
