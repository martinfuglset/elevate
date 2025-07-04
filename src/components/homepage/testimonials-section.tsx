'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Elevate transformed my leadership approach completely. The AI insights were eye-opening and the coaching helped me implement real changes.",
      author: "Sarah Johnson",
      role: "VP of Engineering, TechCorp"
    },
    {
      quote: "The personalized development plan and progress tracking helped me see measurable improvements in just 3 months.",
      author: "Michael Chen",
      role: "Director of Operations, InnovateCo"
    },
    {
      quote: "The community aspect and peer learning opportunities made all the difference. I've built lasting connections with other leaders.",
      author: "Emma Rodriguez",
      role: "CEO, StartupXYZ"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gray-800]/10 text-gray-800] border-gray-800]/20">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Leaders Are Saying
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-gray-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-slate-300 mb-4" />
                <p className="text-slate-700 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-800] rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
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