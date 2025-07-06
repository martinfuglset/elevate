"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Award,
  BookOpen,
  Target,
  ArrowRight,
  Clock,
  GripVertical,
  BarChart3,
  Users,
  Plus,
  X,
  Sparkles
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import { ProgramModule, GeneratedProgram, Leader } from '@/types/assessment';

interface DevelopmentProgramProps {
  program: GeneratedProgram;
  leaders?: Leader[];
  summary?: string | null;
  onStartOver: () => void;
}

function ModuleCard({ module, index, listeners, attributes, isDragging, dragOverlay, handleRef, onRemove }: any) {
  return (
    <Card
      className={`transition-all duration-300 ease-in-out transform cursor-grab active:cursor-grabbing ${
        isDragging ? 'ring-2 ring-blue-400 bg-blue-50 opacity-80 scale-105' : 'hover:shadow-md hover:scale-[1.02]'
      } ${dragOverlay ? 'scale-110 shadow-xl z-50' : ''}`}
      style={{
        opacity: isDragging && !dragOverlay ? 0.5 : 1,
        boxShadow: dragOverlay ? '0 12px 40px rgba(0,0,0,0.15)' : undefined,
      }}
      ref={handleRef}
      {...listeners}
      {...attributes}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-sm">{module.title}</h3>
            <p className="text-xs mt-1">{module.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {module.duration}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {module.level}
              </Badge>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(module.id);
            }}
            className="p-1 hover:bg-red-50 hover:text-red-600 rounded transition-all duration-200 ease-in-out transform hover:scale-110 ml-2"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function SortableModule({ module, index, onRemove, isRemoving }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.3s ease-in-out',
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative animate-in fade-in-0 slide-in-from-left-2 duration-500 ${
        isRemoving ? 'animate-out fade-out-0 slide-out-to-right-2 duration-300' : ''
      }`}
    >
      <ModuleCard
        module={module}
        index={index}
        listeners={listeners}
        attributes={attributes}
        isDragging={isDragging}
        handleRef={setNodeRef}
        onRemove={onRemove}
      />
      {isSorting && (
        <div className="absolute left-0 right-0 top-0 bottom-0 border-2 border-dashed border-blue-400 rounded-lg pointer-events-none animate-pulse bg-blue-50/50" />
      )}
    </div>
  );
}

export default function DevelopmentProgram({ program, leaders = [], summary, onStartOver }: DevelopmentProgramProps) {
  const router = useRouter();
  const [draggedModule, setDraggedModule] = useState<string | null>(null);
  const [draggedLibraryModule, setDraggedLibraryModule] = useState<string | null>(null);
  const [programModules, setProgramModules] = useState<ProgramModule[]>(program.modules);
  const [libraryModules] = useState<ProgramModule[]>([
    {
      id: 'lib-1',
      title: 'Strategic Thinking',
      description: 'Develop strategic mindset and long-term planning capabilities',
      duration: '4 weeks',
      level: 'Intermediate',
      category: 'Strategy',
      order: 0,
      source: 'sidebar'
    },
    {
      id: 'lib-2',
      title: 'Change Management',
      description: 'Lead organizational change and manage resistance effectively',
      duration: '6 weeks',
      level: 'Advanced',
      category: 'Leadership',
      order: 0,
      source: 'sidebar'
    },
    {
      id: 'lib-3',
      title: 'Team Building',
      description: 'Build high-performing teams and foster collaboration',
      duration: '3 weeks',
      level: 'Beginner',
      category: 'Team Management',
      order: 0,
      source: 'sidebar'
    },
    {
      id: 'lib-4',
      title: 'Communication Skills',
      description: 'Master effective communication across all levels',
      duration: '5 weeks',
      level: 'Intermediate',
      category: 'Communication',
      order: 0,
      source: 'sidebar'
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [removingModuleId, setRemovingModuleId] = useState<string | null>(null);
  const activeModule = programModules.find((m) => m.id === activeId);

  // Filter library modules to exclude those already in the program
  const availableLibraryModules = libraryModules.filter(libraryModule => 
    !programModules.some(programModule => 
      programModule.title === libraryModule.title && 
      programModule.description === libraryModule.description
    )
  );



  const handleDragStartDnd = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEndDnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);
    if (active.id !== over?.id) {
      const oldIndex = programModules.findIndex((m) => m.id === active.id);
      const newIndex = programModules.findIndex((m) => m.id === over?.id);
      setProgramModules(arrayMove(programModules, oldIndex, newIndex));
    }
  };

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedModule || draggedModule === targetId) return;

    const draggedIndex = programModules.findIndex(m => m.id === draggedModule);
    const targetIndex = programModules.findIndex(m => m.id === targetId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newModules = [...programModules];
      const [draggedItem] = newModules.splice(draggedIndex, 1);
      newModules.splice(targetIndex, 0, draggedItem);
      setProgramModules(newModules);
    }
    
    setDraggedModule(null);
  };

  const handleLibraryDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (!draggedLibraryModule) return;

    const libraryModule = availableLibraryModules.find(m => m.id === draggedLibraryModule);
    if (libraryModule) {
      const newModule: ProgramModule = {
        ...libraryModule,
        id: `${libraryModule.id}-${Date.now()}`,
        order: programModules.length
      };
      setProgramModules([...programModules, newModule]);
    }
    
    setDraggedLibraryModule(null);
  };

  const removeModule = (moduleId: string) => {
    const moduleToRemove = programModules.find(m => m.id === moduleId);
    if (moduleToRemove) {
      // Start removal animation
      setRemovingModuleId(moduleId);
      
      // Remove from program modules after animation
      setTimeout(() => {
        setProgramModules(prev => prev.filter(m => m.id !== moduleId));
        setRemovingModuleId(null);
      }, 300);
      
      // Ensure the module appears in the library if it has a corresponding library module
      // The filtering logic will automatically handle this
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-medium">Your Development Program</h2>
        <p className="text-sm">
          Based on your assessment, we've created a personalized leadership development program.
        </p>
      </div>
      {summary && (
        <Card className="border-2 border-purple-500 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Sparkles className="h-4 w-4 text-purple-500" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-base whitespace-pre-line">{summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Target className="h-4 w-4" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {program.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gray-400"></div>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Leaders Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-base font-medium mb-0">
              <Users className="h-4 w-4" />
              Leaders to Develop
            </CardTitle>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-base font-medium text-gray-700 leading-none">{program.summary.totalLeaders}</div>
                <div className="text-xs text-gray-400 leading-none">Total</div>
              </div>
              <div className="text-right">
                <div className="text-base font-medium text-gray-700 leading-none">{program.summary.priorityLeaders}</div>
                <div className="text-xs text-gray-400 leading-none">Priority</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {leaders.map((leader) => (
              <div 
                key={leader.id} 
                className={`p-3 border rounded-lg ${
                  leader.priority === 'high' 
                    ? 'border-blue-700 bg-blue-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="font-medium text-sm">{leader.name}</div>
                <div className="text-xs mt-1">{leader.role}</div>
                <div className="text-xs mt-1">{leader.department}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {leader.priority} priority
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {leader.potential} potential
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Program Modules */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <BookOpen className="h-4 w-4" />
                  Learning Modules
                </CardTitle>
                {/* Program Summary Cards */}
                <div className="flex gap-2">
                  <div className="bg-gray-50 rounded-full px-3 py-1 text-center min-w-[60px] transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105">
                    <div className="text-xs font-medium text-gray-700 transition-all duration-200">{programModules.length}</div>
                    <div className="text-xs text-gray-500">Modules</div>
                  </div>
                  <div className="bg-gray-50 rounded-full px-3 py-1 text-center min-w-[60px] transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105">
                    <div className="text-xs font-medium text-gray-700">{program.summary.timeline}</div>
                    <div className="text-xs text-gray-500">Timeline</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStartDnd}
                onDragEnd={handleDragEndDnd}
                onDragCancel={handleDragCancel}
              >
                <SortableContext
                  items={programModules.map((m) => m.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div 
                    className={`space-y-3 min-h-[400px] p-4 border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out ${
                      isDraggingOver 
                        ? 'border-blue-400 bg-blue-50 scale-[1.02] shadow-lg' 
                        : 'border-gray-200 bg-white'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleLibraryDrop}
                    onDragLeave={() => setIsDraggingOver(false)}
                  >
                    {programModules.length === 0 ? (
                      <div className="text-center text-sm py-8 text-gray-400">
                        Drag modules from the library to get started
                      </div>
                    ) : (
                      programModules.map((module, index) => (
                        <SortableModule
                          key={module.id}
                          module={module}
                          index={index}
                          onRemove={removeModule}
                          isRemoving={removingModuleId === module.id}
                        />
                      ))
                    )}
                  </div>
                </SortableContext>
                <DragOverlay>
                  {activeModule ? (
                    <ModuleCard
                      module={activeModule}
                      index={-1}
                      dragOverlay
                      isDragging
                      handleRef={null}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </CardContent>
          </Card>
        </div>

        {/* Module Library */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <Plus className="h-4 w-4" />
                Module Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableLibraryModules.length === 0 ? (
                  <div className="text-center text-sm py-8 text-gray-400">
                    All modules are in your program
                  </div>
                ) : (
                  availableLibraryModules.map((module, index) => (
                    <Card 
                      key={module.id}
                      className="cursor-move transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-[1.02] hover:bg-gray-50 animate-in fade-in-0 slide-in-from-right-2 duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                      draggable
                      onDragStart={(e) => setDraggedLibraryModule(module.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 border rounded-full flex items-center justify-center">
                            <Plus className="h-3 w-3" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{module.title}</h3>
                            <p className="text-xs mt-1">{module.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {module.duration}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {module.level}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={() => router.push('/pricing')}
          className="px-8 py-3"
        >
          Get started
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
} 