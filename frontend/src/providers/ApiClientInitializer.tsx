import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { initializeApiClient } from '../lib/api/client';

/**
 * Attaches auth/retry/error interceptors to the Axios client once.
 * Must be rendered inside ClerkProvider so useAuth() is available.
 */
export function ApiClientInitializer({ children }: { children: React.ReactNode }) {
  const { getToken, signOut } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initializeApiClient(
      () => getToken(),
      () => { signOut(); },
    );
  }, [getToken, signOut]);

  return children;
}
