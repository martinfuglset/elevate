'use client'
import React from 'react';
import AssessmentPageComponent from '../AssessmentPageComponent';

// Mock data for testing
const mockAssessmentData = {
  assessorInfo: {
    name: 'Test User',
    email: 'test@example.com',
    role: 'executive' as const,
    company: 'Test Company',
    companySize: '201-500 employees',
    industry: 'Technology'
  },
  organizationScope: {
    totalLeaders: 3, // This will be automatically calculated from the leaders array
    departments: ['Sales', 'Engineering/Technology', 'Human Resources'],
    assessmentFocus: ['Leadership Development', 'Succession Planning', 'Strategic Alignment']
  },
  levels: [
    {
      id: 'level1',
      name: 'Senior Leader',
      description: 'Experienced leaders responsible for strategic direction.',
      competencies: ['Strategic Thinking', 'Change Management'],
      developmentNeeds: ['Digital Transformation'],
      estimatedCount: '2'
    }
  ],
  leaders: [
    {
      id: 'l1',
      name: 'Alice Johnson',
      role: 'VP of Sales',
      department: 'Sales',
      experience: '8 years',
      performance: 'high' as const,
      competencies: ['Strategic Thinking', 'Communication', 'Team Building'],
      developmentNeeds: ['Digital Transformation', 'Data-Driven Decision Making'],
      potential: 'high' as const,
      priority: 'high' as const
    },
    {
      id: 'l2',
      name: 'Bob Smith',
      role: 'Head of Engineering',
      department: 'Engineering/Technology',
      experience: '12 years',
      performance: 'meeting' as const,
      competencies: ['Technical Leadership', 'Innovation'],
      developmentNeeds: ['Strategic Thinking', 'Change Management'],
      potential: 'medium' as const,
      priority: 'medium' as const
    },
    {
      id: 'l3',
      name: 'Carol Lee',
      role: 'HR Director',
      department: 'Human Resources',
      experience: '6 years',
      performance: 'high' as const,
      competencies: ['Team Building', 'Communication'],
      developmentNeeds: ['Strategic Alignment', 'Business Acumen'],
      potential: 'high' as const,
      priority: 'high' as const
    },
    {
      id: 'l4',
      name: 'David Kim',
      role: 'Product Manager',
      department: 'Product',
      experience: '4 years',
      performance: 'needs-improvement' as const,
      competencies: ['Innovation'],
      developmentNeeds: ['Leadership Skills', 'Team Management'],
      potential: 'medium' as const,
      priority: 'low' as const
    }
  ],
  organizationalGaps: {
    missingSkills: ['Strategic Planning', 'Digital Transformation', 'Data-Driven Decision Making'],
    successionGaps: ['C-Suite Succession', 'VP/Director Level'],
    strategicAlignment: 'Need better alignment between leadership capabilities and organizational strategic goals'
  },
  developmentPlan: {
    priorityLevels: ['l1', 'l3'],
    timeline: '6-months',
    budget: '25k-50k',
    successMetrics: 'Improved team performance, better retention, successful promotions'
  }
};

// Mock generated program
const mockGeneratedProgram = {
  summary: {
    totalLeaders: 3,
    priorityLeaders: 2,
    keyGaps: ['Strategic Thinking', 'Change Management', 'Digital Transformation', 'Data-Driven Decision Making'],
    timeline: '6 months',
    estimatedBudget: '$25,000 - $50,000',
  },
  modules: [
    {
      id: '1',
      title: 'Leadership Foundation & Self-Awareness',
      description: 'Build core leadership competencies and develop emotional intelligence for effective team management',
      duration: '4 weeks',
      level: 'All Levels',
      category: 'Core Leadership',
      order: 1,
      source: 'recommended' as const,
    },
    {
      id: '2',
      title: 'Strategic Thinking & Organizational Alignment',
      description: 'Develop strategic mindset and align leadership actions with organizational goals',
      duration: '3 weeks',
      level: 'Senior+',
      category: 'Strategy',
      order: 2,
      source: 'recommended' as const,
    },
    {
      id: '3',
      title: 'Team Building & High-Performance Management',
      description: 'Learn to build cohesive teams, manage performance, and drive results',
      duration: '4 weeks',
      level: 'All Levels',
      category: 'Team Management',
      order: 3,
      source: 'recommended' as const,
    },
    {
      id: '4',
      title: 'Change Management & Innovation Leadership',
      description: 'Lead organizational change and foster innovation culture',
      duration: '3 weeks',
      level: 'Senior+',
      category: 'Change & Innovation',
      order: 4,
      source: 'recommended' as const,
    },
    {
      id: '5',
      title: 'Coaching & Mentoring Excellence',
      description: 'Develop coaching skills to grow your team and build leadership pipeline',
      duration: '2 weeks',
      level: 'All Levels',
      category: 'Development',
      order: 5,
      source: 'recommended' as const,
    },
    {
      id: '6',
      title: 'Digital Leadership & Technology Adoption',
      description: 'Lead digital transformation initiatives and technology adoption',
      duration: '3 weeks',
      level: 'Senior+',
      category: 'Digital',
      order: 6,
      source: 'recommended' as const,
    },
    {
      id: '7',
      title: 'Data-Driven Leadership',
      description: 'Make informed decisions using data and analytics',
      duration: '2 weeks',
      level: 'All Levels',
      category: 'Analytics',
      order: 7,
      source: 'recommended' as const,
    },
  ],
  recommendations: [
    'Focus development efforts on 2 priority leaders identified in your assessment',
    'Address key organizational gaps: Strategic Thinking, Change Management, Digital Transformation, Data-Driven Decision Making',
    'Implement a 6 months development timeline with regular check-ins',
    'Allocate budget of $25,000 - $50,000 for comprehensive leadership development',
  ],
  nextSteps: [
    'Schedule kickoff meeting with priority leaders',
    'Set up individual development plans for each leader',
    'Establish success metrics and tracking mechanisms',
    'Plan regular progress reviews and program adjustments',
  ],
};

// Mock library modules
const mockLibraryModules = [
  {
    id: '8',
    title: 'Crisis Management & Resilience',
    description: 'Develop skills to lead through crises and build organizational resilience',
    duration: '2 weeks',
    level: 'Senior+',
    category: 'Crisis Management',
    order: 8,
    source: 'sidebar' as const,
  },
  {
    id: '9',
    title: 'Global Leadership & Cultural Intelligence',
    description: 'Lead diverse teams and navigate cross-cultural business environments',
    duration: '3 weeks',
    level: 'Senior+',
    category: 'Global Leadership',
    order: 9,
    source: 'sidebar' as const,
  },
  {
    id: '10',
    title: 'Sustainability Leadership',
    description: 'Lead sustainable business practices and environmental initiatives',
    duration: '2 weeks',
    level: 'All Levels',
    category: 'Sustainability',
    order: 10,
    source: 'sidebar' as const,
  },
];

export default function DevProgramTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <AssessmentPageComponent 
        testMode={true}
        mockData={mockAssessmentData}
        mockGeneratedProgram={mockGeneratedProgram}
        mockLibraryModules={mockLibraryModules}
      />
    </div>
  );
} 