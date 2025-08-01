// export interface Leader {
//   id: string;
//   name: string;
//   role: string;
//   department: string;
//   experience: string;
//   performance: 'high' | 'meeting' | 'needs-improvement';
//   competencies: string[];
//   developmentNeeds: string[];
//   potential: 'high' | 'medium' | 'low';
//   priority: 'high' | 'medium' | 'low';
// }

export interface TargetGroup {
  id: string;
  name: string;
  description: string;
  developmentNeeds: string[];
  otherDevelopmentNeeds: string;
  estimatedCount: string;
  preferredLearningStyle: string[];
  otherLearningStyles: string;
  programIntensity: string;
  timeline: string;
}

export interface AssessmentData {
  assessorInfo: {
    name: string;
    email: string;
    role: 'executive' | 'hr-leader' | 'consultant';
    company: string;
    companySize: string;
    industry: string;
  };
  organizationScope: {
    totalLeaders: number;
    departments: string[];
    assessmentFocus: string[];
  };
  targetGroups: TargetGroup[];
  programReasons: {
    reasons: string[];
    otherReasons: string;
    additionalContext: string;
  };
  organizationalGaps: {
    missingSkills: string[];
    successionGaps: string[];
    strategicAlignment: string;
  };

}

export interface ValidationErrors {
  [key: string]: string[];
}

export interface ProgramModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  order: number;
  source?: 'recommended' | 'sidebar';
}

export interface GeneratedProgram {
  summary: {
    totalLeaders: number;
    priorityLeaders: number;
    keyGaps: string[];
    timeline: string;
    estimatedBudget: string;
  };
  modules: ProgramModule[];
  recommendations: string[];
  nextSteps: string[];
}

export interface AssessmentPageProps {
  testMode?: boolean;
  mockData?: AssessmentData;
  mockGeneratedProgram?: GeneratedProgram;
  mockLibraryModules?: ProgramModule[];
} 