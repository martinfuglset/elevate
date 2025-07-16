'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/lib/language-context'
import { handleAnchorClick } from '@/lib/utils'

export function Footer() {
  const { t } = useLanguage()
  
  const productLinks = [
    { href: "#features", label: t('footer.product.features') },
    { href: "#pricing", label: t('footer.product.pricing') },
    { href: "#testimonials", label: t('footer.product.testimonials') }
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
    <footer className="bg-[#f3f4f6] rounded-3xl overflow-x-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Image src="/Frame 15.svg" alt="Elevate Logo" width={108} height={108} className="mr-2" />
            </div>
            <p className="text-black mb-6 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">{t('footer.product.title')}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-black hover:text-gray-700 transition-colors font-medium link-underline"
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
            <h3 className="text-lg font-medium text-black mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-black hover:text-gray-700 transition-colors font-medium link-underline"
                    onClick={(e) => handleAnchorClick(link.href, e)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Removed horizontal line divider */}

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-black text-sm font-medium">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="text-black hover:text-gray-700 text-sm transition-colors font-medium link-underline"
                onClick={(e) => handleAnchorClick(link.href, e)}
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