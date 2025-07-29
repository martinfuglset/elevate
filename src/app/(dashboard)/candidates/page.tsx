import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Users, Target, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Manager',
    department: 'Engineering',
    level: 'Middle Management',
    assessmentScore: 85,
    status: 'In Progress',
    lastAssessment: '2024-01-15',
    nextReview: '2024-02-15'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Director',
    department: 'Marketing',
    level: 'Senior Leadership',
    assessmentScore: 92,
    status: 'Completed',
    lastAssessment: '2024-01-10',
    nextReview: '2024-04-10'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Team Lead',
    department: 'Sales',
    level: 'Emerging Leader',
    assessmentScore: 78,
    status: 'Not Started',
    lastAssessment: null,
    nextReview: '2024-02-01'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'VP Operations',
    department: 'Operations',
    level: 'Executive',
    assessmentScore: 88,
    status: 'In Progress',
    lastAssessment: '2024-01-20',
    nextReview: '2024-03-20'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Manager',
    department: 'HR',
    level: 'Middle Management',
    assessmentScore: 81,
    status: 'Completed',
    lastAssessment: '2024-01-05',
    nextReview: '2024-04-05'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'Not Started': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Executive': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
    case 'Senior': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'Mid-level': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'Junior': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leadership Candidates</h1>
          <p className="text-muted-foreground">
            Manage and track your organization's leadership development candidates
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Candidate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Assessment Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.8</div>
            <p className="text-xs text-muted-foreground">
              +2.3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search candidates by name, role, or department..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="senior">Senior Leadership</SelectItem>
                <SelectItem value="middle">Middle Management</SelectItem>
                <SelectItem value="emerging">Emerging Leader</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Level</th>
                  <th className="text-left py-3 px-4 font-medium">Score</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Last Assessment</th>
                  <th className="text-left py-3 px-4 font-medium">Next Review</th>
                </tr>
              </thead>
              <tbody>
                {mockCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">{candidate.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(candidate.assessmentScore)}`}
                          style={{ width: `${candidate.assessmentScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{candidate.assessmentScore}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(candidate.status)}>
                        {candidate.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {candidate.lastAssessment || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {candidate.nextReview}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 