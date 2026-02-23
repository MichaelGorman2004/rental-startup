import type { BookingFormValues } from '../types/booking.types';

/** Minimum advance booking notice in days. */
export const MIN_NOTICE_DAYS = 7;

/** Maximum advance booking window in days. */
export const MAX_ADVANCE_DAYS = 90;

/** Minimum group size for bookings. */
export const MIN_GROUP_SIZE = 10;

/** Minimum event name length. */
export const MIN_EVENT_NAME_LENGTH = 3;

/** Maximum event name length. */
export const MAX_EVENT_NAME_LENGTH = 100;

/** Maximum special requests text length. */
export const MAX_SPECIAL_REQUESTS_LENGTH = 500;

/** Number of steps in the booking wizard. */
export const TOTAL_STEPS = 3;

/** Mock API submission delay in milliseconds. */
export const MOCK_SUBMISSION_DELAY_MS = 1500;

/** Per-guest additional cost in cents ($5/guest). */
export const PER_GUEST_COST_CENTS = 500;

/** Booking cache stale time (2 minutes — bookings update frequently). */
export const BOOKING_STALE_TIME_MS = 2 * 60 * 1000;

/** Query key hierarchy for booking-related React Query caches. */
export const BOOKING_QUERY_KEYS = {
  ALL: ['bookings'] as const,
  LISTS: ['bookings', 'list'] as const,
  list: (filters: Record<string, unknown>) => ['bookings', 'list', filters] as const,
  DETAILS: ['bookings', 'detail'] as const,
  detail: (id: string) => ['bookings', 'detail', id] as const,
  CREATE: ['bookings', 'create'] as const,
};

/** Stepper step labels. */
export const BOOKING_STEP_LABELS = [
  'Event Details',
  'Additional Info',
  'Review & Submit',
] as const;

/** Stepper step descriptions. */
export const BOOKING_STEP_DESCRIPTIONS = [
  'Basic event information',
  'Special requests and budget',
  'Confirm your booking',
] as const;

/** Budget range dropdown options (value in cents, label for display). */
export const BUDGET_OPTIONS = [
  { value: '25000', label: 'Under $250' },
  { value: '50000', label: '$250 - $500' },
  { value: '100000', label: '$500 - $1,000' },
  { value: '250000', label: '$1,000 - $2,500' },
  { value: '500000', label: '$2,500+' },
] as const;

/** Fields validated at each step for progressive validation. */
export const STEP_FIELDS: Record<number, string[]> = {
  0: ['eventName', 'eventDate', 'eventTime', 'guestCount'],
  1: [],
  2: [],
};

/** Default form field values. */
export const BOOKING_FORM_DEFAULTS: BookingFormValues = {
  eventName: '',
  eventDate: null,
  eventTime: '',
  guestCount: undefined,
  specialRequests: '',
  budgetCents: null,
};

/** UI messages for the booking form feature. */
export const BOOKING_MESSAGES = {
  PAGE_TITLE: 'Request Booking',
  PAGE_SUBTITLE: 'Fill out the details for your event',
  VENUE_SUMMARY_TITLE: 'Venue Details',
  NEXT: 'Continue',
  BACK: 'Back',
  SUBMIT: 'Submit Request',
  SUBMITTING: 'Submitting...',

  EVENT_NAME_LABEL: 'Event Name',
  EVENT_NAME_PLACEHOLDER: 'e.g. Spring Formal, Fundraiser Gala',
  EVENT_NAME_DESCRIPTION: 'A descriptive name for your event',
  EVENT_DATE_LABEL: 'Event Date',
  EVENT_DATE_DESCRIPTION: `Must be at least ${MIN_NOTICE_DAYS} days from today`,
  EVENT_TIME_LABEL: 'Event Start Time',
  EVENT_TIME_DESCRIPTION: 'When your event begins',
  GUEST_COUNT_LABEL: 'Expected Guests',
  SPECIAL_REQUESTS_LABEL: 'Special Requests',
  SPECIAL_REQUESTS_PLACEHOLDER: 'Dietary requirements, AV needs, decoration preferences...',
  SPECIAL_REQUESTS_DESCRIPTION: 'Optional — anything the venue should know',
  BUDGET_LABEL: 'Budget Range',
  BUDGET_PLACEHOLDER: 'Select your budget range',
  BUDGET_DESCRIPTION: 'Optional — helps the venue prepare a quote',

  REVIEW_TITLE: 'Review Your Booking',
  REVIEW_SUBTITLE: 'Please confirm the details are correct',
  EVENT_SECTION: 'Event Details',
  VENUE_SECTION: 'Venue Information',
  COST_SECTION: 'Estimated Cost',
  COST_NOTE: 'Final pricing may vary based on your requirements',

  SUCCESS_TITLE: 'Booking Request Submitted',
  SUCCESS_SUBTITLE: 'The venue will review your request and respond within 48 hours.',
  SUCCESS_REFERENCE: 'Reference',
  VIEW_BOOKINGS: 'View My Bookings',
  BROWSE_VENUES: 'Browse More Venues',

  VENUE_NOT_FOUND: 'Venue not found',
  VENUE_NOT_FOUND_SUBTITLE: 'The venue you are trying to book may have been removed.',
  BACK_TO_VENUES: 'Back to Venues',
  ERROR_LOADING: 'Failed to load venue',

  VALIDATION_EVENT_NAME_MIN: `Must be at least ${MIN_EVENT_NAME_LENGTH} characters`,
  VALIDATION_EVENT_NAME_MAX: `Must be at most ${MAX_EVENT_NAME_LENGTH} characters`,
  VALIDATION_DATE_REQUIRED: 'Event date is required',
  VALIDATION_TIME_REQUIRED: 'Event time is required',
  VALIDATION_GUEST_COUNT_REQUIRED: 'Guest count is required',
  VALIDATION_GUEST_COUNT_MIN: `Minimum ${MIN_GROUP_SIZE} guests`,
} as const;
