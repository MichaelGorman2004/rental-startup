import { TextInput, Alert, Stack } from '@mantine/core';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

interface EmailInputProps {
  register: UseFormRegisterReturn;
  error?: string;
  showEduHint?: boolean;
}

export function EmailInput({ register, error, showEduHint }: EmailInputProps) {
  return (
    <Stack gap="xs">
      <TextInput {...register} label="Email" placeholder="org@university.edu" error={error} required />
      {showEduHint && (
      <Alert color="blue" variant="light" p="xs">
        {AUTH_CONSTANTS.ERRORS.EDU_EMAIL_REQUIRED}
      </Alert>
      )}
    </Stack>
  );
}
