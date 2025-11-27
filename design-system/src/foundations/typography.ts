/**
 * Typography tokens for the design system
 * Based on Inter font family with modular scale
 */

export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(', '),
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ].join(', '),
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }], // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.05em' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.05em' }], // 36px
    '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.05em' }], // 48px
    '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.05em' }], // 60px
    '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.05em' }], // 72px
    '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }], // 96px
    '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }], // 128px
  },
  
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Typography scale for headings
  headings: {
    h1: {
      fontSize: '3rem', // 48px
      lineHeight: '1',
      fontWeight: '700',
      letterSpacing: '-0.05em',
    },
    h2: {
      fontSize: '2.25rem', // 36px
      lineHeight: '2.5rem',
      fontWeight: '700',
      letterSpacing: '-0.05em',
    },
    h3: {
      fontSize: '1.875rem', // 30px
      lineHeight: '2.25rem',
      fontWeight: '600',
      letterSpacing: '-0.05em',
    },
    h4: {
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
    h5: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.75rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
  },
  
  // Body text
  body: {
    large: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.75rem',
      fontWeight: '400',
    },
    base: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem',
      fontWeight: '400',
    },
    small: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem',
      fontWeight: '400',
    },
  },
  
  // Labels
  label: {
    large: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem',
      fontWeight: '500',
      letterSpacing: '0.025em',
    },
    base: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem',
      fontWeight: '500',
      letterSpacing: '0.05em',
    },
    small: {
      fontSize: '0.625rem', // 10px
      lineHeight: '0.875rem',
      fontWeight: '500',
      letterSpacing: '0.05em',
    },
  },
  
  // Captions
  caption: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1rem',
    fontWeight: '400',
    letterSpacing: '0.05em',
  },
} as const;

