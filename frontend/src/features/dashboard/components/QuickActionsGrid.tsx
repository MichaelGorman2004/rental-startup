import { memo } from 'react';
import { SimpleGrid, Text, Stack } from '@mantine/core';
import { ActionCard } from './ActionCard';
import { QUICK_ACTIONS } from '../constants/quick-actions';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

export const QuickActionsGrid = memo(() => (
  <Stack gap="md">
    <Text size="xs" fw={600} tt="uppercase" c="dimmed" lts="0.12em">
      {DASHBOARD_CONSTANTS.LABELS.QUICK_ACTIONS}
    </Text>
    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
      {QUICK_ACTIONS.map((action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </SimpleGrid>
  </Stack>
));
