# Homepage Components

This directory contains modular components for the homepage, making the codebase more maintainable and reusable.

## Component Structure

```
src/components/homepage/
├── index.ts                 # Exports all components
├── header.tsx              # Navigation header with logo and menu
├── hero-section.tsx        # Hero section with animated background
├── features-section.tsx    # Features grid with cards
├── stats-section.tsx       # Statistics display
├── testimonials-section.tsx # Customer testimonials
├── pricing-section.tsx     # Pricing plans
├── cta-section.tsx         # Call-to-action section
├── footer.tsx              # Footer with links and company info
└── README.md               # This file
```

## Usage

Import all components from the index file:

```tsx
import {
  Header,
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  Footer
} from '@/components/homepage'
```

## Benefits of This Structure

✅ **Maintainability** - Each component is focused on a single responsibility  
✅ **Reusability** - Components can be easily reused across different pages  
✅ **Testability** - Individual components can be tested in isolation  
✅ **Performance** - Better code splitting and lazy loading opportunities  
✅ **Collaboration** - Multiple developers can work on different components  
✅ **Scalability** - Easy to add new sections or modify existing ones  

## Color Scheme

All components use the consistent color scheme:
- **Primary**: `#023D3E` (deep teal)
- **Hover**: `#012A2B` (darker teal)
- **Neutrals**: Slate colors for text and backgrounds
- **Accents**: Amber for stars, Emerald for checkmarks

## Customization

Each component accepts props for customization. For example:

```tsx
// Customize features
const customFeatures = [
  {
    icon: Target,
    title: "Custom Feature",
    description: "Your custom description"
  }
]

<FeaturesSection features={customFeatures} />
```

## Adding New Sections

To add a new section:

1. Create a new component file (e.g., `new-section.tsx`)
2. Export it from `index.ts`
3. Import and use it in the main homepage

```tsx
// new-section.tsx
export function NewSection() {
  return (
    <section className="py-20 bg-white">
      {/* Your content */}
    </section>
  )
}

// index.ts
export { NewSection } from './new-section'

// page.tsx
import { NewSection } from '@/components/homepage'
``` 