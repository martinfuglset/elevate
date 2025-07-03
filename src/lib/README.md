# Design System

This is the single source of truth for all design tokens in the Elevate application.

## Overview

The design system is modular and each part is easily replaceable. It provides:

- **Typography**: Inter font for all text elements
- **Spacing**: Consistent spacing scale
- **Shadows**: Standard shadow definitions
- **Border Radius**: Consistent border radius values

## Fonts

- **Inter**: Used for all text elements (headings, body text, UI, code)

## Usage

### 1. Direct Import

```typescript
import { typography, fonts } from '@/lib/design-system'

// Use typography
const headingStyles = typography.h1

// Use fonts
const fontFamily = fonts.sans.family
```

### 2. React Hook

```typescript
import { useDesignSystem, useStyles } from '@/lib/use-design-system'

function MyComponent() {
  const { typography: typographyHelpers } = useDesignSystem()
  const styles = useStyles()

  return (
    <div>
      <h1 style={styles.h1}>Heading</h1>
      <p>Body text</p>
    </div>
  )
}
```

### 3. Tailwind Classes

The design system is integrated with Tailwind CSS:

```jsx
<h1 className="font-sans text-4xl">Inter heading</h1>
<p className="font-sans">Inter body text</p>
<code className="font-sans">Inter code</code>
```

## Typography Scale

### Headings (Inter)
- `h1`: 3.5rem (56px) - Main page titles
- `h2`: 2.5rem (40px) - Section headings
- `h3`: 2rem (32px) - Subsection headings
- `h4`: 1.5rem (24px) - Card titles
- `h5`: 1.25rem (20px) - Small headings
- `h6`: 1rem (16px) - Micro headings

### Body Text (Inter)
- `bodyLarge`: 1.125rem (18px) - Large body text
- `body`: 1rem (16px) - Standard body text
- `bodySmall`: 0.875rem (14px) - Small body text

### UI Text (Inter)
- `label`: 0.875rem (14px) - Form labels
- `caption`: 0.75rem (12px) - Captions and metadata

### Code (Inter)
- `codeLarge`: 1rem (16px) - Large code blocks
- `code`: 0.875rem (14px) - Inline code

## Spacing Scale

- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 3rem (48px)
- `3xl`: 4rem (64px)
- `4xl`: 6rem (96px)

## Border Radius

- `none`: 0
- `sm`: 0.125rem (2px)
- `md`: 0.375rem (6px)
- `lg`: 0.5rem (8px)
- `xl`: 0.75rem (12px)
- `2xl`: 1rem (16px)
- `full`: 9999px (fully rounded)
- `button`: 9999px (fully rounded for buttons)

## Modifying the Design System

To modify any part of the design system:

1. **Change fonts**: Update the `fonts` object in `design-system.ts`
2. **Change typography**: Update the `typography` object in `design-system.ts`
3. **Add new tokens**: Add them to the appropriate section in `design-system.ts`

All components will automatically use the updated values since they import from this single source of truth.

## Best Practices

1. **Always import from the design system**: Never hardcode fonts or spacing values
2. **Use semantic naming**: Use descriptive names for typography variants
3. **Follow the typography hierarchy**: Use appropriate heading levels and body text sizes
4. **Be consistent**: Use the same spacing values throughout the application

## Example Component

See `src/components/examples/design-system-example.tsx` for a complete example of how to use the design system. 