'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/lib/language-context'
import { Rocket } from 'lucide-react'

export function CTASection() {
  const { t } = useLanguage()
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-300 mb-4">
          <Rocket className="h-4 w-4 text-blue-600 mr-2" />
          <span className="text-sm text-blue-700">{t('cta.badge')}</span>
        </div>
                  <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          {t('cta.subtitle')}
        </p>
        <Button asChild size="lg" className="px-10 py-6 text-lg rounded-full">
          <Link href="/assessment">
            {t('cta.button')}
          </Link>
        </Button>
      </div>
    </section>
  )
} 