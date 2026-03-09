import {
  Group, Burger, Text, Badge,
} from '@mantine/core';
import { useLayout } from '../hooks/useLayout';
import { useOrganization } from '../../features/dashboard';
import { HeaderUserMenu } from './HeaderUserMenu';
import classes from './Header.module.css';

export function Header() {
  const { sidebarOpen, toggleSidebar } = useLayout();
  const { organization } = useOrganization();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group gap="sm">
        <Burger opened={sidebarOpen} onClick={toggleSidebar} hiddenFrom="sm" size="sm" />
        <Text fw={700} size="lg" className={classes['logo']}>
          Venue
          <Text span className={classes['logoDot']}>Link</Text>
        </Text>
        {organization?.name && (
          <Badge variant="light" className={classes['orgBadge']} radius="sm">
            {organization.name}
          </Badge>
        )}
      </Group>
      <HeaderUserMenu />
    </Group>
  );
}
