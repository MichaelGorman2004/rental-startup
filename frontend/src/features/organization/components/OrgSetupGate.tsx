import type { ReactNode } from 'react';
import { Center, Loader } from '@mantine/core';
import { useUser } from '@clerk/clerk-react';
import { useOrgStatus } from '../hooks/useOrgStatus';
import { OrgSetupPage } from './OrgSetupPage';

interface GateProps {
  children: ReactNode;
}

function getUserRole(user: ReturnType<typeof useUser>['user']): string | undefined {
  const meta = user?.publicMetadata as Record<string, string> | undefined;
  return meta?.['role'];
}

/** Inner gate — only mounted for student_org users. Checks org existence. */
function StudentOrgGate({ children }: GateProps) {
  const { hasNoOrg, isLoading } = useOrgStatus();

  if (isLoading) {
    return (
      <Center mih="100vh">
        <Loader aria-label="Loading" />
      </Center>
    );
  }

  if (hasNoOrg) return <OrgSetupPage />;

  return children;
}

/**
 * Intercepts student_org users who have not yet created an organization.
 * Forces them through the org setup flow before accessing any app content.
 * Non-student-org users (e.g. venue_admin) pass through without a query.
 */
export function OrgSetupGate({ children }: GateProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Center mih="100vh">
        <Loader aria-label="Loading" />
      </Center>
    );
  }

  if (getUserRole(user) !== 'student_org') {
    return children;
  }

  return <StudentOrgGate>{children}</StudentOrgGate>;
}
