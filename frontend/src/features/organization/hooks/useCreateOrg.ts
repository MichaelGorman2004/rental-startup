import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { OrganizationType } from '@venuelink/shared';
import { useCreateOrganizationMutation } from '@/lib/react-query';
import type { CreateOrgFormValues } from '../types/organization.types';
import { ORG_SETUP_MESSAGES, ORG_VALIDATION } from '../constants/organization-defaults';

function validateSetupForm(): Record<string, (value: unknown) => string | null> {
  return {
    name: (value: unknown) => {
      if (!value || String(value).trim().length < ORG_VALIDATION.NAME_MIN) {
        return ORG_SETUP_MESSAGES.VALIDATION_NAME_REQUIRED;
      }
      return null;
    },
    type: (value: unknown) => {
      if (!value) return ORG_SETUP_MESSAGES.VALIDATION_TYPE_REQUIRED;
      return null;
    },
    university: (value: unknown) => {
      if (!value || String(value).trim().length === 0) {
        return ORG_SETUP_MESSAGES.VALIDATION_UNIVERSITY_REQUIRED;
      }
      return null;
    },
  };
}

/** Hook for the organization setup (onboarding) form. */
export function useCreateOrg() {
  const mutation = useCreateOrganizationMutation();

  const form = useForm<CreateOrgFormValues>({
    initialValues: { name: '', type: '', university: '' },
    validate: validateSetupForm(),
  });

  const handleSubmit = form.onSubmit((values: CreateOrgFormValues) => {
    mutation.mutate(
      {
        name: values.name.trim(),
        type: values.type as OrganizationType,
        university: values.university.trim(),
      },
      {
        onError: () => {
          notifications.show({ message: ORG_SETUP_MESSAGES.SUBMIT_ERROR, color: 'red' });
        },
      },
    );
  });

  return { form, handleSubmit, isPending: mutation.isPending };
}
