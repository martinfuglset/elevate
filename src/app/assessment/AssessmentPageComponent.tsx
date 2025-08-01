"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Loader2,
  Sparkles,
  Plus,
  Trash2,
  Building2,
  Users,
  Briefcase,
  Info
} from 'lucide-react';
import DevelopmentProgram from '@/components/assessment/DevelopmentProgram';
import { 
  AssessmentData, 
  ValidationErrors, 
  ProgramModule, 
  GeneratedProgram, 
  AssessmentPageProps,
  TargetGroup
} from '@/types/assessment';


const initialData: AssessmentData = {
  assessorInfo: {
    name: '',
    email: '',
    role: 'executive',
    company: '',
    companySize: '',
    industry: ''
  },
  organizationScope: {
    totalLeaders: 0, // This will be automatically calculated from targetGroups array
    departments: [],
    assessmentFocus: []
  },
  targetGroups: [],
  programReasons: {
    reasons: [],
    otherReasons: '',
    additionalContext: ''
  },
  organizationalGaps: {
    missingSkills: [],
    successionGaps: [],
    strategicAlignment: ''
  },

};

const companySizes = [
  '1-50 employees',
  '51-200 employees', 
  '201-500 employees',
  '501-1000 employees',
  '1001-5000 employees',
  '5000+ employees'
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Education',
  'Non-profit',
  'Government',
  'Other'
];

const departments = [
  'Sales',
  'Marketing',
  'Engineering/Technology',
  'Operations',
  'Finance',
  'Human Resources',
  'Legal',
  'Customer Success',
  'Product',
  'Research & Development'
];

const assessmentFocus = [
  'Leadership Development',
  'Succession Planning',
  'Performance Improvement',
  'Strategic Alignment',
  'Team Effectiveness',
  'Change Management',
  'Innovation Leadership',
  'Cross-functional Collaboration'
];

const competencies = [
  'Strategic Thinking',
  'Communication',
  'Team Building',
  'Decision Making',
  'Change Management',
  'Emotional Intelligence',
  'Innovation',
  'Coaching & Mentoring',
  'Conflict Resolution',
  'Business Acumen'
];

const estimatedCountOptions = [
  '1-5',
  '6-10',
  '11-20',
  '21-50',
  '51-100',
  '100+'
];

const learningStyleOptions = [
  'In-person Workshops',
  'Digital Workshops',
  'Individual Coaching',
  'On-the-job Assignments',
  'E-learning',
  'Presentations',
  'Case Studies',
  'Simulations',
  'Peer Learning',
  'Self-paced Modules',
  'Blended Learning',
  'Other'
];

const programIntensityOptions = [
  {
    value: 'Modular Program (spread over time)',
    label: 'Modular Program (spread over time)',
    description: 'Learning sessions spread over several weeks or months'
  },
  {
    value: 'Intensive Experience (bootcamp/retreat)',
    label: 'Intensive Experience (bootcamp/retreat)',
    description: 'Concentrated learning experience over a few days or weeks'
  },
  {
    value: 'Hybrid Approach (combination of both)',
    label: 'Hybrid Approach (combination of both)',
    description: 'Mix of modular and intensive learning experiences'
  }
];

const developmentNeedsOptions = [
  'Strategic Thinking',
  'Communication Skills',
  'Team Building',
  'Decision Making',
  'Change Management',
  'Emotional Intelligence',
  'Innovation & Creativity',
  'Coaching & Mentoring',
  'Conflict Resolution',
  'Business Acumen',
  'Digital Transformation',
  'Data-Driven Decision Making',
  'Cross-functional Collaboration',
  'Performance Management',
  'Other'
];

const programReasonsOptions = [
  'Performance Improvement',
  'Leadership Pipeline Development',
  'Change Management Support',
  'Strategic Alignment',
  'Team Effectiveness',
  'Innovation & Growth',
  'Cultural Development',
  'Culture Change',
  'Improved Employee Experience and Retention',
  'Other'
];

