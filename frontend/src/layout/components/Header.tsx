import {
  Group, Burger, Text, Badge, Avatar,
} from '@mantine/core';
import { useUser } from '@clerk/clerk-react';
import { useLayout } from '../hooks/useLayout';
import { useOrganization } from '../../features/dashboard';

export function Header() {
  const { sidebarOpen, toggleSidebar } = useLayout();
  const { user } = useUser();
  const { organization } = useOrganization();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={sidebarOpen} onClick={toggleSidebar} hiddenFrom="sm" size="sm" />
        <Text fw={700} size="lg">VenueLink</Text>
        {organization?.name && <Badge variant="light">{organization.name}</Badge>}
      </Group>
      <Avatar src={user?.imageUrl} alt={user?.fullName ?? 'User'} radius="xl" />
    </Group>
  );
}
