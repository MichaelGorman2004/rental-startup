import { memo, useCallback } from 'react';
import {
  Stack, Title, Text, Button, ThemeIcon,
} from '@mantine/core';
import { IconShieldOff } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_MESSAGES } from '../constants/venue-admin-defaults';

/** Shown when a non-venue-admin user tries to access the dashboard. */
export const AccessDenied = memo(() => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => { navigate('/'); }, [navigate]);

  return (
    <Stack align="center" gap="md" py="xl">
      <ThemeIcon size={64} radius="xl" variant="light" color="red">
        <IconShieldOff size="2rem" stroke={1.5} />
      </ThemeIcon>
      <Title order={3}>{ADMIN_MESSAGES.ACCESS_DENIED_TITLE}</Title>
      <Text c="dimmed" ta="center" maw={400}>
        {ADMIN_MESSAGES.ACCESS_DENIED_SUBTITLE}
      </Text>
      <Button variant="light" onClick={handleBack}>
        {ADMIN_MESSAGES.BACK_TO_HOME}
      </Button>
    </Stack>
  );
});
