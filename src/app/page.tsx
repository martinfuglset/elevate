'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  PricingSection,
  Footer
} from '@/components/homepage'

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      
      <main className="pt-16 sm:pt-24">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 sm:px-6 lg:px-8 xl:px-10">
            <HeroSection />
          </div>
          
          {/* Combined Card with all sections */}
          <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border mx-2 sm:mx-3 md:mx-6">
            <FeaturesSection />

            <div className="my-12 sm:my-16">
              <PricingSection />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 