import { isNotFoundError } from '@venuelink/shared';
import { useOrgStatusQuery } from '@/lib/react-query';

/** Returns whether the current user has an organization set up. */
export function useOrgStatus() {
  const { data, error, isLoading } = useOrgStatusQuery();

  const hasOrg = data !== undefined;
  const hasNoOrg = !isLoading && !hasOrg && isNotFoundError(error);

  return { hasOrg, hasNoOrg, isLoading };
}
