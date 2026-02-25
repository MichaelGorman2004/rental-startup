import { Text } from '@mantine/core';
import {
  OrgProfileForm,
  OrgProfileSkeleton,
  useOrgProfilePage,
  ORG_MESSAGES,
} from '@/features/organization';

/** Organization tab in settings, embedding the org profile form. */
export function OrganizationTab() {
  const {
    isLoading, isError, form, handleSubmit, isPending,
  } = useOrgProfilePage();

  if (isLoading) return <OrgProfileSkeleton />;
  if (isError) return <Text c="red">{ORG_MESSAGES.ERROR}</Text>;

  return <OrgProfileForm form={form} onSubmit={handleSubmit} isPending={isPending} />;
}
