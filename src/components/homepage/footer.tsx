'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/lib/language-context'
import { handleAnchorClick } from '@/lib/utils'

export function Footer() {
  const { t } = useLanguage()
  
  const productLinks = [
    { href: "#features", label: t('footer.product.features') },
    { href: "#pricing", label: t('footer.product.pricing') }
  ]

  const companyLinks = [
    { href: "#", label: t('footer.company.about') },
    { href: "#", label: t('footer.company.careers') },
    { href: "#", label: t('footer.company.blog') },
    { href: "#", label: t('footer.company.contact') }
  ]

  const legalLinks = [
    { href: "#", label: t('footer.legal.privacy') },
    { href: "#", label: t('footer.legal.terms') },
    { href: "#", label: t('footer.legal.cookies') }
  ]

  return (
    <footer className="pt-4 pb-6 w-full">
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mx-2 sm:mx-3 md:mx-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <div className="flex items-center mb-4 sm:mb-6 text-foreground">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-6 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg text-foreground mb-3 sm:mb-4">{t('footer.product.title')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm sm:text-base text-foreground hover:text-muted-foreground transition-colors link-underline"
                    onClick={(e) => handleAnchorClick(link.href, e)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base sm:text-lg text-foreground mb-3 sm:mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm sm:text-base text-foreground hover:text-muted-foreground transition-colors link-underline"
                    onClick={(e) => handleAnchorClick(link.href, e)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-lg text-foreground mb-3 sm:mb-4">{t('footer.legal.title')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm sm:text-base text-foreground hover:text-muted-foreground transition-colors link-underline"
                    onClick={(e) => handleAnchorClick(link.href, e)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-foreground text-center font-normal">
            © {new Date().getFullYear()} Elevate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 