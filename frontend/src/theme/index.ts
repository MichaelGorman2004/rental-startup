import { createTheme, rem } from '@mantine/core';

/**
 * Custom application theme based on Mantine
 * enforcing strict design system values.
 */
export const theme = createTheme({
  /**
   * Primary color used for main actions and highlights.
   * Based on indigo scale for professional/modern look.
   */
  primaryColor: 'indigo',

  /**
   * Custom color palette extension.
   * Can be used via `c="brand.5"` or `bg="brand.0"`.
   */
  colors: {
    brand: [
      '#eef2ff', // 0
      '#e0e7ff', // 1
      '#c7d2fe', // 2
      '#a5b4fc', // 3
      '#818cf8', // 4
      '#6366f1', // 5
      '#4f46e5', // 6
      '#4338ca', // 7
      '#3730a3', // 8
      '#312e81', // 9
    ],
  },

  /**
   * Base spacing unit: 4px
   * xs: 8px, sm: 12px, md: 16px, lg: 24px, xl: 32px
   */
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  /**
   * Typography scale using Inter font family.
   */
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '700',
  },

  /**
   * Border radius tokens.
   */
  radius: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
  },

  /**
   * Component default props to enforce consistency.
   */
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        fw: 600,
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
        p: 'md',
        withBorder: true,
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
        fw: 600,
      },
    },
  },
});
