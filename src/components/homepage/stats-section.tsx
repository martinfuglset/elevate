'use client'

export function StatsSection() {
  const stats = [
    {
      value: "500+",
      label: "Executives Using Platform"
    },
    {
      value: "2,500+",
      label: "Leaders Developed"
    },
    {
      value: "95%",
      label: "Development Success Rate"
    },
    {
      value: "4.9/5",
      label: "Executive Rating"
    }
  ]

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl text-gray-900 mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 