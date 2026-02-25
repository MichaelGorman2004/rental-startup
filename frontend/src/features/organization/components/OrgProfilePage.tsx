import {
  Container, Stack, Title, Text,
} from '@mantine/core';
import { ORG_MESSAGES } from '../constants/organization-defaults';
import { useOrgProfilePage } from '../hooks/useOrgProfilePage';
import { OrgProfileForm } from './OrgProfileForm';
import { OrgProfileSkeleton } from './OrgProfileSkeleton';

/** Organization profile page with form editing. */
export function OrgProfilePage() {
  const {
    isLoading, isError, form, handleSubmit, isPending,
  } = useOrgProfilePage();

  if (isLoading) return <OrgProfileSkeleton />;
  if (isError) return <Text c="red">{ORG_MESSAGES.ERROR}</Text>;

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={2}>{ORG_MESSAGES.PAGE_TITLE}</Title>
        <Text c="dimmed">{ORG_MESSAGES.PAGE_SUBTITLE}</Text>
        <OrgProfileForm form={form} onSubmit={handleSubmit} isPending={isPending} />
      </Stack>
    </Container>
  );
}
