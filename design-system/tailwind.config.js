// Import tokens directly from foundations (compiled)
// The compiled JS uses ES modules, so we use require with the .js files directly
const colorsModule = require('./dist/foundations/colors.js');
const typographyModule = require('./dist/foundations/typography.js');
const spacingModule = require('./dist/foundations/spacing.js');
const shadowsModule = require('./dist/foundations/shadows.js');
const borderRadiusModule = require('./dist/foundations/borderRadius.js');
const breakpointsModule = require('./dist/foundations/breakpoints.js');

const colors = colorsModule.colors;
const typography = typographyModule.typography;
const spacing = spacingModule.spacing;
const spacingSemantic = spacingModule.spacingSemantic;
const shadows = shadowsModule.shadows;
const borderRadius = borderRadiusModule.borderRadius;
const breakpoints = breakpointsModule.breakpoints;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        neutral: colors.neutral,
      },
      fontFamily: {
        sans: typography.fontFamily.sans.split(', '),
        mono: typography.fontFamily.mono.split(', '),
      },
      fontSize: {
        xs: typography.fontSize.xs,
        sm: typography.fontSize.sm,
        base: typography.fontSize.base,
        lg: typography.fontSize.lg,
        xl: typography.fontSize.xl,
        '2xl': typography.fontSize['2xl'],
        '3xl': typography.fontSize['3xl'],
        '4xl': typography.fontSize['4xl'],
        '5xl': typography.fontSize['5xl'],
        '6xl': typography.fontSize['6xl'],
        '7xl': typography.fontSize['7xl'],
        '8xl': typography.fontSize['8xl'],
        '9xl': typography.fontSize['9xl'],
      },
      fontWeight: {
        regular: typography.fontWeight.regular,
        medium: typography.fontWeight.medium,
        semibold: typography.fontWeight.semibold,
        bold: typography.fontWeight.bold,
      },
      spacing: {
        ...spacing,
        ...spacingSemantic,
      },
      boxShadow: {
        sm: shadows.light.sm,
        DEFAULT: shadows.light.DEFAULT,
        md: shadows.light.md,
        lg: shadows.light.lg,
        xl: shadows.light.xl,
        '2xl': shadows.light['2xl'],
        inner: shadows.light.inner,
      },
      borderRadius: {
        ...borderRadius,
      },
      screens: {
        xs: breakpoints.xs,
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
        xl: breakpoints.xl,
        '2xl': breakpoints['2xl'],
        '3xl': breakpoints['3xl'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

