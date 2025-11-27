import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import tokens directly from foundations (compiled)
// The compiled JS uses ES modules, so we need to use require with createRequire
const colors = require('../dist/foundations/colors.js');
const typography = require('../dist/foundations/typography.js');
const spacing = require('../dist/foundations/spacing.js');
const shadows = require('../dist/foundations/shadows.js');
const borderRadius = require('../dist/foundations/borderRadius.js');
const breakpoints = require('../dist/foundations/breakpoints.js');

const tokens = {
  colors: colors.colors,
  typography: typography.typography,
  spacing: spacing.spacing,
  spacingSemantic: spacing.spacingSemantic,
  shadows: shadows.shadows,
  borderRadius: borderRadius.borderRadius,
  breakpoints: breakpoints.breakpoints,
  breakpointValues: breakpoints.breakpointValues,
};

function generateCSSVariables() {
  const css = `:root {
  /* Colors - Primary */
  --color-primary-50: ${tokens.colors.primary[50]};
  --color-primary-100: ${tokens.colors.primary[100]};
  --color-primary-200: ${tokens.colors.primary[200]};
  --color-primary-300: ${tokens.colors.primary[300]};
  --color-primary-400: ${tokens.colors.primary[400]};
  --color-primary-500: ${tokens.colors.primary[500]};
  --color-primary-600: ${tokens.colors.primary[600]};
  --color-primary-700: ${tokens.colors.primary[700]};
  --color-primary-800: ${tokens.colors.primary[800]};
  --color-primary-900: ${tokens.colors.primary[900]};
  --color-primary-950: ${tokens.colors.primary[950]};

  /* Colors - Secondary */
  --color-secondary-50: ${tokens.colors.secondary[50]};
  --color-secondary-100: ${tokens.colors.secondary[100]};
  --color-secondary-200: ${tokens.colors.secondary[200]};
  --color-secondary-300: ${tokens.colors.secondary[300]};
  --color-secondary-400: ${tokens.colors.secondary[400]};
  --color-secondary-500: ${tokens.colors.secondary[500]};
  --color-secondary-600: ${tokens.colors.secondary[600]};
  --color-secondary-700: ${tokens.colors.secondary[700]};
  --color-secondary-800: ${tokens.colors.secondary[800]};
  --color-secondary-900: ${tokens.colors.secondary[900]};
  --color-secondary-950: ${tokens.colors.secondary[950]};

  /* Colors - Semantic */
  --color-success-500: ${tokens.colors.success[500]};
  --color-success-600: ${tokens.colors.success[600]};
  --color-warning-500: ${tokens.colors.warning[500]};
  --color-warning-600: ${tokens.colors.warning[600]};
  --color-error-500: ${tokens.colors.error[500]};
  --color-error-600: ${tokens.colors.error[600]};
  --color-info-500: ${tokens.colors.info[500]};
  --color-info-600: ${tokens.colors.info[600]};

  /* Colors - Neutral */
  --color-neutral-50: ${tokens.colors.neutral[50]};
  --color-neutral-100: ${tokens.colors.neutral[100]};
  --color-neutral-200: ${tokens.colors.neutral[200]};
  --color-neutral-300: ${tokens.colors.neutral[300]};
  --color-neutral-400: ${tokens.colors.neutral[400]};
  --color-neutral-500: ${tokens.colors.neutral[500]};
  --color-neutral-600: ${tokens.colors.neutral[600]};
  --color-neutral-700: ${tokens.colors.neutral[700]};
  --color-neutral-800: ${tokens.colors.neutral[800]};
  --color-neutral-900: ${tokens.colors.neutral[900]};
  --color-neutral-950: ${tokens.colors.neutral[950]};

  /* Spacing */
  --spacing-0: ${tokens.spacing[0]};
  --spacing-1: ${tokens.spacing[1]};
  --spacing-2: ${tokens.spacing[2]};
  --spacing-3: ${tokens.spacing[3]};
  --spacing-4: ${tokens.spacing[4]};
  --spacing-6: ${tokens.spacing[6]};
  --spacing-8: ${tokens.spacing[8]};
  --spacing-12: ${tokens.spacing[12]};
  --spacing-16: ${tokens.spacing[16]};
  --spacing-24: ${tokens.spacing[24]};
  --spacing-32: ${tokens.spacing[32]};

  /* Border Radius */
  --radius-none: ${tokens.borderRadius.none};
  --radius-sm: ${tokens.borderRadius.sm};
  --radius-default: ${tokens.borderRadius.DEFAULT};
  --radius-md: ${tokens.borderRadius.md};
  --radius-lg: ${tokens.borderRadius.lg};
  --radius-xl: ${tokens.borderRadius.xl};
  --radius-2xl: ${tokens.borderRadius['2xl']};
  --radius-3xl: ${tokens.borderRadius['3xl']};
  --radius-full: ${tokens.borderRadius.full};

  /* Shadows - Light Mode */
  --shadow-sm: ${tokens.shadows.light.sm};
  --shadow-default: ${tokens.shadows.light.DEFAULT};
  --shadow-md: ${tokens.shadows.light.md};
  --shadow-lg: ${tokens.shadows.light.lg};
  --shadow-xl: ${tokens.shadows.light.xl};
  --shadow-2xl: ${tokens.shadows.light['2xl']};
}

.dark {
  /* Shadows - Dark Mode */
  --shadow-sm: ${tokens.shadows.dark.sm};
  --shadow-default: ${tokens.shadows.dark.DEFAULT};
  --shadow-md: ${tokens.shadows.dark.md};
  --shadow-lg: ${tokens.shadows.dark.lg};
  --shadow-xl: ${tokens.shadows.dark.xl};
  --shadow-2xl: ${tokens.shadows.dark['2xl']};
}
`;

  const outputDir = join(__dirname, '../dist/tokens');
  const outputPath = join(outputDir, 'css-variables.css');
  
  // Ensure directory exists
  mkdirSync(outputDir, { recursive: true });
  
  writeFileSync(outputPath, css, 'utf-8');
  console.log('✅ CSS variables generated at:', outputPath);
}

generateCSSVariables();
