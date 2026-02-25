import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUpdateOrganizationMutation } from '@/lib/react-query';
import type { OrganizationProfile, OrgProfileFormValues } from '../types/organization.types';
import { EMAIL_REGEX, ORG_MESSAGES, ORG_VALIDATION } from '../constants/organization-defaults';

/** Hook for organization profile form logic and mutation. */
export function useUpdateOrg(organization: OrganizationProfile | undefined) {
  const mutation = useUpdateOrganizationMutation();

  const form = useForm<OrgProfileFormValues>({
    initialValues: {
      name: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      memberCount: undefined,
      websiteUrl: '',
    },
    validate: {
      name: (v: string) => (v.length < ORG_VALIDATION.NAME_MIN ? 'Name is too short' : null),
      contactEmail: (v: string) => (v && !EMAIL_REGEX.test(v) ? 'Invalid email' : null),
    },
  });

  useEffect(() => {
    if (organization) {
      form.initialize({
        name: organization.name ?? '',
        description: organization.description ?? '',
        contactEmail: organization.contactEmail ?? '',
        contactPhone: organization.contactPhone ?? '',
        memberCount: organization.memberCount,
        websiteUrl: organization.websiteUrl ?? '',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization]);

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
