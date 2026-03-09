import {
  createTheme, rem, NavLink, Card, Button, TextInput, Badge,
  PasswordInput, Stepper, Tabs, Modal, Alert, Paper, Chip,
} from '@mantine/core';

/**
 * VenueLink "Warm Night" theme.
 *
 * Design system: deep slate backgrounds, warm amber accents,
 * editorial serif headings (Playfair Display) + modern sans body (Plus Jakarta Sans).
 */
export const theme = createTheme({
  primaryColor: 'amber',

  colors: {
    amber: [
      '#fef7ed',
      '#fdecd3',
      '#fbd5a5',
      '#f8bc6d',
      '#f0a044',
      '#e8892a',
      '#e2a052',
      '#c47d2e',
      '#a36325',
      '#7d4c1d',
    ],
    surface: [
      '#f0ece4',
      '#d4d0c8',
      '#8b8693',
      '#5c5768',
      '#2a2d38',
      '#1e2230',
      '#1a1d28',
      '#151820',
      '#111318',
      '#0c0e14',
    ],
  },

  primaryShade: 6,

  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", monospace',

  headings: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: '700',
  },

  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  radius: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 'md',
        fw: 600,
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        radius: 'md',
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        radius: 'md',
      },
    }),

    Card: Card.extend({
      defaultProps: {
        radius: 'md',
        p: 'lg',
        withBorder: true,
      },
      styles: () => ({
        root: {
          backgroundColor: 'var(--vl-bg-card)',
          borderColor: 'var(--vl-border)',
        },
      }),
    }),

    Badge: Badge.extend({
      defaultProps: {
        radius: 'sm',
        fw: 600,
      },
    }),

    NavLink: NavLink.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),

    Stepper: Stepper.extend({
      defaultProps: {
        color: 'amber',
      },
    }),

    Tabs: Tabs.extend({
      defaultProps: {
        color: 'amber',
      },
    }),

    Modal: Modal.extend({
      defaultProps: {
        radius: 'md',
      },
      styles: () => ({
        content: {
          backgroundColor: 'var(--vl-bg-elevated)',
          borderColor: 'var(--vl-border)',
        },
        header: {
          backgroundColor: 'var(--vl-bg-elevated)',
        },
      }),
    }),

    Alert: Alert.extend({
      defaultProps: {
        radius: 'md',
      },
    }),

    Paper: Paper.extend({
      defaultProps: {
        radius: 'md',
      },
      styles: () => ({
        root: {
          backgroundColor: 'var(--vl-bg-card)',
        },
      }),
    }),

    Chip: Chip.extend({
      defaultProps: {
        color: 'amber',
      },
    }),
  },
});

export { cssVariablesResolver } from './css-variables';
