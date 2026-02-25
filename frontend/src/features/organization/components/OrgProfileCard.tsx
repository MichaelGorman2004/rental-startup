import {
  Card, Stack, Text, Group, Badge,
} from '@mantine/core';
import type { OrganizationProfile } from '../types/organization.types';

interface OrgProfileCardProps {
  organization: OrganizationProfile;
}

/** Read-only summary card displaying organization info. */
export function OrgProfileCard({ organization }: OrgProfileCardProps) {
  return (
    <Card withBorder>
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={600} size="lg">{organization.name}</Text>
          <Badge variant="light">{organization.type}</Badge>
        </Group>
        <Text size="sm" c="dimmed">{organization.university}</Text>
        {organization.description ? <Text size="sm">{organization.description}</Text> : null}
        {organization.memberCount ? (
          <Text size="sm" c="dimmed">{`${organization.memberCount} members`}</Text>
        ) : null}
      </Stack>
    </Card>
  );
}
