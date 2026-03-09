import { memo } from 'react';
import { SimpleGrid } from '@mantine/core';
import { StatCard } from './StatCard';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

export const DashboardStats = memo(() => (
  <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
    {DASHBOARD_CONSTANTS.STATS.map((stat) => (
      <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
    ))}
  </SimpleGrid>
));
