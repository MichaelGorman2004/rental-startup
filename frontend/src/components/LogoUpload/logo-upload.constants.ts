/** Accepted MIME types for logo uploads (array for FileButton accept prop). */
export const LOGO_ACCEPTED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
] as const;

/** Set for O(1) MIME type validation lookups. */
export const LOGO_ACCEPTED_MIME_SET: ReadonlySet<string> = new Set(LOGO_ACCEPTED_MIME_TYPES);

/** Human-readable accepted file extensions for display. */
export const LOGO_ACCEPTED_EXTENSIONS = '.png, .jpg, .webp';

/** Maximum file size in bytes (5 MB). */
export const LOGO_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

/** UI messages for the logo upload component. */
export const LOGO_UPLOAD_MESSAGES = {
  LABEL: 'Logo',
  BUTTON_TEXT: 'Choose image',
  CHANGE_TEXT: 'Change image',
  REMOVE_TEXT: 'Remove',
  UPLOADING_TEXT: 'Uploading...',
  PREVIEW_ALT: 'Logo preview',
  FILE_TOO_LARGE: 'File must be smaller than 5 MB',
  INVALID_TYPE: `Accepted formats: ${LOGO_ACCEPTED_EXTENSIONS}`,
  UPLOAD_SUCCESS: 'Logo uploaded successfully',
  UPLOAD_ERROR: 'Failed to upload logo',
  ARIA_FILE_BUTTON: 'Select logo image file',
  ARIA_REMOVE_BUTTON: 'Remove selected logo image',
  ARIA_PREVIEW: 'Selected logo preview',
} as const;
