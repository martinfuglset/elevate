'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/lib/language-context'

export function Header() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-card' : ''
    }`}>
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center text-foreground">
            <Link href="/">
              <Logo width={108} height={108} className="mr-2" />
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