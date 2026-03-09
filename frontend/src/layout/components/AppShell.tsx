import { AppShell as MantineAppShell, Drawer } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import classes from './AppShell.module.css';

export function AppShell() {
  const { sidebarOpen, closeSidebar } = useLayout();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      padding="md"
      withBorder={false}
    >
      <MantineAppShell.Header className={classes['header']}>
        <Header />
      </MantineAppShell.Header>

      <Drawer
        opened={sidebarOpen}
        onClose={closeSidebar}
        size="xs"
        hiddenFrom="sm"
        withCloseButton={false}
        styles={{ body: { background: 'var(--vl-bg-elevated)', padding: 0 } }}
      >
        <Sidebar />
      </Drawer>

      <MantineAppShell.Main className={classes['main']}>
        <Outlet />
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}
