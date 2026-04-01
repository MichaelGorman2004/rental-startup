/** localStorage keys for onboarding dismissal tracking. */
export const ONBOARDING_STORAGE_KEYS = {
  ORG_DISMISSED: 'venuelink_onboarding_org_dismissed',
  VENUE_DISMISSED: 'venuelink_onboarding_venue_dismissed',
} as const;

/** Onboarding tooltip messages by role. */
export const ONBOARDING_MESSAGES = {
  STUDENT_ORG: 'Complete your organization profile to get the most out of VenueLink.',
  VENUE_ADMIN: 'Set up your venue details so organizations can find and book your space.',
  DISMISS_BUTTON: 'Got it',
} as const;

/** User roles that trigger onboarding tooltips. */
export const ONBOARDING_ROLES = {
  STUDENT_ORG: 'student_org',
  VENUE_ADMIN: 'venue_admin',
} as const;
