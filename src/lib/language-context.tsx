'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en'

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
    'features.analytics.title': 'Leadership Analytics',
    'features.analytics.description': 'Comprehensive dashboards and reports to track leadership effectiveness, team performance, and organizational impact.',
    'features.community.title': 'Peer Learning Network',
    'features.community.description': 'Connect leaders across your organization for peer coaching, knowledge sharing, and collaborative development.',
    'features.compliance.title': 'Compliance & Certification',
    'features.compliance.description': 'Ensure your leadership development programs meet industry standards and regulatory requirements with built-in compliance tracking.',
    
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
    'footer.legal.title': 'Legal',
    'footer.legal.privacy': 'Privacy',
    'footer.legal.terms': 'Terms',
    'footer.legal.cookies': 'Cookies',
  }
}

// Detect user's location and set default language
const detectUserLanguage = (): Language => {
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
    setLanguageState('en')
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', 'en')
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