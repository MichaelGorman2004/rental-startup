import {
  Group, Text, Button, Box, Badge,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './LandingHeader.module.css';

/** Minimal public header with logo and auth CTAs. */
export function LandingHeader() {
  return (
    <Box className={classes['header']}>
      <Group h="100%" px="xl" justify="space-between">
        <Group gap="sm">
          <Text className={classes['logo']}>
            VENUE
            <Text span className={classes['logoAccent']}>LINK</Text>
          </Text>
          <Badge color="copper" variant="filled" size="sm" radius="sm">
            PRE-RELEASE
          </Badge>
        </Group>
        <Group gap="sm">
          <Button
            component={Link}
            to="/"
            variant="subtle"
            size="sm"
            aria-label="About VenueLink"
          >
            About
          </Button>
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
            to="/interest"
            variant="subtle"
            size="sm"
            aria-label="Express interest in VenueLink"
          >
            Join Waitlist
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
