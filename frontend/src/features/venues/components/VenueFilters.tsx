import { memo, useCallback } from 'react';
import { Group, Chip } from '@mantine/core';
import { VENUE_FILTER_OPTIONS } from '../constants/venue-types';
import type { VenueType } from '../types/venue.types';

interface VenueFiltersProps {
  activeType: VenueType | null;
  onTypeChange: (type: VenueType | null) => void;
}

export const VenueFilters = memo(({ activeType, onTypeChange }: VenueFiltersProps) => {
  const handleChange = useCallback(
    (value: string | string[]) => {
      const selected = Array.isArray(value) ? value[0] ?? '' : value;
      onTypeChange(selected === '' ? null : (selected as VenueType));
    },
    [onTypeChange],
  );

  return (
    <Chip.Group value={activeType ?? ''} onChange={handleChange}>
      <Group gap="xs">
        {VENUE_FILTER_OPTIONS.map((option) => (
          <Chip key={option.label} value={option.value ?? ''} variant="light" size="md" radius="xl">
            {option.label}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
});
