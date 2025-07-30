'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, TrendingUp, Users, Hammer, BarChart3, Users2, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function FeaturesSection() {
  const { t } = useLanguage()
  
  const features = [
    {
      icon: Target,
      title: t('features.ai.title'),
      description: t('features.ai.description')
    },
    {
      icon: TrendingUp,
      title: t('features.results.title'),
      description: t('features.results.description')
    },
    {
      icon: Users,
      title: t('features.coaching.title'),
      description: t('features.coaching.description')
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description')
    },
    {
      icon: Users2,
      title: t('features.community.title'),
      description: t('features.community.description')
    },
    {
      icon: Shield,
      title: t('features.compliance.title'),
      description: t('features.compliance.description')
    }
  ]

  return (
    <section id="features" className="pt-12 sm:pt-16 pb-4 w-full">
      <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mx-2 sm:mx-3 md:mx-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
            <Hammer className="h-3 w-3 sm:h-4 sm:w-4 text-primary mr-2" />
            <span className="text-sm sm:text-base text-foreground">Executive Development Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-6 tracking-tight px-2 sm:px-0">
            {t('features.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-border hover:border-border/60 transition-all duration-300 transform hover:-translate-y-1 rounded-xl sm:rounded-2xl">
              <CardHeader className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform bg-primary">
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg sm:text-xl text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 