import { SegmentedControl, Text } from '@mantine/core';
import { AUTH_CONSTANTS } from '../constants/auth.constants';
import { UserRole } from '../types/auth.types';

interface RoleSelectorProps {
  value: UserRole;
  onChange: (value: UserRole) => void;
}

export const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  return (
    <>
      <Text size="sm" fw={500} mb={3}>
        I am a...
      </Text>
      <SegmentedControl
        value={value}
        onChange={(val) => onChange(val as UserRole)}
        data={[
          { label: 'Student Organization', value: AUTH_CONSTANTS.ROLES.STUDENT_ORG },
          { label: 'Venue Manager', value: AUTH_CONSTANTS.ROLES.VENUE_ADMIN },
        ]}
        fullWidth
        mb="md"
      />
    </>
  );
};
