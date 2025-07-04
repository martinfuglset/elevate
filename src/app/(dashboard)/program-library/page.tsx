import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BookOpen, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Search,
  Filter,
  TrendingUp,
  Users,
  Target
} from 'lucide-react'

interface ProgramModule {
  id: string
  title: string
  description: string
  category: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  participants: number
  isCompleted: boolean
  isInProgress: boolean
  tags: string[]
}

const programModules: ProgramModule[] = [
  {
    id: '1',
    title: 'Foundations of Leadership',
    description: 'Learn the core principles of effective leadership, including communication, decision-making, and team building.',
    category: 'Core Leadership',
    duration: '4 weeks',
    difficulty: 'Beginner',
    rating: 4.8,
    participants: 1247,
    isCompleted: false,
    isInProgress: true,
    tags: ['Communication', 'Team Building', 'Decision Making']
  },
  {
    id: '2',
    title: 'Strategic Thinking & Planning',
    description: 'Develop strategic thinking skills and learn how to create and execute effective business strategies.',
    category: 'Strategic Leadership',
    duration: '6 weeks',
    difficulty: 'Intermediate',
    rating: 4.9,
    participants: 892,
    isCompleted: false,
    isInProgress: false,
    tags: ['Strategy', 'Planning', 'Business Acumen']
  },
  {
    id: '3',
    title: 'Emotional Intelligence in Leadership',
    description: 'Master emotional intelligence skills to build stronger relationships and lead with empathy.',
    category: 'Personal Development',
    duration: '3 weeks',
    difficulty: 'Beginner',
    rating: 4.7,
    participants: 1563,
    isCompleted: true,
    isInProgress: false,
    tags: ['Emotional Intelligence', 'Empathy', 'Relationships']
  },
  {
    id: '4',
    title: 'Change Management',
    description: 'Learn how to lead organizational change effectively and manage resistance to change.',
    category: 'Organizational Leadership',
    duration: '5 weeks',
    difficulty: 'Advanced',
    rating: 4.6,
    participants: 634,
    isCompleted: false,
    isInProgress: false,
    tags: ['Change Management', 'Organizational Development', 'Resistance']
  },
  {
    id: '5',
    title: 'Coaching & Mentoring',
    description: 'Develop coaching skills to help others grow and reach their full potential.',
    category: 'People Development',
    duration: '4 weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    participants: 1023,
    isCompleted: false,
    isInProgress: false,
    tags: ['Coaching', 'Mentoring', 'Development']
  },
  {
    id: '6',
    title: 'Crisis Leadership',
    description: 'Learn how to lead effectively during times of crisis and uncertainty.',
    category: 'Crisis Management',
    duration: '3 weeks',
    difficulty: 'Advanced',
    rating: 4.5,
    participants: 445,
    isCompleted: false,
    isInProgress: false,
    tags: ['Crisis Management', 'Resilience', 'Decision Making']
  }
]

const categories = ['All', 'Core Leadership', 'Strategic Leadership', 'Personal Development', 'Organizational Leadership', 'People Development', 'Crisis Management']

export default function ProgramLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Library</h1>
          <p className="text-muted-foreground">
            Explore our comprehensive leadership development modules
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search modules..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="All">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Program Modules Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programModules.map((module) => (
          <Card key={module.id} className="relative overflow-hidden">
            {module.isCompleted && (
              <div className="absolute top-4 right-4 z-10">
                <CheckCircle className="h-6 w-6 text-gray-600" />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <Badge variant={module.difficulty === 'Beginner' ? 'default' : module.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                    {module.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {module.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {module.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
                  {module.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {module.participants}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {module.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {module.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{module.tags.length - 2} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                {module.isInProgress ? (
                  <Button className="flex-1" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                ) : module.isCompleted ? (
                  <Button className="flex-1" variant="outline" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                ) : (
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Start Module
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 