import { Alert } from '@mantine/core';
import { DashboardStats } from './DashboardStats';
import { UpcomingEvents } from './UpcomingEvents';
import { BudgetOverview } from './BudgetOverview';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

/** Dashboard content shown to student organization users. */
export function OrgDashboardContent() {
  const { budgetUsedCents, isLoading, isError } = useDashboardStats();

  return (
    <>
      <DashboardStats userRole="student_org" />
      <UpcomingEvents />
      {isError ? (
        <Alert color="red" aria-label="Dashboard stats error">
          {DASHBOARD_CONSTANTS.MESSAGES.STATS_ERROR}
        </Alert>
      ) : (
        <BudgetOverview budgetUsedCents={budgetUsedCents} isLoading={isLoading} />
      )}
    </>
  );
}
