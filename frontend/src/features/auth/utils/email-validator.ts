import { AUTH_CONSTANTS } from '../constants';

/**
 * Validates if an email address belongs to a .edu domain.
 * @param email The email address to validate.
 * @returns boolean indicating if the email is valid.
 */
export const isEduEmail = (email: string): boolean => AUTH_CONSTANTS.EDU_EMAIL_REGEX.test(email);

const { MIN_PASSWORD_LENGTH } = AUTH_CONSTANTS;

/**
 * Validates password strength (basic length check for now).
 * @param password The password to validate.
 * @returns boolean indicating if the password is valid.
 */
export function isValidPassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}
