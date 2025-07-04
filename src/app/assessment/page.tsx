'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Target,
  Users,
  TrendingUp,
  BookOpen,
  Clock,
  Star,
  Loader2,
  GripVertical,
  Calendar,
  Award,
  Zap,
  User,
  Sparkles
} from 'lucide-react'

interface AssessmentData {
  personalInfo: {
    name: string
    email: string
    company: string
    role: string
    experience: string
  }
  currentLeadership: {
    teamSize: string
    leadershipLevel: string
    challenges: string[]
    strengths: string[]
  }
  developmentGoals: {
    primaryGoal: string
    timeFrame: string
    specificAreas: string[]
    motivation: string
  }
  learningPreferences: {
    preferredFormat: string[]
    timeAvailability: string
    learningStyle: string
    supportNeeded: string
  }
}

interface ValidationErrors {
  [key: string]: string[]
}

const initialData: AssessmentData = {
  personalInfo: {
    name: '',
    email: '',
    company: '',
    role: '',
    experience: ''
  },
  currentLeadership: {
    teamSize: '',
    leadershipLevel: '',
    challenges: [],
    strengths: []
  },
  developmentGoals: {
    primaryGoal: '',
    timeFrame: '',
    specificAreas: [],
    motivation: ''
  },
  learningPreferences: {
    preferredFormat: [],
    timeAvailability: '',
    learningStyle: '',
    supportNeeded: ''
  }
}

const challenges = [
  'Team Communication',
  'Conflict Resolution',
  'Strategic Planning',
  'Change Management',
  'Performance Management',
  'Decision Making',
  'Time Management',
  'Building Trust',
  'Motivating Others',
  'Delegation'
]

const strengths = [
  'Communication',
  'Strategic Thinking',
  'Empathy',
  'Problem Solving',
  'Innovation',
  'Collaboration',
  'Adaptability',
  'Resilience',
  'Mentoring',
  'Technical Skills'
]

const specificAreas = [
  'Emotional Intelligence',
  'Strategic Leadership',
  'Team Building',
  'Change Management',
  'Coaching & Mentoring',
  'Crisis Management',
  'Innovation Leadership',
  'Cross-cultural Leadership',
  'Digital Leadership',
  'Sustainability Leadership'
]

const learningFormats = [
  'Online Courses',
  'Workshops',
  'One-on-One Coaching',
  'Peer Learning Groups',
  'Case Studies',
  'Simulations',
  'Mentoring Programs',
  'Action Learning Projects'
]

// Sample program modules based on assessment data
const generateProgramModules = (data: AssessmentData): ProgramModule[] => {
  const baseModules: ProgramModule[] = [
    {
      id: '1',
      title: 'Leadership Foundations',
      description: 'Core leadership principles and self-awareness development',
      duration: '4 weeks',
      level: 'Beginner',
      category: 'Core',
      order: 1,
      source: 'recommended'
    },
    {
      id: '2',
      title: 'Emotional Intelligence Mastery',
      description: 'Develop emotional awareness and relationship management skills',
      duration: '3 weeks',
      level: 'Intermediate',
      category: 'Core',
      order: 2,
      source: 'recommended'
    },
    {
      id: '3',
      title: 'Strategic Thinking & Planning',
      description: 'Learn to think strategically and create effective plans',
      duration: '5 weeks',
      level: 'Intermediate',
      category: 'Strategy',
      order: 3,
      source: 'recommended'
    },
    {
      id: '4',
      title: 'Team Building & Management',
      description: 'Build high-performing teams and manage group dynamics',
      duration: '4 weeks',
      level: 'Intermediate',
      category: 'Team',
      order: 4,
      source: 'recommended'
    },
    {
      id: '5',
      title: 'Change Management',
      description: 'Lead organizational change and manage resistance',
      duration: '3 weeks',
      level: 'Advanced',
      category: 'Change',
      order: 5,
      source: 'recommended'
    },
    {
      id: '6',
      title: 'Coaching & Mentoring',
      description: 'Develop coaching skills to empower your team members',
      duration: '4 weeks',
      level: 'Advanced',
      category: 'Development',
      order: 6,
      source: 'recommended'
    }
  ]

  // Customize based on assessment data
  if (data.currentLeadership.challenges.includes('Team Communication')) {
    baseModules.push({
      id: '7',
      title: 'Advanced Communication Skills',
      description: 'Master difficult conversations and team communication',
      duration: '3 weeks',
      level: 'Intermediate',
      category: 'Communication',
      order: 7,
      source: 'recommended'
    })
  }

  if (data.developmentGoals.specificAreas.includes('Strategic Leadership')) {
    baseModules.push({
      id: '8',
      title: 'Executive Leadership',
      description: 'Develop executive presence and strategic vision',
      duration: '6 weeks',
      level: 'Advanced',
      category: 'Executive',
      order: 8,
      source: 'recommended'
    })
  }

  return baseModules.sort((a, b) => a.order - b.order)
}

