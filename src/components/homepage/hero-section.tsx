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
      <section className="py-16 md:py-20 lg:py-24 w-full bg-transparent">
        <div className="flex flex-col items-center text-center py-12 md:py-16 lg:py-20">
          {/* Badge with consistent styling */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 md:mb-8 bg-transparent">
            <Sparkles className="h-4 w-4 text-black mr-2" />
            <span className="text-sm text-black">AI-Powered Leadership Development</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-black mb-4 md:mb-6 leading-tight font-medium tracking-tight">
            Transform Leaders,<br />
            Transform Organizations
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-black mb-8 md:mb-10 max-w-2xl md:max-w-3xl leading-relaxed opacity-95">
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