import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Play, Clock } from 'lucide-react';
import { ProgramModule } from '@/types/assessment';

const mockModules: (ProgramModule & { status: 'completed' | 'in-progress' | 'not-started' })[] = [
  {
    id: '1',
    title: 'Foundations of Leadership',
    description: 'Learn the core principles of effective leadership, including communication, decision-making, and team building.',
    duration: '4 weeks',
    level: 'Beginner',
    category: 'Core Leadership',
    order: 1,
    status: 'completed',
  },
  {
    id: '2',
    title: 'Strategic Thinking & Planning',
    description: 'Develop strategic thinking skills and learn how to create and execute effective business strategies.',
    duration: '6 weeks',
    level: 'Intermediate',
    category: 'Strategic Leadership',
    order: 2,
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'Emotional Intelligence in Leadership',
    description: 'Master emotional intelligence skills to build stronger relationships and lead with empathy.',
    duration: '3 weeks',
    level: 'Beginner',
    category: 'Personal Development',
    order: 3,
    status: 'not-started',
  },
  {
    id: '4',
    title: 'Change Management',
    description: 'Learn how to lead organizational change effectively and manage resistance to change.',
    duration: '5 weeks',
    level: 'Advanced',
    category: 'Organizational Leadership',
    order: 4,
    status: 'not-started',
  },
];

const statusColor = {
  completed: 'text-green-600',
  'in-progress': 'text-blue-600',
  'not-started': 'text-muted-foreground',
};
const statusBg = {
  completed: 'bg-green-100 dark:bg-green-900/20',
  'in-progress': 'bg-blue-100 dark:bg-blue-900/20',
  'not-started': 'bg-muted',
};
const statusLabel = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  'not-started': 'Not Started',
};
const statusIcon = {
  completed: CheckCircle,
  'in-progress': Play,
  'not-started': Clock,
};

export default function ProgramPage() {
  // Sort modules by order
  const modules = [...mockModules].sort((a, b) => a.order - b.order);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'not-started': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/20';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900/20';
      case 'not-started': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted z-0" style={{ transform: 'translateY(-50%)' }} />
            {modules.map((module, idx) => {
              const Icon = statusIcon[module.status];
              return (
                <div key={module.id} className="relative z-10 flex flex-col items-center w-1/4">
                  <div className={`rounded-full p-2 border-2 ${statusBg[module.status]} ${statusColor[module.status]} border-white shadow-md mb-2`}>
                    <Icon className={`h-6 w-6 ${statusColor[module.status]}`} />
                  </div>
                  <span className={`text-xs ${statusColor[module.status]}`}>{statusLabel[module.status]}</span>
                  {idx < modules.length - 1 && (
                    <div className="absolute right-0 top-1/2 w-full h-1 bg-transparent z-0" style={{ left: '50%' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Modules List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {modules.map((module) => {
              const Icon = statusIcon[module.status];
              return (
                <Card key={module.id} className="relative overflow-visible border-2">
                  <CardHeader className="pb-2 flex flex-row items-center gap-2">
                    <div className={`rounded-full p-2 ${statusBg[module.status]} ${statusColor[module.status]} border-white shadow-md`}>
                      <Icon className={`h-5 w-5 ${statusColor[module.status]}`} />
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <Badge variant="outline" className="ml-auto text-xs">{module.level}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.duration}
                      </div>
                      <Badge variant="outline" className="text-xs">{module.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${statusBg[module.status]} ${statusColor[module.status]} text-xs`}>{statusLabel[module.status]}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 