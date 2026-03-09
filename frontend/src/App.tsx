import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Notifications } from '@mantine/notifications';
import { QueryProvider } from './providers/QueryProvider';
import { ApiClientInitializer } from './providers/ApiClientInitializer';
import { AppShell, RoleGuard } from './layout';
import { DashboardPage } from './features/dashboard';
import { VenueBrowse, VenueDetail } from './features/venues';
import { BookingForm, BookingsPage } from './features/bookings';
import { AdminDashboard } from './features/venue-admin';
import { SettingsPage } from './features/settings';
import { LandingPage } from './features/landing';
import { DemoBrowse, DemoVenueDetail } from './features/demo';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

const CLERK_PUBLISHABLE_KEY = import.meta.env['VITE_CLERK_PUBLISHABLE_KEY'];

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key: Please set VITE_CLERK_PUBLISHABLE_KEY in your .env');
}

/**
 * Root application component with routing configuration.
 */
function App() {
  return (
    <QueryProvider>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <Notifications />
        <ApiClientInitializer>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/demo/venues" element={<DemoBrowse />} />
              <Route path="/demo/venues/:id" element={<DemoVenueDetail />} />

              {/* Root: Landing (signed out) or Dashboard shell (signed in) */}
              <Route
                path="/"
                element={(
                  <>
                    <SignedIn>
                      <AppShell />
                    </SignedIn>
                    <SignedOut>
                      <LandingPage />
                    </SignedOut>
                  </>
                )}
              >
                <Route index element={<DashboardPage />} />
                <Route path="venues" element={<RoleGuard roles={['student_org']}><VenueBrowse /></RoleGuard>} />
                <Route path="venues/:id" element={<RoleGuard roles={['student_org']}><VenueDetail /></RoleGuard>} />
                <Route path="venues/:id/book" element={<RoleGuard roles={['student_org']}><BookingForm /></RoleGuard>} />
                <Route path="bookings" element={<RoleGuard roles={['student_org']}><BookingsPage /></RoleGuard>} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="admin" element={<RoleGuard roles={['venue_admin']}><AdminDashboard /></RoleGuard>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApiClientInitializer>
      </ClerkProvider>
    </QueryProvider>
  );
}

export default App;
