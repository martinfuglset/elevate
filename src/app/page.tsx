'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  Footer
} from '@/components/homepage'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>

      <Footer />
    </div>
  )
} 