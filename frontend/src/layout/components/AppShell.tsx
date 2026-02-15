import { AppShell as MantineAppShell, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export function AppShell() {
  const { sidebarOpen } = useLayout();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !sidebarOpen },
      }}
      footer={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Header />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <ScrollArea h="100%">
          <Sidebar />
        </ScrollArea>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        <Outlet />
      </MantineAppShell.Main>

      <MantineAppShell.Footer p="md">
        <Footer />
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
}
