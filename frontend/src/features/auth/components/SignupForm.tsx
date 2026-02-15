import {
  Button, Checkbox, PasswordInput, TextInput, Stack, Alert, Group,
} from '@mantine/core';
import { useSignupForm } from '../hooks/useSignupForm';
import { RoleSelector } from './RoleSelector';
import { EmailInput } from './EmailInput';
import { AUTH_CONSTANTS } from '../constants/auth.constants';
import { UserRole } from '../types/auth.types';

export function SignupForm() {
  const {
    register, onSubmit, watch, setValue, errors, isSubmitting, serverError,
  } = useSignupForm();
  const isStudent = watch('role') === AUTH_CONSTANTS.ROLES.STUDENT_ORG;

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="sm">
        {serverError && <Alert color="red">{serverError}</Alert>}
        <RoleSelector value={watch('role')} onChange={(v) => setValue('role', v as UserRole)} />
        <Group grow>
          <TextInput label="First Name" {...register('firstName')} error={errors.firstName?.message} />
          <TextInput label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
        </Group>
        <TextInput label={isStudent ? 'Organization Name' : 'Venue Name'} {...register('orgName')} error={errors.orgName?.message} />
        <EmailInput register={register('email')} error={errors.email?.message} showEduHint={isStudent} />
        <PasswordInput label="Password" {...register('password')} error={errors.password?.message} />
        <Checkbox label="I agree to terms" {...register('terms')} error={errors.terms?.message} />
        <Button type="submit" loading={isSubmitting} fullWidth>Create Account</Button>
      </Stack>
    </form>
  );
}
