'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  PricingSection,
  Footer
} from '@/components/homepage'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
      </main>

      <Footer />
    </div>
  )
} 