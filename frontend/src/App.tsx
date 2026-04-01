import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Notifications } from '@mantine/notifications';
import { ErrorBoundary } from './components';
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
import { InterestPage } from './features/prerelease';
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
              <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
              <Route path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
              <Route path="/interest" element={<ErrorBoundary><InterestPage /></ErrorBoundary>} />
              <Route path="/demo/venues" element={<ErrorBoundary><DemoBrowse /></ErrorBoundary>} />
              <Route path="/demo/venues/:id" element={<ErrorBoundary><DemoVenueDetail /></ErrorBoundary>} />

              {/* Root: Landing (signed out) or Dashboard shell (signed in) */}
              <Route
                path="/"
                element={(
                  <>
                    <SignedIn>
                      <AppShell />
                    </SignedIn>
                    <SignedOut>
                      <ErrorBoundary><LandingPage /></ErrorBoundary>
                    </SignedOut>
                  </>
                )}
              >
                <Route index element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
                <Route path="venues" element={<ErrorBoundary><RoleGuard roles={['student_org']}><VenueBrowse /></RoleGuard></ErrorBoundary>} />
                <Route path="venues/:id" element={<ErrorBoundary><RoleGuard roles={['student_org']}><VenueDetail /></RoleGuard></ErrorBoundary>} />
                <Route path="venues/:id/book" element={<ErrorBoundary><RoleGuard roles={['student_org']}><BookingForm /></RoleGuard></ErrorBoundary>} />
                <Route path="bookings" element={<ErrorBoundary><RoleGuard roles={['student_org']}><BookingsPage /></RoleGuard></ErrorBoundary>} />
                <Route path="settings" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
                <Route path="admin" element={<ErrorBoundary><RoleGuard roles={['venue_admin']}><AdminDashboard /></RoleGuard></ErrorBoundary>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApiClientInitializer>
      </ClerkProvider>
    </QueryProvider>
  );
}

export default App;
