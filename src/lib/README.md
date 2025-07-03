# Design System

This is the single source of truth for all design tokens in the Elevate application.

## Overview

The design system is modular and each part is easily replaceable. It provides:

- **Typography**: Serif fonts for headings, sans fonts for body text, mono fonts for code
- **Colors**: A curated palette of 5 colors
- **Spacing**: Consistent spacing scale
- **Shadows**: Standard shadow definitions
- **Border Radius**: Consistent border radius values

## Fonts

- **Serif**: ItemsTextTrial (for headings)
- **Sans**: SuisseIntl (for body text and UI)
- **Mono**: SuisseIntlMono (for code and technical content)

## Colors

- `#000000` - Black
- `#FFFFFF` - White  
- `#023D3E` - Teal (primary brand color)
- `#EAE8DF` - Cream
- `#969696` - Gray

## Usage

### 1. Direct Import

```typescript
import { colors, typography, fonts } from '@/lib/design-system'

// Use colors
const backgroundColor = colors.teal

// Use typography
const headingStyles = typography.h1

// Use fonts
const serifFont = fonts.serif.family
```

### 2. React Hook

```typescript
import { useDesignSystem, useStyles } from '@/lib/use-design-system'

function MyComponent() {
  const { typography: typographyHelpers, colors: colorHelpers } = useDesignSystem()
  const styles = useStyles()

  return (
    <div>
      <h1 style={styles.h1}>Heading</h1>
      <p style={{ color: colorHelpers.teal() }}>Colored text</p>
    </div>
  )
}
```

### 3. Tailwind Classes

The design system is integrated with Tailwind CSS:

```jsx
<h1 className="font-serif text-4xl">Serif heading</h1>
<p className="font-sans text-gray">Sans body text</p>
<code className="font-mono">Mono code</code>
<div className="bg-teal text-white">Teal background</div>
```

## Typography Scale

### Headings (Serif)
- `h1`: 3.5rem (56px) - Main page titles
- `h2`: 2.5rem (40px) - Section headings
- `h3`: 2rem (32px) - Subsection headings
- `h4`: 1.5rem (24px) - Card titles
- `h5`: 1.25rem (20px) - Small headings
- `h6`: 1rem (16px) - Micro headings

### Body Text (Sans)
- `bodyLarge`: 1.125rem (18px) - Large body text
- `body`: 1rem (16px) - Standard body text
- `bodySmall`: 0.875rem (14px) - Small body text

### UI Text (Sans)
- `label`: 0.875rem (14px) - Form labels
- `caption`: 0.75rem (12px) - Captions and metadata

### Code (Mono)
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
2. **Change colors**: Update the `colors` object in `design-system.ts`
3. **Change typography**: Update the `typography` object in `design-system.ts`
4. **Add new tokens**: Add them to the appropriate section in `design-system.ts`

All components will automatically use the updated values since they import from this single source of truth.

## Best Practices

1. **Always import from the design system**: Never hardcode colors, fonts, or spacing values
2. **Use semantic naming**: Use `colors.teal` instead of `colors.primary`
3. **Follow the typography hierarchy**: Use serif for headings, sans for body, mono for code
4. **Be consistent**: Use the same spacing and color values throughout the application

## Example Component

See `src/components/examples/design-system-example.tsx` for a complete example of how to use the design system. 