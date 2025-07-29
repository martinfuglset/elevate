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
      <section className="py-8 md:py-12 lg:py-16 w-full bg-transparent">
        <div className="flex flex-col items-center text-center py-6 md:py-8 lg:py-10">
          {/* Badge with consistent styling */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-4 md:mb-6 bg-transparent">
            <Sparkles className="h-4 w-4 text-foreground mr-2" />
            <span className="text-foreground">AI-Powered Leadership Development</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-foreground mb-3 md:mb-4 leading-tight font-medium tracking-tight">
            Transform Leaders<br />
            Transform Organizations
          </h1>
          
          <p className="text-xl text-foreground mb-6 md:mb-8 max-w-2xl md:max-w-3xl leading-relaxed opacity-95">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="rounded-full bg-background text-foreground hover:bg-muted transition-colors px-8 py-3 text-lg border border-border"
              onClick={() => setIsAssessmentModalOpen(true)}
            >
              Take need analysis
              <ArrowRight className="ml-2 h-5 w-5 text-foreground" />
            </Button>
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