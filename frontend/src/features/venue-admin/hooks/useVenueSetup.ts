import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCreateVenueMutation } from '@/lib/react-query';
import { VENUE_SETUP_MESSAGES, VENUE_SETUP_VALIDATION } from '../constants/venue-admin-defaults';

interface VenueSetupFormValues {
  name: string;
}

function validateName(value: unknown): string | null {
  if (!value || String(value).trim().length < VENUE_SETUP_VALIDATION.NAME_MIN) {
    return VENUE_SETUP_MESSAGES.VALIDATION_NAME_REQUIRED;
  }
  return null;
}

/** Hook for the venue setup (onboarding) form. */
export function useVenueSetup() {
  const mutation = useCreateVenueMutation();

  const form = useForm<VenueSetupFormValues>({
    initialValues: { name: '' },
    validate: { name: validateName },
  });

  const handleSubmit = form.onSubmit((values: VenueSetupFormValues) => {
    mutation.mutate(values.name.trim(), {
      onError: () => {
        notifications.show({ message: VENUE_SETUP_MESSAGES.SUBMIT_ERROR, color: 'red' });
      },
    });
  });

  return { form, handleSubmit, isPending: mutation.isPending };
}
