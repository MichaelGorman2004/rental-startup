import { useSignUp } from '@clerk/clerk-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types/auth.types';

import { AUTH_CONSTANTS } from '../constants/auth.constants';
import { isEduEmail } from '../utils/email-validator';

export const useSignup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string, role: UserRole) => {
    if (!isLoaded) return;
    setError(null);

    // Validate .edu email for Student Orgs
    if (role === AUTH_CONSTANTS.ROLES.STUDENT_ORG && !isEduEmail(email)) {
      setError(AUTH_CONSTANTS.ERRORS.EDU_EMAIL_REQUIRED);
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: { org_role: role }, // Use publicMetadata in production if possible
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/');
      } else {
         // Handle email verification flow if needed
         // For now, assuming complete or next step
         if (result.status === 'missing_requirements') {
             // Likely email code verification needed
             // This is a simplified flow.
             console.log("Signup needs verification");
         }
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Signup failed');
    }
  };

  return { handleSignup, error, isLoading: !isLoaded };
};
