'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for new leaders",
      price: "$49",
      period: "/month",
      features: [
        "AI-driven leadership assessments",
        "Personal development plan",
        "5 learning modules",
        "Monthly progress report"
      ],
      cta: "Start Free Trial",
      popular: false,
      checkColor: "text-emerald-500"
    },
    {
      name: "Professional",
      description: "For experienced leaders",
      price: "$99",
      period: "/month",
      features: [
        "Everything from Starter",
        "1-1 coaching sessions",
        "Unlimited learning content",
        "Team assessments",
        "Priority support"
      ],
      cta: "Start Now",
      popular: true,
      checkColor: "text-gray-800]"
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: "Contact",
      period: " us",
      features: [
        "Everything from Professional",
        "Custom implementation",
        "Dedicated customer success",
        "API access",
        "SSO & security"
      ],
      cta: "Contact Sales",
      popular: false,
      checkColor: "text-gray-800]",
      outline: true
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gray-800]/10 text-gray-800] border-gray-800]/20">
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose Your Leadership Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Flexible pricing that grows with you. Start your transformation today with our risk-free trial.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`group relative ${
                plan.popular 
                  ? 'border-2 border-gray-800] bg-gray-800]/5 hover:shadow-2xl transform hover:-translate-y-2' 
                  : 'border-slate-200 hover:border-gray-800]/30 hover:shadow-xl'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gray-800] text-white border-0">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">{plan.name}</CardTitle>
                <CardDescription className="text-lg">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-[gray-800] to-[gray-900] bg-clip-text text-transparent' 
                      : 'text-slate-900'
                  }`}>
                    {plan.price}
                  </span>
                  <span className="text-slate-600">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className={`h-5 w-5 ${plan.checkColor} mr-3`} />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  asChild 
                  className={`w-full ${
                    plan.outline 
                      ? 'border-2 hover:bg-gray-800]/5' 
                      : plan.popular 
                        ? 'bg-gray-800] hover:bg-gray-900] text-white'
                        : 'bg-slate-800 hover:bg-slate-900 text-white'
                  }`}
                >
                  <Link href="/login">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600">
            All plans include 14-day free trial. No commitment required.
          </p>
        </div>
      </div>
    </section>
  )
} 