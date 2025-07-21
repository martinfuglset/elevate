'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  Footer
} from '@/components/homepage'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col gap-4">
          <HeroSection />
          <FeaturesSection />
        </div>
      </main>

      <Footer />
    </div>
  )
} 