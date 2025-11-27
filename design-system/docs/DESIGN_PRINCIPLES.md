# Design Principles

## Overview

The SarradaHub Design System is built on core principles that guide all design and development decisions.

## 1. Consistency

Consistency ensures users can predict how interfaces will behave and look across all applications.

- **Visual Consistency**: Same colors, typography, and spacing everywhere
- **Interaction Consistency**: Similar components behave the same way
- **Pattern Consistency**: Common patterns (forms, navigation) work identically

## 2. Accessibility

Accessibility is not optional. All components must be usable by everyone.

- **WCAG 2.1 AA Compliance**: Minimum standard for all components
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: Text meets contrast requirements

## 3. Flexibility

Components should be flexible enough to handle various use cases while maintaining consistency.

- **Composable**: Components can be combined to create complex UIs
- **Customizable**: Props allow customization without breaking patterns
- **Extensible**: Easy to extend for project-specific needs

## 4. Performance

Performance impacts user experience and should be considered in all decisions.

- **Bundle Size**: Keep components lightweight
- **Tree Shaking**: Only import what you need
- **Optimization**: Optimize for production builds

## 5. Developer Experience

Good developer experience leads to faster development and fewer bugs.

- **Type Safety**: Full TypeScript support
- **Clear APIs**: Intuitive prop names and structure
- **Documentation**: Comprehensive docs and examples
- **Tooling**: Storybook for visual development

## 6. Scalability

The system must scale as projects grow and requirements change.

- **Token-Based**: Design tokens enable easy theme changes
- **Modular**: Components are independent and reusable
- **Versioning**: Clear versioning strategy for updates

## Color System

### Primary Colors

Primary colors are used for main actions and brand identity.

- **Blue-based palette**: Professional and trustworthy
- **Full scale**: 50-950 for various use cases

### Semantic Colors

Semantic colors communicate meaning:

- **Success**: Green - positive actions, confirmations
- **Warning**: Yellow - cautions, important notices
- **Error**: Red - errors, destructive actions
- **Info**: Blue - informational messages

### Neutral Colors

Neutral colors provide structure and hierarchy:

- **Text**: Various shades for different text levels
- **Backgrounds**: Surface colors for containers
- **Borders**: Subtle dividers and boundaries

## Typography

### Hierarchy

Clear typographic hierarchy guides users through content:

1. **Headings**: h1-h6 with decreasing sizes
2. **Body**: Primary content text
3. **Labels**: Form labels and metadata
4. **Captions**: Supporting text

### Font Family

**Inter** is the primary font family, chosen for:
- Excellent readability at all sizes
- Modern, clean appearance
- Strong web font support

System font fallbacks ensure fast rendering.

## Spacing

### 8px Base Scale

All spacing uses multiples of 8px for visual rhythm:

- **Fine adjustments**: 4px increments
- **Standard spacing**: 8px increments
- **Large spacing**: 16px+ for major sections

### Semantic Spacing

Use semantic names (xs, sm, md, lg) for consistency:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px

## Shadows & Elevation

Shadows create depth and hierarchy:

- **Level 0**: No shadow (flat)
- **Level 1-2**: Subtle elevation (cards, inputs)
- **Level 3-4**: Moderate elevation (modals, dropdowns)
- **Level 5**: High elevation (overlays, popovers)

Different shadow values for light and dark modes.

## Component Patterns

### Composition

Components are built to be composed:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Variants

Use variants for different visual styles:

```tsx
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="danger" />
```

### Sizes

Consistent sizing across components:

- `sm`: Small (compact UIs)
- `md`: Medium (default)
- `lg`: Large (prominent actions)

## Responsive Design

### Breakpoints

- `xs`: 480px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1792px

### Mobile-First

Design mobile-first, then enhance for larger screens.

## Dark Mode

Full dark mode support:

- **Automatic**: Components adapt to dark mode
- **Consistent**: Same components work in both modes
- **Accessible**: Maintains contrast in both modes

## Best Practices

### Do

✅ Use design tokens for colors and spacing
✅ Follow component APIs as documented
✅ Maintain accessibility standards
✅ Test in both light and dark modes
✅ Use semantic HTML

### Don't

❌ Create custom colors outside the system
❌ Override component styles unnecessarily
❌ Skip accessibility features
❌ Use arbitrary spacing values
❌ Break component composition patterns

