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
  X,
  Loader2,
  GripVertical,
  Calendar,
  Award,
  Zap
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

interface ProgramModule {
  id: string
  title: string
  description: string
  duration: string
  level: string
  category: string
  order: number
}

interface AssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: (data: AssessmentData) => void
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
      order: 1
    },
    {
      id: '2',
      title: 'Emotional Intelligence Mastery',
      description: 'Develop emotional awareness and relationship management skills',
      duration: '3 weeks',
      level: 'Intermediate',
      category: 'Core',
      order: 2
    },
    {
      id: '3',
      title: 'Strategic Thinking & Planning',
      description: 'Learn to think strategically and create effective plans',
      duration: '5 weeks',
      level: 'Intermediate',
      category: 'Strategy',
      order: 3
    },
    {
      id: '4',
      title: 'Team Building & Management',
      description: 'Build high-performing teams and manage group dynamics',
      duration: '4 weeks',
      level: 'Intermediate',
      category: 'Team',
      order: 4
    },
    {
      id: '5',
      title: 'Change Management',
      description: 'Lead organizational change and manage resistance',
      duration: '3 weeks',
      level: 'Advanced',
      category: 'Change',
      order: 5
    },
    {
      id: '6',
      title: 'Coaching & Mentoring',
      description: 'Develop coaching skills to empower your team members',
      duration: '4 weeks',
      level: 'Advanced',
      category: 'Development',
      order: 6
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
      order: 7
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
      order: 8
    })
  }

  return baseModules.sort((a, b) => a.order - b.order)
}

