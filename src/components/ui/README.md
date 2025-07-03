# Custom Button System

This is the single source of truth for all buttons in the Elevate application.

## Overview

The `CustomButton` component provides a single outlined variant with a thin white border, perfect for all button use cases across the application.

## Usage

```tsx
import { CustomButton } from '@/components/ui/custom-button'

// Standard button
<CustomButton size="lg">
  Action
</CustomButton>

// With Link
<CustomButton asChild size="lg">
  <Link href="/dashboard">Go to Dashboard</Link>
</CustomButton>
```

## Button Style

### Single Outlined Variant
- **Background**: Transparent
- **Border**: White 1px
- **Text**: White
- **Hover**: Semi-transparent white background with backdrop blur and scale effect
- **Use case**: All button actions across the application

## Sizes

- `sm`: Small buttons (h-10, px-6, text-sm)
- `default`: Standard buttons (h-12, px-8, text-base)
- `lg`: Large buttons (h-14, px-10, text-lg)
- `xl`: Extra large buttons (h-16, px-12, text-xl)

## Features

- **Fully rounded**: All buttons use `rounded-full` for consistent styling
- **Smooth animations**: 300ms transitions with consistent hover effects
- **Hover effects**: Scale (105%) and shadow enhancement on all buttons
- **Accessibility**: Proper focus states and ARIA support
- **Flexible**: Works with `asChild` prop for Link components
- **Consistent**: Single source of truth for all button styling

## Migration

To migrate from the old Button component:

1. Replace `import { Button } from '@/components/ui/button'` with `import { CustomButton } from '@/components/ui/custom-button'`
2. Replace `Button` with `CustomButton`
3. Remove all `variant` props (no longer needed)
4. Map sizes:
   - `size="icon"` → `size="sm"` (and adjust styling if needed)

## Best Practices

1. **Be consistent with sizes**: Use the same size for related buttons
2. **Consider context**: Works well on colored backgrounds
3. **Accessibility**: Always provide meaningful text for screen readers
4. **Simplicity**: Single variant reduces complexity and improves consistency 