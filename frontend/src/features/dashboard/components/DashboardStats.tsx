import { memo } from 'react';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { StatCard } from './StatCard';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { SKELETON_COUNT, SKELETON_HEIGHT } from '../constants/dashboard.constants';

const OrgDashboardStats = memo(() => {
  const { stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <Skeleton key={i} height={SKELETON_HEIGHT} radius="md" />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
      ))}
    </SimpleGrid>
  );
});

interface DashboardStatsProps {
  userRole: 'student_org' | 'venue_admin';
}

export const DashboardStats = memo(({ userRole }: DashboardStatsProps) => {
  if (userRole === 'venue_admin') {
    return null;
  }

  return <OrgDashboardStats />;
});
