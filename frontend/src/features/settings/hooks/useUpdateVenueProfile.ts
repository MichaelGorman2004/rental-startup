import { notifications } from '@mantine/notifications';
import { useUpdateVenueMutation } from '@/lib/react-query';
import { VenueType } from '@/features/venues/types/venue.types';
import type { VenueProfileFormValues } from '../types/settings.types';
import { VENUE_PROFILE_MESSAGES } from '../constants/settings-defaults';

interface UseUpdateVenueProfileOptions {
  venueId: string | undefined;
}

/** Encapsulates the venue profile update mutation logic. */
export function useUpdateVenueProfile({ venueId }: UseUpdateVenueProfileOptions) {
  const mutation = useUpdateVenueMutation();

  function handleSubmitValues(values: VenueProfileFormValues) {
    if (!venueId) return;

    mutation.mutate(
      {
        id: venueId,
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
  }

  return {
    handleSubmitValues,
    isPending: mutation.isPending,
  };
}
