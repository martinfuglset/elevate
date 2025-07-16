'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-24 w-full rounded-3xl overflow-x-hidden">
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
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl">
          <div className="flex flex-col items-center text-center py-16 px-4 sm:px-6 lg:px-8">
            {/* Badge with consistent styling */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white mb-4">
              <Sparkles className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">AI-Powered Leadership Development</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 leading-tight tracking-tight">
              Transform Leaders,<br />
              Transform Organizations
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex mb-12 justify-center">
              <Button asChild size="lg" className="rounded-xl bg-white text-black">
                <Link href="/assessment">
                  Take need analysis
                  <ArrowRight className="ml-2 h-5 w-5 text-black" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 