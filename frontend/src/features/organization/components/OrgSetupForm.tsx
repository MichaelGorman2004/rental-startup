import {
  Stack, TextInput, Select, Button,
} from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { ORGANIZATION_TYPE_VALUES } from '@venuelink/shared';
import type { CreateOrgFormValues } from '../types/organization.types';
import { ORG_SETUP_MESSAGES, ORG_VALIDATION } from '../constants/organization-defaults';

interface OrgSetupFormProps {
  form: UseFormReturnType<CreateOrgFormValues>;
  onSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

const TYPE_OPTIONS = ORGANIZATION_TYPE_VALUES.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

/** Organization setup form used during onboarding. */
export function OrgSetupForm({ form, onSubmit, isPending }: OrgSetupFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <TextInput
          label={ORG_SETUP_MESSAGES.FORM_NAME}
          maxLength={ORG_VALIDATION.NAME_MAX}
          aria-label={ORG_SETUP_MESSAGES.FORM_NAME}
          {...form.getInputProps('name')}
        />
        <Select
          label={ORG_SETUP_MESSAGES.FORM_TYPE}
          placeholder={ORG_SETUP_MESSAGES.TYPE_PLACEHOLDER}
          data={TYPE_OPTIONS}
          aria-label={ORG_SETUP_MESSAGES.FORM_TYPE}
          {...form.getInputProps('type')}
        />
        <TextInput
          label={ORG_SETUP_MESSAGES.FORM_UNIVERSITY}
          placeholder={ORG_SETUP_MESSAGES.UNIVERSITY_PLACEHOLDER}
          aria-label={ORG_SETUP_MESSAGES.FORM_UNIVERSITY}
          {...form.getInputProps('university')}
        />
        <Button
          type="submit"
          loading={isPending}
          aria-label={ORG_SETUP_MESSAGES.SUBMIT_BUTTON}
          fullWidth
          mt="sm"
        >
          {ORG_SETUP_MESSAGES.SUBMIT_BUTTON}
        </Button>
      </Stack>
    </form>
  );
}
