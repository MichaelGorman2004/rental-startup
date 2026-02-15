import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { QueryProvider } from './providers/QueryProvider';
import { AppShell } from './layout';
import { DashboardPage } from './features/dashboard';
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
            </Route>
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </QueryProvider>
  );
}

export default App;
