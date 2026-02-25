import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface RoleGuardProps {
  roles: readonly string[];
  children: React.ReactNode;
}

/** Redirects to dashboard if the user's role is not in the allowed list. */
export function RoleGuard({ roles, children }: RoleGuardProps) {
  const { user } = useUser();
  const role = (user?.publicMetadata as Record<string, string> | undefined)?.['role'];

  if (role && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
