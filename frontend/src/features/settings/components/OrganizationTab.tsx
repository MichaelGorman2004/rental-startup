import { Stack, Text } from '@mantine/core';

import {
  OrgProfileForm,
  OrgProfileSkeleton,
  useOrgProfilePage,
  ORG_MESSAGES,
} from '@/features/organization';
import { useProfileCompleteness } from '../hooks/useProfileCompleteness';
import { ProfileCompletenessNote } from './ProfileCompletenessNote';

/** Organization tab in settings, embedding the org profile form. */
export function OrganizationTab() {
  const {
    organization, isLoading, isError, form, handleSubmit, isPending,
    logoFile, handleLogoChange, isUploadingLogo,
  } = useOrgProfilePage();
  const completeness = useProfileCompleteness(organization);

  if (isLoading) return <OrgProfileSkeleton />;
  if (isError) return <Text c="red">{ORG_MESSAGES.ERROR}</Text>;

  return (
    <Stack gap="md">
      <ProfileCompletenessNote completeness={completeness} />
      <OrgProfileForm
        form={form}
        onSubmit={handleSubmit}
        isPending={isPending}
        organization={organization}
        logoFile={logoFile}
        onLogoChange={handleLogoChange}
        isUploadingLogo={isUploadingLogo}
      />
    </Stack>
  );
}
