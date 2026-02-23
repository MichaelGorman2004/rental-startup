import { memo, useCallback } from 'react';
import { TextInput, CloseButton } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { VENUE_MESSAGES } from '../constants/venue-defaults';

interface VenueSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const VenueSearchBar = memo(({ value, onChange, onClear }: VenueSearchBarProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.value),
    [onChange],
  );

  return (
    <TextInput
      size="lg"
      placeholder={VENUE_MESSAGES.SEARCH_PLACEHOLDER}
      leftSection={<IconSearch size="1.25rem" stroke={1.5} />}
      rightSection={value ? <CloseButton size="sm" onClick={onClear} aria-label="Clear search" /> : null}
      value={value}
      onChange={handleChange}
      aria-label={VENUE_MESSAGES.SEARCH_PLACEHOLDER}
    />
  );
});
