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

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<AssessmentData>(initialData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [programModules, setProgramModules] = useState<ProgramModule[]>([])
  const [draggedModule, setDraggedModule] = useState<string | null>(null)

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
    
    // Simulate AI processing time
    setTimeout(() => {
      const modules = generateProgramModules(data)
      setProgramModules(modules)
      setIsGenerating(false)
    }, 3000)
  }

  const handleGetStarted = () => {
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
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <Loader2 className="h-16 w-16 text-blue-600 mx-auto animate-spin" />
        <h2 className="text-2xl font-bold">Generating ideal program</h2>
        <p className="text-muted-foreground">
          Our AI is analyzing your responses to create a personalized leadership development program...
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Analyzing leadership profile...</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="h-2" />
      </div>
    </div>
  )

  const renderProgramRecommendation = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <Award className="h-16 w-16 text-green-600 mx-auto" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          isGenerating ? (
            <div className="bg-white rounded-lg shadow-xl p-8">
              {renderGeneratingProgram()}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-xl p-8">
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