'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  Footer
} from '@/components/homepage'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-16">
        <div className="m-4 overflow-x-hidden flex flex-col gap-4">
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
        </div>
      </main>

      <Footer />
    </div>
  )
} 