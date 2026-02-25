import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from './theme';
import App from './App';

/**
 * Application entry point
 *
 * Sets up React 18 with Mantine UI theme provider.
 * Renders the root App component into the DOM.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} forceColorScheme="dark">
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
