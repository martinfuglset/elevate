'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/lib/language-context'

export function Footer() {
  const { t } = useLanguage()
  
  const productLinks = [
    { href: "#", label: t('footer.product.features') },
    { href: "#", label: t('footer.product.pricing') },
    { href: "#", label: t('footer.product.integrations') },
    { href: "#", label: t('footer.product.api') }
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
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Image 
                src="/logo (1).svg" 
                alt="Elevate Logo" 
                width={40} 
                height={40}
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Elevate
              </span>
            </div>
            <p className="text-slate-600 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{t('footer.product.title')}</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 