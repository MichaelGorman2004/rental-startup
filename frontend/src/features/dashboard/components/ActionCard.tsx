import { memo, useCallback } from 'react';
import {
  Card, Text, ThemeIcon, Stack,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { QuickAction } from '../types/dashboard.types';
import classes from './ActionCard.module.css';

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
    <Card
      component="button"
      type="button"
      onClick={handleClick}
      withBorder
      className={classes['card']}
      aria-label={`Navigate to ${action.title}`}
    >
      <Stack align="center" gap="sm">
        <ThemeIcon size="xl" radius="md" color={action.color} variant="light">
          <Icon size="1.5rem" stroke={1.5} />
        </ThemeIcon>
        <Text fw={500}>{action.title}</Text>
      </Stack>
    </Card>
  );
});
