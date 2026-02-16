import { memo, useCallback } from 'react';
import {
  Card, Text, ThemeIcon, Stack,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { QuickAction } from '../types/dashboard.types';

interface ActionCardProps {
  action: QuickAction;
}

export const ActionCard = memo(({ action }: ActionCardProps) => {
  const navigate = useNavigate();
  const Icon = action.icon;

  const handleClick = useCallback(() => {
    navigate(action.route);
  }, [navigate, action.route]);

  return (
    <Card onClick={handleClick} style={{ cursor: 'pointer' }} withBorder>
      <Stack align="center" gap="sm">
        <ThemeIcon size="xl" radius="md" color={action.color}>
          <Icon size="1.5rem" stroke={1.5} />
        </ThemeIcon>
        <Text fw={500}>{action.title}</Text>
      </Stack>
    </Card>
  );
});
