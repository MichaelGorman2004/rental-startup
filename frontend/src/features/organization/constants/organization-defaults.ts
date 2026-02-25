/** UI messages for the organization profile feature. */
export const ORG_MESSAGES = {
  PAGE_TITLE: 'Organization Profile',
  PAGE_SUBTITLE: 'Manage your organization details',

  FORM_NAME: 'Organization Name',
  FORM_DESCRIPTION: 'Description',
  FORM_DESCRIPTION_PLACEHOLDER: 'Tell venues about your organization...',
  FORM_CONTACT_EMAIL: 'Contact Email',
  FORM_CONTACT_PHONE: 'Phone Number',
  FORM_MEMBER_COUNT: 'Member Count',
  FORM_WEBSITE: 'Website URL',

  SAVE_BUTTON: 'Save Changes',
  SAVE_SUCCESS: 'Organization profile updated successfully',
  SAVE_ERROR: 'Failed to update organization profile',

  LOADING: 'Loading organization...',
  ERROR: 'Failed to load organization',
  NO_ORG: 'No organization found',
} as const;

/** Basic email format check. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validation limits for organization profile form. */
export const ORG_VALIDATION = {
  NAME_MIN: 2,
  NAME_MAX: 255,
  DESCRIPTION_MAX: 2000,
  EMAIL_MAX: 255,
  PHONE_MAX: 50,
  WEBSITE_MAX: 500,
  MEMBER_COUNT_MIN: 1,
  MEMBER_COUNT_MAX: 100000,
} as const;
