'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function HeroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Badge with consistent styling */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8">
              <Sparkles className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted by 500+ executives developing leadership talent</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex mb-12">
              <Button asChild size="lg">
                <Link href="/assessment">
                  Assess Your Leadership Talent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Image
                src="/Frame 14.png"
                alt="Leadership Development Platform"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 