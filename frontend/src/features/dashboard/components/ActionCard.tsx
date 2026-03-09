import { memo, useCallback } from 'react';
import {
  Card, Text, Box, Stack,
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
      <Stack gap="md" align="flex-start">
        <Box className={classes['iconBox']}>
          <Icon size={22} weight="regular" />
        </Box>
        <Stack gap={4}>
          <Text fw={500} size="sm">{action.title}</Text>
          <Text size="xs" className={classes['desc']}>{action.description}</Text>
        </Stack>
      </Stack>
    </Card>
  );
});
