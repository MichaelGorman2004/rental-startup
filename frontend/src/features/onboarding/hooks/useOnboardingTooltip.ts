import { useState, useCallback } from 'react';

import { useUser } from '@clerk/clerk-react';

interface UseOnboardingTooltipParams {
  storageKey: string;
  role: string;
}

interface UseOnboardingTooltipReturn {
  visible: boolean;
  dismiss: () => void;
}

/** Hook to manage onboarding tooltip visibility based on role and localStorage. */
export function useOnboardingTooltip({
  storageKey,
  role,
}: UseOnboardingTooltipParams): UseOnboardingTooltipReturn {
  const { user } = useUser();
  const userRole = (user?.publicMetadata as Record<string, string> | undefined)?.['role'];

  const [visible, setVisible] = useState(() => {
    if (userRole !== role) return false;
    return localStorage.getItem(storageKey) !== 'true';
  });

  const dismiss = useCallback(() => {
    localStorage.setItem(storageKey, 'true');
    setVisible(false);
  }, [storageKey]);

  return { visible, dismiss };
}
