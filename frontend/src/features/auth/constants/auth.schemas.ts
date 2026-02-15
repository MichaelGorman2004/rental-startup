import { z } from 'zod';
import { AUTH_CONSTANTS } from './auth.constants';

export const loginSchema = z.object({
  email: z.string().email(AUTH_CONSTANTS.ERRORS.INVALID_EMAIL),
  password: z
    .string()
    .min(AUTH_CONSTANTS.MIN_PASSWORD_LENGTH, AUTH_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(1, AUTH_CONSTANTS.ERRORS.REQUIRED_FIELD),
    lastName: z.string().min(1, AUTH_CONSTANTS.ERRORS.REQUIRED_FIELD),
    orgName: z.string().min(1, AUTH_CONSTANTS.ERRORS.REQUIRED_FIELD),
    email: z.string().email(AUTH_CONSTANTS.ERRORS.INVALID_EMAIL),
    password: z
      .string()
      .min(AUTH_CONSTANTS.MIN_PASSWORD_LENGTH, AUTH_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT),
    role: z.enum([AUTH_CONSTANTS.ROLES.STUDENT_ORG, AUTH_CONSTANTS.ROLES.VENUE_ADMIN]),
    terms: z.boolean().refine((val) => val === true, {
      message: AUTH_CONSTANTS.ERRORS.REQUIRED_FIELD,
    }),
  }).refine((data) => {
    if (data.role === AUTH_CONSTANTS.ROLES.STUDENT_ORG) {
      return AUTH_CONSTANTS.EDU_EMAIL_REGEX.test(data.email);
    }
    return true;
  }, {
    message: AUTH_CONSTANTS.ERRORS.EDU_EMAIL_REQUIRED,
    path: ['email'],
  });
