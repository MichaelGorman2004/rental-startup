import {
  Stack, TextInput, Textarea, NumberInput, Button,
} from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { OrgProfileFormValues } from '../types/organization.types';
import { ORG_MESSAGES, ORG_VALIDATION } from '../constants/organization-defaults';

interface OrgProfileFormProps {
  form: UseFormReturnType<OrgProfileFormValues>;
  onSubmit: () => void;
  isPending: boolean;
}

/** Organization profile edit form. */
export function OrgProfileForm({ form, onSubmit, isPending }: OrgProfileFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <TextInput
          label={ORG_MESSAGES.FORM_NAME}
          maxLength={ORG_VALIDATION.NAME_MAX}
          {...form.getInputProps('name')}
        />
        <Textarea
          label={ORG_MESSAGES.FORM_DESCRIPTION}
          placeholder={ORG_MESSAGES.FORM_DESCRIPTION_PLACEHOLDER}
          maxLength={ORG_VALIDATION.DESCRIPTION_MAX}
          autosize
          minRows={3}
          {...form.getInputProps('description')}
        />
        <TextInput
          label={ORG_MESSAGES.FORM_CONTACT_EMAIL}
          maxLength={ORG_VALIDATION.EMAIL_MAX}
          {...form.getInputProps('contactEmail')}
        />
        <TextInput
          label={ORG_MESSAGES.FORM_CONTACT_PHONE}
          maxLength={ORG_VALIDATION.PHONE_MAX}
          {...form.getInputProps('contactPhone')}
        />
        <NumberInput
          label={ORG_MESSAGES.FORM_MEMBER_COUNT}
          min={ORG_VALIDATION.MEMBER_COUNT_MIN}
          max={ORG_VALIDATION.MEMBER_COUNT_MAX}
          {...form.getInputProps('memberCount')}
        />
        <TextInput
          label={ORG_MESSAGES.FORM_WEBSITE}
          maxLength={ORG_VALIDATION.WEBSITE_MAX}
          {...form.getInputProps('websiteUrl')}
        />
        <Button type="submit" loading={isPending}>{ORG_MESSAGES.SAVE_BUTTON}</Button>
      </Stack>
    </form>
  );
}
