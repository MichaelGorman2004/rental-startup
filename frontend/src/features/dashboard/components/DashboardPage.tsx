import {
  Stack, Title, Text, Container,
} from '@mantine/core';
import { QuickActionsGrid } from './QuickActionsGrid';
import { UpcomingEvents } from './UpcomingEvents';
import classes from './DashboardPage.module.css';

export function DashboardPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl" className={classes['pageEnter']}>
        <Stack gap="xs">
          <Title order={2} className={classes['greeting']}>Dashboard</Title>
          <Text c="dimmed">Manage your events and bookings</Text>
        </Stack>
        <QuickActionsGrid />
        <UpcomingEvents />
      </Stack>
    </Container>
  );
}
