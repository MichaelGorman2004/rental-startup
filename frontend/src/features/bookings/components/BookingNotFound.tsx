import { memo, useCallback } from 'react';
import {
  Stack, Title, Text, Button, ThemeIcon,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { BOOKING_MESSAGES } from '../constants';

/** 404 state shown when the target venue cannot be found. */
export const BookingNotFound = memo(() => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => { navigate('/venues'); }, [navigate]);

  return (
    <Stack align="center" gap="md" py="xl">
      <ThemeIcon size={64} radius="xl" variant="light" color="red">
        <IconAlertTriangle size="2rem" stroke={1.5} />
      </ThemeIcon>
      <Title order={3}>{BOOKING_MESSAGES.VENUE_NOT_FOUND}</Title>
      <Text c="dimmed" ta="center" maw={400}>{BOOKING_MESSAGES.VENUE_NOT_FOUND_SUBTITLE}</Text>
      <Button variant="light" onClick={handleBack}>{BOOKING_MESSAGES.BACK_TO_VENUES}</Button>
    </Stack>
  );
});
