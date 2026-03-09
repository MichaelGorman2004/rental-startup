import {
  createTheme, rem, NavLink, Card, Button, TextInput, Badge,
  PasswordInput, Stepper, Tabs, Modal, Alert, Paper, Chip,
} from '@mantine/core';

/**
 * VenueLink "Warm Night" theme.
 *
 * Deep charcoal backgrounds, warm copper/bronze accents,
 * soft rounded corners, editorial serif + geometric sans.
 */
export const theme = createTheme({
  primaryColor: 'copper',

  colors: {
    copper: [
      '#fdf6f0',
      '#f9e7d8',
      '#f0ccaf',
      '#e8a67a',
      '#d4845a',
      '#c06b40',
      '#a85a35',
      '#8c4a2c',
      '#703b24',
      '#5a301e',
    ],
    surface: [
      '#e8e5e0',
      '#c0bdb8',
      '#8a8690',
      '#5a5660',
      '#1f1f26',
      '#1a1a20',
      '#16161a',
      '#0e0e10',
      '#0a0a0c',
      '#060608',
    ],
  },

  primaryShade: 4,

  fontFamily: '"DM Sans", system-ui, sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", monospace',

  headings: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: '600',
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
    xs: rem(6),
    sm: rem(8),
    md: rem(14),
    lg: rem(20),
    xl: rem(28),
  },

  defaultRadius: 'md',

  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 'sm',
        fw: 500,
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        radius: 'sm',
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        radius: 'sm',
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
        radius: 'xl',
        fw: 600,
        tt: 'uppercase',
      },
      styles: () => ({
        root: {
          letterSpacing: '0.06em',
          fontSize: rem(10),
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
        color: 'copper',
      },
    }),

    Tabs: Tabs.extend({
      defaultProps: {
        color: 'copper',
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
        color: 'copper',
        radius: 'xl',
      },
    }),
  },
});

export { cssVariablesResolver } from './css-variables';
