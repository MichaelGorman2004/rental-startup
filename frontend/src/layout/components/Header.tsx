import {
  Group, Burger, Text, Badge,
} from '@mantine/core';
import { useLayout } from '../hooks/useLayout';
import { useOrganization } from '../../features/dashboard';
import { HeaderUserMenu } from './HeaderUserMenu';

export function Header() {
  const { sidebarOpen, toggleSidebar } = useLayout();
  const { organization } = useOrganization();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={sidebarOpen} onClick={toggleSidebar} hiddenFrom="sm" size="sm" />
        <Text fw={700} size="lg">VenueLink</Text>
        {organization?.name && <Badge variant="light">{organization.name}</Badge>}
      </Group>
      <HeaderUserMenu />
    </Group>
  );
}
