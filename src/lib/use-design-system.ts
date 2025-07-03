import { useMemo } from 'react'
import { getTypographyStyles, getFontFamily, getColor, typography, fonts, colors } from './design-system'

/**
 * React hook for applying design system styles
 */
export function useDesignSystem() {
  const designSystem = useMemo(() => ({
    // Typography helpers
    typography: {
      h1: () => getTypographyStyles('h1'),
      h2: () => getTypographyStyles('h2'),
      h3: () => getTypographyStyles('h3'),
      h4: () => getTypographyStyles('h4'),
      h5: () => getTypographyStyles('h5'),
      h6: () => getTypographyStyles('h6'),
      body: () => getTypographyStyles('body'),
      bodyLarge: () => getTypographyStyles('bodyLarge'),
      bodySmall: () => getTypographyStyles('bodySmall'),
      caption: () => getTypographyStyles('caption'),
      label: () => getTypographyStyles('label'),
      code: () => getTypographyStyles('code'),
      codeLarge: () => getTypographyStyles('codeLarge'),
    },

    // Font helpers
    fonts: {
      serif: () => getFontFamily('serif'),
      sans: () => getFontFamily('sans'),
      mono: () => getFontFamily('mono'),
    },

    // Color helpers
    colors: {
      black: () => getColor('black'),
      white: () => getColor('white'),
      teal: () => getColor('teal'),
      cream: () => getColor('cream'),
      gray: () => getColor('gray'),
    },

    // Direct access to design tokens
    tokens: {
      typography,
      fonts,
      colors,
    },
  }), [])

  return designSystem
}

/**
 * Hook for getting CSS-in-JS styles
 */
export function useStyles() {
  const styles = useMemo(() => ({
    // Typography styles
    h1: {
      fontFamily: fonts.serif.family,
      fontWeight: fonts.serif.weights.normal,
      fontSize: '3.5rem',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: fonts.serif.family,
      fontWeight: fonts.serif.weights.normal,
      fontSize: '2.5rem',
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: fonts.serif.family,
      fontWeight: fonts.serif.weights.normal,
      fontSize: '2rem',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: fonts.serif.family,
      fontWeight: fonts.serif.weights.normal,
      fontSize: '1.5rem',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    h5: {
      fontFamily: fonts.serif.family,
      fontWeight: fonts.serif.weights.normal,
      fontSize: '1.25rem',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    h6: {
      fontFamily: fonts.serif.family,
      fontWeight: fonts.serif.weights.normal,
      fontSize: '1rem',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    body: {
      fontFamily: fonts.sans.family,
      fontWeight: fonts.sans.weights.normal,
      fontSize: '1rem',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    bodyLarge: {
      fontFamily: fonts.sans.family,
      fontWeight: fonts.sans.weights.normal,
      fontSize: '1.125rem',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    bodySmall: {
      fontFamily: fonts.sans.family,
      fontWeight: fonts.sans.weights.normal,
      fontSize: '0.875rem',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    caption: {
      fontFamily: fonts.sans.family,
      fontWeight: fonts.sans.weights.normal,
      fontSize: '0.75rem',
      lineHeight: '1.4',
      letterSpacing: '0.01em',
    },
    label: {
      fontFamily: fonts.sans.family,
      fontWeight: fonts.sans.weights.medium,
      fontSize: '0.875rem',
      lineHeight: '1.4',
      letterSpacing: '0.01em',
    },
    code: {
      fontFamily: fonts.mono.family,
      fontWeight: fonts.mono.weights.normal,
      fontSize: '0.875rem',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    codeLarge: {
      fontFamily: fonts.mono.family,
      fontWeight: fonts.mono.weights.normal,
      fontSize: '1rem',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
  }), [])

  return styles
} 