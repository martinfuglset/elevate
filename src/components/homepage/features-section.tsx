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
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-[#023D3E]/10 text-[#023D3E] border-[#023D3E]/20">
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-slate-200 hover:border-[#023D3E]/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-14 h-14 bg-[#023D3E] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                <CardDescription className="text-base">
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