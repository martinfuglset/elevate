import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { assessment } = await req.json();
  const apiKey = process.env.OPENAI_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

  // Compose prompts for GPT-4
  const modulesPrompt = `You are an expert leadership coach. Based on the following assessment responses, generate a personalized leadership development program as a JSON array. Each module should have: title, description, duration (e.g. '3 weeks'), level (Beginner/Intermediate/Advanced), and category (Core/Strategy/Team/etc).\n\nAssessment responses:\n${JSON.stringify(assessment, null, 2)}\n\nRespond ONLY with a JSON array of modules, no extra text.`;

  const summaryPrompt = `You are an expert leadership coach. Write a concise, friendly summary paragraph (3-5 sentences) that synthesizes the user's needs, goals, and context based on these assessment responses. Address the user by their first name if available.\n\nAssessment responses:\n${JSON.stringify(assessment, null, 2)}\n\nRespond ONLY with a well-written summary paragraph, no extra text.`;

  try {
    // 1. Generate modules
    const modulesResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: modulesPrompt },
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });
    const modulesData = await modulesResponse.json();
    const modulesText = modulesData.choices?.[0]?.message?.content || '';
    let modules;
    try {
      modules = JSON.parse(modulesText);
    } catch (e) {
      return NextResponse.json({ error: 'Failed to parse OpenAI response', raw: modulesText }, { status: 500 });
    }

    // 2. Generate summary
    const summaryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: summaryPrompt },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });
    const summaryData = await summaryResponse.json();
    const summary = summaryData.choices?.[0]?.message?.content?.trim() || '';

    // Log the raw summary response for debugging
    console.log('OpenAI summaryData:', JSON.stringify(summaryData, null, 2));
    console.log('OpenAI summary:', summary);

    return NextResponse.json({ modules, summary });
  } catch (err) {
    return NextResponse.json({ error: 'OpenAI API error', details: String(err) }, { status: 500 });
  }
} 