import { useCallback } from 'react';
import {
  Menu, Avatar, UnstyledButton,
} from '@mantine/core';
import { IconSettings, IconLogout } from '@tabler/icons-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

/** Header avatar dropdown with Settings and Sign Out options. */
export function HeaderUserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    queryClient.clear();
    await signOut();
    navigate('/login');
  }, [signOut, queryClient, navigate]);

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Avatar src={user?.imageUrl} alt={user?.fullName ?? 'User'} radius="xl" />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconSettings size="0.875rem" />} onClick={() => navigate('/settings')}>
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" leftSection={<IconLogout size="0.875rem" />} onClick={handleSignOut}>
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
