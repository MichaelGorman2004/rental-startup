import { type ReactNode } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { Center, Loader } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ErrorBoundary } from './components';
import { QueryProvider } from './providers/QueryProvider';
import { ApiClientInitializer } from './providers/ApiClientInitializer';
import { AppShell, RoleGuard } from './layout';
import { OrgSetupGate } from './features/organization';
import { DashboardPage } from './features/dashboard';
import { VenueBrowse, VenueDetail } from './features/venues';
import { BookingForm, BookingsPage } from './features/bookings';
import { AdminDashboard, VenueSetupGate } from './features/venue-admin';
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

/** Wraps a route element in an ErrorBoundary to catch render-time errors. */
function withErrorBoundary(element: ReactNode): ReactNode {
  return <ErrorBoundary>{element}</ErrorBoundary>;
}

/**
 * Root gate for the "/" path.
 * Subscribes directly to useAuth() so it re-renders immediately when Clerk
 * resolves the session — including after signup/login navigates here before
 * Clerk's React context has fully propagated.
 */
function RootRoute() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <Center mih="100vh">
        <Loader aria-label="Loading" />
      </Center>
    );
  }

  if (!isSignedIn) {
    return withErrorBoundary(<LandingPage />);
  }

  return (
    <OrgSetupGate>
      <VenueSetupGate>
        <AppShell />
      </VenueSetupGate>
    </OrgSetupGate>
  );
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
              <Route path="/login" element={withErrorBoundary(<Login />)} />
              <Route path="/signup" element={withErrorBoundary(<Signup />)} />
              <Route path="/interest" element={withErrorBoundary(<InterestPage />)} />
              <Route path="/demo/venues" element={withErrorBoundary(<DemoBrowse />)} />
              <Route path="/demo/venues/:id" element={withErrorBoundary(<DemoVenueDetail />)} />

              {/* Root: Landing (signed out) or Dashboard shell (signed in) */}
              <Route path="/" element={<RootRoute />}>
                <Route index element={withErrorBoundary(<DashboardPage />)} />
                <Route path="venues" element={withErrorBoundary(<RoleGuard roles={['student_org']}><VenueBrowse /></RoleGuard>)} />
                <Route path="venues/:id" element={withErrorBoundary(<RoleGuard roles={['student_org']}><VenueDetail /></RoleGuard>)} />
                <Route path="venues/:id/book" element={withErrorBoundary(<RoleGuard roles={['student_org']}><BookingForm /></RoleGuard>)} />
                <Route path="bookings" element={withErrorBoundary(<RoleGuard roles={['student_org']}><BookingsPage /></RoleGuard>)} />
                <Route path="settings" element={withErrorBoundary(<SettingsPage />)} />
                <Route path="admin" element={withErrorBoundary(<RoleGuard roles={['venue_admin']}><AdminDashboard /></RoleGuard>)} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApiClientInitializer>
      </ClerkProvider>
    </QueryProvider>
  );
}

export default App;
