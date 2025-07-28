'use client'

import Link from 'next/link'
import Image from 'next/image'
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
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 mx-4 md:mx-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Link href="/">
                <Image src="/elevate-logo.svg" alt="Elevate Logo" width={108} height={108} className="mr-2" />
              </Link>
            </div>
            <p className="text-black mb-6 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-black mb-4">{t('footer.product.title')}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-black hover:text-gray-700 transition-colors link-underline"
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
            <h3 className="text-lg text-black mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-black hover:text-gray-700 transition-colors link-underline"
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
            <h3 className="text-lg text-black mb-4">{t('footer.legal.title')}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-black hover:text-gray-700 transition-colors link-underline"
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
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-black text-sm text-center font-normal">
            © {new Date().getFullYear()} Elevate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 