import { memo, useCallback } from 'react';
import {
  Stack, Text, ThemeIcon, Button,
} from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { VENUE_DETAIL_MESSAGES } from '../constants/venue-defaults';

/** 404 state displayed when a venue ID is not found. */
export const VenueNotFound = memo(() => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/venues');
  }, [navigate]);

  return (
    <Stack align="center" gap="md" py="xl">
      <ThemeIcon size="xl" radius="xl" variant="light" color="red">
        <IconBuilding size="1.5rem" stroke={1.5} />
      </ThemeIcon>
      <Stack align="center" gap="xs">
        <Text fw={600}>{VENUE_DETAIL_MESSAGES.NOT_FOUND_TITLE}</Text>
        <Text size="sm" c="dimmed">{VENUE_DETAIL_MESSAGES.NOT_FOUND_SUBTITLE}</Text>
      </Stack>
      <Button variant="light" onClick={handleBack}>
        {VENUE_DETAIL_MESSAGES.BACK_TO_BROWSE}
      </Button>
    </Stack>
  );
});
