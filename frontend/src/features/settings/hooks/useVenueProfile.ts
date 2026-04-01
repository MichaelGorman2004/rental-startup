import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUpdateVenueMutation, useUploadVenueLogoMutation } from '@/lib/react-query';
import { useMyVenue } from '@/features/venue-admin/hooks/useMyVenue';
import { VenueType } from '@/features/venues/types/venue.types';
import { LOGO_UPLOAD_MESSAGES } from '@/components/LogoUpload/logo-upload.constants';
import type { VenueProfileFormValues } from '../types/settings.types';
import { VENUE_PROFILE_MESSAGES } from '../constants/settings-defaults';
import { createVenueProfileValidators } from '../constants/venue-profile.schemas';

/** Initial empty form values for the venue profile form. */
const INITIAL_FORM_VALUES: VenueProfileFormValues = {
  name: '',
  type: '',
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
  const mutation = useUpdateVenueMutation();
  const logoMutation = useUploadVenueLogoMutation();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const form = useForm<VenueProfileFormValues>({
    initialValues: INITIAL_FORM_VALUES,
    validate: createVenueProfileValidators(),
  });

  useEffect(() => {
    if (venue) {
      form.initialize({
        name: venue.name ?? '',
        type: venue.type ?? '',
        description: '',
        capacity: venue.capacity || undefined,
        basePriceCents: venue.basePriceCents || undefined,
        addressStreet: venue.addressStreet ?? '',
        addressCity: venue.addressCity ?? '',
        addressState: venue.addressState ?? '',
        addressZip: venue.addressZip ?? '',
        contactEmail: '',
        contactPhone: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venue]);

  const handleSubmit = form.onSubmit((values: VenueProfileFormValues) => {
    if (!venue) return;

    mutation.mutate(
      {
        id: venue.id,
        data: {
          name: values.name,
          type: (values.type as VenueType) || undefined,
          capacity: values.capacity,
          base_price_cents: values.basePriceCents,
          address_street: values.addressStreet || undefined,
          address_city: values.addressCity || undefined,
          address_state: values.addressState || undefined,
          address_zip: values.addressZip || undefined,
        },
      },
      {
        onSuccess: () => {
          notifications.show({ message: VENUE_PROFILE_MESSAGES.SAVE_SUCCESS, color: 'green' });
        },
        onError: () => {
          notifications.show({ message: VENUE_PROFILE_MESSAGES.SAVE_ERROR, color: 'red' });
        },
      },
    );
  });

  function handleLogoChange(file: File | null) {
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
  }

  return {
    venue,
    isLoading,
    isError,
    form,
    handleSubmit,
    isPending: mutation.isPending,
    logoFile,
    handleLogoChange,
    isUploadingLogo: logoMutation.isPending,
  };
}
