import React from 'react'
import { useDesignSystem, useStyles } from '@/lib/use-design-system'
import { colors, typography } from '@/lib/design-system'

/**
 * Example component demonstrating how to use the design system
 */
export function DesignSystemExample() {
  const { typography: typographyHelpers, colors: colorHelpers } = useDesignSystem()
  const styles = useStyles()

  return (
    <div className="p-8 space-y-8">
      {/* Typography Examples */}
      <section>
        <h2 className="text-2xl font-serif font-normal mb-4">Typography Examples</h2>
        
        <div className="space-y-4">
          <h1 style={styles.h1}>Heading 1 - Serif Font</h1>
          <h2 style={styles.h2}>Heading 2 - Serif Font</h2>
          <h3 style={styles.h3}>Heading 3 - Serif Font</h3>
          <h4 style={styles.h4}>Heading 4 - Serif Font</h4>
          <h5 style={styles.h5}>Heading 5 - Serif Font</h5>
          <h6 style={styles.h6}>Heading 6 - Serif Font</h6>
          
          <p style={styles.bodyLarge}>Body Large - Sans Font</p>
          <p style={styles.body}>Body - Sans Font</p>
          <p style={styles.bodySmall}>Body Small - Sans Font</p>
          
          <p style={styles.label}>Label - Sans Font Medium</p>
          <p style={styles.caption}>Caption - Sans Font</p>
          
          <code style={styles.code}>Code - Mono Font</code>
          <pre style={styles.codeLarge}>Code Large - Mono Font</pre>
        </div>
      </section>

      {/* Color Examples */}
      <section>
        <h2 className="text-2xl font-serif font-normal mb-4">Color Examples</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-lg mb-2"
              style={{ backgroundColor: colors.black }}
            ></div>
            <p className="text-sm">Black</p>
            <p className="text-xs text-gray-500">{colors.black}</p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-lg mb-2 border border-gray-300"
              style={{ backgroundColor: colors.white }}
            ></div>
            <p className="text-sm">White</p>
            <p className="text-xs text-gray-500">{colors.white}</p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-lg mb-2"
              style={{ backgroundColor: colors.teal }}
            ></div>
            <p className="text-sm">Teal</p>
            <p className="text-xs text-gray-500">{colors.teal}</p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-lg mb-2"
              style={{ backgroundColor: colors.cream }}
            ></div>
            <p className="text-sm">Cream</p>
            <p className="text-xs text-gray-500">{colors.cream}</p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-lg mb-2"
              style={{ backgroundColor: colors.gray }}
            ></div>
            <p className="text-sm">Gray</p>
            <p className="text-xs text-gray-500">{colors.gray}</p>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-serif font-normal mb-4">Usage Examples</h2>
        
        <div className="space-y-4">
          {/* Using the hook helpers */}
          <div>
            <h3 className="text-lg font-serif font-normal mb-2">Using Hook Helpers</h3>
            <p style={{ 
              fontFamily: typographyHelpers.h1().fontFamily,
              fontSize: typographyHelpers.h1().fontSize,
              color: colorHelpers.teal()
            }}>
              This text uses the design system hook helpers
            </p>
          </div>

          {/* Using direct imports */}
          <div>
            <h3 className="text-lg font-serif font-normal mb-2">Using Direct Imports</h3>
            <p style={{ 
              fontFamily: typography.body.fontFamily,
              fontSize: typography.body.fontSize,
              color: colors.gray
            }}>
              This text uses direct imports from the design system
            </p>
          </div>

          {/* Using Tailwind classes */}
          <div>
            <h3 className="text-lg font-serif font-normal mb-2">Using Tailwind Classes</h3>
            <p className="font-sans text-gray text-base">
              This text uses Tailwind classes that are configured with the design system
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 