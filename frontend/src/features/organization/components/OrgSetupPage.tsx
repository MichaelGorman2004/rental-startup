import type { FormEvent } from 'react';
import {
  Center, Stack, Title, Text, Paper, Box,
} from '@mantine/core';
import { useCreateOrg } from '../hooks/useCreateOrg';
import { OrgSetupForm } from './OrgSetupForm';
import { ORG_SETUP_MESSAGES } from '../constants/organization-defaults';

/** Full-page onboarding screen shown to student org users with no organization. */
export function OrgSetupPage() {
  const { form, handleSubmit, isPending } = useCreateOrg();

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => handleSubmit(event);

  return (
    <Center mih="100vh" p="xl">
      <Box w="100%" maw={480}>
        <Stack gap="xl">
          <Stack gap="xs">
            <Title order={2}>{ORG_SETUP_MESSAGES.PAGE_TITLE}</Title>
            <Text c="dimmed">{ORG_SETUP_MESSAGES.PAGE_SUBTITLE}</Text>
          </Stack>
          <Paper p="xl" radius="md" withBorder>
            <OrgSetupForm
              form={form}
              onSubmit={onSubmit}
              isPending={isPending}
            />
          </Paper>
        </Stack>
      </Box>
    </Center>
  );
}
