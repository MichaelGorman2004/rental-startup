import { useCallback } from 'react';
import {
  Menu, Avatar, UnstyledButton,
} from '@mantine/core';
import { GearSix, SignOut } from '@phosphor-icons/react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMyOrganizationQuery } from '@/lib/react-query';
import { useMyVenue } from '@/features/venue-admin/hooks/useMyVenue';

/** Header avatar dropdown with Settings and Sign Out options. */
export function HeaderUserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userRole = (user?.publicMetadata as Record<string, string> | undefined)?.['role'];
  const { data: org } = useMyOrganizationQuery({ enabled: userRole === 'student_org' });
  const { venue } = useMyVenue();

  const logoUrl = org?.logoUrl ?? venue?.logoUrl ?? undefined;
  const avatarSrc = logoUrl ?? user?.imageUrl ?? undefined;

  const handleSignOut = useCallback(async () => {
    queryClient.clear();
    await signOut();
    navigate('/login');
  }, [signOut, queryClient, navigate]);

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Avatar src={avatarSrc} alt={user?.fullName ?? 'User'} radius="xl" />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<GearSix size={14} />} onClick={() => navigate('/settings')}>
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" leftSection={<SignOut size={14} />} onClick={handleSignOut}>
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
