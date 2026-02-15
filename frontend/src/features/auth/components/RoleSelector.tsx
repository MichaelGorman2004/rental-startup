import { SegmentedControl } from '@mantine/core';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <SegmentedControl
      fullWidth
      value={value}
      onChange={onChange}
      data={[
        { label: 'Student Organization', value: AUTH_CONSTANTS.ROLES.STUDENT_ORG },
        { label: 'Venue Partner', value: AUTH_CONSTANTS.ROLES.VENUE_ADMIN },
      ]}
      mb="md"
    />
  );
}
