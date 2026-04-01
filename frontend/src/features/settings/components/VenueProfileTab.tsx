import { Text } from '@mantine/core';
import { VENUE_PROFILE_MESSAGES } from '../constants/settings-defaults';
import { useVenueProfile } from '../hooks/useVenueProfile';
import { VenueProfileSkeleton } from './VenueProfileSkeleton';
import { VenueProfileForm } from './VenueProfileForm';

/** Venue Profile tab in settings, embedding the venue profile form. */
export function VenueProfileTab() {
  const {
    venue, isLoading, isError, form, handleSubmit, isPending,
    logoFile, handleLogoChange, isUploadingLogo,
  } = useVenueProfile();

  if (isLoading) return <VenueProfileSkeleton />;
  if (isError) return <Text c="red">{VENUE_PROFILE_MESSAGES.ERROR}</Text>;
  if (!venue) return <Text c="dimmed">{VENUE_PROFILE_MESSAGES.NO_VENUE}</Text>;

  return (
    <VenueProfileForm
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      logoFile={logoFile}
      onLogoChange={handleLogoChange}
      isUploadingLogo={isUploadingLogo}
    />
  );
}
