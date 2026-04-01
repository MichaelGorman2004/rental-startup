import {
  Stack, Title, Text, Container,
} from '@mantine/core';

import { QuickActionsGrid } from './QuickActionsGrid';
import { VenueDashboardContent } from './VenueDashboardContent';
import { OrgDashboardContent } from './OrgDashboardContent';
import { useUserRole } from '../hooks/useUserRole';
import { DASHBOARD_CONSTANTS, VENUE_ADMIN_SUBTITLE } from '../constants/dashboard.constants';
import classes from './DashboardPage.module.css';

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
