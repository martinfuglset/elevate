'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles, ArrowRight, Zap, Users, Target, Gift } from 'lucide-react'

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
      checkColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800"
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
      checkColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800"
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
      checkColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
      outline: true
    }
  ]

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
            <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-primary mr-2" />
            <span className="text-sm sm:text-base text-foreground">Your customized experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-6 tracking-tight px-2 sm:px-0">
            Choose Your Next Step
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
            Your assessment is complete and your personalized development program is ready. Choose the approach that best fits your organization's needs and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Card 
                key={index} 
                className={`group relative rounded-xl sm:rounded-2xl bg-card ${option.borderColor} ${
                  option.popular 
                    ? 'border-2 border-primary hover:border-primary/80 transform hover:-translate-y-1 shadow-lg' 
                    : 'border-2 hover:border-border/60'
                } transition-all duration-300 flex flex-col`}
              >
                {option.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="text-primary-foreground border-0 rounded-full bg-primary text-xs sm:text-sm">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-muted ${option.borderColor}`}>
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-foreground">{option.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base sm:text-lg text-muted-foreground">{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className={`h-4 w-4 sm:h-5 sm:w-5 ${option.checkColor} mr-2 sm:mr-3 flex-shrink-0 mt-0.5`} />
                        <span className="text-sm sm:text-base text-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    asChild 
                    variant="outline"
                    className={`w-full mt-auto ${option.borderColor.replace('border-', 'border-')} text-sm sm:text-base py-2 sm:py-3`}
                  >
                    <Link href="/contact">
                      {option.cta}
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm sm:text-base text-muted-foreground px-4 sm:px-0">
            All options include access to your personalized development program. Choose the level of support that's right for your organization.
          </p>
        </div>
      </div>
    </section>
  )
} 