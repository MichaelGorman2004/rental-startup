import { AUTH_CONSTANTS } from '../constants/auth.constants';

/**
 * Validates if an email address belongs to a .edu domain.
 * @param email The email address to validate.
 * @returns boolean indicating if the email is valid.
 */
export const isEduEmail = (email: string): boolean => {
  return AUTH_CONSTANTS.EDU_EMAIL_REGEX.test(email);
};

/**
 * Validates password strength (basic length check for now).
 * @param password The password to validate.
 * @returns boolean indicating if the password is valid.
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= AUTH_CONSTANTS.MIN_PASSWORD_LENGTH;
};
