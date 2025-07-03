'use client'

export function StatsSection() {
  const stats = [
    {
      value: "10,000+",
      label: "Leaders Developed"
    },
    {
      value: "95%",
      label: "Success Rate"
    },
    {
      value: "200+",
      label: "Expert Coaches"
    },
    {
      value: "4.9/5",
      label: "User Rating"
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-r from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#023D3E] to-[#012A2B] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 