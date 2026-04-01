import {
  Stack, TextInput, Textarea, NumberInput, Button, Tooltip,
} from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { LogoUpload } from '@/components/LogoUpload';
import type { OrgProfileFormValues, OrganizationProfile } from '../types/organization.types';
import { ORG_MESSAGES, ORG_VALIDATION } from '../constants/organization-defaults';

interface OrgProfileFormProps {
  form: UseFormReturnType<OrgProfileFormValues>;
  onSubmit: () => void;
  isPending: boolean;
  organization?: OrganizationProfile;
  /** Selected logo file. */
  logoFile: File | null;
  /** Callback when logo file selection changes. Triggers upload immediately. */
  onLogoChange: (file: File | null) => void;
  /** Whether a logo upload is currently in progress. */
  isUploadingLogo?: boolean;
}

/** Organization profile edit form. */
export function OrgProfileForm({
  form, onSubmit, isPending, organization, logoFile, onLogoChange, isUploadingLogo,
}: OrgProfileFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <LogoUpload
          value={logoFile}
          onChange={onLogoChange}
          currentLogoUrl={organization?.logoUrl}
          isUploading={isUploadingLogo}
        />
        <Tooltip label={ORG_MESSAGES.LOCKED_FIELD_TOOLTIP} position="top-start" withArrow>
          <TextInput
            label={ORG_MESSAGES.FORM_TYPE}
            value={organization?.type ?? ''}
            disabled
            aria-label={ORG_MESSAGES.FORM_TYPE}
          />
        </Tooltip>
        <Tooltip label={ORG_MESSAGES.LOCKED_FIELD_TOOLTIP} position="top-start" withArrow>
          <TextInput
            label={ORG_MESSAGES.FORM_UNIVERSITY}
            value={organization?.university ?? ''}
            disabled
            aria-label={ORG_MESSAGES.FORM_UNIVERSITY}
          />
        </Tooltip>
        <TextInput
          label={ORG_MESSAGES.FORM_NAME}
          maxLength={ORG_VALIDATION.NAME_MAX}
          aria-label={ORG_MESSAGES.FORM_NAME}
          {...form.getInputProps('name')}
        />
        <Textarea
          label={ORG_MESSAGES.FORM_DESCRIPTION}
          placeholder={ORG_MESSAGES.FORM_DESCRIPTION_PLACEHOLDER}
          maxLength={ORG_VALIDATION.DESCRIPTION_MAX}
          autosize
          minRows={3}
          aria-label={ORG_MESSAGES.FORM_DESCRIPTION}
          {...form.getInputProps('description')}
        />
        <TextInput
          label={ORG_MESSAGES.FORM_CONTACT_EMAIL}
          maxLength={ORG_VALIDATION.EMAIL_MAX}
          aria-label={ORG_MESSAGES.FORM_CONTACT_EMAIL}
          {...form.getInputProps('contactEmail')}
        />
        <TextInput
          label={ORG_MESSAGES.FORM_CONTACT_PHONE}
          maxLength={ORG_VALIDATION.PHONE_MAX}
          aria-label={ORG_MESSAGES.FORM_CONTACT_PHONE}
          {...form.getInputProps('contactPhone')}
        />
        <NumberInput
          label={ORG_MESSAGES.FORM_MEMBER_COUNT}
          min={ORG_VALIDATION.MEMBER_COUNT_MIN}
          max={ORG_VALIDATION.MEMBER_COUNT_MAX}
          aria-label={ORG_MESSAGES.FORM_MEMBER_COUNT}
          {...form.getInputProps('memberCount')}
        />
        <TextInput
          label={ORG_MESSAGES.FORM_WEBSITE}
          maxLength={ORG_VALIDATION.WEBSITE_MAX}
          aria-label={ORG_MESSAGES.FORM_WEBSITE}
          {...form.getInputProps('websiteUrl')}
        />
        <Button type="submit" loading={isPending} aria-label={ORG_MESSAGES.SAVE_BUTTON}>
          {ORG_MESSAGES.SAVE_BUTTON}
        </Button>
      </Stack>
    </form>
  );
}
