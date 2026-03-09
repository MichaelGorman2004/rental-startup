import {
  Stack, Title, Text, Container,
} from '@mantine/core';
import { QuickActionsGrid } from './QuickActionsGrid';
import { UpcomingEvents } from './UpcomingEvents';
import { DashboardStats } from './DashboardStats';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';
import classes from './DashboardPage.module.css';

export function DashboardPage() {
  return (
    <Container size={1080} py="xl" px="xl">
      <Stack gap="xl" className={classes['pageEnter']}>
        <Stack gap="xs">
          <Title order={2} className={classes['greeting']}>
            {DASHBOARD_CONSTANTS.MESSAGES.GREETING}
          </Title>
          <Text size="sm" c="dimmed">{DASHBOARD_CONSTANTS.MESSAGES.SUBTITLE}</Text>
        </Stack>
        <DashboardStats />
        <QuickActionsGrid />
        <UpcomingEvents />
      </Stack>
    </Container>
  );
}
