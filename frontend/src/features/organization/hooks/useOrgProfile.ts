import { useMyOrganizationQuery } from '@/lib/react-query';

/** Hook to fetch the current user's organization profile. */
export function useOrgProfile() {
  const { data: organization, isLoading, isError } = useMyOrganizationQuery();

  return { organization, isLoading, isError };
}
