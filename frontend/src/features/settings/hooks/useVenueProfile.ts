import { useCallback, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUploadVenueLogoMutation } from '@/lib/react-query';
import { useMyVenue } from '@/features/venue-admin/hooks/useMyVenue';
import { VenueType } from '@/features/venues/types/venue.types';
import { LOGO_UPLOAD_MESSAGES } from '@/components/LogoUpload/logo-upload.constants';
import type { VenueProfileFormValues } from '../types/settings.types';
import { createVenueProfileValidators } from '../constants/venue-profile.schemas';
import { useUpdateVenueProfile } from './useUpdateVenueProfile';

/** Initial empty form values for the venue profile form. */
const INITIAL_FORM_VALUES: VenueProfileFormValues = {
  name: '',
  type: '' as VenueType,
  description: '',
  capacity: undefined,
  basePriceCents: undefined,
  addressStreet: '',
  addressCity: '',
  addressState: '',
  addressZip: '',
  contactEmail: '',
  contactPhone: '',
};

/** Hook for venue profile form logic, data fetching, and mutation. */
export function useVenueProfile() {
  const { venue, isLoading, isError } = useMyVenue();
  const logoMutation = useUploadVenueLogoMutation();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const form = useForm<VenueProfileFormValues>({
    initialValues: INITIAL_FORM_VALUES,
    validate: createVenueProfileValidators(),
  });

  useEffect(() => {
    if (venue) {
      // NOTE: description, contactEmail, contactPhone are not yet in the Venue API
      // response type. The ?? '' fallback ensures these fields initialize to empty
      // string today and will automatically pick up values when the API adds them.
      const venueAny = venue as unknown as Record<string, unknown>;
      form.initialize({
        name: venue.name ?? '',
        type: venue.type,
        description: (venueAny['description'] as string | undefined) ?? '',
        capacity: venue.capacity || undefined,
        basePriceCents: venue.basePriceCents || undefined,
        addressStreet: venue.addressStreet ?? '',
        addressCity: venue.addressCity ?? '',
        addressState: venue.addressState ?? '',
        addressZip: venue.addressZip ?? '',
        contactEmail: (venueAny['contactEmail'] as string | undefined) ?? '',
        contactPhone: (venueAny['contactPhone'] as string | undefined) ?? '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venue]);

  const { handleSubmitValues, isPending } = useUpdateVenueProfile({ venueId: venue?.id });

  const handleSubmit = form.onSubmit(handleSubmitValues);

  const handleLogoChange = useCallback((file: File | null) => {
    setLogoFile(file);
    if (file && venue) {
      logoMutation.mutate(
        { venueId: venue.id, file },
        {
          onSuccess: () => {
            setLogoFile(null);
            notifications.show({ message: LOGO_UPLOAD_MESSAGES.UPLOAD_SUCCESS, color: 'green' });
          },
          onError: () => {
            notifications.show({ message: LOGO_UPLOAD_MESSAGES.UPLOAD_ERROR, color: 'red' });
          },
        },
      );
    }
  }, [logoMutation, venue]);

  return {
    venue,
    isLoading,
    isError,
    form,
    handleSubmit,
    isPending,
    logoFile,
    handleLogoChange,
    isUploadingLogo: logoMutation.isPending,
  };
}
