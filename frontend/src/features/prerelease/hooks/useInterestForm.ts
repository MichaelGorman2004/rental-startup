import { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { submitInterest } from '@/lib/api/endpoints/prerelease';
import type {
  InterestFormValues,
  RespondentType,
} from '../types/prerelease.types';
import {
  EMAIL_REGEX,
  PRERELEASE_MESSAGES,
  PRERELEASE_VALIDATION,
} from '../constants/prerelease.constants';

/** Hook for prerelease interest form logic and submission. */
export function useInterestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InterestFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      respondentType: 'student_org' as RespondentType,
      orgOrVenueName: '',
      email: '',
      phone: '',
      personalNote: '',
    },
    validate: {
      firstName: (v) => (
        v.length < PRERELEASE_VALIDATION.NAME_MIN ? 'First name is required' : null
      ),
      lastName: (v) => (
        v.length < PRERELEASE_VALIDATION.NAME_MIN ? 'Last name is required' : null
      ),
      orgOrVenueName: (v) => (
        v.length < PRERELEASE_VALIDATION.ORG_NAME_MIN ? 'Organization/Venue name is required' : null
      ),
      email: (v) => (!EMAIL_REGEX.test(v) ? 'Invalid email address' : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      await submitInterest(values);
      setIsSuccess(true);
      notifications.show({
        message: PRERELEASE_MESSAGES.SUBMIT_SUCCESS,
        color: 'green',
      });
    } catch {
      notifications.show({
        message: PRERELEASE_MESSAGES.SUBMIT_ERROR,
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form, handleSubmit, isSubmitting, isSuccess,
  };
}
