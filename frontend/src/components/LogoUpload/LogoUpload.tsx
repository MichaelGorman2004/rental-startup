import { useCallback, useEffect, useState } from 'react';
import {
  Button, FileButton, Group, Image, Loader, Stack, Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { LogoUploadProps } from './LogoUpload.types';
import {
  LOGO_ACCEPTED_MIME_TYPES,
  LOGO_ACCEPTED_MIME_SET,
  LOGO_MAX_FILE_SIZE_BYTES,
  LOGO_UPLOAD_MESSAGES,
  LOGO_ACCEPTED_EXTENSIONS,
} from './logo-upload.constants';

/** Validates that the selected file meets size and type constraints. */
function validateFile(file: File): string | null {
  if (file.size > LOGO_MAX_FILE_SIZE_BYTES) {
    return LOGO_UPLOAD_MESSAGES.FILE_TOO_LARGE;
  }
  if (!LOGO_ACCEPTED_MIME_SET.has(file.type)) {
    return LOGO_UPLOAD_MESSAGES.INVALID_TYPE;
  }
  return null;
}

/** Reusable logo upload component with image preview and upload state. */
export function LogoUpload({
  value, onChange, currentLogoUrl, disabled, isUploading,
}: LogoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return undefined;
    }
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const displayUrl = previewUrl ?? currentLogoUrl ?? null;

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;
    const error = validateFile(file);
    if (error) {
      notifications.show({ message: error, color: 'red' });
      return;
    }
    onChange(file);
  }, [onChange]);

  const handleRemove = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <Stack gap="xs">
      <Text fw={500} size="sm">{LOGO_UPLOAD_MESSAGES.LABEL}</Text>
      {displayUrl && (
        <Image
          src={displayUrl}
          alt={LOGO_UPLOAD_MESSAGES.PREVIEW_ALT}
          w={120}
          h={120}
          fit="contain"
          radius="md"
          aria-label={LOGO_UPLOAD_MESSAGES.ARIA_PREVIEW}
          style={isUploading ? { opacity: 0.5 } : undefined}
        />
      )}
      <Group gap="xs">
        {isUploading ? (
          <Group gap="xs">
            <Loader size="xs" aria-label={LOGO_UPLOAD_MESSAGES.UPLOADING_TEXT} />
            <Text size="xs">{LOGO_UPLOAD_MESSAGES.UPLOADING_TEXT}</Text>
          </Group>
        ) : (
          <>
            <FileButton
              onChange={handleFileSelect}
              accept={LOGO_ACCEPTED_MIME_TYPES.join(',')}
              disabled={disabled}
            >
              {(props) => (
                <Button
                  {...props}
                  variant="light"
                  size="xs"
                  aria-label={LOGO_UPLOAD_MESSAGES.ARIA_FILE_BUTTON}
                >
                  {value || currentLogoUrl
                    ? LOGO_UPLOAD_MESSAGES.CHANGE_TEXT
                    : LOGO_UPLOAD_MESSAGES.BUTTON_TEXT}
                </Button>
              )}
            </FileButton>
            {value && (
              <Button
                variant="subtle"
                size="xs"
                color="red"
                onClick={handleRemove}
                aria-label={LOGO_UPLOAD_MESSAGES.ARIA_REMOVE_BUTTON}
              >
                {LOGO_UPLOAD_MESSAGES.REMOVE_TEXT}
              </Button>
            )}
          </>
        )}
      </Group>
      <Text size="xs" c="dimmed">{LOGO_ACCEPTED_EXTENSIONS}</Text>
    </Stack>
  );
}
