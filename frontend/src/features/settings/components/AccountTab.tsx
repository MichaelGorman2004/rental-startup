import {
  Stack, Text, Card, Group,
} from '@mantine/core';
import { useUser } from '@clerk/clerk-react';
import { SETTINGS_MESSAGES } from '../constants/settings-defaults';

/** Account settings tab displaying user info from Clerk. */
export function AccountTab() {
  const { user } = useUser();
  const role = (user?.publicMetadata as Record<string, string> | undefined)?.['role'] ?? '—';

  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">{SETTINGS_MESSAGES.ACCOUNT_EMAIL}</Text>
          <Text size="sm">{user?.primaryEmailAddress?.emailAddress ?? '—'}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">{SETTINGS_MESSAGES.ACCOUNT_ROLE}</Text>
          <Text size="sm">{role}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">{SETTINGS_MESSAGES.ACCOUNT_MEMBER_SINCE}</Text>
          <Text size="sm">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</Text>
        </Group>
      </Stack>
    </Card>
  );
}
