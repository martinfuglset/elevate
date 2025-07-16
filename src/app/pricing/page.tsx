'use client'

import { Header, Footer } from '@/components/homepage'
import { PricingSection } from '@/components/homepage/pricing-section'

export default function PricingPage() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="pt-16">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
} 