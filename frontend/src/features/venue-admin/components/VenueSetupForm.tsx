import { Stack, TextInput, Button } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { VENUE_SETUP_MESSAGES, VENUE_SETUP_VALIDATION } from '../constants/venue-admin-defaults';

interface VenueSetupFormValues {
  name: string;
}

interface VenueSetupFormProps {
  form: UseFormReturnType<VenueSetupFormValues>;
  onSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

/** Venue setup form used during onboarding — name only. */
export function VenueSetupForm({ form, onSubmit, isPending }: VenueSetupFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <TextInput
          label={VENUE_SETUP_MESSAGES.FORM_NAME}
          placeholder={VENUE_SETUP_MESSAGES.FORM_NAME_PLACEHOLDER}
          maxLength={VENUE_SETUP_VALIDATION.NAME_MAX}
          aria-label={VENUE_SETUP_MESSAGES.FORM_NAME}
          {...form.getInputProps('name')}
        />
        <Button
          type="submit"
          loading={isPending}
          aria-label={VENUE_SETUP_MESSAGES.SUBMIT_BUTTON}
          fullWidth
          mt="sm"
        >
          {VENUE_SETUP_MESSAGES.SUBMIT_BUTTON}
        </Button>
      </Stack>
    </form>
  );
}
