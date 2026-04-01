import {
  Stack, TextInput, Textarea, NumberInput, Select, Button,
} from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { LogoUpload } from '@/components/LogoUpload';
import type { VenueProfileFormValues } from '../types/settings.types';
import {
  VENUE_PROFILE_MESSAGES,
  VENUE_PROFILE_VALIDATION,
  VENUE_TYPE_SELECT_OPTIONS,
} from '../constants/settings-defaults';

interface VenueProfileFormProps {
  form: UseFormReturnType<VenueProfileFormValues>;
  onSubmit: () => void;
  isPending: boolean;
  /** Selected logo file. */
  logoFile: File | null;
  /** Callback when logo file selection changes. Triggers upload immediately. */
  onLogoChange: (file: File | null) => void;
  /** Whether a logo upload is currently in progress. */
  isUploadingLogo?: boolean;
}

/** Venue profile edit form with all editable venue fields. */
export function VenueProfileForm({
  form, onSubmit, isPending, logoFile, onLogoChange, isUploadingLogo,
}: VenueProfileFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <LogoUpload value={logoFile} onChange={onLogoChange} isUploading={isUploadingLogo} />
        <TextInput
          label={VENUE_PROFILE_MESSAGES.FORM_NAME}
          maxLength={VENUE_PROFILE_VALIDATION.NAME_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_NAME}
          {...form.getInputProps('name')}
        />
        <Select
          label={VENUE_PROFILE_MESSAGES.FORM_TYPE}
          data={VENUE_TYPE_SELECT_OPTIONS}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_TYPE}
          {...form.getInputProps('type')}
        />
        <Textarea
          label={VENUE_PROFILE_MESSAGES.FORM_DESCRIPTION}
          placeholder={VENUE_PROFILE_MESSAGES.FORM_DESCRIPTION_PLACEHOLDER}
          maxLength={VENUE_PROFILE_VALIDATION.DESCRIPTION_MAX}
          autosize
          minRows={3}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_DESCRIPTION}
          {...form.getInputProps('description')}
        />
        <NumberInput
          label={VENUE_PROFILE_MESSAGES.FORM_CAPACITY}
          min={VENUE_PROFILE_VALIDATION.CAPACITY_MIN}
          max={VENUE_PROFILE_VALIDATION.CAPACITY_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_CAPACITY}
          {...form.getInputProps('capacity')}
        />
        <NumberInput
          label={VENUE_PROFILE_MESSAGES.FORM_BASE_PRICE}
          min={VENUE_PROFILE_VALIDATION.BASE_PRICE_MIN}
          max={VENUE_PROFILE_VALIDATION.BASE_PRICE_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_BASE_PRICE}
          {...form.getInputProps('basePriceCents')}
        />
        <TextInput
          label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_STREET}
          maxLength={VENUE_PROFILE_VALIDATION.ADDRESS_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_STREET}
          {...form.getInputProps('addressStreet')}
        />
        <TextInput
          label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_CITY}
          maxLength={VENUE_PROFILE_VALIDATION.ADDRESS_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_CITY}
          {...form.getInputProps('addressCity')}
        />
        <TextInput
          label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_STATE}
          maxLength={VENUE_PROFILE_VALIDATION.ADDRESS_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_STATE}
          {...form.getInputProps('addressState')}
        />
        <TextInput
          label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_ZIP}
          maxLength={VENUE_PROFILE_VALIDATION.ZIP_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_ADDRESS_ZIP}
          {...form.getInputProps('addressZip')}
        />
        <TextInput
          label={VENUE_PROFILE_MESSAGES.FORM_CONTACT_EMAIL}
          maxLength={VENUE_PROFILE_VALIDATION.EMAIL_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_CONTACT_EMAIL}
          {...form.getInputProps('contactEmail')}
        />
        <TextInput
          label={VENUE_PROFILE_MESSAGES.FORM_CONTACT_PHONE}
          maxLength={VENUE_PROFILE_VALIDATION.PHONE_MAX}
          aria-label={VENUE_PROFILE_MESSAGES.FORM_CONTACT_PHONE}
          {...form.getInputProps('contactPhone')}
        />
        <Button type="submit" loading={isPending} aria-label={VENUE_PROFILE_MESSAGES.SAVE_BUTTON}>
          {VENUE_PROFILE_MESSAGES.SAVE_BUTTON}
        </Button>
      </Stack>
    </form>
  );
}
