import type { FormEvent } from 'react';
import {
  Center, Stack, Title, Text, Paper, Box,
} from '@mantine/core';
import { useVenueSetup } from '../hooks/useVenueSetup';
import { VenueSetupForm } from './VenueSetupForm';
import { VENUE_SETUP_MESSAGES } from '../constants/venue-admin-defaults';

/** Full-page onboarding screen shown to venue admin users with no venue. */
export function VenueSetupPage() {
  const { form, handleSubmit, isPending } = useVenueSetup();

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => handleSubmit(event);

  return (
    <Center mih="100vh" p="xl">
      <Box w="100%" maw={480}>
        <Stack gap="xl">
          <Stack gap="xs">
            <Title order={2}>{VENUE_SETUP_MESSAGES.PAGE_TITLE}</Title>
            <Text c="dimmed">{VENUE_SETUP_MESSAGES.PAGE_SUBTITLE}</Text>
          </Stack>
          <Paper p="xl" radius="md" withBorder>
            <VenueSetupForm
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
