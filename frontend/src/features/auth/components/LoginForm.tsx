import {
  Button, PasswordInput, Stack, Alert,
} from '@mantine/core';
import { useLoginForm } from '../hooks';
import { EmailInput } from './EmailInput';

export function LoginForm() {
  const {
    register, onSubmit, errors, isSubmitting, serverError,
  } = useLoginForm();

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        {serverError && <Alert color="red">{serverError}</Alert>}
        <EmailInput register={register('email')} error={errors.email?.message} />
        <PasswordInput label="Password" {...register('password')} error={errors.password?.message} required />
        <Button type="submit" loading={isSubmitting} fullWidth>Sign In</Button>
        <div id="clerk-captcha" />
      </Stack>
    </form>
  );
}
