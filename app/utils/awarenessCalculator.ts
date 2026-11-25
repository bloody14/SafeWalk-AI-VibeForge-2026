import { RouteFactors, RouteFactorBreakdown } from '../types';

/**
 * Deterministic Route-Awareness Index Calculator
 *
 * Scoring Heuristic (Range: 10 - 95):
 * - Baseline: 50 points
 * - Lighting Factor (Weight: 25%):
 *     high/consistent (>75%): +20 pts
 *     moderate (50-75%): +10 pts
 *     poor (<50%): -15 pts
 *     unknown: 0 pts
 * - Pedestrian Activity / Open Businesses (Weight: 25%):
 *     high: +15 pts
 *     moderate: +8 pts
 *     low/deserted: -12 pts
 *     unknown: 0 pts
 * - Reported Incidents Penalty (Weight: 30%):
 *     0 incidents: +5 pts
 *     1 incident: -10 pts
 *     2 incidents: -18 pts
 *     3+ incidents: -25 pts
 *     unknown/no dataset: 0 pts (clearly highlighted in UI)
 * - Community Observations (Weight: 20%):
 *     positive observations > 3: +10 pts
 *     mixed/neutral: +2 pts
 *     hazard/obstruction flags reported: -12 pts
 *     none: 0 pts
 *
 * Note: Index is strictly bounded between 10 and 92.
 * NEVER outputs 100 to prevent any false assurance of safety.
 */
export function calculateAwarenessIndex(factors: RouteFactors): {
  index: number;
  breakdown: RouteFactorBreakdown;
} {
  let score = 50;
  let lightingPts = 0;
  let activityPts = 0;
  let incidentPenalty = 0;
  let communityBonus = 0;

  // 1. Lighting
  if (factors.lighting.status !== 'unknown') {
    const pct = factors.lighting.percentage ?? 50;
    if (pct >= 75) lightingPts = 20;
    else if (pct >= 50) lightingPts = 10;
    else lightingPts = -15;
  }

  // 2. Pedestrian Activity
  if (factors.pedestrianActivity.status !== 'unknown') {
    const lvl = factors.pedestrianActivity.level?.toLowerCase() || '';
    if (lvl.includes('high') || lvl.includes('busy')) activityPts = 15;
    else if (lvl.includes('moderate')) activityPts = 8;
    else if (lvl.includes('low') || lvl.includes('quiet') || lvl.includes('deserted')) activityPts = -12;
  }

  // 3. Reported Incidents
  if (factors.reportedIncidents.status !== 'unknown') {
    const count = factors.reportedIncidents.count ?? 0;
    if (count === 0) incidentPenalty = 5;
    else if (count === 1) incidentPenalty = -10;
    else if (count === 2) incidentPenalty = -18;
    else incidentPenalty = -25;
  }

  // 4. Community Feedback
  if (factors.communityFeedback.status !== 'unknown') {
    const count = factors.communityFeedback.count ?? 0;
    const details = factors.communityFeedback.details?.toLowerCase() || '';
    if (details.includes('hazard') || details.includes('dark') || details.includes('obstruction') || details.includes('flicker')) {
      communityBonus = -12;
    } else if (count >= 3) {
      communityBonus = 10;
    } else if (count > 0) {
      communityBonus = 4;
    }
  }

  score += lightingPts + activityPts + incidentPenalty + communityBonus;

  // Clamp safely between 15 and 92 (Never 100% "safe guarantee")
  const finalIndex = Math.max(15, Math.min(92, Math.round(score)));

  return {
    index: finalIndex,
    breakdown: {
      lightingPoints: lightingPts,
      activityPoints: activityPts,
      incidentPenalty,
      communityBonus,
      formula: `Baseline (50) + Lighting (${lightingPts > 0 ? '+' : ''}${lightingPts}) + Activity (${activityPts > 0 ? '+' : ''}${activityPts}) + Incident Factor (${incidentPenalty > 0 ? '+' : ''}${incidentPenalty}) + Community Observations (${communityBonus > 0 ? '+' : ''}${communityBonus}) = ${finalIndex}/100`,
    },
  };
}
