import { useMemo } from 'react';
import {
  Stack, Title, Text, Container,
} from '@mantine/core';
import { useUser } from '@clerk/clerk-react';

import { QuickActionsGrid } from './QuickActionsGrid';
import { UpcomingEvents } from './UpcomingEvents';
import { DashboardStats } from './DashboardStats';
import { BudgetOverview } from './BudgetOverview';
import { VenueDashboardContent } from './VenueDashboardContent';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';
import classes from './DashboardPage.module.css';

type UserRole = 'student_org' | 'venue_admin';

const VENUE_ADMIN_SUBTITLE = 'Manage your venue and bookings';

function useUserRole(): UserRole {
  const { user } = useUser();
  return useMemo<UserRole>(
    () => (user?.publicMetadata?.['role'] === 'venue_admin' ? 'venue_admin' : 'student_org'),
    [user?.publicMetadata],
  );
}

function OrgDashboardContent() {
  const { budgetUsedCents, isLoading } = useDashboardStats();

  return (
    <>
      <DashboardStats userRole="student_org" />
      <UpcomingEvents />
      <BudgetOverview budgetUsedCents={budgetUsedCents} isLoading={isLoading} />
    </>
  );
}

export function DashboardPage() {
  const userRole = useUserRole();

  return (
    <Container size={1080} py="xl" px="xl">
      <Stack gap="xl" className={classes['pageEnter']}>
        <Stack gap="xs">
          <Title order={2} className={classes['greeting']}>
            {DASHBOARD_CONSTANTS.MESSAGES.GREETING}
          </Title>
          <Text size="sm" c="dimmed">
            {userRole === 'venue_admin'
              ? VENUE_ADMIN_SUBTITLE
              : DASHBOARD_CONSTANTS.MESSAGES.SUBTITLE}
          </Text>
        </Stack>
        {userRole === 'student_org' && <OrgDashboardContent />}
        {userRole === 'venue_admin' && <VenueDashboardContent />}
        <QuickActionsGrid userRole={userRole} />
      </Stack>
    </Container>
  );
}
