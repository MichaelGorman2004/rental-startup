import { memo } from 'react';
import { Stack, Text, ThemeIcon } from '@mantine/core';
import { IconBuildingStore } from '@tabler/icons-react';
import { VENUE_MESSAGES } from '../constants/venue-defaults';

/** Displayed when no venues match the current search/filter criteria. */
export const VenueEmptyState = memo(() => (
  <Stack align="center" gap="md" py="xl">
    <ThemeIcon size="xl" radius="xl" variant="light" color="gray">
      <IconBuildingStore size="1.5rem" stroke={1.5} />
    </ThemeIcon>
    <Stack align="center" gap="xs">
      <Text fw={600}>{VENUE_MESSAGES.NO_RESULTS_TITLE}</Text>
      <Text size="sm" c="dimmed">{VENUE_MESSAGES.NO_RESULTS_SUBTITLE}</Text>
    </Stack>
  </Stack>
));
