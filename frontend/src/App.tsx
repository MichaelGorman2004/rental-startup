import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { QueryProvider } from './providers/QueryProvider';
import { ApiClientInitializer } from './providers/ApiClientInitializer';
import { AppShell } from './layout';
import { DashboardPage } from './features/dashboard';
import { VenueBrowse, VenueDetail } from './features/venues';
import { BookingForm } from './features/bookings';
import { AdminDashboard } from './features/venue-admin';
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
        <ApiClientInitializer>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={(
                  <>
                    <SignedIn>
                      <AppShell />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/login" />
                    </SignedOut>
                  </>
                )}
              >
                <Route index element={<DashboardPage />} />
                <Route path="venues" element={<VenueBrowse />} />
                <Route path="venues/:id" element={<VenueDetail />} />
                <Route path="venues/:id/book" element={<BookingForm />} />
                <Route path="bookings" element={<div>Bookings</div>} />
                <Route path="admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApiClientInitializer>
      </ClerkProvider>
    </QueryProvider>
  );
}

export default App;
