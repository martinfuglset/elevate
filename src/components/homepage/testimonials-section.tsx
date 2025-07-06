'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This platform has revolutionized how I develop leadership talent in our company. The AI insights help me understand each leader's potential and create targeted development plans.",
      author: "Sarah Johnson",
      role: "CEO, TechCorp"
    },
    {
      quote: "I can now track the development of all our key leaders with precision. The measurable results and progress tracking are invaluable for building our leadership pipeline.",
      author: "Michael Chen",
      role: "COO, InnovateCo"
    },
    {
      quote: "The executive development tools have transformed our organization. Our leadership talent is stronger, more aligned, and driving better results across the company.",
      author: "Emma Rodriguez",
      role: "CEO, Global Solutions"
    }
  ]

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gray-100 text-gray-700 border-gray-200 rounded-full">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
            What Executives Are Saying
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white rounded-2xl">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 