'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, TrendingUp, Users } from 'lucide-react'
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
    }
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gray-100 text-gray-700 border-gray-200 rounded-full">
            Executive Development Tools
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-2xl">
              <CardHeader>
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 font-medium tracking-tight">{feature.title}</CardTitle>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
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