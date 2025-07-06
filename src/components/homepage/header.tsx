'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/lib/language-context'
import { handleAnchorClick } from '@/lib/utils'

export function Header() {
  const { t } = useLanguage()
  
  const navigationItems = [
    { href: "#features", label: t('nav.features') },
    { href: "#pricing", label: t('nav.pricing') },
    { href: "#testimonials", label: t('nav.testimonials') }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-medium text-gray-900">
              ELEVATE
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium link-underline"
                onClick={(e) => handleAnchorClick(item.href, e)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher and CTA */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild variant="default" size="sm">
              <Link href="/login">{t('nav.login')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 