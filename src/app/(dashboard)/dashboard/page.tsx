import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownRight, Users, Activity, TrendingUp, Target } from 'lucide-react'
import { VisitorsGraph } from '@/components/dashboard/visitors-graph'
import { DocumentsTable } from '@/components/dashboard/documents-table'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">1,234</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 mr-1 text-gray-600" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">892</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 mr-1 text-gray-600" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">3.2%</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 mr-1 text-gray-600" />
              +0.8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">$12,345</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 mr-1 text-gray-600" />
              +15.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <VisitorsGraph />
      
      <DocumentsTable />
    </div>
  )
} 