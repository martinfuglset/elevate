import React from 'react'
import { useDesignSystem, useStyles } from '@/lib/use-design-system'
import { typography } from '@/lib/design-system'

/**
 * Example component demonstrating how to use the design system
 */
export function DesignSystemExample() {
  const { typography: typographyHelpers } = useDesignSystem()
  const styles = useStyles()

  return (
    <div className="p-8 space-y-8">
      {/* Typography Examples */}
      <section>
        <h2 className="text-2xl font-sans font-normal mb-4">Typography Examples</h2>
        
        <div className="space-y-4">
          <h1 style={styles.h1}>Heading 1 - Geist Sans Font</h1>
          <h2 style={styles.h2}>Heading 2 - Geist Sans Font</h2>
          <h3 style={styles.h3}>Heading 3 - Geist Sans Font</h3>
          <h4 style={styles.h4}>Heading 4 - Geist Sans Font</h4>
          <h5 style={styles.h5}>Heading 5 - Geist Sans Font</h5>
          <h6 style={styles.h6}>Heading 6 - Geist Sans Font</h6>
          
          <p style={styles.bodyLarge}>Body Large - Geist Sans Font</p>
          <p style={styles.body}>Body - Geist Sans Font</p>
          <p style={styles.bodySmall}>Body Small - Geist Sans Font</p>
          
          <p style={styles.label}>Label - Geist Sans Font Medium</p>
          <p style={styles.caption}>Caption - Geist Sans Font</p>
          
          <code style={styles.code}>Code - Geist Mono Font</code>
          <pre style={styles.codeLarge}>Code Large - Geist Mono Font</pre>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-sans font-normal mb-4">Usage Examples</h2>
        
        <div className="space-y-4">
          {/* Using the hook helpers */}
          <div>
            <h3 className="text-lg font-sans font-normal mb-2">Using Hook Helpers</h3>
            <p style={{ 
              fontFamily: typographyHelpers.h1().fontFamily,
              fontSize: typographyHelpers.h1().fontSize,
            }}>
              This text uses the design system hook helpers
            </p>
          </div>

          {/* Using direct imports */}
          <div>
            <h3 className="text-lg font-sans font-normal mb-2">Using Direct Imports</h3>
            <p style={{ 
              fontFamily: typography.body.fontFamily,
              fontSize: typography.body.fontSize,
            }}>
              This text uses direct imports from the design system
            </p>
          </div>

          {/* Using Tailwind classes */}
          <div>
            <h3 className="text-lg font-sans font-normal mb-2">Using Tailwind Classes</h3>
            <p className="font-sans text-base">
              This text uses Tailwind classes that are configured with the design system
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 