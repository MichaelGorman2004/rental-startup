import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { OrganizationProfile, UpdateOrganizationData } from '../../api/endpoints/organizations';
import { getMyOrganization, updateOrganization } from '../../api/endpoints/organizations';
import { queryKeys } from '../keys';
import { STALE_TIMES } from '../constants';

/** Query hook for fetching the current user's organization. */
export function useMyOrganizationQuery() {
  return useQuery<OrganizationProfile>({
    queryKey: queryKeys.organizations.me(),
    queryFn: getMyOrganization,
    staleTime: STALE_TIMES.USER_PROFILE,
  });
}

/** Mutation hook for updating an organization profile. */
export function useUpdateOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationData }) => (
      updateOrganization(id, data)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all });
    },
  });
}
