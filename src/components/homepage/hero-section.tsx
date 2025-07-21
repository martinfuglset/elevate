'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { AssessmentModal } from '@/components/assessment/AssessmentModal'

export function HeroSection() {
  const { t } = useLanguage()
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)

  return (
    <>
      <section className="relative py-16 md:py-20 lg:py-24 w-full rounded-3xl overflow-x-hidden">
        {/* Blue Background with haze overlay */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none rounded-3xl">
          <div
            style={{
              backgroundImage: "url('/Frame 16.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 1,
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0,
              borderRadius: '1.5rem',
            }}
          />
          {/* Haze overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 70%, rgba(255,255,255,0.35) 0%, rgba(182,207,255,0.18) 40%, rgba(182,207,255,0.05) 80%, transparent 100%)',
            zIndex: 1,
            borderRadius: '1.5rem', // matches rounded-3xl
          }} />
        </div>
        <div className="relative z-10">
          <div className="rounded-3xl">
            <div className="flex flex-col items-center text-center py-12 md:py-16 lg:py-20">
              {/* Badge with consistent styling */}
              <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 md:mb-8">
                <Sparkles className="h-4 w-4 text-white mr-2" />
                <span className="text-sm text-white">AI-Powered Leadership Development</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 leading-tight font-medium tracking-tight">
                Transform Leaders,<br />
                Transform Organizations
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 max-w-2xl md:max-w-3xl leading-relaxed opacity-95">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-3 text-lg"
                  onClick={() => setIsAssessmentModalOpen(true)}
                >
                  Take need analysis
                  <ArrowRight className="ml-2 h-5 w-5 text-black" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onComplete={() => {
          setIsAssessmentModalOpen(false);
          // You can add additional logic here when the assessment is completed
          // For example, show a success message or navigate to another page
        }}
      />
    </>
  )
} 