import { memo } from 'react';
import { SimpleGrid, Title, Stack } from '@mantine/core';
import { ActionCard } from './ActionCard';
import { QUICK_ACTIONS } from '../constants/quick-actions';

export const QuickActionsGrid = memo(() => (
  <Stack gap="md">
    <Title order={3}>Quick Actions</Title>
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      {QUICK_ACTIONS.map((action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </SimpleGrid>
  </Stack>
));
