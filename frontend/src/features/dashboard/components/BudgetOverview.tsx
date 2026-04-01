import { memo } from 'react';
import {
  Card, Text, Stack, Skeleton,
} from '@mantine/core';

interface BudgetOverviewProps {
  budgetUsedCents: number;
  isLoading: boolean;
}

const BUDGET_LABEL = 'Budget Overview';
const BUDGET_SUBTITLE = 'Total event spending to date';

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString()}`;
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
          {formatCurrency(budgetUsedCents)}
        </Text>
        <Text size="xs" c="dimmed">
          {BUDGET_SUBTITLE}
        </Text>
      </Stack>
    </Card>
  );
});