export function AssessmentModal({ isOpen, onClose, onComplete }: AssessmentModalProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<AssessmentData>(initialData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [programModules, setProgramModules] = useState<ProgramModule[]>([])
  const [draggedModule, setDraggedModule] = useState<string | null>(null)
  const [aiStep, setAiStep] = useState(0)
  const [aiProgress, setAiProgress] = useState(0)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  // AI processing steps with realistic timing
  const aiSteps = [
    { message: "Analyzing your leadership profile...", duration: 800, progress: 15 },
    { message: "Identifying key development areas...", duration: 1200, progress: 35 },
    { message: "Matching learning preferences...", duration: 1000, progress: 55 },
    { message: "Creating personalized modules...", duration: 1500, progress: 75 },
    { message: "Optimizing learning sequence...", duration: 1000, progress: 90 },
    { message: "Finalizing your program...", duration: 500, progress: 100 }
  ]

  // Add AI thought bubbles and code lines
  const aiThoughts = [
    "Synthesizing leadership modules…",
    "Optimizing learning path…",
    "Cross-referencing best practices…",
    "Personalizing for your goals…",
    "Analyzing team dynamics…",
    "Integrating latest research…"
  ];
  const [thoughtIndex, setThoughtIndex] = useState(0);
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setThoughtIndex((prev) => (prev + 1) % aiThoughts.length);
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const updateData = (section: keyof AssessmentData, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    setIsGenerating(true)
    setAiStep(0)
    setAiProgress(0)
    
    // Simulate AI processing with multiple steps
    let totalDelay = 0
    aiSteps.forEach((step, index) => {
      setTimeout(() => {
        setAiStep(index)
        setAiProgress(step.progress)
      }, totalDelay)
      totalDelay += step.duration
    })
    
    // Complete the process
    setTimeout(() => {
      const modules = generateProgramModules(data)
      setProgramModules(modules)
      setIsGenerating(false)
      if (onComplete) onComplete(data)
    }, totalDelay + 500)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setData(initialData)
    setIsSubmitted(false)
    setIsGenerating(false)
    setProgramModules([])
    setAiStep(0)
    setAiProgress(0)
    onClose()
  }

  const handleGetStarted = () => {
    handleClose()
    router.push('/pricing')
  }

  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    setDraggedModule(moduleId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedModule || draggedModule === targetId) return

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
    
    setDraggedModule(null)
  }

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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updateData('personalInfo', 'email', e.target.value)}
            placeholder="Enter your email"
          />
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
          <Label htmlFor="teamSize">Team Size</Label>
          <Select value={data.currentLeadership.teamSize} onValueChange={(value) => updateData('currentLeadership', 'teamSize', value)}>
            <SelectTrigger>
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="leadershipLevel">Leadership Level</Label>
          <Select value={data.currentLeadership.leadershipLevel} onValueChange={(value) => updateData('currentLeadership', 'leadershipLevel', value)}>
            <SelectTrigger>
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
        </div>
      </div>

      <div className="space-y-2">
        <Label>What are your biggest leadership challenges? (Select all that apply)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      </div>

      <div className="space-y-2">
        <Label>What are your leadership strengths? (Select all that apply)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      </div>
    </div>
  )

  const renderDevelopmentGoals = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primaryGoal">What is your primary leadership development goal?</Label>
        <Textarea
          id="primaryGoal"
          value={data.developmentGoals.primaryGoal}
          onChange={(e) => updateData('developmentGoals', 'primaryGoal', e.target.value)}
          placeholder="Describe your main leadership development objective..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeFrame">What is your target timeframe for achieving this goal?</Label>
        <Select value={data.developmentGoals.timeFrame} onValueChange={(value) => updateData('developmentGoals', 'timeFrame', value)}>
          <SelectTrigger>
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
      </div>

      <div className="space-y-2">
        <Label>Which specific areas would you like to develop? (Select all that apply)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">What motivates you to develop as a leader?</Label>
        <Textarea
          id="motivation"
          value={data.developmentGoals.motivation}
          onChange={(e) => updateData('developmentGoals', 'motivation', e.target.value)}
          placeholder="Share what drives your leadership development..."
          rows={3}
        />
      </div>
    </div>
  )

  const renderLearningPreferences = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>What learning formats do you prefer? (Select all that apply)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeAvailability">How much time can you dedicate to learning weekly?</Label>
        <Select value={data.learningPreferences.timeAvailability} onValueChange={(value) => updateData('learningPreferences', 'timeAvailability', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select time availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-2-hours">1-2 hours</SelectItem>
            <SelectItem value="3-5-hours">3-5 hours</SelectItem>
            <SelectItem value="6-10-hours">6-10 hours</SelectItem>
            <SelectItem value="10+hours">10+ hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>What is your preferred learning style?</Label>
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
      <div className="text-4xl font-extrabold text-red-600 mb-4">NEW AI LOADING SCREEN</div>
      {/* Animated code/data lines background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute left-0 w-full h-4 opacity-10 text-xs font-mono text-blue-900 animate-pulse`}
            style={{
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.7}s`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {`[AI] ${aiThoughts[(thoughtIndex + i) % aiThoughts.length]} // ${Math.random()
              .toString(36)
              .slice(2, 10)}`}
          </div>
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Animated AI Brain */}
        <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse-glow"></div>
          {/* Central brain icon with pulsing effect */}
          <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-brain-pulse shadow-xl">
            <div className="text-white text-3xl animate-bounce">🧠</div>
          </div>
          {/* Floating orbs */}
          <div className="absolute -top-3 left-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-particle-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-3 right-1/2 w-3 h-3 bg-green-400 rounded-full animate-particle-float" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-1/2 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-particle-float" style={{ animationDelay: '1.7s' }}></div>
          <div className="absolute -top-4 left-1/3 w-2.5 h-2.5 bg-pink-400 rounded-full animate-particle-float" style={{ animationDelay: '2.1s' }}></div>
          <div className="absolute bottom-1/2 -left-3 w-2 h-2 bg-cyan-400 rounded-full animate-particle-float" style={{ animationDelay: '2.6s' }}></div>
        </div>

        {/* AI Thought Bubble */}
        <div className="flex justify-center">
          <div className="bg-white/80 border border-blue-100 shadow-md rounded-full px-6 py-2 text-blue-700 text-base font-mono animate-fade-in transition-all duration-500">
            <span className="inline-block animate-pulse">{aiThoughts[thoughtIndex]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI is generating your program
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our advanced AI is analyzing your unique leadership profile to create a perfectly tailored development journey.
          </p>
        </div>
      </div>

      {/* Dynamic AI Processing Steps */}
      <div className="relative z-10 space-y-6 max-w-lg mx-auto">
        <div className="space-y-4">
          {aiSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                index <= aiStep
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 border border-gray-200 opacity-50'
              }`}
            >
              <div className="flex-shrink-0">
                {index < aiStep ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-step-complete">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                ) : index === aiStep ? (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  index <= aiStep ? 'text-gray-900' : 'text-gray-500'
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
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${((aiProgress - (index > 0 ? aiSteps[index - 1].progress : 0)) / (step.progress - (index > 0 ? aiSteps[index - 1].progress : 0))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span>Overall Progress</span>
            <span>{aiProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg relative"
              style={{ width: `${aiProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Dynamic fun facts based on AI step */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-blue-700">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              {aiStep === 0 && "Analyzing..."}
              {aiStep === 1 && "Processing..."}
              {aiStep === 2 && "Matching..."}
              {aiStep === 3 && "Creating..."}
              {aiStep === 4 && "Optimizing..."}
              {aiStep === 5 && "Finalizing..."}
            </span>
          </div>
          <p className="text-sm text-blue-600 mt-1">
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
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <Award className="h-16 w-16 text-gray-600 mx-auto" />
        <h2 className="text-2xl font-bold">Here is your recommended program</h2>
        <p className="text-muted-foreground">
          Based on your assessment, we've created a personalized leadership development program. 
          You can reorder the modules by dragging and dropping them.
        </p>
      </div>

      <div className="space-y-4">
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

        <div className="space-y-3">
          {programModules.map((module, index) => (
            <Card 
              key={module.id}
              className={`cursor-move transition-all duration-200 hover:shadow-md ${
                draggedModule === module.id ? 'opacity-50' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, module.id)}
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
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{module.category}</Badge>
                      <span className="text-xs text-muted-foreground">Module {index + 1}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold">Leadership Needs Assessment</h1>
            <p className="text-muted-foreground">
              Help us understand your leadership development needs
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            isGenerating ? (
              renderGeneratingProgram()
            ) : (
              renderProgramRecommendation()
            )
          ) : (
            <>
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
    </div>
  )
} 