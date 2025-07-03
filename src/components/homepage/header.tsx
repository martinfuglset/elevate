'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/lib/language-context'

export function Header() {
  const { t } = useLanguage()
  
  const navigationItems = [
    { href: "#features", label: t('nav.features') },
    { href: "#pricing", label: t('nav.pricing') },
    { href: "#about", label: t('nav.about') },
    { href: "#testimonials", label: t('nav.testimonials') }
  ]

  return (
    <header className="border-b border-slate-200/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <Image 
                src="/logo (1).svg" 
                alt="Elevate Logo" 
                width={120} 
                height={120}
                className="h-8 w-8"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#023D3E] rounded-full animate-pulse"></div>
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Elevate
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher and CTA */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild variant="default" className="bg-[#023D3E] hover:bg-[#012A2B] text-white">
              <Link href="/login">{t('nav.login')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 