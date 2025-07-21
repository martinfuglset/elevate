'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/lib/language-context'
import { handleAnchorClick } from '@/lib/utils'

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src="/elevate-logo.svg" alt="Elevate Logo" width={108} height={108} className="mr-2" />
            </Link>
          </div>

          {/* Language Switcher and CTA */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <Button asChild variant="outline" size="sm">
              <Link href="/login">{t('nav.login')}</Link>
            </Button>
            <Button asChild variant="default" size="sm">
              <Link href="/signup">{t('nav.signup')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 