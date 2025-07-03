'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const generateData = (days: number) => {
  const data = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const mobile = 200 + Math.sin(i / 5) * 50 + Math.random() * 50
    const desktop = 250 + Math.sin(i / 10) * 80 + Math.random() * 60
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      Mobile: Math.round(mobile),
      Desktop: Math.round(desktop),
    })
  }
  return data
}

const data3Months = generateData(90)
const data30Days = generateData(30)
const data7Days = generateData(7)

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Mobile
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Desktop
            </span>
            <span className="font-bold">
              {payload[1].value}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    );
  }
  return null
}

const Chart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <AreaChart
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
      <XAxis
        dataKey="date"
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        interval={Math.floor(data.length / 7)}
      />
      <YAxis
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => `${value}`}
      />
      <Tooltip
        content={<CustomTooltip />}
        cursor={{
          stroke: 'hsl(var(--primary))',
          strokeWidth: 1,
          strokeDasharray: '3 3',
        }}
      />
      <Area
        type="monotone"
        dataKey="Mobile"
        stroke="hsl(var(--primary))"
        fillOpacity={1}
        fill="url(#colorMobile)"
        strokeWidth={2}
        dot={{ r: 4, strokeWidth: 2 }}
        activeDot={{ r: 6, strokeWidth: 2 }}
      />
      <Area
        type="monotone"
        dataKey="Desktop"
        stroke="hsl(var(--primary))"
        fillOpacity={1}
        fill="url(#colorDesktop)"
        strokeWidth={2}
        dot={{ r: 4, strokeWidth: 2 }}
        activeDot={{ r: 6, strokeWidth: 2 }}
      />
    </AreaChart>
  </ResponsiveContainer>
)

export function VisitorsGraph() {
  return (
    <Tabs defaultValue="3months" className="w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Total Visitors</CardTitle>
              <CardDescription>Total for the selected period</CardDescription>
            </div>
            <TabsList>
              <TabsTrigger value="3months">Last 3 months</TabsTrigger>
              <TabsTrigger value="30days">Last 30 days</TabsTrigger>
              <TabsTrigger value="7days">Last 7 days</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="3months">
            <Chart data={data3Months} />
          </TabsContent>
          <TabsContent value="30days">
            <Chart data={data30Days} />
          </TabsContent>
          <TabsContent value="7days">
            <Chart data={data7Days} />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  )
} 