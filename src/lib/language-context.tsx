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
    'hero.title': 'Develop Your Leadership Talent with Precision',
    'hero.subtitle': 'Empower the leaders in your organization to reach their full potential with our executive development platform. Transform your company from the top down.',
    'hero.cta.primary': 'Start Developing Leaders',
    'hero.cta.secondary': 'Watch Demo',
    
    // Features Section
    'features.title': 'Everything you need to build exceptional leaders',
    'features.subtitle': 'Comprehensive tools designed to help executives develop and nurture leadership talent throughout their organization.',
    'features.ai.title': 'AI-Powered Leadership Insights',
    'features.ai.description': 'Get deep insights into each leader\'s strengths, development areas, and potential with our advanced AI assessment system.',
    'features.results.title': 'Measurable Development',
    'features.results.description': 'Track leadership growth across your organization with data-driven insights and proven development methodologies.',
    'features.coaching.title': 'Executive Development Tools',
    'features.coaching.description': 'Access proven frameworks, coaching resources, and development plans tailored for each leader in your organization.',
    
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
    'footer.description': 'The leading AI-powered platform for executive leadership development. We help executives develop exceptional leadership talent throughout their organization through proven methodologies and data-driven insights.',
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
    'hero.title': 'Utvikle ditt ledertalent med presisjon',
    'hero.subtitle': 'Støtt lederne i organisasjonen din til å nå sitt fulle potensial med vår lederutviklingsplattform. Transformer selskapet ditt fra toppen og ned.',
    'hero.cta.primary': 'Start å utvikle ledere',
    'hero.cta.secondary': 'Se demo',
    
    // Features Section
    'features.title': 'Alt du trenger for å bygge eksepsjonelle ledere',
    'features.subtitle': 'Omfattende verktøy designet for å hjelpe ledere å utvikle og fostre ledertalent gjennom hele organisasjonen.',
    'features.ai.title': 'AI-drevne lederinnsikter',
    'features.ai.description': 'Få dype innsikter i hver leders styrker, utviklingsområder og potensial med vårt avanserte AI-vurderingssystem.',
    'features.results.title': 'Målbare utvikling',
    'features.results.description': 'Spor lederutvikling på tvers av organisasjonen din med datadrevne innsikter og beviste utviklingsmetodologier.',
    'features.coaching.title': 'Lederutviklingsverktøy',
    'features.coaching.description': 'Få tilgang til beviste rammeverk, coaching-ressurser og utviklingsplaner tilpasset hver leder i organisasjonen din.',
    
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
    'footer.description': 'Den ledende AI-drevne plattformen for lederutvikling. Vi hjelper ledere å utvikle eksepsjonelt ledertalent gjennom hele organisasjonen gjennom beviste metodologier og datadrevne innsikter.',
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