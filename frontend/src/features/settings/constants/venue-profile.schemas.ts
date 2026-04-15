import { z } from 'zod';
import { VENUE_PROFILE_VALIDATION } from './settings-defaults';

/** Validation error messages for the venue profile form. */
export const VENUE_PROFILE_VALIDATION_MESSAGES = {
  NAME_TOO_SHORT: `Name must be at least ${VENUE_PROFILE_VALIDATION.NAME_MIN} characters`,
  NAME_TOO_LONG: `Name must be at most ${VENUE_PROFILE_VALIDATION.NAME_MAX} characters`,
  TYPE_REQUIRED: 'Please select a venue type',
  CAPACITY_MIN: `Capacity must be at least ${VENUE_PROFILE_VALIDATION.CAPACITY_MIN}`,
  CAPACITY_MAX: `Capacity must be at most ${VENUE_PROFILE_VALIDATION.CAPACITY_MAX.toLocaleString()}`,
  BASE_PRICE_MIN: `Base price must be at least ${VENUE_PROFILE_VALIDATION.BASE_PRICE_MIN}`,
  BASE_PRICE_MAX: `Base price must be at most ${VENUE_PROFILE_VALIDATION.BASE_PRICE_MAX.toLocaleString()}`,
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number (e.g. +1234567890 or (123) 456-7890)',
  ZIP_TOO_LONG: `ZIP code must be at most ${VENUE_PROFILE_VALIDATION.ZIP_MAX} characters`,
  ADDRESS_TOO_LONG: `Address must be at most ${VENUE_PROFILE_VALIDATION.ADDRESS_MAX} characters`,
} as const;

/**
 * Phone number regex: matches common formats like
 * +1234567890, (123) 456-7890, 123-456-7890, 123.456.7890
 */
const PHONE_REGEX = /^\+?[\d\s\-().]{7,50}$/;

/** Zod schema for the venue profile form. */
export const venueProfileSchema = z.object({
  name: z
    .string()
    .min(VENUE_PROFILE_VALIDATION.NAME_MIN, VENUE_PROFILE_VALIDATION_MESSAGES.NAME_TOO_SHORT)
    .max(VENUE_PROFILE_VALIDATION.NAME_MAX, VENUE_PROFILE_VALIDATION_MESSAGES.NAME_TOO_LONG),
  type: z
    .string()
    .min(1, VENUE_PROFILE_VALIDATION_MESSAGES.TYPE_REQUIRED),
  description: z
    .string()
    .max(VENUE_PROFILE_VALIDATION.DESCRIPTION_MAX)
    .optional()
    .or(z.literal('')),
  capacity: z
    .number()
    .int()
    .min(VENUE_PROFILE_VALIDATION.CAPACITY_MIN, VENUE_PROFILE_VALIDATION_MESSAGES.CAPACITY_MIN)
    .max(VENUE_PROFILE_VALIDATION.CAPACITY_MAX, VENUE_PROFILE_VALIDATION_MESSAGES.CAPACITY_MAX)
    .optional(),
  basePriceCents: z
    .number()
    .int()
    .min(VENUE_PROFILE_VALIDATION.BASE_PRICE_MIN, VENUE_PROFILE_VALIDATION_MESSAGES.BASE_PRICE_MIN)
    .max(VENUE_PROFILE_VALIDATION.BASE_PRICE_MAX, VENUE_PROFILE_VALIDATION_MESSAGES.BASE_PRICE_MAX)
    .optional(),
  addressStreet: z
    .string()
    .max(VENUE_PROFILE_VALIDATION.ADDRESS_MAX, VENUE_PROFILE_VALIDATION_MESSAGES.ADDRESS_TOO_LONG)
    .optional()
    .or(z.literal('')),
  addressCity: z
    .string()
    .max(VENUE_PROFILE_VALIDATION.ADDRESS_MAX, VENUE_PROFILE_VALIDATION_MESSAGES.ADDRESS_TOO_LONG)
    .optional()
    .or(z.literal('')),
  addressState: z
    .string()
    .max(VENUE_PROFILE_VALIDATION.ADDRESS_MAX, VENUE_PROFILE_VALIDATION_MESSAGES.ADDRESS_TOO_LONG)
    .optional()
    .or(z.literal('')),
  addressZip: z
    .string()
    .max(VENUE_PROFILE_VALIDATION.ZIP_MAX, VENUE_PROFILE_VALIDATION_MESSAGES.ZIP_TOO_LONG)
    .optional()
    .or(z.literal('')),
  contactEmail: z
    .string()
    .email(VENUE_PROFILE_VALIDATION_MESSAGES.INVALID_EMAIL)
    .max(VENUE_PROFILE_VALIDATION.EMAIL_MAX)
    .optional()
    .or(z.literal('')),
  contactPhone: z
    .string()
    .regex(PHONE_REGEX, VENUE_PROFILE_VALIDATION_MESSAGES.INVALID_PHONE)
    .max(VENUE_PROFILE_VALIDATION.PHONE_MAX)
    .optional()
    .or(z.literal('')),
});

/**
 * Create mantine-form-compatible validate object from the Zod schema.
 * Each field validator returns an error string or null.
 */
export function createVenueProfileValidators(): Record<string, (value: unknown) => string | null> {
  return {
    name: (value: unknown) => {
      const result = venueProfileSchema.shape.name.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    type: (value: unknown) => {
      const result = venueProfileSchema.shape.type.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    capacity: (value: unknown) => {
      if (value === undefined || value === null || value === '') return null;
      const result = venueProfileSchema.shape.capacity.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    basePriceCents: (value: unknown) => {
      if (value === undefined || value === null || value === '') return null;
      const result = venueProfileSchema.shape.basePriceCents.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    contactEmail: (value: unknown) => {
      if (!value) return null;
      const result = venueProfileSchema.shape.contactEmail.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    contactPhone: (value: unknown) => {
      if (!value) return null;
      const result = venueProfileSchema.shape.contactPhone.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
  };
}
