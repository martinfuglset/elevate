// Design System - Single Source of Truth
// This file contains all design tokens and should be the only place to define these values

// ============================================================================
// FONTS
// ============================================================================

export const fonts = {
  serif: {
    family: 'Geist Sans, system-ui, -apple-system, sans-serif',
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  sans: {
    family: 'Geist Sans, system-ui, -apple-system, sans-serif',
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  mono: {
    family: 'Geist Mono, ui-monospace, SFMono-Regular, monospace',
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },
} as const

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================

export const typography = {
  // Headings - Use Geist Sans font
  h1: {
    fontFamily: fonts.serif.family,
    fontWeight: fonts.serif.weights.normal,
    fontSize: '3.5rem', // 56px
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: fonts.serif.family,
    fontWeight: fonts.serif.weights.normal,
    fontSize: '2.5rem', // 40px
    lineHeight: '1.2',
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: fonts.serif.family,
    fontWeight: fonts.serif.weights.normal,
    fontSize: '2rem', // 32px
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: fonts.serif.family,
    fontWeight: fonts.serif.weights.normal,
    fontSize: '1.5rem', // 24px
    lineHeight: '1.4',
    letterSpacing: '0',
  },
  h5: {
    fontFamily: fonts.serif.family,
    fontWeight: fonts.serif.weights.normal,
    fontSize: '1.25rem', // 20px
    lineHeight: '1.4',
    letterSpacing: '0',
  },
  h6: {
    fontFamily: fonts.serif.family,
    fontWeight: fonts.serif.weights.normal,
    fontSize: '1rem', // 16px
    lineHeight: '1.5',
    letterSpacing: '0',
  },

  // Body text - Use Geist Sans font
  body: {
    fontFamily: fonts.sans.family,
    fontWeight: fonts.sans.weights.normal,
    fontSize: '1rem', // 16px
    lineHeight: '1.6',
    letterSpacing: '0',
  },
  bodyLarge: {
    fontFamily: fonts.sans.family,
    fontWeight: fonts.sans.weights.normal,
    fontSize: '1.125rem', // 18px
    lineHeight: '1.6',
    letterSpacing: '0',
  },
  bodySmall: {
    fontFamily: fonts.sans.family,
    fontWeight: fonts.sans.weights.normal,
    fontSize: '0.875rem', // 14px
    lineHeight: '1.5',
    letterSpacing: '0',
  },

  // Caption and labels - Use Geist Sans font
  caption: {
    fontFamily: fonts.sans.family,
    fontWeight: fonts.sans.weights.normal,
    fontSize: '0.75rem', // 12px
    lineHeight: '1.4',
    letterSpacing: '0.01em',
  },
  label: {
    fontFamily: fonts.sans.family,
    fontWeight: fonts.sans.weights.medium,
    fontSize: '0.875rem', // 14px
    lineHeight: '1.4',
    letterSpacing: '0.01em',
  },

  // Code and technical text - Use Geist Mono font
  code: {
    fontFamily: fonts.mono.family,
    fontWeight: fonts.mono.weights.normal,
    fontSize: '0.875rem', // 14px
    lineHeight: '1.5',
    letterSpacing: '0',
  },
  codeLarge: {
    fontFamily: fonts.mono.family,
    fontWeight: fonts.mono.weights.normal,
    fontSize: '1rem', // 16px
    lineHeight: '1.5',
    letterSpacing: '0',
  },
} as const

// ============================================================================
// SPACING SCALE
// ============================================================================

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  full: '9999px',
  button: '9999px', // Full rounded for buttons
} as const

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get CSS properties for a typography variant
 */
export function getTypographyStyles(variant: keyof typeof typography) {
  return typography[variant]
}

/**
 * Get font family for a font type
 */
export function getFontFamily(type: keyof typeof fonts) {
  return fonts[type].family
}

/**
 * Get spacing value
 */
export function getSpacing(size: keyof typeof spacing) {
  return spacing[size]
}

/**
 * Get border radius value
 */
export function getBorderRadius(size: keyof typeof borderRadius) {
  return borderRadius[size]
}

/**
 * Get shadow value
 */
export function getShadow(size: keyof typeof shadows) {
  return shadows[size]
}

/**
 * Get breakpoint value
 */
export function getBreakpoint(size: keyof typeof breakpoints) {
  return breakpoints[size]
}

// ============================================================================
// CSS VARIABLES FOR GLOBAL USE
// ============================================================================

export const cssVariables = {
  // Font families
  '--font-serif': fonts.serif.family,
  '--font-sans': fonts.sans.family,
  '--font-mono': fonts.mono.family,

  // Spacing
  '--spacing-xs': spacing.xs,
  '--spacing-sm': spacing.sm,
  '--spacing-md': spacing.md,
  '--spacing-lg': spacing.lg,
  '--spacing-xl': spacing.xl,
  '--spacing-2xl': spacing['2xl'],
  '--spacing-3xl': spacing['3xl'],
  '--spacing-4xl': spacing['4xl'],

  // Border radius
  '--radius-none': borderRadius.none,
  '--radius-sm': borderRadius.sm,
  '--radius-md': borderRadius.md,
  '--radius-lg': borderRadius.lg,
  '--radius-xl': borderRadius.xl,
  '--radius-2xl': borderRadius['2xl'],
  '--radius-full': borderRadius.full,

  // Shadows
  '--shadow-sm': shadows.sm,
  '--shadow-md': shadows.md,
  '--shadow-lg': shadows.lg,
  '--shadow-xl': shadows.xl,
} as const

// ============================================================================
// TAILWIND CONFIG COMPATIBILITY
// ============================================================================

/**
 * Export design tokens in a format compatible with Tailwind config
 */
export const tailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        serif: [fonts.serif.family.split(',')[0], 'serif'],
        sans: [fonts.sans.family.split(',')[0], 'sans-serif'],
        mono: [fonts.mono.family.split(',')[0], 'monospace'],
      },
      spacing,
      borderRadius,
      boxShadow: shadows,
    },
  },
} as const

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type FontType = keyof typeof fonts
export type TypographyVariant = keyof typeof typography
export type SpacingSize = keyof typeof spacing
export type BorderRadiusSize = keyof typeof borderRadius
export type ShadowSize = keyof typeof shadows
export type BreakpointSize = keyof typeof breakpoints 