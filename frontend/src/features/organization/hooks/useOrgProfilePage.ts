import { useOrgProfile } from './useOrgProfile';
import { useUpdateOrg } from './useUpdateOrg';

/** Page orchestration hook for organization profile. */
export function useOrgProfilePage() {
  const { organization, isLoading, isError } = useOrgProfile();
  const { form, handleSubmit, isPending } = useUpdateOrg(organization);

  return {
    organization, isLoading, isError, form, handleSubmit, isPending,
  };
}
