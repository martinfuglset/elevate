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
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 w-full bg-transparent">
        <div className="flex flex-col items-center text-center py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6">
          {/* Badge with consistent styling */}
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 md:mb-6 bg-transparent">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-foreground mr-2" />
            <span className="text-sm sm:text-base text-foreground">AI-Powered Leadership Development</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground mb-3 md:mb-4 leading-tight font-medium tracking-tight px-2 sm:px-0">
            Transform Leaders<br />
            Transform Organizations
          </h1>
          
          <p className="text-lg sm:text-xl text-foreground mb-6 md:mb-8 max-w-2xl md:max-w-3xl leading-relaxed opacity-95 px-2 sm:px-0">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex justify-center w-full sm:w-auto px-4 sm:px-0">
            <Button 
              size="lg" 
              className="relative rounded-full bg-background text-foreground px-6 sm:px-8 py-3 text-base sm:text-lg border border-border overflow-hidden group transition-all duration-300 hover:border-foreground w-full sm:w-auto"
              onClick={() => setIsAssessmentModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200 dark:from-purple-800 dark:via-indigo-800 dark:to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x-reverse"></div>
              <span className="relative z-10 flex items-center justify-center sm:justify-start">
                Take need analysis
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-foreground group-hover:translate-x-1 transition-transform duration-300" />
              </span>
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