const mockTargetGroups: TargetGroup[] = [
  {
    id: 'targetGroup1',
    name: 'Executive',
    description: 'Top-level leaders responsible for overall strategy and direction.',
    developmentNeeds: ['Change Management'],
    otherDevelopmentNeeds: '',
    estimatedCount: '1-5',
    preferredLearningStyle: ['In-person Workshops'],
    otherLearningStyles: '',
    programIntensity: 'Modular Program (spread over time)',
    timeline: '6',
  },
  {
    id: 'targetGroup2',
    name: 'Middle Management',
    description: 'Managers overseeing teams and translating strategy into action.',
    developmentNeeds: ['Innovation'],
    otherDevelopmentNeeds: '',
    estimatedCount: '6-10',
    preferredLearningStyle: ['E-learning'],
    otherLearningStyles: '',
    programIntensity: 'Hybrid Approach (combination of both)',
    timeline: '12',
  },
];

export default function AssessmentPageComponent({
  testMode = false,
  mockData,
  mockGeneratedProgram,
  mockLibraryModules,
}: AssessmentPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AssessmentData>(mockData || initialData);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProgram, setGeneratedProgram] = useState<GeneratedProgram | null>(mockGeneratedProgram || null);
  const [libraryModules, setLibraryModules] = useState<ProgramModule[]>(mockLibraryModules || []);
  const [aiStep, setAiStep] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // AI processing steps
  const aiSteps = [
    { message: "Analyzing organizational data...", duration: 800, progress: 15 },
    { message: "Identifying leadership gaps...", duration: 1200, progress: 35 },
    { message: "Matching development needs...", duration: 1000, progress: 55 },
    { message: "Creating program modules...", duration: 1500, progress: 75 },
    { message: "Optimizing learning sequence...", duration: 1000, progress: 90 },
    { message: "Finalizing development program...", duration: 500, progress: 100 }
  ];

  useEffect(() => {
    if (testMode && mockData) {
      setData(mockData);
    }
  }, [testMode, mockData]);

  const updateData = (section: keyof AssessmentData, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    const errors: ValidationErrors = {};
    if (step === 1) {
      if (!data.assessorInfo.name.trim()) errors.assessorInfo = [...(errors.assessorInfo || []), 'Name is required'];
      if (!data.assessorInfo.email.trim()) errors.assessorInfo = [...(errors.assessorInfo || []), 'Email is required'];
      if (!data.assessorInfo.company.trim()) errors.assessorInfo = [...(errors.assessorInfo || []), 'Company is required'];
    }
    if (step === 2) {
      // Add any validation for organizationalGaps or developmentPlan if needed
    }
    if (step === 3) {
      if (data.targetGroups.length === 0) errors.targetGroups = [...(errors.targetGroups || []), 'At least one target group must be added'];
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsGenerating(true);
    setAiStep(0);
    setAiProgress(0);

    // Simulate AI processing
    let totalDelay = 0;
    aiSteps.forEach((step, index) => {
      setTimeout(() => {
        setAiStep(index);
        setAiProgress(step.progress);
      }, totalDelay);
      totalDelay += step.duration;
    });

    // Complete the process
    setTimeout(async () => {
      const program = generateProgram(data);
      setGeneratedProgram(program);
      // Fetch AI summary
      try {
        const res = await fetch('/api/generate-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        setSummary(result.summary || null);
      } catch (e) {
        setSummary('Unable to generate summary at this time.');
      }
      setIsGenerating(false);
    }, totalDelay + 500);
  };

  const generateProgram = (assessmentData: AssessmentData): GeneratedProgram => {
    // Mock program generation logic
    const totalLeaders = assessmentData.targetGroups.reduce((sum: number, targetGroup: TargetGroup) => {
      const count = typeof targetGroup.estimatedCount === 'string'
        ? parseInt(targetGroup.estimatedCount.split('-')[0]) || 0
        : 0;
      return sum + count;
    }, 0);
    const priorityLevels = assessmentData.targetGroups.length;
    const keyGaps = Array.from(new Set(assessmentData.targetGroups.flatMap((targetGroup: TargetGroup) => targetGroup.developmentNeeds)));
    // Update the totalLeaders in organizationScope to reflect the actual count
    setData(prev => ({
      ...prev,
      organizationScope: {
        ...prev.organizationScope,
        totalLeaders: totalLeaders
      }
    }));
    return {
      summary: {
        totalLeaders,
        priorityLeaders: priorityLevels,
        keyGaps: keyGaps.slice(0, 5),
        timeline: '6 months',
        estimatedBudget: '$25,000 - $50,000'
      },
      modules: [
        {
          id: '1',
          title: 'Leadership Foundation & Self-Awareness',
          description: 'Build core leadership competencies and develop emotional intelligence',
          duration: '4 weeks',
          level: 'All Levels',
          category: 'Core Leadership',
          order: 1,
          source: 'recommended'
        },
        {
          id: '2',
          title: 'Strategic Thinking & Organizational Alignment',
          description: 'Develop strategic mindset and align leadership actions with organizational goals',
          duration: '3 weeks',
          level: 'Senior+',
          category: 'Strategy',
          order: 2,
          source: 'recommended'
        },
        {
          id: '3',
          title: 'Team Building & High-Performance Management',
          description: 'Learn to build cohesive teams, manage performance, and drive results',
          duration: '4 weeks',
          level: 'All Levels',
          category: 'Team Management',
          order: 3,
          source: 'recommended'
        }
      ],
      recommendations: [
        'Focus development efforts on priority levels identified in your assessment',
        'Address key organizational gaps through targeted development',
        'Implement regular check-ins and progress tracking',
        'Allocate appropriate budget for comprehensive leadership development'
      ],
      nextSteps: [
        'Schedule kickoff meeting with priority levels',
        'Set up group development plans',
        'Establish success metrics and tracking mechanisms',
        'Plan regular progress reviews'
      ]
    };
  };

  // --- TARGET GROUPS LOGIC ---
  const addTargetGroup = () => {
    const newTargetGroup: TargetGroup = {
      id: `targetGroup${data.targetGroups.length + 1}`,
      name: '',
      description: '',
      developmentNeeds: [],
      otherDevelopmentNeeds: '',
      estimatedCount: '1-5',
      preferredLearningStyle: [],
      otherLearningStyles: '',
      programIntensity: '',
      timeline: '6',
    };
    setData(prev => ({
      ...prev,
      targetGroups: [...prev.targetGroups, newTargetGroup]
    }));
  };

  const updateTargetGroup = (index: number, field: keyof TargetGroup, value: any) => {
    setData(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.map((targetGroup, i) => 
        i === index ? { ...targetGroup, [field]: value } : targetGroup
      )
    }));
  };

  const removeTargetGroup = (index: number) => {
    setData(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.filter((_, i) => i !== index)
    }));
  };

  // Sortable item
  function renderTargetGroup({ targetGroup, index }: { targetGroup: TargetGroup; index: number }) {
    return (
      <Card className={`p-4 border-l-4 ${index === 0 ? 'border-primary' : 'border-border'} transition-all duration-200 bg-card flex flex-col gap-2`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{targetGroup.name}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeTargetGroup(index)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
                        <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <Input
                      value={targetGroup.name}
                      onChange={(e) => updateTargetGroup(index, 'name', e.target.value)}
                      placeholder="Enter target group name (e.g., Executive, Middle Management)"
                      className="h-11"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <Textarea
                      value={targetGroup.description}
                      onChange={(e) => updateTargetGroup(index, 'description', e.target.value)}
                      placeholder="Describe this target group..."
                      className="min-h-[80px]"
                    />
                  </div>
          

          
          <div>
            <Label className="text-sm font-medium">Development Needs</Label>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {developmentNeedsOptions.map((need) => (
                  <div key={need} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${targetGroup.id}-${need}`}
                      checked={targetGroup.developmentNeeds.includes(need)}
                      onCheckedChange={(checked) => {
                        const newNeeds = checked
                          ? [...targetGroup.developmentNeeds, need]
                          : targetGroup.developmentNeeds.filter(n => n !== need);
                        updateTargetGroup(index, 'developmentNeeds', newNeeds);
                      }}
                    />
                    <Label htmlFor={`${targetGroup.id}-${need}`} className="text-sm">{need}</Label>
                  </div>
                ))}
              </div>
              
              {targetGroup.developmentNeeds.includes('Other') && (
                <div className="mt-3">
                  <Label className="text-sm font-medium">Other Development Needs</Label>
                  <Textarea
                    value={targetGroup.otherDevelopmentNeeds}
                    onChange={(e) => updateTargetGroup(index, 'otherDevelopmentNeeds', e.target.value)}
                    placeholder="Please specify other development needs..."
                    className="min-h-[80px]"
                  />
                </div>
              )}
              
              {targetGroup.developmentNeeds.length > 0 && (
                <div className="mt-3">
                  <Label className="text-sm font-medium">Selected Needs:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targetGroup.developmentNeeds.map((need) => (
                      <Badge key={need} variant="secondary" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Estimated Count</Label>
            <Select value={targetGroup.estimatedCount} onValueChange={(value) => updateTargetGroup(index, 'estimatedCount', value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select estimated count" />
              </SelectTrigger>
              <SelectContent>
                {estimatedCountOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    );
  }

  const renderAssessorInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={data.assessorInfo.name}
            onChange={(e) => updateData('assessorInfo', 'name', e.target.value)}
            placeholder="Enter your full name"
            className="h-11"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.assessorInfo.email}
            onChange={(e) => updateData('assessorInfo', 'email', e.target.value)}
            placeholder="Enter your email"
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="company" className="text-sm font-medium text-gray-700">
          Company/Organization <span className="text-red-500">*</span>
        </Label>
        <Input
          id="company"
          value={data.assessorInfo.company}
          onChange={(e) => updateData('assessorInfo', 'company', e.target.value)}
          placeholder="Enter your company name"
          className="h-11"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Your Role</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
              { 
                value: 'executive', 
                label: 'Executive', 
                description: 'C-level or senior leadership',
                icon: Building2
              },
              { 
                value: 'hr-leader', 
                label: 'HR', 
                description: 'Human resources professional',
                icon: Users
              },
              { 
                value: 'consultant', 
                label: 'Consultant', 
                description: 'External advisor or consultant',
                icon: Briefcase
              },
              { 
                value: 'other', 
                label: 'Other', 
                description: 'Other role or position',
                icon: Users
              }
            ].map((role) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.value}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                    data.assessorInfo.role === role.value
                      ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg'
                      : 'hover:border-blue-300 hover:bg-gray-50'
                  }`}
                  onClick={() => updateData('assessorInfo', 'role', role.value)}
                >
                  <CardContent className="p-5">
                    <div className="text-center space-y-3">
                      <div className={`flex justify-center ${
                        data.assessorInfo.role === role.value ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        <IconComponent size={24} />
                      </div>
                      <div className={`font-semibold text-sm ${
                        data.assessorInfo.role === role.value ? 'text-blue-800' : 'text-gray-900'
                      }`}>
                        {role.label}
                      </div>
                      <div className={`text-xs leading-relaxed ${
                        data.assessorInfo.role === role.value ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {role.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="companySize" className="text-sm font-medium text-gray-700">
            Company Size
          </Label>
          <Select value={data.assessorInfo.companySize} onValueChange={(value) => updateData('assessorInfo', 'companySize', value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
            Industry
          </Label>
          <Select value={data.assessorInfo.industry} onValueChange={(value) => updateData('assessorInfo', 'industry', value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderOrganizationScope = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Departments/Teams to Include *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {departments.map((dept) => (
            <div key={dept} className="flex items-center space-x-2">
              <Checkbox
                id={dept}
                checked={data.organizationScope.departments.includes(dept)}
                onCheckedChange={(checked) => {
                  const newDepts = checked
                    ? [...data.organizationScope.departments, dept]
                    : data.organizationScope.departments.filter(d => d !== dept);
                  updateData('organizationScope', 'departments', newDepts);
                }}
              />
              <Label htmlFor={dept} className="text-sm">{dept}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Assessment Focus Areas</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assessmentFocus.map((focus) => (
            <div key={focus} className="flex items-center space-x-2">
              <Checkbox
                id={focus}
                checked={data.organizationScope.assessmentFocus.includes(focus)}
                onCheckedChange={(checked) => {
                  const newFocus = checked
                    ? [...data.organizationScope.assessmentFocus, focus]
                    : data.organizationScope.assessmentFocus.filter(f => f !== focus);
                  updateData('organizationScope', 'assessmentFocus', newFocus);
                }}
              />
              <Label htmlFor={focus} className="text-sm">{focus}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function renderTargetGroups() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Target Groups</h3>
          <Button onClick={addTargetGroup} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Target Group
          </Button>
        </div>
        
        {/* Info Message */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            What are the different target groups you would like to develop? E.g. new leaders, operational leaders or leaders at a certain hierarchical level.
          </p>
        </div>
        
        <div className="space-y-4">
          {data.targetGroups.map((targetGroup, index) => (
            <div key={targetGroup.id} className="relative">
              <Card className={`p-4 border-l-4 ${index === 0 ? 'border-primary' : 'border-border'} transition-all duration-200 bg-card flex flex-col gap-2`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{targetGroup.name || 'Untitled Target Group'}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTargetGroup(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <Input
                      value={targetGroup.name}
                      onChange={(e) => updateTargetGroup(index, 'name', e.target.value)}
                      placeholder="Enter target group name (e.g., Executive, Middle Management)"
                      className="h-11"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <Textarea
                      value={targetGroup.description}
                      onChange={(e) => updateTargetGroup(index, 'description', e.target.value)}
                      placeholder="Describe this target group..."
                      className="min-h-[80px]"
                    />
                  </div>
                  

                  
                  <div>
                    <Label className="text-sm font-medium">Development Needs</Label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {developmentNeedsOptions.map((need) => (
                          <div key={need} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${targetGroup.id}-${need}`}
                              checked={targetGroup.developmentNeeds.includes(need)}
                              onCheckedChange={(checked) => {
                                const newNeeds = checked
                                  ? [...targetGroup.developmentNeeds, need]
                                  : targetGroup.developmentNeeds.filter(n => n !== need);
                                updateTargetGroup(index, 'developmentNeeds', newNeeds);
                              }}
                            />
                            <Label htmlFor={`${targetGroup.id}-${need}`} className="text-sm">{need}</Label>
                          </div>
                        ))}
                      </div>
                      
                      {targetGroup.developmentNeeds.includes('Other') && (
                        <div className="mt-3">
                          <Label className="text-sm font-medium">Other Development Needs</Label>
                          <Textarea
                            value={targetGroup.otherDevelopmentNeeds}
                            onChange={(e) => updateTargetGroup(index, 'otherDevelopmentNeeds', e.target.value)}
                            placeholder="Please specify other development needs..."
                            className="min-h-[80px]"
                          />
                        </div>
                      )}
                      
                      {targetGroup.developmentNeeds.length > 0 && (
                        <div className="mt-3">
                          <Label className="text-sm font-medium">Selected Needs:</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {targetGroup.developmentNeeds.map((need) => (
                              <Badge key={need} variant="secondary" className="text-xs">
                                {need}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Estimated Count</Label>
                    <Select value={targetGroup.estimatedCount} onValueChange={(value) => updateTargetGroup(index, 'estimatedCount', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select estimated count" />
                      </SelectTrigger>
                      <SelectContent>
                        {estimatedCountOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Preferred Learning Style</Label>
                    <p className="text-xs text-muted-foreground mb-3">Select the learning formats and methods that work best for this target group</p>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {learningStyleOptions.map((style) => (
                          <div key={style} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${targetGroup.id}-learning-${style}`}
                              checked={targetGroup.preferredLearningStyle.includes(style)}
                              onCheckedChange={(checked) => {
                                const newStyles = checked
                                  ? [...targetGroup.preferredLearningStyle, style]
                                  : targetGroup.preferredLearningStyle.filter(s => s !== style);
                                updateTargetGroup(index, 'preferredLearningStyle', newStyles);
                              }}
                            />
                            <Label htmlFor={`${targetGroup.id}-learning-${style}`} className="text-sm">{style}</Label>
                          </div>
                        ))}
                      </div>
                      
                      {targetGroup.preferredLearningStyle.includes('Other') && (
                        <div className="mt-3">
                          <Label className="text-sm font-medium">Other Learning Styles</Label>
                          <Textarea
                            value={targetGroup.otherLearningStyles || ''}
                            onChange={(e) => updateTargetGroup(index, 'otherLearningStyles', e.target.value)}
                            placeholder="Please specify other learning styles..."
                            className="min-h-[80px]"
                          />
                        </div>
                      )}
                      
                      {targetGroup.preferredLearningStyle.length > 0 && (
                        <div className="mt-3">
                          <Label className="text-sm font-medium">Selected Learning Styles:</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {targetGroup.preferredLearningStyle.map((style) => (
                              <Badge key={style} variant="secondary" className="text-xs">
                                {style}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Program Intensity Preference</Label>
                    <div className="space-y-3">
                      <RadioGroup 
                        value={targetGroup.programIntensity} 
                        onValueChange={(value) => updateTargetGroup(index, 'programIntensity', value)}
                      >
                        {programIntensityOptions.map((option) => (
                          <div key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                            <RadioGroupItem value={option.value} id={`${targetGroup.id}-intensity-${option.value}`} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={`${targetGroup.id}-intensity-${option.value}`} className="text-sm font-medium cursor-pointer">
                                {option.label}
                              </Label>
                              <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Timeline: {targetGroup.timeline || '6'} months</Label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="3"
                        max="18"
                        step="3"
                        value={targetGroup.timeline || '6'}
                        onChange={(e) => updateTargetGroup(index, 'timeline', e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>3 months</span>
                        <span>6 months</span>
                        <span>9 months</span>
                        <span>12 months</span>
                        <span>15 months</span>
                        <span>18 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const renderProgramReasons = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">What business outcomes do you want this program to support (e.g., culture change, succession planning, innovation, performance improvement)?</Label>
        <div className="space-y-3 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programReasonsOptions.map((reason) => (
              <Card
                key={reason}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                  data.programReasons.reasons.includes(reason)
                    ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg'
                    : 'hover:border-blue-300 hover:bg-gray-50'
                }`}
                onClick={() => {
                  const newReasons = data.programReasons.reasons.includes(reason)
                    ? data.programReasons.reasons.filter(r => r !== reason)
                    : [...data.programReasons.reasons, reason];
                  updateData('programReasons', 'reasons', newReasons);
                }}
              >
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className={`font-semibold text-sm ${
                      data.programReasons.reasons.includes(reason) ? 'text-blue-800' : 'text-gray-900'
                    }`}>
                      {reason}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {data.programReasons.reasons.includes('Other') && (
            <div className="mt-3">
              <Label className="text-sm font-medium">Other Reasons</Label>
              <Textarea
                value={data.programReasons.otherReasons}
                onChange={(e) => updateData('programReasons', 'otherReasons', e.target.value)}
                placeholder="Please specify other business outcomes you want to achieve..."
                className="min-h-[80px]"
              />
            </div>
          )}
          
          {data.programReasons.reasons.length > 0 && (
            <div className="mt-3">
              <Label className="text-sm font-medium">Selected Reasons:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.programReasons.reasons.map((reason) => (
                  <Badge key={reason} variant="secondary" className="text-xs">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium">Additional Context & Goals (Optional)</Label>
        <Textarea
          value={data.programReasons.additionalContext || ''}
          onChange={(e) => updateData('programReasons', 'additionalContext', e.target.value)}
          placeholder="Please describe your specific needs, challenges, and business outcomes goals in detail. This helps us create a more tailored program for your organization..."
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground">
          Feel free to share your organization's unique challenges, specific goals, or any additional context that would help us understand your needs better.
        </p>
      </div>
    </div>
  );

  const renderOrganizationalGaps = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Missing Skills Across Organization</Label>
        <Textarea
          value={data.organizationalGaps.missingSkills.join(', ')}
          onChange={(e) => updateData('organizationalGaps', 'missingSkills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
          placeholder="Enter missing skills, separated by commas"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Succession Planning Gaps</Label>
        <Textarea
          value={data.organizationalGaps.successionGaps.join(', ')}
          onChange={(e) => updateData('organizationalGaps', 'successionGaps', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
          placeholder="Enter succession gaps, separated by commas"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Strategic Alignment Notes</Label>
        <Textarea
          value={data.organizationalGaps.strategicAlignment}
          onChange={(e) => updateData('organizationalGaps', 'strategicAlignment', e.target.value)}
          placeholder="Describe strategic alignment challenges or opportunities"
          rows={4}
        />
      </div>
    </div>
  );



  const renderGeneratingProgram = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
        <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
      </div>
      <div className="text-center">
        <h2 className="text-xl text-foreground mb-2">Generating Your Development Program</h2>
        <p className="text-muted-foreground">Our AI is analyzing your assessment data and creating a personalized program</p>
      </div>
      
      <div className="w-full max-w-md space-y-4">
        {aiSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              index <= aiStep
                ? 'bg-muted border border-border'
                : 'bg-muted border border-border opacity-50'
            }`}
          >
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              {index < aiStep ? (
                <CheckCircle className="h-4 w-4 text-primary-foreground" />
              ) : (
                <span className="text-primary-foreground text-xs font-medium">{index + 1}</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">{step.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full max-w-md">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${aiProgress}%` }}
          />
        </div>
      </div>
    </div>
  );

  const renderGroupedDetails = () => (
    <div className="space-y-10">
      {/* Program Reasons */}
      <div>
        <h3 className="text-lg mb-2">Program Objectives</h3>
        {renderProgramReasons()}
      </div>
    </div>
  );

  const renderProgramRecommendation = () => {
    if (!generatedProgram) return null;
    return (
      <DevelopmentProgram 
        program={generatedProgram}
        leaders={data.targetGroups} // pass targetGroups as leaders for now
        summary={summary}
        onStartOver={() => setCurrentStep(1)}
      />
    );
  };

  return (
    <div className="bg-white h-full">
      {isGenerating ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderGeneratingProgram()}
        </div>
      ) : generatedProgram ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          {renderProgramRecommendation()}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                {currentStep === 1 && 'Assessor Information'}
                {currentStep === 2 && 'Organization Details & Plan'}
                {currentStep === 3 && 'Target Groups Assessment'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderAssessorInfo()}
              {currentStep === 2 && renderGroupedDetails()}
              {currentStep === 3 && renderTargetGroups()}
            </CardContent>
          </Card>
          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Generate Program
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 