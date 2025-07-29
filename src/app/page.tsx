'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  StatsSection,
  PricingSection,
  CTASection,
  Footer
} from '@/components/homepage'

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      
      <main className="pt-24">
        <div className="flex flex-col gap-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <HeroSection />
          </div>
          
          {/* Combined Card with all sections */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border mx-3 md:mx-6">
            <FeaturesSection />
            
            <div className="my-16">
              <StatsSection />
            </div>

            <div className="my-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-foreground mb-6">What Our Customers Say</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of satisfied customers who have transformed their businesses with our platform.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-2xl bg-muted/50">
                  <div className="text-amber-400 mb-4 flex justify-center">
                    ★★★★★
                  </div>
                  <p className="text-foreground mb-4 italic">
                    "The AI-powered insights helped us identify leadership gaps we didn't even know existed. Our executive team is now more aligned than ever."
                  </p>
                  <div className="font-semibold text-foreground">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">CEO, TechFlow Solutions</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-muted/50">
                  <div className="text-amber-400 mb-4 flex justify-center">
                    ★★★★★
                  </div>
                  <p className="text-foreground mb-4 italic">
                    "The development programs are incredibly personalized. Each leader gets exactly what they need to grow and succeed."
                  </p>
                  <div className="font-semibold text-foreground">Michael Rodriguez</div>
                  <div className="text-sm text-muted-foreground">VP of HR, Global Innovations</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-muted/50">
                  <div className="text-amber-400 mb-4 flex justify-center">
                    ★★★★★
                  </div>
                  <p className="text-foreground mb-4 italic">
                    "We've seen a 40% improvement in leadership effectiveness scores since implementing this platform. The results speak for themselves."
                  </p>
                  <div className="font-semibold text-foreground">Jennifer Park</div>
                  <div className="text-sm text-muted-foreground">COO, Future Forward Inc</div>
                </div>
              </div>
            </div>

            <div className="my-16">
              <PricingSection />
            </div>

            <div className="my-16">
              <CTASection />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 