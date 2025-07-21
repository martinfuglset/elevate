"use client";

import { useState } from 'react';
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
  BarChart3,
  Users,
  Sparkles,
  CheckCircle
} from 'lucide-react';

import { ProgramModule, GeneratedProgram } from '@/types/assessment';

interface DevelopmentProgramProps {
  program: GeneratedProgram;
  leaders?: any[];
  summary?: string | null;
  onStartOver: () => void;
}

export default function DevelopmentProgram({ program, leaders = [], summary, onStartOver }: DevelopmentProgramProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Your Development Program</h2>
        <p className="text-gray-600">
          Based on your assessment, we've created a personalized leadership development program.
        </p>
      </div>

      {/* 1. AI Summary of Needs */}
      {summary && (
        <Card className="border-2 border-purple-500 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Summary of Needs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-base whitespace-pre-line leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}

      {/* 2. Display/Overview of Different Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Leadership Levels Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaders.map((leader, index) => (
              <div 
                key={leader.id} 
                className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                  index === 0 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{leader.name}</h4>
                  {index === 0 && (
                    <Badge className="bg-blue-600 text-white text-xs">
                      Priority
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{leader.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {leader.estimatedCount} leaders
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Key Competencies:</p>
                    <div className="flex flex-wrap gap-1">
                      {leader.competencies?.slice(0, 3).map((comp: string) => (
                        <Badge key={comp} variant="secondary" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                      {leader.competencies?.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{leader.competencies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Development Needs:</p>
                    <p className="text-xs text-gray-600">{leader.developmentNeeds?.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. AI Generated Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {program.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-medium">{index + 1}</span>
                </div>
                <div>
                  <p className="text-gray-700">{rec}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Suggested Program (Learning Modules) */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5" />
              Suggested Learning Program
            </CardTitle>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-700">{program.modules.length}</div>
                <div className="text-xs text-gray-500">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-700">{program.summary.timeline}</div>
                <div className="text-xs text-gray-500">Timeline</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {program.modules.map((module, index) => (
              <div 
                key={module.id} 
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{index + 1}</span>
                      </div>
                      <h3 className="font-medium text-gray-900">{module.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3 ml-11">{module.description}</p>
                    <div className="flex items-center gap-3 ml-11">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {module.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {module.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {module.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ArrowRight className="h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {program.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-xs font-medium">{index + 1}</span>
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 no-print">
        <Button 
          variant="outline"
          onClick={() => window.print()}
          className="px-6 py-2"
        >
          Print Page
        </Button>
        <Button 
          className="px-8 py-2"
          onClick={() => window.location.href = '/pricing'}
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
} 