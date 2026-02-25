import { Stack, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MY_BOOKINGS_MESSAGES } from '../constants/bookings-page-defaults';

/** Empty state when user has no bookings. */
export function BookingsEmptyState() {
  const navigate = useNavigate();

  return (
    <Stack align="center" gap="md" py="xl">
      <Text fw={600} size="lg">{MY_BOOKINGS_MESSAGES.EMPTY_TITLE}</Text>
      <Text c="dimmed">{MY_BOOKINGS_MESSAGES.EMPTY_SUBTITLE}</Text>
      <Button variant="light" onClick={() => navigate('/venues')}>
        {MY_BOOKINGS_MESSAGES.EMPTY_CTA}
      </Button>
    </Stack>
  );
}
