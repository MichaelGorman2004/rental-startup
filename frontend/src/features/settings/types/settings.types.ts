import type { VenueType } from '@venuelink/shared';

/** Available settings tabs. */
export enum SettingsTab {
  Account = 'account',
  Organization = 'organization',
  VenueProfile = 'venue-profile',
}

/** Form values for the venue profile edit form. */
export interface VenueProfileFormValues {
  name: string;
  type: VenueType;
  description: string;
  capacity: number | undefined;
  basePriceCents: number | undefined;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  contactEmail: string;
  contactPhone: string;
}
