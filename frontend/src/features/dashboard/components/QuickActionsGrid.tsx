import { memo, useMemo } from 'react';
import { SimpleGrid, Text, Stack } from '@mantine/core';
import { ActionCard } from './ActionCard';
import { ORG_QUICK_ACTIONS, VENUE_ADMIN_QUICK_ACTIONS } from '../constants/quick-actions';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';
import type { QuickAction } from '../types/dashboard.types';

interface QuickActionsGridProps {
  userRole: 'student_org' | 'venue_admin';
}

export const QuickActionsGrid = memo(({ userRole }: QuickActionsGridProps) => {
  const actions: QuickAction[] = useMemo(
    () => (userRole === 'venue_admin' ? VENUE_ADMIN_QUICK_ACTIONS : ORG_QUICK_ACTIONS),
    [userRole],
  );

  return (
    <Stack gap="md">
      <Text size="xs" fw={600} tt="uppercase" c="dimmed" lts="0.12em">
        {DASHBOARD_CONSTANTS.LABELS.QUICK_ACTIONS}
      </Text>
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </SimpleGrid>
    </Stack>
  );
});
