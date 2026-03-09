/** Page content and messages. */
export const PRERELEASE_MESSAGES = {
  PAGE_TITLE: 'Join VenueLink',
  PAGE_SUBTITLE: 'Be the first to know when we launch',

  DESCRIPTION_TITLE: 'What is VenueLink?',
  DESCRIPTION_BODY: `VenueLink connects college student organizations with local rental venues
for events, formals, and gatherings. Whether you're planning a fraternity formal,
a club fundraiser, or an organization social, we make finding and booking the perfect
venue simple and stress-free.`,

  BENEFITS_ORGS:
    'For Student Organizations: Easily discover, compare, and book venues that fit your event needs and budget.',
  BENEFITS_VENUES:
    'For Rental Venues: Reach motivated student groups actively looking for event spaces.',

  LAUNCH_INFO: 'Launching at The Ohio State University',
  CONTACT_INFO: 'Questions? Email us at',
  CONTACT_EMAIL: 'contact@venuelink.com',

  FORM_TITLE: 'Express Your Interest',
  FORM_FIRST_NAME: 'First Name',
  FORM_LAST_NAME: 'Last Name',
  FORM_RESPONDENT_TYPE: 'I represent a...',
  FORM_ORG_LABEL_STUDENT: 'Organization Name',
  FORM_ORG_LABEL_VENUE: 'Venue Name',
  FORM_EMAIL: 'Best Email to Contact',
  FORM_PHONE: 'Phone Number (optional)',
  FORM_NOTE: 'Questions, Comments, or Concerns (optional)',
  FORM_NOTE_PLACEHOLDER:
    'Tell us about your organization or venue, or ask us anything...',

  SUBMIT_BUTTON: 'Submit Interest',
  SUBMIT_SUCCESS: "Thank you for your interest! We'll be in touch soon.",
  SUBMIT_ERROR: 'Failed to submit. Please try again.',

  TYPE_STUDENT_ORG: 'Student Organization',
  TYPE_VENUE: 'Rental Venue',
} as const;

/** Email validation regex. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validation limits. */
export const PRERELEASE_VALIDATION = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  ORG_NAME_MIN: 2,
  ORG_NAME_MAX: 255,
  EMAIL_MAX: 255,
  PHONE_MAX: 50,
  NOTE_MAX: 2000,
} as const;
