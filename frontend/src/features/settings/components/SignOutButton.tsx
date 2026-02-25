import { Button } from '@mantine/core';
import { SETTINGS_MESSAGES } from '../constants/settings-defaults';

interface SignOutButtonProps {
  onSignOut: () => void;
}

/** Sign out button with cache clearing. */
export function SignOutButton({ onSignOut }: SignOutButtonProps) {
  return (
    <Button color="red" variant="light" onClick={onSignOut}>
      {SETTINGS_MESSAGES.SIGN_OUT}
    </Button>
  );
}
