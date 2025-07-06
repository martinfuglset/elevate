import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      assessorInfo,
      organizationScope,
      leaders,
      organizationalGaps,
      developmentPlan
    } = body

    // Create a comprehensive prompt for the AI
    const prompt = `As an expert leadership development consultant, analyze this organizational leadership assessment and provide a compelling, professional summary.

Assessment Context:
- Assessor: ${assessorInfo.role} at ${assessorInfo.company} (${assessorInfo.companySize}, ${assessorInfo.industry})
- Organization Scope: ${organizationScope.totalLeaders} leaders across ${organizationScope.departments.join(', ')}
- Assessment Focus: ${organizationScope.assessmentFocus.join(', ')}

Leadership Talent Analysis:
- Total Leaders Assessed: ${leaders.length}
- Priority Leaders: ${developmentPlan.priorityLeaders.length}
- Performance Distribution: ${leaders.filter((l: any) => l.performance === 'high').length} high performers, ${leaders.filter((l: any) => l.performance === 'meeting').length} meeting expectations, ${leaders.filter((l: any) => l.performance === 'needs-improvement').length} need improvement
- Potential Distribution: ${leaders.filter((l: any) => l.potential === 'high').length} high potential, ${leaders.filter((l: any) => l.potential === 'medium').length} medium potential, ${leaders.filter((l: any) => l.potential === 'low').length} limited potential

Critical Organizational Gaps:
${organizationalGaps.missingSkills.map((skill: string) => `- ${skill}`).join('\n')}

Succession Planning Gaps:
${organizationalGaps.successionGaps.map((gap: string) => `- ${gap}`).join('\n')}

Development Plan:
- Timeline: ${developmentPlan.timeline}
- Budget: ${developmentPlan.budget}
- Success Metrics: ${developmentPlan.successMetrics}

Please provide a 2-3 paragraph summary that:
1. Highlights the key insights from this assessment
2. Identifies the most critical development priorities
3. Explains how the recommended program addresses the identified gaps
4. Provides strategic context for the timeline and budget
5. Uses professional, executive-level language
6. Is engaging and actionable

Make it sound like it's coming from a senior leadership consultant who has deep expertise in organizational development.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert leadership development consultant with 20+ years of experience working with Fortune 500 companies. You provide strategic, actionable insights that help executives make informed decisions about leadership development investments."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const summary = completion.choices[0]?.message?.content || 'Unable to generate summary at this time.'

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Error generating AI summary:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
} 