# SarradaHub Design System

A unified design system providing visual and functional consistency across all SarradaHub projects.

## Overview

The SarradaHub Design System is a comprehensive collection of design tokens, React components, and utilities that ensure a consistent user experience across:

- **pickup-game-manager** (Rails)
- **sarradabet** (React/Turborepo)
- **saturday_league_football** (Rails API)
- **saturday_league_football_frontend** (React)

## Features

- 🎨 **Design Tokens**: Colors, typography, spacing, shadows, and more
- ⚛️ **React Components**: Accessible, type-safe UI components
- 🎯 **Tailwind Integration**: Seamless integration with Tailwind CSS
- 📚 **Storybook**: Living style guide and component documentation
- 🌙 **Dark Mode**: Full support for light and dark themes
- ♿ **Accessible**: WCAG 2.1 AA compliant components

## Installation

### For React Projects

1. Install the design system as a local dependency:

```bash
# From your project root
npm install ../../platform/design-system
```

2. Extend your Tailwind config:

```javascript
// tailwind.config.js
const designSystemConfig = require('../../platform/design-system/tailwind.config.js');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../platform/design-system/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...designSystemConfig.theme.extend,
    },
  },
  // ... rest of your config
};
```

3. Import components:

```tsx
import { Button, Input, Card } from '@sarradahub/design-system';
```

### For Rails Projects

1. Add the Tailwind CSS gem to your `Gemfile`:

```ruby
gem "tailwindcss-rails"
```

2. Create `config/tailwind.config.js`:

```javascript
const designSystemConfig = require('../../platform/design-system/tailwind.config.js');

module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    '../../platform/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...designSystemConfig.theme.extend,
    },
  },
  plugins: [],
};
```

3. Import Tailwind directives in your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "../../platform/design-system/dist/tokens/css-variables.css";
```

## Design Tokens

### Colors

The design system provides a comprehensive color palette:

- **Primary**: Blue-based palette for primary actions
- **Secondary**: Complementary colors for secondary actions
- **Semantic**: Success, warning, error, and info colors
- **Neutral**: Gray scale for text and backgrounds

```tsx
import { colors } from '@sarradahub/design-system/tokens';

// Use in your code
const primaryColor = colors.primary[600]; // #2563eb
```

### Typography

Typography scale with consistent hierarchy:

- **Headings**: h1 through h6 with defined sizes and weights
- **Body**: Large, base, and small body text
- **Labels**: Various label sizes
- **Captions**: Caption text

Font family: Inter with system font fallback

### Spacing

8px base scale with 4px for fine adjustments:

- Scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

### Shadows

Elevation system with 0-5 levels, supporting both light and dark modes.

## Components

### Button

```tsx
import { Button } from '@sarradahub/design-system';

<Button variant="primary" size="md" loading={isLoading}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'text' | 'danger' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `leftIcon`: Lucide icon component
- `rightIcon`: Lucide icon component

### Input

```tsx
import { Input } from '@sarradahub/design-system';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@sarradahub/design-system';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Alert

```tsx
import { Alert } from '@sarradahub/design-system';

<Alert variant="success" title="Success!" dismissible onDismiss={handleDismiss}>
  Your changes have been saved.
</Alert>
```

**Variants:** 'success' | 'error' | 'warning' | 'info'

### Modal

```tsx
import { Modal } from '@sarradahub/design-system';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

### Form Components

- **Select**: Dropdown select with label and error support
- **Checkbox**: Accessible checkbox with label
- **Radio**: Radio button with label
- **Textarea**: Multi-line text input
- **Label**: Form label component

### Navigation Components

- **Navbar**: Responsive navigation bar with mobile menu
- **Sidebar**: Collapsible sidebar navigation

### Data Display Components

- **Table**: Accessible table with header, body, and cells
- **List**: Ordered and unordered lists with spacing options

## Icons

The design system uses [Lucide React](https://lucide.dev/) for icons.

```tsx
import { Icon, Plus, Search } from '@sarradahub/design-system';

<Icon icon={Plus} size="md" />
<Icon icon={Search} size="sm" />
```

## Design Principles

### Consistency

All components follow consistent patterns for spacing, colors, and interactions.

### Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- ARIA attributes where needed
- Focus management

### Flexibility

Components are composable and can be customized through props and className.

### Performance

- Tree-shakeable exports
- Minimal bundle size
- Optimized for production

## Development

### Building

```bash
cd platform/design-system
npm install
npm run build
```

### Storybook

View the component library and design tokens:

```bash
npm run storybook
```

### Testing

```bash
npm test
```

## Migration Guide

### From Existing Components

If you're migrating from existing components:

1. **Update Tailwind Config**: Extend the design system config
2. **Replace Imports**: Update component imports to use the design system
3. **Update Props**: Some prop names may differ - check component documentation
4. **Test Thoroughly**: Ensure all functionality works as expected

### Example Migration

**Before:**
```tsx
import { Button } from './components/ui/Button';

<Button variant="primary">Click me</Button>
```

**After:**
```tsx
import { Button } from '@sarradahub/design-system';

<Button variant="primary">Click me</Button>
```

## Contributing

When adding new components or tokens:

1. Follow existing patterns and conventions
2. Ensure accessibility standards
3. Add Storybook stories
4. Update this documentation
5. Write tests

## License

MIT

