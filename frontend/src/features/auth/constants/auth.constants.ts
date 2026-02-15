export const AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  EDU_EMAIL_REGEX: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.edu$/,
  ROLES: {
    STUDENT_ORG: 'student_org',
    VENUE_ADMIN: 'venue_admin',
  },
  ERRORS: {
    INVALID_EMAIL: 'Please enter a valid email address.',
    EDU_EMAIL_REQUIRED: 'Student organizations must use a .edu email address.',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
    REQUIRED_FIELD: 'This field is required.',
  },
} as const;
