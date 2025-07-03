'use client'

import { useState } from 'react'
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
  X
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

export function AssessmentModal({ isOpen, onClose, onComplete }: AssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<AssessmentData>(initialData)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    if (onComplete) onComplete(data)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setData(initialData)
    setIsSubmitted(false)
    onClose()
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

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
        <h2 className="text-2xl font-bold">Assessment Complete!</h2>
        <p className="text-muted-foreground">
          Based on your responses, here are your personalized recommendations:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommended Modules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Foundations of Leadership</span>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                4 weeks
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Emotional Intelligence</span>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                3 weeks
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Phase 1: Core Skills (3 months)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Phase 2: Advanced Topics (6 months)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Phase 3: Mastery (12 months)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full" onClick={handleClose}>
                <BookOpen className="h-4 w-4 mr-2" />
                Start Learning Path
              </Button>
              <Button variant="outline" className="w-full">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
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
            renderRecommendations()
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