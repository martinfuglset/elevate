'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export function PricingSection() {
  const plans = [
    {
      name: "Executive",
      description: "For developing 1-5 leaders",
      price: "$299",
      period: "/month",
      features: [
        "AI-powered leadership assessments",
        "Individual development plans",
        "Progress tracking dashboard",
        "Executive coaching resources",
        "Monthly development reports"
      ],
      cta: "Start Free Trial",
      popular: false,
      checkColor: "text-green-600"
    },
    {
      name: "Leadership Team",
      description: "For developing 6-15 leaders",
      price: "$599",
      period: "/month",
      features: [
        "Everything from Executive",
        "Team development analytics",
        "Leadership pipeline insights",
        "Custom development frameworks",
        "Priority executive support"
      ],
      cta: "Start Now",
      popular: true,
      checkColor: "text-green-600"
    },
    {
      name: "Enterprise",
      description: "For large leadership teams",
      price: "Contact",
      period: " us",
      features: [
        "Everything from Leadership Team",
        "Custom implementation",
        "Dedicated success manager",
        "Advanced analytics & reporting",
        "SSO & enterprise security"
      ],
      cta: "Contact Sales",
      popular: false,
      checkColor: "text-green-600",
      outline: true
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gray-100 text-gray-700 border-gray-200 rounded-full">
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
            Choose Your Leadership Development Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing that scales with your leadership talent needs. Start developing exceptional leaders today with our risk-free trial.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`group relative bg-white rounded-2xl ${
                plan.popular 
                  ? 'border-2 border-gray-900 bg-gray-50 hover:border-gray-700 transform hover:-translate-y-1' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gray-900 text-white border-0 rounded-full">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 font-medium tracking-tight">{plan.name}</CardTitle>
                <CardDescription className="text-lg text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-medium text-gray-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className={`h-5 w-5 ${plan.checkColor} mr-3 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  asChild 
                  variant={plan.outline ? "outline" : "default"}
                  className="w-full"
                >
                  <Link href="/login">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 font-medium">
            All plans include 14-day free trial. No commitment required. Scale your leadership development as your organization grows.
          </p>
        </div>
      </div>
    </section>
  )
} 