import { memo, useCallback } from 'react';
import { Alert, Button, Stack } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { VENUE_MESSAGES } from '../constants/venue-defaults';

interface VenueErrorStateProps {
  onRetry: () => void;
}

/** Error state displayed when venue fetching fails. */
export const VenueErrorState = memo(({ onRetry }: VenueErrorStateProps) => {
  const handleRetry = useCallback(() => onRetry(), [onRetry]);

  return (
    <Stack align="center" gap="md" py="xl">
      <Alert icon={<IconAlertCircle size="1rem" />} color="red" variant="light">
        {VENUE_MESSAGES.ERROR_LOADING}
      </Alert>
      <Button variant="light" onClick={handleRetry}>{VENUE_MESSAGES.RETRY}</Button>
    </Stack>
  );
});
