import { useUser } from '@clerk/clerk-react';
import { useMemo } from 'react';
import type { OrganizationData } from '../types/dashboard.types';

interface UseOrganizationReturn {
  organization: OrganizationData | null;
  isLoading: boolean;
}

/**
 * Hook to access organization data from Clerk user metadata.
 * Organization info is stored in publicMetadata during signup.
 */
export function useOrganization(): UseOrganizationReturn {
  const { user, isLoaded } = useUser();

  const organization = useMemo((): OrganizationData | null => {
    if (!user?.publicMetadata) return null;

    const metadata = user.publicMetadata as Record<string, unknown>;
    const orgName = metadata['org_name'] ?? metadata['orgName'];

    if (!orgName) return null;

    return {
      id: (metadata['org_id'] as string) ?? '',
      name: orgName as string,
      type: (metadata['org_type'] as string) ?? 'club',
      university: (metadata['university'] as string) ?? '',
    };
  }, [user?.publicMetadata]);

  return { organization, isLoading: !isLoaded };
}
