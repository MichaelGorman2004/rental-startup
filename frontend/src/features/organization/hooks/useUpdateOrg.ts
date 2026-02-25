import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUpdateOrganizationMutation } from '@/lib/react-query';
import type { OrganizationProfile, OrgProfileFormValues } from '../types/organization.types';
import { ORG_MESSAGES, ORG_VALIDATION } from '../constants/organization-defaults';

/** Hook for organization profile form logic and mutation. */
export function useUpdateOrg(organization: OrganizationProfile | undefined) {
  const mutation = useUpdateOrganizationMutation();

  const form = useForm<OrgProfileFormValues>({
    initialValues: {
      name: organization?.name ?? '',
      description: organization?.description ?? '',
      contactEmail: organization?.contactEmail ?? '',
      contactPhone: organization?.contactPhone ?? '',
      memberCount: organization?.memberCount,
      websiteUrl: organization?.websiteUrl ?? '',
    },
    validate: {
      name: (v: string) => (v.length < ORG_VALIDATION.NAME_MIN ? 'Name is too short' : null),
      contactEmail: (v: string) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Invalid email' : null),
    },
  });

  const handleSubmit = form.onSubmit((values: OrgProfileFormValues) => {
    if (!organization) return;

    mutation.mutate(
      {
        id: organization.id,
        data: {
          name: values.name,
          description: values.description || undefined,
          contactEmail: values.contactEmail || undefined,
          contactPhone: values.contactPhone || undefined,
          memberCount: values.memberCount,
          websiteUrl: values.websiteUrl || undefined,
        },
      },
      {
        onSuccess: () => {
          notifications.show({ message: ORG_MESSAGES.SAVE_SUCCESS, color: 'green' });
        },
        onError: () => {
          notifications.show({ message: ORG_MESSAGES.SAVE_ERROR, color: 'red' });
        },
      },
    );
  });

  return { form, handleSubmit, isPending: mutation.isPending };
}
