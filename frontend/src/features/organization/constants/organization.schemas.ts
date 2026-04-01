import { z } from 'zod';
import { ORG_VALIDATION } from './organization-defaults';

/** Validation error messages for the organization profile form. */
export const ORG_VALIDATION_MESSAGES = {
  NAME_TOO_SHORT: `Name must be at least ${ORG_VALIDATION.NAME_MIN} characters`,
  NAME_TOO_LONG: `Name must be at most ${ORG_VALIDATION.NAME_MAX} characters`,
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number (e.g. +1234567890 or (123) 456-7890)',
  MEMBER_COUNT_MIN: `Member count must be at least ${ORG_VALIDATION.MEMBER_COUNT_MIN}`,
  MEMBER_COUNT_MAX: `Member count must be at most ${ORG_VALIDATION.MEMBER_COUNT_MAX.toLocaleString()}`,
  INVALID_WEBSITE: 'Please enter a valid URL (e.g. https://example.com)',
  WEBSITE_TOO_LONG: `Website URL must be at most ${ORG_VALIDATION.WEBSITE_MAX} characters`,
} as const;

/**
 * Phone number regex: matches common formats like
 * +1234567890, (123) 456-7890, 123-456-7890, 123.456.7890
 */
const PHONE_REGEX = /^\+?[\d\s\-().]{7,50}$/;

/**
 * URL regex: matches http(s) URLs.
 * Kept simple — Zod's z.string().url() is stricter but this covers common cases.
 */
const URL_REGEX = /^https?:\/\/.+\..+/;

/** Zod schema for the organization profile form. */
export const orgProfileSchema = z.object({
  name: z
    .string()
    .min(ORG_VALIDATION.NAME_MIN, ORG_VALIDATION_MESSAGES.NAME_TOO_SHORT)
    .max(ORG_VALIDATION.NAME_MAX, ORG_VALIDATION_MESSAGES.NAME_TOO_LONG),
  description: z
    .string()
    .max(ORG_VALIDATION.DESCRIPTION_MAX)
    .optional()
    .or(z.literal('')),
  contactEmail: z
    .string()
    .email(ORG_VALIDATION_MESSAGES.INVALID_EMAIL)
    .max(ORG_VALIDATION.EMAIL_MAX)
    .optional()
    .or(z.literal('')),
  contactPhone: z
    .string()
    .regex(PHONE_REGEX, ORG_VALIDATION_MESSAGES.INVALID_PHONE)
    .max(ORG_VALIDATION.PHONE_MAX)
    .optional()
    .or(z.literal('')),
  memberCount: z
    .number()
    .int()
    .min(ORG_VALIDATION.MEMBER_COUNT_MIN, ORG_VALIDATION_MESSAGES.MEMBER_COUNT_MIN)
    .max(ORG_VALIDATION.MEMBER_COUNT_MAX, ORG_VALIDATION_MESSAGES.MEMBER_COUNT_MAX)
    .optional(),
  websiteUrl: z
    .string()
    .regex(URL_REGEX, ORG_VALIDATION_MESSAGES.INVALID_WEBSITE)
    .max(ORG_VALIDATION.WEBSITE_MAX, ORG_VALIDATION_MESSAGES.WEBSITE_TOO_LONG)
    .optional()
    .or(z.literal('')),
});

export type OrgProfileSchemaValues = z.infer<typeof orgProfileSchema>;

/**
 * Create mantine-form-compatible validate object from the Zod schema.
 * Each field validator returns an error string or null.
 */
export function createOrgProfileValidators(): Record<string, (value: unknown) => string | null> {
  return {
    name: (value: unknown) => {
      const result = orgProfileSchema.shape.name.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    contactEmail: (value: unknown) => {
      if (!value) return null;
      const result = orgProfileSchema.shape.contactEmail.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    contactPhone: (value: unknown) => {
      if (!value) return null;
      const result = orgProfileSchema.shape.contactPhone.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    memberCount: (value: unknown) => {
      if (value === undefined || value === null || value === '') return null;
      const result = orgProfileSchema.shape.memberCount.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
    websiteUrl: (value: unknown) => {
      if (!value) return null;
      const result = orgProfileSchema.shape.websiteUrl.safeParse(value);
      return result.success ? null : result.error.issues[0]?.message ?? null;
    },
  };
}
