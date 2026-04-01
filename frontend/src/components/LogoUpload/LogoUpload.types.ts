/** Props for the LogoUpload component. */
export interface LogoUploadProps {
  /** Currently selected file (controlled). */
  value: File | null;
  /** Callback when a file is selected or cleared. */
  onChange: (file: File | null) => void;
  /** URL of the existing logo to display when no file is selected. */
  currentLogoUrl?: string;
  /** Whether the upload control is disabled. */
  disabled?: boolean;
  /** Whether a logo upload is currently in progress. */
  isUploading?: boolean;
}
