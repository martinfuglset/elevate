'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/lib/language-context'
import { handleAnchorClick } from '@/lib/utils'

export function CTASection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-900/20"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
          {t('cta.badge')}
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg">
            <Link href="/login">{t('cta.button')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
            <Link href="#demo" onClick={(e) => handleAnchorClick("#demo", e)}>{t('hero.cta.secondary')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 