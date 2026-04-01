import type { OrganizationProfile } from '@/features/organization';

/** UI messages for the settings feature. */
export const SETTINGS_MESSAGES = {
  PAGE_TITLE: 'Settings',

  TAB_ACCOUNT: 'Account',
  TAB_ORGANIZATION: 'Organization',
  TAB_VENUE_PROFILE: 'Venue Profile',

  ACCOUNT_EMAIL: 'Email',
  ACCOUNT_ROLE: 'Role',
  ACCOUNT_MEMBER_SINCE: 'Member since',

  SIGN_OUT: 'Sign Out',
  SIGN_OUT_CONFIRM: 'Are you sure you want to sign out?',

  PROFILE_COMPLETENESS: 'Your profile is {percentage}% complete ({filled}/{total} fields).',
} as const;

/** Organization profile fields tracked for completeness. */
export const PROFILE_COMPLETENESS_FIELDS: readonly (keyof OrganizationProfile)[] = [
  'name',
  'description',
  'contactEmail',
  'contactPhone',
  'memberCount',
  'websiteUrl',
] as const;

/** UI messages for the venue profile form. */
export const VENUE_PROFILE_MESSAGES = {
  FORM_NAME: 'Venue Name',
  FORM_TYPE: 'Venue Type',
  FORM_DESCRIPTION: 'Description',
  FORM_DESCRIPTION_PLACEHOLDER: 'Describe your venue...',
  FORM_CAPACITY: 'Capacity',
  FORM_BASE_PRICE: 'Base Price (cents)',
  FORM_ADDRESS_STREET: 'Street Address',
  FORM_ADDRESS_CITY: 'City',
  FORM_ADDRESS_STATE: 'State',
  FORM_ADDRESS_ZIP: 'ZIP Code',
  FORM_CONTACT_EMAIL: 'Contact Email',
  FORM_CONTACT_PHONE: 'Phone Number',

  SAVE_BUTTON: 'Save Changes',
  SAVE_SUCCESS: 'Venue profile updated successfully',
  SAVE_ERROR: 'Failed to update venue profile',

  LOADING: 'Loading venue...',
  ERROR: 'Failed to load venue profile',
  NO_VENUE: 'No venue found for your account',
} as const;

/** Validation limits for venue profile form. */
export const VENUE_PROFILE_VALIDATION = {
  NAME_MIN: 2,
  NAME_MAX: 255,
  DESCRIPTION_MAX: 2000,
  CAPACITY_MIN: 1,
  CAPACITY_MAX: 100000,
  BASE_PRICE_MIN: 0,
  BASE_PRICE_MAX: 100000000,
  ADDRESS_MAX: 255,
  ZIP_MAX: 10,
  EMAIL_MAX: 255,
  PHONE_MAX: 50,
} as const;
