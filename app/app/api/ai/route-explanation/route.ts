import { NextRequest, NextResponse } from 'next/server';

interface RouteExplanationRequest {
  selectedRoute: {
    id: string;
    label: string;
    durationMinutes: number;
    distanceMeters: number;
    awarenessIndex: number;
    factors: {
      lighting: { level?: string; percentage?: number; status: string; details?: string };
      reportedIncidents: { count?: number; status: string; details?: string };
      pedestrianActivity: { level?: string; status: string; details?: string };
      communityFeedback: { count?: number; status: string; details?: string };
    };
    breakdown?: {
      formula: string;
    };
  };
  comparisonRoute?: {
    id: string;
    label: string;
    durationMinutes: number;
    distanceMeters: number;
    awarenessIndex: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: RouteExplanationRequest = await req.json();
    const { selectedRoute, comparisonRoute } = body;

    if (!selectedRoute) {
      return NextResponse.json({ error: "Missing selectedRoute" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // If Gemini API key is present, attempt Gemini 1.5 Flash call
    if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.length > 5) {
      try {
        const prompt = `You are the SafeWalk AI Route-Awareness Assistant.
Analyze this structured walking route comparison.
CRITICAL SAFETY & TRUTH RULES:
1. Base your explanation strictly and only on the structured factors provided below.
2. NEVER guarantee that any route is safe, crime-free, or devoid of risk.
3. NEVER predict future crime or invent missing values.
4. Clearly state observational limitations and time freshness.
5. Keep your tone objective, reassuring, and realistic.

Selected Route:
- Label: ${selectedRoute.label}
- Estimated Walk Time: ${selectedRoute.durationMinutes} min (${selectedRoute.distanceMeters} meters)
- Deterministic Awareness Index: ${selectedRoute.awarenessIndex}/100
- Street Lighting: ${selectedRoute.factors.lighting.level || 'Unknown'} (${selectedRoute.factors.lighting.percentage ?? 'N/A'}% coverage, Status: ${selectedRoute.factors.lighting.status}) - ${selectedRoute.factors.lighting.details || ''}
- Reported Incidents in Dataset: ${selectedRoute.factors.reportedIncidents.count ?? 'Unknown'} (Status: ${selectedRoute.factors.reportedIncidents.status}) - ${selectedRoute.factors.reportedIncidents.details || ''}
- Pedestrian Activity Proxy: ${selectedRoute.factors.pedestrianActivity.level || 'Unknown'} (Status: ${selectedRoute.factors.pedestrianActivity.status}) - ${selectedRoute.factors.pedestrianActivity.details || ''}
- Community Observations: ${selectedRoute.factors.communityFeedback.count ?? 0} unverified notes (Status: ${selectedRoute.factors.communityFeedback.status}) - ${selectedRoute.factors.communityFeedback.details || ''}

${comparisonRoute ? `Comparison Option:
- Label: ${comparisonRoute.label}
- Estimated Walk Time: ${comparisonRoute.durationMinutes} min
- Awareness Index: ${comparisonRoute.awarenessIndex}/100` : ''}

Output format: Please respond with concise JSON matching:
{
  "explanation": "2-3 sentences explaining the route conditions and factors",
  "tradeOffSummary": "1-2 sentences comparing walk time vs condition factors (e.g., adding 4 mins provides illuminated avenues)",
  "limitations": "Explicit statement regarding dataset freshness, proxy nature of indicators, and unverified community input"
}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout for fast UI response

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
              },
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            try {
              const parsed = JSON.parse(candidateText);
              return NextResponse.json({
                explanation: parsed.explanation,
                tradeOffSummary: parsed.tradeOffSummary,
                limitations: parsed.limitations || "Based on available simulated proxy datasets. Route-awareness indicators reflect relative observations, not guaranteed personal security.",
                provider: "gemini",
                modelUsed: "gemini-1.5-flash",
              });
            } catch {
              // Fall through to deterministic fallback if JSON parsing failed
            }
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call timed out or failed, utilizing deterministic fallback:", geminiError);
      }
    }

    // Deterministic Rule-Based Fallback
    const fallback = generateDeterministicExplanation(selectedRoute, comparisonRoute);
    return NextResponse.json(fallback);

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("API Error in /api/ai/route-explanation:", errorMsg);
    return NextResponse.json({
      explanation: "Route factors analyzed using deterministic baseline heuristic.",
      tradeOffSummary: "Compare estimated transit duration with lighting and activity attributes.",
      limitations: "Observational proxy indicators. SafeWalk does not guarantee safety or predict incident occurrence.",
      provider: "fallback",
      modelUsed: "Rule-Based Fallback Engine",
    });
  }
}

function generateDeterministicExplanation(
  route: RouteExplanationRequest['selectedRoute'],
  comp?: RouteExplanationRequest['comparisonRoute']
) {
  const lightingPct = route.factors.lighting.percentage ?? 50;
  const activityLvl = route.factors.pedestrianActivity.level?.toLowerCase() || 'unknown';
  const incidentCount = route.factors.reportedIncidents.count ?? 0;
  const feedbackCount = route.factors.communityFeedback.count ?? 0;

  let explanation = "";
  if (route.id === 'route-condition-aware') {
    explanation = `The Condition-Aware Route prioritizes well-lit transit arteries with ${lightingPct}% verified operational streetlighting and ${activityLvl} pedestrian footfall from active commercial storefronts. No incidents were recorded in the recent proxy observation period.`;
  } else if (route.id === 'route-fastest') {
    explanation = `The Fastest Route saves travel time by utilizing minor connector corridors, but exhibits lower lighting coverage (${lightingPct}%) and ${activityLvl} evening footfall, alongside ${incidentCount} historical reported nuisance/theft incidents in the proxy dataset.`;
  } else {
    explanation = `This alternative route provides moderate infrastructure coverage (${lightingPct}% lighting) with steady transit connectivity and ${feedbackCount} community observations.`;
  }

  let tradeOffSummary = "";
  if (comp) {
    const timeDelta = route.durationMinutes - comp.durationMinutes;
    const indexDelta = route.awarenessIndex - comp.awarenessIndex;
    if (timeDelta > 0) {
      tradeOffSummary = `Choosing this route adds approximately ${timeDelta} min of walking in exchange for a +${indexDelta} pt higher observational awareness index.`;
    } else if (timeDelta < 0) {
      tradeOffSummary = `This option is ${Math.abs(timeDelta)} min faster, but has a ${Math.abs(indexDelta)} pt lower awareness index due to reduced lighting or activity.`;
    } else {
      tradeOffSummary = `Both routes share similar estimated walk durations with differing infrastructure attributes.`;
    }
  } else {
    tradeOffSummary = `Evaluated against baseline urban pedestrian parameters.`;
  }

  const limitations = "Notice: Awareness indicators are heuristic aggregations of available municipal open-data proxies and unverified community reports. SafeWalk does not predict crime, assure personal safety, or replace emergency services.";

  return {
    explanation,
    tradeOffSummary,
    limitations,
    provider: "fallback" as const,
    modelUsed: "Rule-Based Deterministic Fallback Engine",
  };
}