// Additional modules available in the sidebar
const additionalModules: ProgramModule[] = [
  {
    id: 'sidebar-1',
    title: 'Crisis Leadership',
    description: 'Lead effectively during challenging times and crises',
    duration: '3 weeks',
    level: 'Advanced',
    category: 'Crisis',
    order: 1,
    source: 'sidebar'
  },
  {
    id: 'sidebar-2',
    title: 'Digital Transformation Leadership',
    description: 'Lead digital initiatives and technology adoption',
    duration: '4 weeks',
    level: 'Advanced',
    category: 'Digital',
    order: 2,
    source: 'sidebar'
  },
  {
    id: 'sidebar-3',
    title: 'Cross-Cultural Leadership',
    description: 'Lead diverse teams across different cultures',
    duration: '3 weeks',
    level: 'Intermediate',
    category: 'Diversity',
    order: 3,
    source: 'sidebar'
  },
  {
    id: 'sidebar-4',
    title: 'Innovation Leadership',
    description: 'Foster creativity and drive innovation in your organization',
    duration: '4 weeks',
    level: 'Advanced',
    category: 'Innovation',
    order: 4,
    source: 'sidebar'
  },
  {
    id: 'sidebar-5',
    title: 'Sustainability Leadership',
    description: 'Lead sustainable business practices and initiatives',
    duration: '3 weeks',
    level: 'Intermediate',
    category: 'Sustainability',
    order: 5,
    source: 'sidebar'
  },
  {
    id: 'sidebar-6',
    title: 'Remote Team Leadership',
    description: 'Effectively lead and manage remote and hybrid teams',
    duration: '3 weeks',
    level: 'Intermediate',
    category: 'Remote',
    order: 6,
    source: 'sidebar'
  },
  {
    id: 'sidebar-7',
    title: 'Financial Leadership',
    description: 'Understand financial metrics and make data-driven decisions',
    duration: '4 weeks',
    level: 'Advanced',
    category: 'Finance',
    order: 7,
    source: 'sidebar'
  },
  {
    id: 'sidebar-8',
    title: 'Public Speaking & Presentation',
    description: 'Develop confidence in public speaking and presentations',
    duration: '2 weeks',
    level: 'Beginner',
    category: 'Communication',
    order: 8,
    source: 'sidebar'
  }
]

