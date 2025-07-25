'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles, ArrowRight, Zap, Users, Target } from 'lucide-react'

export function PricingSection() {
  const options = [
    {
      name: "Quick Start",
      description: "Choose this to simply proceed with the recommended program. Perfect for small/medium organizations.",
      icon: Zap,
      features: [
        "Immediate access to your recommended program",
        "Self-guided implementation",
        "Standard support and resources",
        "Progress tracking dashboard",
        "Monthly development reports"
      ],
      cta: "Get Started",
      popular: false,
      checkColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      name: "Tailored",
      description: "Choose this to get in touch with a consultant that will help with creating a great program. Perfect for anyone needing expert advice.",
      icon: Users,
      features: [
        "Everything from Quick Start",
        "Personal consultation session",
        "Custom program adjustments",
        "Expert guidance and support",
        "Ongoing consultant availability"
      ],
      cta: "Contact Consultant",
      popular: true,
      checkColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      name: "Optimized",
      description: "Choose this to get in touch with consultant that will do a thorough analysis and focus on giving the optimized learning programs. Perfect for large organizations.",
      icon: Target,
      features: [
        "Everything from Tailored",
        "Comprehensive organizational analysis",
        "Custom implementation strategy",
        "Dedicated success manager",
        "Advanced analytics & reporting"
      ],
      cta: "Contact Expert",
      popular: false,
      checkColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      outline: true
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
            Choose Your Next Step
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your assessment is complete and your personalized development program is ready. Choose the approach that best fits your organization's needs and timeline.
          </p>
        </div>


        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Card 
                key={index} 
                className={`group relative rounded-2xl bg-white ${option.borderColor} ${
                  option.popular 
                    ? 'border-2 border-blue-600 hover:border-blue-500 transform hover:-translate-y-1 shadow-lg' 
                    : 'border-2 hover:border-gray-300'
                } transition-all duration-300 flex flex-col`}
              >
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="text-white border-0 rounded-full bg-blue-600">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gray-100 ${option.borderColor}`}>
                      <IconComponent className="h-6 w-6 text-gray-700" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{option.name}</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-gray-600">{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-4 mb-8 flex-1">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className={`h-5 w-5 ${option.checkColor} mr-3 flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    asChild 
                    variant="outline"
                    className={`w-full mt-auto ${option.borderColor.replace('border-', 'border-')}`}
                  >
                    <Link href="/contact">
                      {option.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600">
            All options include access to your personalized development program. Choose the level of support that's right for your organization.
          </p>
        </div>
      </div>
    </section>
  )
} 