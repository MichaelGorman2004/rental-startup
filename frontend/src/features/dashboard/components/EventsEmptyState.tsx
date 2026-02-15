import { memo, useCallback } from 'react';
import { Stack, Text, Button } from '@mantine/core';
import { IconCalendarOff } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

export const EventsEmptyState = memo(() => {
  const navigate = useNavigate();

  const handleBrowseClick = useCallback(() => {
    navigate('/venues');
  }, [navigate]);

  return (
    <Stack align="center" py="xl" gap="md">
      <IconCalendarOff size="3rem" stroke={1.5} color="gray" />
      <Text fw={500}>{DASHBOARD_CONSTANTS.MESSAGES.NO_EVENTS}</Text>
      <Text size="sm" c="dimmed">{DASHBOARD_CONSTANTS.MESSAGES.NO_EVENTS_SUBTITLE}</Text>
      <Button onClick={handleBrowseClick}>Browse Venues</Button>
    </Stack>
  );
});
