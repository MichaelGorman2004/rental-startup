import { useState, useMemo, useCallback } from 'react';
import { MOCK_VENUES } from '../../venues/constants/mock-venues';
import type { VenueType, Venue } from '../../venues/types/venue.types';

/** Filter mock venues by optional type. Pure client-side — no API calls. */
function filterByType(venues: readonly Venue[], type: VenueType | null): Venue[] {
  if (!type) return [...venues];
  return venues.filter((v) => v.type === type);
}

/**
 * Provides mock venue data for demo browse page.
 * Mirrors the shape of useVenueBrowse but without API calls or auth.
 */
export function useDemoVenues() {
  const [activeType, setActiveType] = useState<VenueType | null>(null);

  const venues = useMemo(() => filterByType(MOCK_VENUES, activeType), [activeType]);

  const handleTypeChange = useCallback((type: VenueType | null) => {
    setActiveType(type);
  }, []);

  return { venues, activeType, handleTypeChange };
}
