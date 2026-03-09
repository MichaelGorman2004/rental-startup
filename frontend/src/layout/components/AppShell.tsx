import { AppShell as MantineAppShell, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import classes from './AppShell.module.css';

export function AppShell() {
  const { sidebarOpen } = useLayout();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !sidebarOpen },
      }}
      footer={{ height: 50 }}
      padding="md"
      withBorder={false}
      transitionDuration={200}
    >
      <MantineAppShell.Header className={classes['header']}>
        <Header />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar className={classes['navbar']} p="md">
        <ScrollArea h="100%">
          <Sidebar />
        </ScrollArea>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main className={classes['main']}>
        <Outlet />
      </MantineAppShell.Main>

      <MantineAppShell.Footer className={classes['footer']} p="sm">
        <Footer />
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
}
