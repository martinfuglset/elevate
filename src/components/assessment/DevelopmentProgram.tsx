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
        <p className="text-muted-foreground">
          Based on your assessment, we've created a personalized leadership development program.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Program Summary</h3>
          <p className="text-muted-foreground">
            Based on your assessment, we've created a comprehensive development program tailored to your organization's needs.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Executive Summary</h4>
          <p className="text-foreground text-base whitespace-pre-line leading-relaxed">{summary}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Leadership Levels</h3>
          <div className="space-y-4">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className={`p-4 border-l-4 rounded-r-lg ${
                  index === 0 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-card'
                }`}
              >
                <h4 className="font-medium text-foreground">{leader.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{leader.description}</p>
                
                {leader.keyCompetencies && leader.keyCompetencies.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-foreground mb-1">Key Competencies:</p>
                    <div className="flex flex-wrap gap-1">
                      {leader.keyCompetencies.map((comp: string, compIndex: number) => (
                        <span
                          key={compIndex}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {leader.developmentNeeds && leader.developmentNeeds.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1">Development Needs:</p>
                    <p className="text-xs text-muted-foreground">{leader.developmentNeeds?.join(', ')}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Key Recommendations</h3>
          <div className="space-y-3">
            {program.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-foreground">{program.modules.length}</div>
            <div className="text-xs text-muted-foreground">Modules</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-foreground">{program.summary.timeline}</div>
            <div className="text-xs text-muted-foreground">Timeline</div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Development Modules</h3>
          <div className="space-y-4">
            {program.modules.map((module, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-sm font-medium">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{module.title}</h3>
                    <p className="text-muted-foreground mb-3 ml-11">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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