import {
  Container, Stack, Title, Tabs,
} from '@mantine/core';
import { useUser } from '@clerk/clerk-react';
import { SETTINGS_MESSAGES } from '../constants/settings-defaults';
import { SettingsTab } from '../types/settings.types';
import { useSettingsPage } from '../hooks/useSettingsPage';
import { AccountTab } from './AccountTab';
import { OrganizationTab } from './OrganizationTab';
import { VenueProfileTab } from './VenueProfileTab';
import { SignOutButton } from './SignOutButton';

/** Settings page with role-based tabs. */
export function SettingsPage() {
  const { activeTab, setActiveTab, handleSignOut } = useSettingsPage();
  const { user } = useUser();
  const role = (user?.publicMetadata as Record<string, string> | undefined)?.['role'];
  const isStudentOrg = role === 'student_org';
  const isVenueAdmin = role === 'venue_admin';

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={2}>{SETTINGS_MESSAGES.PAGE_TITLE}</Title>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value={SettingsTab.Account}>{SETTINGS_MESSAGES.TAB_ACCOUNT}</Tabs.Tab>
            {isStudentOrg && (
              <Tabs.Tab value={SettingsTab.Organization}>
                {SETTINGS_MESSAGES.TAB_ORGANIZATION}
              </Tabs.Tab>
            )}
            {isVenueAdmin && (
              <Tabs.Tab value={SettingsTab.VenueProfile}>
                {SETTINGS_MESSAGES.TAB_VENUE_PROFILE}
              </Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel value={SettingsTab.Account} pt="md">
            <AccountTab />
          </Tabs.Panel>

          {isStudentOrg && (
            <Tabs.Panel value={SettingsTab.Organization} pt="md">
              <OrganizationTab />
            </Tabs.Panel>
          )}

          {isVenueAdmin && (
            <Tabs.Panel value={SettingsTab.VenueProfile} pt="md">
              <VenueProfileTab />
            </Tabs.Panel>
          )}
        </Tabs>

        <SignOutButton onSignOut={handleSignOut} />
      </Stack>
    </Container>
  );
}
