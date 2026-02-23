import { memo } from 'react';
import { SimpleGrid } from '@mantine/core';
import { VenueCard } from './VenueCard';
import { VenueCardSkeleton } from './VenueCardSkeleton';
import { VenueEmptyState } from './VenueEmptyState';
import { VenueErrorState } from './VenueErrorState';
import type { Venue } from '../types/venue.types';

interface VenueGridProps {
  venues: Venue[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

/** Responsive grid of venue cards with loading, error, and empty states. */
export const VenueGrid = memo(({
  venues, isLoading, isError, onRetry,
}: VenueGridProps) => {
  if (isError) return <VenueErrorState onRetry={onRetry} />;
  if (!isLoading && venues.length === 0) return <VenueEmptyState />;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {isLoading ? <VenueCardSkeleton /> : venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </SimpleGrid>
  );
});
