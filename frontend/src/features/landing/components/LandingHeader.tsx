import {
  Group, Text, Button, Box,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './LandingHeader.module.css';

/** Minimal public header with logo and auth CTAs. */
export function LandingHeader() {
  return (
    <Box className={classes['header']}>
      <Group h="100%" px="xl" justify="space-between">
        <Text className={classes['logo']}>
          VENUE
          <Text span className={classes['logoAccent']}>LINK</Text>
        </Text>
        <Group gap="sm">
          <Button
            component={Link}
            to="/demo/venues"
            variant="subtle"
            size="sm"
            aria-label="Browse demo venues"
          >
            Browse Venues
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="default"
            size="sm"
            aria-label="Sign in to your account"
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to="/signup"
            size="sm"
            aria-label="Create a new account"
          >
            Sign Up
          </Button>
        </Group>
      </Group>
    </Box>
  );
}
