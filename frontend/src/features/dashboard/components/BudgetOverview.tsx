import { memo } from 'react';
import {
  Card, Text, Stack, Skeleton,
} from '@mantine/core';
import { formatPrice } from '@/features/venues/utils';
import { BUDGET_LABEL, BUDGET_SUBTITLE } from '../constants/dashboard.constants';

interface BudgetOverviewProps {
  budgetUsedCents: number;
  isLoading: boolean;
}

export const BudgetOverview = memo(({ budgetUsedCents, isLoading }: BudgetOverviewProps) => {
  if (isLoading) {
    return <Skeleton height={80} radius="md" />;
  }

  return (
    <Card withBorder p="md">
      <Stack gap="xs">
        <Text size="xs" fw={600} tt="uppercase" c="dimmed" lts="0.12em">
          {BUDGET_LABEL}
        </Text>
        <Text fw={600} size="xl">
          {formatPrice(budgetUsedCents)}
        </Text>
        <Text size="xs" c="dimmed">
          {BUDGET_SUBTITLE}
        </Text>
      </Stack>
    </Card>
  );
});