interface ProgramModule {
  id: string
  title: string
  description: string
  duration: string
  level: string
  category: string
  order: number
  source?: 'recommended' | 'sidebar'
}

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<AssessmentData>(initialData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [programModules, setProgramModules] = useState<ProgramModule[]>([])
  const [availableModules, setAvailableModules] = useState<ProgramModule[]>([])
  const [draggedModule, setDraggedModule] = useState<string | null>(null)
  const [dragSource, setDragSource] = useState<'program' | 'sidebar' | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const updateData = (section: keyof AssessmentData, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
    
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[`${section}.${field}`]
        return newErrors
      })
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {}
    
    switch (step) {
      case 1: // Personal Information
        if (!data.personalInfo.name.trim()) {
          newErrors['personalInfo.name'] = ['Full name is required']
        }
        if (!data.personalInfo.email.trim()) {
          newErrors['personalInfo.email'] = ['Email address is required']
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
          newErrors['personalInfo.email'] = ['Please enter a valid email address']
        }
        break
        
      case 2: // Current Leadership
        if (!data.currentLeadership.teamSize) {
          newErrors['currentLeadership.teamSize'] = ['Team size is required']
        }
        if (!data.currentLeadership.leadershipLevel) {
          newErrors['currentLeadership.leadershipLevel'] = ['Leadership level is required']
        }
        if (data.currentLeadership.challenges.length === 0) {
          newErrors['currentLeadership.challenges'] = ['Please select at least one challenge']
        }
        if (data.currentLeadership.strengths.length === 0) {
          newErrors['currentLeadership.strengths'] = ['Please select at least one strength']
        }
        break
        
      case 3: // Development Goals
        if (!data.developmentGoals.primaryGoal.trim()) {
          newErrors['developmentGoals.primaryGoal'] = ['Primary goal is required']
        }
        if (!data.developmentGoals.timeFrame) {
          newErrors['developmentGoals.timeFrame'] = ['Timeframe is required']
        }
        if (data.developmentGoals.specificAreas.length === 0) {
          newErrors['developmentGoals.specificAreas'] = ['Please select at least one area to develop']
        }
        if (!data.developmentGoals.motivation.trim()) {
          newErrors['developmentGoals.motivation'] = ['Motivation is required']
        }
        break
        
      case 4: // Learning Preferences
        if (data.learningPreferences.preferredFormat.length === 0) {
          newErrors['learningPreferences.preferredFormat'] = ['Please select at least one learning format']
        }
        if (!data.learningPreferences.timeAvailability) {
          newErrors['learningPreferences.timeAvailability'] = ['Time availability is required']
        }
        if (!data.learningPreferences.learningStyle) {
          newErrors['learningPreferences.learningStyle'] = ['Learning style is required']
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getFieldError = (fieldPath: string): string | undefined => {
    return errors[fieldPath]?.[0]
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true)
      setIsGenerating(true)
      setApiError(null) // Clear any previous errors
      const totalAIDuration = aiSteps.reduce((sum, step) => sum + step.duration, 0) + 500;
      let openAIModules = null;
      let openAISummary = null;
      try {
        const res = await fetch('/api/generate-program', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assessment: data }),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          console.error('API Error:', errorData);
          setApiError(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
          // Continue with fallback data
        } else {
          const result = await res.json();
          if (result.modules && Array.isArray(result.modules)) {
            openAIModules = result.modules;
          }
          if (result.summary) {
            openAISummary = result.summary;
          }
        }
      } catch (err) {
        console.error('Network error:', err);
        setApiError('Network error: Unable to connect to AI service');
        // Continue with fallback data
      }
      setTimeout(() => {
        const modules = openAIModules || generateProgramModules(data);
        setProgramModules(modules)
        setAiSummary(openAISummary || null);
        // Filter out modules that are already in the program
        const usedModuleIds = modules.map((m: ProgramModule) => m.id)
        const filteredAdditionalModules = additionalModules.filter(
          (m: ProgramModule) => !usedModuleIds.includes(m.id)
        )
        setAvailableModules(filteredAdditionalModules)
        setIsGenerating(false)
      }, totalAIDuration)
    }
  }

  const handleGetStarted = () => {
    router.push('/pricing')
  }

  const handleDragStart = (e: React.DragEvent, moduleId: string, source: 'program' | 'sidebar') => {
    setDraggedModule(moduleId)
    setDragSource(source)
    setDropTarget(null)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', moduleId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e: React.DragEvent, moduleId: string) => {
    e.preventDefault()
    if (draggedModule && draggedModule !== moduleId) {
      setDropTarget(moduleId)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // Only clear drop target if we're actually leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDropTarget(null)
    }
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedModule || !dragSource) return

    if (dragSource === 'program') {
      // Reordering within program
      if (draggedModule === targetId) return

      setProgramModules(prev => {
        const modules = [...prev]
        const draggedIndex = modules.findIndex(m => m.id === draggedModule)
        const targetIndex = modules.findIndex(m => m.id === targetId)
        
        const [draggedModuleData] = modules.splice(draggedIndex, 1)
        modules.splice(targetIndex, 0, draggedModuleData)
        
        // Update order
        return modules.map((module, index) => ({
          ...module,
          order: index + 1
        }))
      })
    } else if (dragSource === 'sidebar') {
      // Adding from sidebar to program
      const moduleToAdd = availableModules.find(m => m.id === draggedModule)
      if (!moduleToAdd) return

      setProgramModules(prev => {
        const targetIndex = prev.findIndex(m => m.id === targetId)
        const newModule = { ...moduleToAdd, order: targetIndex + 1 }
        
        // Insert at target position and update orders
        const newModules = [...prev]
        newModules.splice(targetIndex, 0, newModule)
        
        return newModules.map((module, index) => ({
          ...module,
          order: index + 1
        }))
      })

      // Remove from available modules
      setAvailableModules(prev => prev.filter((m: ProgramModule) => m.id !== draggedModule))
    }
    
    setDraggedModule(null)
    setDragSource(null)
    setDropTarget(null)
  }

  const handleDropOnProgram = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedModule || !dragSource) return

    if (dragSource === 'sidebar') {
      // Adding from sidebar to end of program
      const moduleToAdd = availableModules.find(m => m.id === draggedModule)
      if (!moduleToAdd) return

      setProgramModules(prev => {
        const newModule = { ...moduleToAdd, order: prev.length + 1 }
        return [...prev, newModule]
      })

      // Remove from available modules
      setAvailableModules(prev => prev.filter((m: ProgramModule) => m.id !== draggedModule))
    }
    
    setDraggedModule(null)
    setDragSource(null)
    setDropTarget(null)
  }

  const removeModule = (moduleId: string) => {
    const moduleToRemove = programModules.find(m => m.id === moduleId)
    if (!moduleToRemove) return

    // Remove from program
    setProgramModules(prev => {
      const newModules = prev.filter(m => m.id !== moduleId)
      return newModules.map((module, index) => ({
        ...module,
        order: index + 1
      }))
    })

    // Add back to available modules if it was from sidebar
    if (moduleToRemove.source === 'sidebar') {
      setAvailableModules(prev => [...prev, { ...moduleToRemove, order: prev.length + 1 }])
    }
  }

  const DropIndicator = ({ moduleId }: { moduleId: string }) => (
    <div className="relative">
      <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 rounded-full shadow-lg transform -translate-y-1/2 z-10" />
    </div>
  )

  // --- AI Loading State ---
  const aiSteps = [
    { message: "Analyzing your leadership profile...", duration: 800, progress: 15 },
    { message: "Identifying key development areas...", duration: 1200, progress: 35 },
    { message: "Matching learning preferences...", duration: 1000, progress: 55 },
    { message: "Creating personalized modules...", duration: 1500, progress: 75 },
    { message: "Optimizing learning sequence...", duration: 1000, progress: 90 },
    { message: "Finalizing your program...", duration: 500, progress: 100 }
  ];
  const aiThoughts = [
    "Synthesizing leadership modules…",
    "Optimizing learning path…",
    "Cross-referencing best practices…",
    "Personalizing for your goals…",
    "Analyzing team dynamics…",
    "Integrating latest research…"
  ];
  const [aiStep, setAiStep] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [thoughtIndex, setThoughtIndex] = useState(0);
  useEffect(() => {
    let totalDelay = 0;
    if (isGenerating) {
      aiSteps.forEach((step, index) => {
        setTimeout(() => {
          setAiStep(index);
          setAiProgress(step.progress);
        }, totalDelay);
        totalDelay += step.duration;
      });
      setTimeout(() => {
        setAiStep(aiSteps.length - 1);
        setAiProgress(100);
      }, totalDelay + 500);
      const interval = setInterval(() => {
        setThoughtIndex((prev) => (prev + 1) % aiThoughts.length);
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={data.personalInfo.name}
            onChange={(e) => updateData('personalInfo', 'name', e.target.value)}
            placeholder="Enter your full name"
            className={getFieldError('personalInfo.name') ? 'border-red-500' : ''}
          />
          {getFieldError('personalInfo.name') && (
            <p className="text-sm text-red-500">{getFieldError('personalInfo.name')}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updateData('personalInfo', 'email', e.target.value)}
            placeholder="Enter your email"
            className={getFieldError('personalInfo.email') ? 'border-red-500' : ''}
          />
          {getFieldError('personalInfo.email') && (
            <p className="text-sm text-red-500">{getFieldError('personalInfo.email')}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company/Organization</Label>
          <Input
            id="company"
            value={data.personalInfo.company}
            onChange={(e) => updateData('personalInfo', 'company', e.target.value)}
            placeholder="Enter your company name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Current Role</Label>
          <Input
            id="role"
            value={data.personalInfo.role}
            onChange={(e) => updateData('personalInfo', 'role', e.target.value)}
            placeholder="Enter your current role"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Leadership Experience</Label>
        <Select value={data.personalInfo.experience} onValueChange={(value) => updateData('personalInfo', 'experience', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="11-15">11-15 years</SelectItem>
            <SelectItem value="15+">15+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderCurrentLeadership = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teamSize">Team Size *</Label>
          <Select value={data.currentLeadership.teamSize} onValueChange={(value) => updateData('currentLeadership', 'teamSize', value)}>
            <SelectTrigger className={getFieldError('currentLeadership.teamSize') ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 people</SelectItem>
              <SelectItem value="6-15">6-15 people</SelectItem>
              <SelectItem value="16-50">16-50 people</SelectItem>
              <SelectItem value="51-100">51-100 people</SelectItem>
              <SelectItem value="100+">100+ people</SelectItem>
            </SelectContent>
          </Select>
          {getFieldError('currentLeadership.teamSize') && (
            <p className="text-sm text-red-500">{getFieldError('currentLeadership.teamSize')}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="leadershipLevel">Leadership Level *</Label>
          <Select value={data.currentLeadership.leadershipLevel} onValueChange={(value) => updateData('currentLeadership', 'leadershipLevel', value)}>
            <SelectTrigger className={getFieldError('currentLeadership.leadershipLevel') ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select leadership level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontline">Frontline Manager</SelectItem>
              <SelectItem value="middle">Middle Manager</SelectItem>
              <SelectItem value="senior">Senior Manager</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
              <SelectItem value="c-level">C-Level</SelectItem>
            </SelectContent>
          </Select>
          {getFieldError('currentLeadership.leadershipLevel') && (
            <p className="text-sm text-red-500">{getFieldError('currentLeadership.leadershipLevel')}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>What are your biggest leadership challenges? (Select all that apply) *</Label>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${getFieldError('currentLeadership.challenges') ? 'border border-red-500 rounded-md p-3' : ''}`}>
          {challenges.map((challenge) => (
            <div key={challenge} className="flex items-center space-x-2">
              <Checkbox
                id={challenge}
                checked={data.currentLeadership.challenges.includes(challenge)}
                onCheckedChange={(checked) => {
                  const newChallenges = checked
                    ? [...data.currentLeadership.challenges, challenge]
                    : data.currentLeadership.challenges.filter(c => c !== challenge)
                  updateData('currentLeadership', 'challenges', newChallenges)
                }}
              />
              <Label htmlFor={challenge} className="text-sm">{challenge}</Label>
            </div>
          ))}
        </div>
        {getFieldError('currentLeadership.challenges') && (
          <p className="text-sm text-red-500">{getFieldError('currentLeadership.challenges')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>What are your leadership strengths? (Select all that apply) *</Label>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${getFieldError('currentLeadership.strengths') ? 'border border-red-500 rounded-md p-3' : ''}`}>
          {strengths.map((strength) => (
            <div key={strength} className="flex items-center space-x-2">
              <Checkbox
                id={strength}
                checked={data.currentLeadership.strengths.includes(strength)}
                onCheckedChange={(checked) => {
                  const newStrengths = checked
                    ? [...data.currentLeadership.strengths, strength]
                    : data.currentLeadership.strengths.filter(s => s !== strength)
                  updateData('currentLeadership', 'strengths', newStrengths)
                }}
              />
              <Label htmlFor={strength} className="text-sm">{strength}</Label>
            </div>
          ))}
        </div>
        {getFieldError('currentLeadership.strengths') && (
          <p className="text-sm text-red-500">{getFieldError('currentLeadership.strengths')}</p>
        )}
      </div>
    </div>
  )

  const renderDevelopmentGoals = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primaryGoal">What is your primary leadership development goal? *</Label>
        <Textarea
          id="primaryGoal"
          value={data.developmentGoals.primaryGoal}
          onChange={(e) => updateData('developmentGoals', 'primaryGoal', e.target.value)}
          placeholder="Describe your main leadership development objective..."
          rows={3}
          className={getFieldError('developmentGoals.primaryGoal') ? 'border-red-500' : ''}
        />
        {getFieldError('developmentGoals.primaryGoal') && (
          <p className="text-sm text-red-500">{getFieldError('developmentGoals.primaryGoal')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeFrame">What is your target timeframe for achieving this goal? *</Label>
        <Select value={data.developmentGoals.timeFrame} onValueChange={(value) => updateData('developmentGoals', 'timeFrame', value)}>
          <SelectTrigger className={getFieldError('developmentGoals.timeFrame') ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-months">3 months</SelectItem>
            <SelectItem value="6-months">6 months</SelectItem>
            <SelectItem value="1-year">1 year</SelectItem>
            <SelectItem value="2-years">2 years</SelectItem>
            <SelectItem value="ongoing">Ongoing development</SelectItem>
          </SelectContent>
        </Select>
        {getFieldError('developmentGoals.timeFrame') && (
          <p className="text-sm text-red-500">{getFieldError('developmentGoals.timeFrame')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Which specific areas would you like to develop? (Select all that apply) *</Label>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${getFieldError('developmentGoals.specificAreas') ? 'border border-red-500 rounded-md p-3' : ''}`}>
          {specificAreas.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={area}
                checked={data.developmentGoals.specificAreas.includes(area)}
                onCheckedChange={(checked) => {
                  const newAreas = checked
                    ? [...data.developmentGoals.specificAreas, area]
                    : data.developmentGoals.specificAreas.filter(a => a !== area)
                  updateData('developmentGoals', 'specificAreas', newAreas)
                }}
              />
              <Label htmlFor={area} className="text-sm">{area}</Label>
            </div>
          ))}
        </div>
        {getFieldError('developmentGoals.specificAreas') && (
          <p className="text-sm text-red-500">{getFieldError('developmentGoals.specificAreas')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">What motivates you to develop as a leader? *</Label>
        <Textarea
          id="motivation"
          value={data.developmentGoals.motivation}
          onChange={(e) => updateData('developmentGoals', 'motivation', e.target.value)}
          placeholder="Share what drives your leadership development..."
          rows={3}
          className={getFieldError('developmentGoals.motivation') ? 'border-red-500' : ''}
        />
        {getFieldError('developmentGoals.motivation') && (
          <p className="text-sm text-red-500">{getFieldError('developmentGoals.motivation')}</p>
        )}
      </div>
    </div>
  )

  const renderLearningPreferences = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>What learning formats do you prefer? (Select all that apply) *</Label>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${getFieldError('learningPreferences.preferredFormat') ? 'border border-red-500 rounded-md p-3' : ''}`}>
          {learningFormats.map((format) => (
            <div key={format} className="flex items-center space-x-2">
              <Checkbox
                id={format}
                checked={data.learningPreferences.preferredFormat.includes(format)}
                onCheckedChange={(checked) => {
                  const newFormats = checked
                    ? [...data.learningPreferences.preferredFormat, format]
                    : data.learningPreferences.preferredFormat.filter(f => f !== format)
                  updateData('learningPreferences', 'preferredFormat', newFormats)
                }}
              />
              <Label htmlFor={format} className="text-sm">{format}</Label>
            </div>
          ))}
        </div>
        {getFieldError('learningPreferences.preferredFormat') && (
          <p className="text-sm text-red-500">{getFieldError('learningPreferences.preferredFormat')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeAvailability">How much time can you dedicate to learning weekly? *</Label>
        <Select value={data.learningPreferences.timeAvailability} onValueChange={(value) => updateData('learningPreferences', 'timeAvailability', value)}>
          <SelectTrigger className={getFieldError('learningPreferences.timeAvailability') ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select time availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-2-hours">1-2 hours</SelectItem>
            <SelectItem value="3-5-hours">3-5 hours</SelectItem>
            <SelectItem value="6-10-hours">6-10 hours</SelectItem>
            <SelectItem value="10+hours">10+ hours</SelectItem>
          </SelectContent>
        </Select>
        {getFieldError('learningPreferences.timeAvailability') && (
          <p className="text-sm text-red-500">{getFieldError('learningPreferences.timeAvailability')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>What is your preferred learning style? *</Label>
        <RadioGroup value={data.learningPreferences.learningStyle} onValueChange={(value) => updateData('learningPreferences', 'learningStyle', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="visual" id="visual" />
            <Label htmlFor="visual">Visual (diagrams, videos, infographics)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="auditory" id="auditory" />
            <Label htmlFor="auditory">Auditory (discussions, podcasts, lectures)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kinesthetic" id="kinesthetic" />
            <Label htmlFor="kinesthetic">Kinesthetic (hands-on, practice, role-play)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed" id="mixed" />
            <Label htmlFor="mixed">Mixed approach</Label>
          </div>
        </RadioGroup>
        {getFieldError('learningPreferences.learningStyle') && (
          <p className="text-sm text-red-500">{getFieldError('learningPreferences.learningStyle')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportNeeded">What type of support do you need in your development journey?</Label>
        <Textarea
          id="supportNeeded"
          value={data.learningPreferences.supportNeeded}
          onChange={(e) => updateData('learningPreferences', 'supportNeeded', e.target.value)}
          placeholder="Describe any specific support or resources you need..."
          rows={3}
        />
      </div>
    </div>
  )

  const renderGeneratingProgram = () => (
    <div className="relative space-y-8 text-center">
      {/* Minimal animated code/data lines background (grayscale) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 w-full h-4 opacity-5 text-xs font-mono text-gray-400 animate-pulse"
            style={{
              top: `${15 + i * 14}%`,
              animationDelay: `${i * 0.8}s`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {`[AI] ${aiThoughts[(thoughtIndex + i) % aiThoughts.length]} // ${Math.random().toString(36).slice(2, 10)}`}
          </div>
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Minimal Loader Icon */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-200 bg-white shadow-sm">
            <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
          </div>
        </div>

        {/* AI Thought Bubble (grayscale) */}
        <div className="flex justify-center">
          <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-full px-6 py-2 text-gray-700 text-base font-mono animate-fade-in transition-all duration-500">
            <span className="inline-block animate-pulse">{aiThoughts[thoughtIndex]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Generating your program</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Our AI is analyzing your responses to create a personalized leadership development program.
          </p>
        </div>
      </div>

      {/* Minimal AI Processing Steps (grayscale) */}
      <div className="relative z-10 space-y-6 max-w-lg mx-auto">
        <div className="space-y-3">
          {aiSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                index <= aiStep
                  ? 'bg-gray-50 border border-gray-200'
                  : 'bg-white border border-gray-100 opacity-60'
              }`}
            >
              <div className="flex-shrink-0">
                {index < aiStep ? (
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center animate-step-complete">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                  </div>
                ) : index === aiStep ? (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  index <= aiStep ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {index === aiStep ? (
                    <span className="inline-block">
                      {step.message}
                      <span className="animate-pulse">|</span>
                    </span>
                  ) : (
                    step.message
                  )}
                </p>
                {index === aiStep && (
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-gray-500 h-1 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${((aiProgress - (index > 0 ? aiSteps[index - 1].progress : 0)) / (step.progress - (index > 0 ? aiSteps[index - 1].progress : 0))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Overall Progress</span>
            <span>{aiProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gray-700 h-3 rounded-full transition-all duration-500 ease-out shadow-sm relative"
              style={{ width: `${aiProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Minimal fun facts based on AI step (grayscale) */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <Zap className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">
              {aiStep === 0 && "Analyzing..."}
              {aiStep === 1 && "Processing..."}
              {aiStep === 2 && "Matching..."}
              {aiStep === 3 && "Creating..."}
              {aiStep === 4 && "Optimizing..."}
              {aiStep === 5 && "Finalizing..."}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {aiStep === 0 && "Our AI is examining your leadership profile across multiple dimensions to understand your unique strengths and growth areas."}
            {aiStep === 1 && "Identifying the most critical development areas based on your current role, team size, and leadership challenges."}
            {aiStep === 2 && "Matching your learning preferences with proven methodologies and delivery formats for maximum engagement."}
            {aiStep === 3 && "Creating personalized learning modules tailored to your specific goals and time availability."}
            {aiStep === 4 && "Optimizing the learning sequence to ensure progressive skill development and practical application."}
            {aiStep === 5 && "Finalizing your program with the perfect balance of theory, practice, and real-world application."}
          </p>
        </div>
      </div>
    </div>
  )

  const renderProgramRecommendation = () => (
    <div className="space-y-8">
      {/* Minimal AI summary section */}
      <section className="w-full bg-purple-50 border border-purple-300 rounded-xl py-8 mb-10">
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center text-center gap-2">
          <Sparkles className="h-7 w-7 text-purple-500 mb-1" />
          <h3 className="text-xl text-purple-800 mb-1 font-normal">Let's get started{data.personalInfo.name ? `, ${data.personalInfo.name}` : ''}!</h3>
          <div className="flex items-center gap-2 justify-center mb-1">
            <span className="text-purple-700">Summary of your responses</span>
            <div className="flex-1 border-t border-purple-200 max-w-xs" />
          </div>
          <div className="text-purple-900 text-base leading-relaxed">
            {aiSummary ? (
              <p>{aiSummary}</p>
            ) : (
              <p>Our AI has analyzed your responses and created a personalized summary of your leadership needs and goals.</p>
            )}
            {apiError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  <strong>Note:</strong> AI summary generation failed ({apiError}). Using fallback content.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Main heading and program card */}
      <div className="text-center space-y-4 mt-12 mb-8">
        <Award className="h-16 w-16 text-gray-600 mx-auto" />
        <h2 className="text-2xl font-bold">Here is your recommended program</h2>
        <p className="text-muted-foreground">
          Based on your assessment, we've created a personalized leadership development program. 
          You can reorder modules, add more from the sidebar, or remove modules to customize your learning path.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Program Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Learning Path</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {programModules.reduce((total, module) => {
                const weeks = parseInt(module.duration.split(' ')[0])
                return total + weeks
              }, 0)} weeks total
            </Badge>
          </div>

          <div 
            className={`min-h-[400px] space-y-3 p-4 rounded-lg border-2 border-dashed transition-colors ${
              draggedModule && dragSource === 'sidebar' 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-200'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDropOnProgram}
          >
            {programModules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <GripVertical className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Drag modules here to build your program</p>
              </div>
            ) : (
              <>
                {programModules.map((module, index) => (
                  <div key={module.id} className="relative">
                    {/* Drop indicator above the module */}
                    {dropTarget === module.id && draggedModule && draggedModule !== module.id && (
                      <DropIndicator moduleId={module.id} />
                    )}
                    
                    <Card 
                      className={`cursor-move transition-all duration-200 hover:shadow-md ${
                        draggedModule === module.id ? 'opacity-50' : ''
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, module.id, 'program')}
                      onDragEnter={(e) => handleDragEnter(e, module.id)}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, module.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{module.title}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">{module.level}</Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {module.duration}
                                </Badge>
                                {module.source === 'sidebar' && (
                                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                    Added
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">{module.category}</Badge>
                                <span className="text-xs text-muted-foreground">Module {index + 1}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeModule(module.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                
                {/* Drop indicator at the end if dragging from sidebar */}
                {draggedModule && dragSource === 'sidebar' && !dropTarget && (
                  <div className="relative">
                    <DropIndicator moduleId="end" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar with Additional Modules */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                More Modules
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag additional modules into your program
              </p>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {availableModules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No more modules available</p>
                </div>
              ) : (
                availableModules.map((module) => (
                  <Card 
                    key={module.id}
                    className="cursor-move transition-all duration-200 hover:shadow-md"
                    draggable
                    onDragStart={(e) => handleDragStart(e, module.id, 'sidebar')}
                  >
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{module.title}</h4>
                          <Badge variant="secondary" className="text-xs">{module.level}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{module.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{module.category}</Badge>
                          <span className="text-xs text-muted-foreground">{module.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button size="lg" onClick={handleGetStarted} className="px-8">
          <Zap className="h-4 w-4 mr-2" />
          Get Started →
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          isGenerating ? (
            <div className="py-8">
              {renderGeneratingProgram()}
            </div>
          ) : (
            <div className="py-8">
              {renderProgramRecommendation()}
            </div>
          )
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Leadership Needs Assessment
              </h1>
              <p className="text-slate-600">
                Help us understand your leadership development needs
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Required Fields Notice */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Note:</span> Fields marked with an asterisk (*) are required to complete the assessment.
              </p>
            </div>

            {/* Step Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  {currentStep === 1 && 'Personal Information'}
                  {currentStep === 2 && 'Current Leadership Context'}
                  {currentStep === 3 && 'Development Goals'}
                  {currentStep === 4 && 'Learning Preferences'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && renderPersonalInfo()}
                {currentStep === 2 && renderCurrentLeadership()}
                {currentStep === 3 && renderDevelopmentGoals()}
                {currentStep === 4 && renderLearningPreferences()}
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
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Submit Assessment
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 