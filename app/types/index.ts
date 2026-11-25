export interface RouteFactor {
  level?: string;
  percentage?: number;
  count?: number;
  source: string;
  status: 'public-verified' | 'community-unverified' | 'demo-simulated' | 'unknown';
  observedAt?: string | null;
  details?: string;
}

export interface RouteFactors {
  lighting: RouteFactor;
  reportedIncidents: RouteFactor;
  pedestrianActivity: RouteFactor;
  communityFeedback: RouteFactor;
}

export interface RouteFactorBreakdown {
  lightingPoints: number;
  activityPoints: number;
  incidentPenalty: number;
  communityBonus: number;
  formula: string;
}

export interface RouteOption {
  id: string;
  label: string;
  tagline: string;
  distanceMeters: number;
  durationMinutes: number;
  geometry: [number, number][]; // [lat, lng] array
  isDemo: boolean;
  awarenessIndex: number; // 0-100 deterministic index
  factors: RouteFactors;
  breakdown: RouteFactorBreakdown;
  coverageLabel: string;
  explanation: string;
}

export interface JourneyFeedback {
  id: string;
  routeId: string;
  routeName: string;
  submittedAt: string;
  lighting: 'good' | 'mixed' | 'poor' | 'not-sure';
  pedestrianActivity: 'busy' | 'moderate' | 'quiet' | 'not-sure';
  obstructions: string[];
  comment?: string;
  location?: [number, number];
  verificationStatus: 'unverified' | 'pending' | 'reviewed';
}

export interface MapMarkerPOI {
  id: string;
  position: [number, number];
  type: 'incident' | 'light' | 'feedback' | 'safe-hub';
  title: string;
  description: string;
  timestamp?: string;
  status: 'demo-simulated' | 'public-verified' | 'community-unverified';
}

export interface AIExplanationResponse {
  explanation: string;
  tradeOffSummary: string;
  limitations: string;
  provider: 'gemini' | 'fallback';
  modelUsed?: string;
}
