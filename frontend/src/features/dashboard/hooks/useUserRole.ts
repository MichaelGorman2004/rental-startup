import { useMemo } from 'react';
import { useUser } from '@clerk/clerk-react';
import type { UserRole } from '../types/dashboard.types';

/** Returns the current user's role derived from Clerk public metadata. */
export function useUserRole(): UserRole {
  const { user } = useUser();
  return useMemo<UserRole>(
    () => (user?.publicMetadata?.['role'] === 'venue_admin' ? 'venue_admin' : 'student_org'),
    [user?.publicMetadata],
  );
}
