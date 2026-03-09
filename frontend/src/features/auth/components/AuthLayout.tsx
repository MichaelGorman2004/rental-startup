import {
  Container, Paper, Title, Text, Stack, Center, Box,
} from '@mantine/core';
import { ReactNode } from 'react';
import classes from './AuthLayout.module.css';

function AuthHeader({ title }: { title: string }) {
  return (
    <Stack gap="xs" align="center" mb="xl">
      <Title order={2} className={classes['logo']}>
        VENUE
        <Text span className={classes['logoAccent']}>LINK</Text>
      </Title>
      <Text c="dimmed" size="sm">{title}</Text>
    </Stack>
  );
}

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <Box className={classes['wrapper']}>
      <Center h="100vh">
        <Container size={420} p={0}>
          <Paper p="xl" shadow="sm" className={classes['card']}>
            <AuthHeader title={title} />
            {children}
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}
