'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { handleAnchorClick } from '@/lib/utils'
import { AssessmentModal } from '@/components/assessment-modal'
import { useState } from 'react'

export function HeroSection() {
  const { t } = useLanguage()
  const [showAssessment, setShowAssessment] = useState(false)
  
  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with enhanced animations */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-teal-600/20 to-teal-800/10 rounded-full blur-xl opacity-40 animate-float animate-pulse-glow"></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-gradient-to-br from-teal-600/15 to-teal-800/5 rounded-full blur-xl opacity-30 animate-float-delay-1 animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-gradient-to-br from-teal-600/10 to-teal-800/5 rounded-full blur-xl opacity-30 animate-float-delay-2 animate-pulse-glow"></div>
        
        {/* Additional smaller orbs */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full blur-lg opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-br from-teal-600/20 to-teal-800/10 rounded-full blur-lg opacity-25 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Organic particle system with varied movements */}
        <div className="absolute inset-0">
          {/* Organic floating particles with rotation and scaling */}
          <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-teal-600 rounded-full opacity-60" style={{ animation: 'organic-float-1 8s ease-in-out infinite', animationDelay: '0s' }}></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-teal-600/80 rounded-full opacity-50" style={{ animation: 'organic-float-2 10s ease-in-out infinite', animationDelay: '1.5s' }}></div>
          <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-teal-600/60 rounded-full opacity-40" style={{ animation: 'organic-float-3 12s ease-in-out infinite', animationDelay: '0.8s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-teal-600/70 rounded-full opacity-55" style={{ animation: 'organic-float-4 9s ease-in-out infinite', animationDelay: '2.2s' }}></div>
          <div className="absolute top-1/3 left-1/6 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-45" style={{ animation: 'organic-float-5 11s ease-in-out infinite', animationDelay: '0.3s' }}></div>
          <div className="absolute top-2/5 right-1/3 w-1 h-1 bg-teal-600/80 rounded-full opacity-50" style={{ animation: 'organic-float-6 7s ease-in-out infinite', animationDelay: '1.7s' }}></div>
          
          {/* Additional organic particles with varied positions and timings */}
          <div className="absolute top-1/6 left-1/4 w-1 h-1 bg-teal-600/60 rounded-full opacity-40" style={{ animation: 'organic-float-1 9.5s ease-in-out infinite', animationDelay: '3.1s' }}></div>
          <div className="absolute top-1/5 right-1/5 w-1.5 h-1.5 bg-teal-600/50 rounded-full opacity-35" style={{ animation: 'organic-float-2 8.5s ease-in-out infinite', animationDelay: '0.9s' }}></div>
          <div className="absolute top-1/2 left-1/8 w-1 h-1 bg-teal-600/70 rounded-full opacity-45" style={{ animation: 'organic-float-3 10.5s ease-in-out infinite', animationDelay: '2.8s' }}></div>
          <div className="absolute top-3/5 right-1/6 w-1.5 h-1.5 bg-teal-600/60 rounded-full opacity-40" style={{ animation: 'organic-float-4 7.8s ease-in-out infinite', animationDelay: '1.2s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-teal-600/80 rounded-full opacity-50" style={{ animation: 'organic-float-5 11.2s ease-in-out infinite', animationDelay: '0.6s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-35" style={{ animation: 'organic-float-6 8.8s ease-in-out infinite', animationDelay: '2.4s' }}></div>
          
          {/* More particles for density */}
          <div className="absolute top-1/8 left-1/2 w-1 h-1 bg-teal-600/70 rounded-full opacity-30" style={{ animation: 'organic-float-1 12.5s ease-in-out infinite', animationDelay: '1.8s' }}></div>
          <div className="absolute top-1/7 right-1/8 w-1.5 h-1.5 bg-teal-600/60 rounded-full opacity-40" style={{ animation: 'organic-float-2 9.2s ease-in-out infinite', animationDelay: '0.4s' }}></div>
          <div className="absolute top-1/4 left-2/3 w-1 h-1 bg-teal-600/80 rounded-full opacity-45" style={{ animation: 'organic-float-3 10.8s ease-in-out infinite', animationDelay: '3.3s' }}></div>
          <div className="absolute top-1/3 right-2/5 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-35" style={{ animation: 'organic-float-4 8.1s ease-in-out infinite', animationDelay: '1.6s' }}></div>
          <div className="absolute top-2/5 left-4/5 w-1 h-1 bg-teal-600/70 rounded-full opacity-40" style={{ animation: 'organic-float-5 11.8s ease-in-out infinite', animationDelay: '0.7s' }}></div>
          <div className="absolute top-1/2 right-1/8 w-1.5 h-1.5 bg-teal-600/60 rounded-full opacity-30" style={{ animation: 'organic-float-6 9.7s ease-in-out infinite', animationDelay: '2.9s' }}></div>
          
          {/* Bottom section particles */}
          <div className="absolute bottom-1/4 left-1/6 w-1 h-1 bg-teal-600/50 rounded-full opacity-40" style={{ animation: 'organic-float-1 10.3s ease-in-out infinite', animationDelay: '1.1s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-teal-600/60 rounded-full opacity-35" style={{ animation: 'organic-float-2 8.9s ease-in-out infinite', animationDelay: '2.6s' }}></div>
          <div className="absolute bottom-2/5 left-1/2 w-1 h-1 bg-teal-600/70 rounded-full opacity-45" style={{ animation: 'organic-float-3 11.5s ease-in-out infinite', animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-1/5 right-1/5 w-1.5 h-1.5 bg-teal-600/50 rounded-full opacity-40" style={{ animation: 'organic-float-4 9.4s ease-in-out infinite', animationDelay: '3.0s' }}></div>
          <div className="absolute bottom-1/6 left-3/4 w-1 h-1 bg-teal-300 rounded-full opacity-35" style={{ animation: 'organic-float-5 10.1s ease-in-out infinite', animationDelay: '1.4s' }}></div>
          <div className="absolute bottom-1/4 right-1/6 w-1.5 h-1.5 bg-teal-600/60 rounded-full opacity-40" style={{ animation: 'organic-float-6 8.6s ease-in-out infinite', animationDelay: '2.1s' }}></div>
        </div>
        
        {/* Larger floating particles with organic movements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-600 rounded-full opacity-60" style={{ animation: 'organic-float-1 15s ease-in-out infinite', animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-teal-600/80 rounded-full opacity-60" style={{ animation: 'organic-float-2 18s ease-in-out infinite', animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-teal-600/70 rounded-full opacity-60" style={{ animation: 'organic-float-3 20s ease-in-out infinite', animationDelay: '1.5s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-teal-600/80 rounded-full opacity-60" style={{ animation: 'organic-float-4 16s ease-in-out infinite', animationDelay: '4.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-teal-400 rounded-full opacity-60" style={{ animation: 'organic-float-5 22s ease-in-out infinite', animationDelay: '2.2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-teal-600/70 rounded-full opacity-60" style={{ animation: 'organic-float-6 17s ease-in-out infinite', animationDelay: '6s' }}></div>
        
        {/* Additional larger particles for more organic feel */}
        <div className="absolute top-1/6 right-1/6 w-1.5 h-1.5 bg-teal-600/60 rounded-full opacity-50" style={{ animation: 'organic-float-1 19s ease-in-out infinite', animationDelay: '1.8s' }}></div>
        <div className="absolute bottom-1/6 left-1/6 w-2 h-2 bg-teal-600/70 rounded-full opacity-55" style={{ animation: 'organic-float-2 21s ease-in-out infinite', animationDelay: '4.2s' }}></div>
        <div className="absolute top-3/4 left-1/4 w-1.5 h-1.5 bg-teal-600/80 rounded-full opacity-50" style={{ animation: 'organic-float-3 23s ease-in-out infinite', animationDelay: '0.7s' }}></div>
        
        {/* Subtle wave effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10"></div>
      </div>
    
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-600/10 border border-teal-600/20 mb-8">
        <Sparkles className="h-4 w-4 text-teal-600 mr-2" />
        <span className="text-sm font-medium text-teal-600">Join 10,000+ leaders transforming their careers</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
        {t('hero.title')}
      </h1>
      <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
        {t('hero.subtitle')}
      </p>
      <div className="flex justify-center mb-12">
        <Button asChild size="lg" className="px-8 py-3 text-lg">
          <Link href="/assessment">
            Take need assessment now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Social Proof */}
      <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-teal-600 border-2 border-white"></div>
            ))}
          </div>
          <span>Trusted by 10,000+ leaders</span>
        </div>
        <div className="flex items-center">
          <div className="flex mr-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
            ))}
          </div>
          <span>4.9/5 rating</span>
        </div>
      </div>
    </div>
    <AssessmentModal isOpen={showAssessment} onClose={() => setShowAssessment(false)} />
  </section>
  )
} 