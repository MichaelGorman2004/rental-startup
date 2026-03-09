import {
  createTheme, rem, NavLink, Card, Button, TextInput, Badge,
  PasswordInput, Stepper, Tabs, Modal, Alert, Paper, Chip,
} from '@mantine/core';

/**
 * VenueLink "Flame Brutalist" theme.
 *
 * True black backgrounds, vivid orange-red flame accents,
 * 0px radius everywhere, editorial serif + geometric sans.
 */
export const theme = createTheme({
  primaryColor: 'flame',

  colors: {
    flame: [
      '#fff5f0',
      '#ffe0d1',
      '#ffc2a3',
      '#ff9b6b',
      '#ff6b1a',
      '#f05a10',
      '#e84118',
      '#c43414',
      '#9e2a10',
      '#7a200c',
    ],
    surface: [
      '#e8e5e0',
      '#c0bdb8',
      '#7a7580',
      '#4a4550',
      '#1e1e22',
      '#141418',
      '#0e0e12',
      '#0a0a0e',
      '#070709',
      '#050507',
    ],
  },

  primaryShade: 4,

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
    xs: rem(0),
    sm: rem(0),
    md: rem(0),
    lg: rem(0),
    xl: rem(0),
  },

  defaultRadius: 0,

  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 0,
        fw: 600,
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        radius: 0,
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        radius: 0,
      },
    }),

    Card: Card.extend({
      defaultProps: {
        radius: 0,
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
        radius: 0,
        fw: 700,
        tt: 'uppercase',
      },
      styles: () => ({
        root: {
          letterSpacing: '0.06em',
          fontSize: rem(11),
        },
      }),
    }),

    NavLink: NavLink.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),

    Stepper: Stepper.extend({
      defaultProps: {
        color: 'flame',
      },
    }),

    Tabs: Tabs.extend({
      defaultProps: {
        color: 'flame',
      },
    }),

    Modal: Modal.extend({
      defaultProps: {
        radius: 0,
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
        radius: 0,
      },
    }),

    Paper: Paper.extend({
      defaultProps: {
        radius: 0,
      },
      styles: () => ({
        root: {
          backgroundColor: 'var(--vl-bg-card)',
        },
      }),
    }),

    Chip: Chip.extend({
      defaultProps: {
        color: 'flame',
        radius: 0,
      },
    }),
  },
});

export { cssVariablesResolver } from './css-variables';
