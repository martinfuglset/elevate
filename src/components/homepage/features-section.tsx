'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, TrendingUp, Users, Hammer } from 'lucide-react'
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
    <section id="features" className="pt-24 pb-4 w-full">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 mx-4 md:mx-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-4">
            <Hammer className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm text-blue-700">Executive Development Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-gray-900">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
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