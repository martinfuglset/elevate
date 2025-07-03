'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'no'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.help': 'Help',
    'nav.settings': 'Settings',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.testimonials': 'Testimonials',
    
    // Hero Section
    'hero.title': 'Transform Your Business with AI-Powered Solutions',
    'hero.subtitle': 'Streamline operations, boost productivity, and drive growth with our comprehensive SaaS platform designed for modern businesses.',
    'hero.cta.primary': 'Get Started Free',
    'hero.cta.secondary': 'Watch Demo',
    
    // Features Section
    'features.title': 'Everything you need to succeed',
    'features.subtitle': 'Powerful features designed to help your business grow and scale efficiently.',
    'features.ai.title': 'AI-Powered Assessments',
    'features.ai.description': 'Get personalized insights into your leadership style with our advanced AI that analyzes your strengths and growth areas.',
    'features.results.title': 'Proven Results',
    'features.results.description': 'Track your progress with data-driven insights and see measurable improvements in your leadership effectiveness.',
    'features.coaching.title': 'Expert Coaching',
    'features.coaching.description': 'Connect with certified leadership coaches and join a community of aspiring leaders for peer learning.',
    
    // Stats Section
    'stats.title': 'Trusted by businesses worldwide',
    
    // Testimonials Section
    'testimonials.title': 'What our customers say',
    'testimonials.subtitle': 'Join thousands of satisfied customers who have transformed their businesses with our platform.',
    
    // Pricing Section
    'pricing.title': 'Simple, transparent pricing',
    'pricing.subtitle': 'Choose the plan that works best for your business. No hidden fees, no surprises.',
    'pricing.monthly': 'Monthly',
    'pricing.yearly': 'Yearly',
    'pricing.save': 'Save 20%',
    
    // CTA Section
    'cta.badge': 'Ready to Transform?',
    'cta.title': 'Start Your Leadership Journey Today',
    'cta.subtitle': 'Join thousands of leaders who have transformed their careers and organizations with Elevate.',
    'cta.button': 'Start Free Trial',
    
    // Footer
    'footer.copyright': '© 2024 Elevate. All rights reserved.',
    'footer.description': 'The leading AI-powered platform for leadership development. We help leaders reach their full potential through personal coaching and proven methodologies.',
    'footer.product.title': 'Product',
    'footer.product.features': 'Features',
    'footer.product.pricing': 'Pricing',
    'footer.product.integrations': 'Integrations',
    'footer.product.api': 'API',
    'footer.company.title': 'Company',
    'footer.company.about': 'About',
    'footer.company.careers': 'Careers',
    'footer.company.blog': 'Blog',
    'footer.company.contact': 'Contact',
    'footer.legal.privacy': 'Privacy',
    'footer.legal.terms': 'Terms',
    'footer.legal.cookies': 'Cookies',
  },
  no: {
    // Navigation
    'nav.home': 'Hjem',
    'nav.dashboard': 'Dashboard',
    'nav.help': 'Hjelp',
    'nav.settings': 'Innstillinger',
    'nav.login': 'Logg inn',
    'nav.signup': 'Registrer deg',
    'nav.features': 'Funksjoner',
    'nav.pricing': 'Prising',
    'nav.about': 'Om oss',
    'nav.testimonials': 'Anmeldelser',
    
    // Hero Section
    'hero.title': 'Transformer bedriften din med AI-drevne løsninger',
    'hero.subtitle': 'Strømlinjeform operasjoner, øk produktiviteten og driv vekst med vår omfattende SaaS-plattform designet for moderne bedrifter.',
    'hero.cta.primary': 'Kom i gang gratis',
    'hero.cta.secondary': 'Se demo',
    
    // Features Section
    'features.title': 'Alt du trenger for å lykkes',
    'features.subtitle': 'Kraftfulle funksjoner designet for å hjelpe bedriften din å vokse og skalere effektivt.',
    'features.ai.title': 'AI-drevne vurderinger',
    'features.ai.description': 'Få personlige innsikter i din lederstil med vår avanserte AI som analyserer dine styrker og utviklingsområder.',
    'features.results.title': 'Beviste resultater',
    'features.results.description': 'Spor fremgangen din med datadrevne innsikter og se målbare forbedringer i din ledereffektivitet.',
    'features.coaching.title': 'Ekspert coaching',
    'features.coaching.description': 'Koble deg til sertifiserte ledercoacher og bli med i et samfunn av aspirerende ledere for kollegial læring.',
    
    // Stats Section
    'stats.title': 'Betrodd av bedrifter verden over',
    
    // Testimonials Section
    'testimonials.title': 'Hva våre kunder sier',
    'testimonials.subtitle': 'Bli med tusenvis av fornøyde kunder som har transformert sine bedrifter med vår plattform.',
    
    // Pricing Section
    'pricing.title': 'Enkel, transparent prising',
    'pricing.subtitle': 'Velg planen som fungerer best for bedriften din. Ingen skjulte gebyrer, ingen overraskelser.',
    'pricing.monthly': 'Månedlig',
    'pricing.yearly': 'Årlig',
    'pricing.save': 'Spar 20%',
    
    // CTA Section
    'cta.badge': 'Klar til å transformere?',
    'cta.title': 'Start din lederreise i dag',
    'cta.subtitle': 'Bli med tusenvis av ledere som har transformert sine karrierer og organisasjoner med Elevate.',
    'cta.button': 'Start gratis prøveperiode',
    
    // Footer
    'footer.copyright': '© 2024 Elevate. Alle rettigheter forbeholdt.',
    'footer.description': 'Den ledende AI-drevne plattformen for lederutvikling. Vi hjelper ledere å nå sitt fulle potensial gjennom personlig coaching og beviste metodologier.',
    'footer.product.title': 'Produkt',
    'footer.product.features': 'Funksjoner',
    'footer.product.pricing': 'Prising',
    'footer.product.integrations': 'Integrasjoner',
    'footer.product.api': 'API',
    'footer.company.title': 'Selskap',
    'footer.company.about': 'Om oss',
    'footer.company.careers': 'Karrierer',
    'footer.company.blog': 'Blogg',
    'footer.company.contact': 'Kontakt',
    'footer.legal.privacy': 'Personvern',
    'footer.legal.terms': 'Vilkår',
    'footer.legal.cookies': 'Informasjonskapsler',
  }
}

// Detect user's location and set default language
const detectUserLanguage = (): Language => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return 'en'
  
  // First, check if user has a saved preference
  const savedLanguage = localStorage.getItem('preferred-language') as Language
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'no')) {
    return savedLanguage
  }
  
  // Check browser language
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('no') || browserLang.startsWith('nb') || browserLang.startsWith('nn')) {
    return 'no'
  }
  
  // Check timezone for Norway (Europe/Oslo)
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timezone === 'Europe/Oslo') {
      return 'no'
    }
  } catch (error) {
    // Fallback to browser language
  }
  
  // Default to English
  return 'en'
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')
  
  useEffect(() => {
    const detectedLanguage = detectUserLanguage()
    setLanguageState(detectedLanguage)
  }, [])
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 