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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/30 mb-4">
          <Rocket className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm text-primary">{t('cta.badge')}</span>
        </div>
                  <h2 className="text-4xl md:text-5xl text-foreground mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-muted-foreground mb-10">
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