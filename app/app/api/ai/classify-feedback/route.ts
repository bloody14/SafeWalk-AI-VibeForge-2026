import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { comment, lighting, pedestrianActivity, obstructions } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.length > 5 && comment) {
      try {
        const prompt = `Classify this walking route community report:
Comment: "${comment}"
Reported lighting: "${lighting}"
Reported activity: "${pedestrianActivity}"
Obstructions: "${(obstructions || []).join(', ')}"

Respond in concise JSON:
{
  "category": "infrastructure-issue | high-visibility-zone | obstruction | general-observation",
  "priority": "low | medium | high",
  "suggestedTag": "Short 2-3 word tag"
}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.1,
                responseMimeType: "application/json",
              },
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
          return NextResponse.json({ ...parsed, provider: 'gemini' });
        }
      } catch (e) {
        // Fall back to rule-based classification
      }
    }

    // Deterministic rule-based classification
    const commentLower = (comment || '').toLowerCase();
    let category = "general-observation";
    let priority = "low";
    let suggestedTag = "Route Report";

    if (commentLower.includes('dark') || commentLower.includes('burnt') || commentLower.includes('dim') || lighting === 'poor') {
      category = "infrastructure-issue";
      priority = "medium";
      suggestedTag = "Lighting Issue";
    } else if (commentLower.includes('bright') || commentLower.includes('open') || commentLower.includes('crowd') || lighting === 'good') {
      category = "high-visibility-zone";
      priority = "low";
      suggestedTag = "Well-Lit Corridor";
    } else if ((obstructions && obstructions.length > 0) || commentLower.includes('blocked') || commentLower.includes('construction')) {
      category = "obstruction";
      priority = "medium";
      suggestedTag = "Pathway Obstruction";
    }

    return NextResponse.json({
      category,
      priority,
      suggestedTag,
      provider: 'fallback',
    });
  } catch {
    return NextResponse.json({
      category: "general-observation",
      priority: "low",
      suggestedTag: "Community Report",
      provider: 'fallback',
    });
  }
}
