import { Group, Burger, Text } from '@mantine/core';
import { useLayout } from '../hooks/useLayout';

export function Header() {
  const { sidebarOpen, toggleSidebar } = useLayout();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={sidebarOpen} onClick={toggleSidebar} hiddenFrom="sm" size="sm" />
        <Text fw={700} size="lg">VenueLink</Text>
      </Group>
      {/* User menu will go here */}
    </Group>
  );
}
