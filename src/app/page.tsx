'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CustomButton } from '@/components/ui/custom-button'
import { ArrowRight, Shield, Zap, Users, Target, TrendingUp, Menu, X, ChevronRight, Mail, Phone, MapPin, ChevronDown } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-teal font-sans">
      {/* Professional Header */}
      <header className="bg-teal/95 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Image 
                src="/logo (1).svg" 
                alt="Elevate Logo" 
                width={800} 
                height={800}
                className="h-20 w-20 lg:h-24 lg:w-24"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="#features" className="text-white/90 hover:text-white transition-colors font-medium">
                Funksjoner
              </Link>
              <Link href="#pricing" className="text-white/90 hover:text-white transition-colors font-medium">
                Priser
              </Link>
              <Link href="#about" className="text-white/90 hover:text-white transition-colors font-medium">
                Om Oss
              </Link>
              <Link href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">
                Kontakt
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center">
              <CustomButton asChild size="default">
                <Link href="/login">Logg inn</Link>
              </CustomButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal to-teal-800"></div>
          

          
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="text-center">
              <h1 className="text-5xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-tight mb-8">
                Forvandle Din Ledelse
              </h1>
              <p className="max-w-3xl mx-auto text-xl lg:text-2xl text-white/90 leading-relaxed mb-12">
                Den omfattende plattformen for å utvikle eksepsjonelle ledere. 
                Personlig coaching, ferdighetsvurderinger og beviste metodikker 
                for å låse opp ditt lederpotensial.
              </p>
              <div className="flex justify-center items-center mt-12">
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-white/10 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/20 transition-all duration-500 transform hover:scale-105"
                >
                  <ChevronDown className="h-6 w-6 text-white group-hover:text-white/80 transition-transform duration-500 group-hover:translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-teal relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-normal text-white mb-6">
                Alt Du Trenger for å Vokse
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Våre verktøy og ressurser er designet for å hjelpe deg å bli en mer effektiv og inspirerende leder.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cream/20 to-cream/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-cream/90 backdrop-blur-md border border-cream/30 rounded-3xl p-8 h-full transform transition-all duration-500 group-hover:scale-105 group-hover:bg-cream group-hover:border-cream/50 hover:shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal/30 transition-all duration-500 transform group-hover:scale-110">
                      <Target className="h-10 w-10 text-teal" />
                    </div>
                    <h3 className="text-2xl font-normal text-teal mb-4 group-hover:text-teal transition-colors">Personlig Utvikling</h3>
                    <p className="text-teal/80 leading-relaxed group-hover:text-teal/90 transition-colors">
                      AI-drevne vurderinger og tilpassede læringsstier skreddersyd for din unike lederstil og mål.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cream/20 to-cream/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-cream/90 backdrop-blur-md border border-cream/30 rounded-3xl p-8 h-full transform transition-all duration-500 group-hover:scale-105 group-hover:bg-cream group-hover:border-cream/50 hover:shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal/30 transition-all duration-500 transform group-hover:scale-110">
                      <TrendingUp className="h-10 w-10 text-teal" />
                    </div>
                    <h3 className="text-2xl font-normal text-teal mb-4 group-hover:text-teal transition-colors">Beviste Resultater</h3>
                    <p className="text-teal/80 leading-relaxed group-hover:text-teal/90 transition-colors">
                      Spor fremgangen din med datadrevne innsikter og se målbare forbedringer i din ledereffektivitet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cream/20 to-cream/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-cream/90 backdrop-blur-md border border-cream/30 rounded-3xl p-8 h-full transform transition-all duration-500 group-hover:scale-105 group-hover:bg-cream group-hover:border-cream/50 hover:shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal/30 transition-all duration-500 transform group-hover:scale-110">
                      <Users className="h-10 w-10 text-teal" />
                    </div>
                    <h3 className="text-2xl font-normal text-teal mb-4 group-hover:text-teal transition-colors">Ekspert Coaching</h3>
                    <p className="text-teal/80 leading-relaxed group-hover:text-teal/90 transition-colors">
                      Koble deg til sertifiserte ledercoacher og bli med i et samfunn av aspirerende ledere for kollegial læring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-teal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-mono font-normal text-white mb-2">10,000+</div>
                <div className="text-white/80">Ledere Utviklet</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-mono font-normal text-white mb-2">95%</div>
                <div className="text-white/80">Suksessrate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-mono font-normal text-white mb-2">200+</div>
                <div className="text-white/80">Ekspert Coacher</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-mono font-normal text-white mb-2">4.9/5</div>
                <div className="text-white/80">Brukerkarakter</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-teal relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-normal text-white mb-6">
              Klar til å Lede med Selvtillit?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Bli med tusenvis av ledere som har forvandlet sine karrierer og organisasjoner med Elevate.
            </p>
            <CustomButton asChild size="xl">
              <Link href="/login">Start Din Lederreise</Link>
            </CustomButton>
          </div>
        </section>
      </main>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Image 
                  src="/logo (1).svg" 
                  alt="Elevate Logo" 
                  width={800} 
                  height={800}
                  className="h-20 w-20 lg:h-24 lg:w-24"
                />
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Den ledende plattformen for lederutvikling i Norge. Vi hjelper ledere å nå sitt fulle potensial gjennom personlig coaching og beviste metodikker.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-normal mb-4">Produkt</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Funksjoner</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Priser</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Integrasjoner</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-normal mb-4">Selskap</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Om Oss</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Karriere</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blogg</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Kontakt</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 Elevate. Alle rettigheter forbeholdt.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Personvern
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Vilkår
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 