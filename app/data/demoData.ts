import { RouteOption, MapMarkerPOI, JourneyFeedback } from '../types';
import { calculateAwarenessIndex } from '../utils/awarenessCalculator';

// Downtown Tech Metro -> University Innovation Center & Library
export const DEMO_ORIGIN = {
  name: "Downtown Metro Station (Central Exit)",
  coordinates: [37.7749, -122.4194] as [number, number],
};

export const DEMO_DESTINATION = {
  name: "University Innovation Hub & Public Library",
  coordinates: [37.7833, -122.4068] as [number, number],
};

// Route A: Fastest route (Direct via Minor Cut-through & Industrial Alley)
const routeAFactors = {
  lighting: {
    level: "Poor / Inconsistent",
    percentage: 32,
    source: "Municipal Streetlight Grid (Open Data Proxy)",
    status: "demo-simulated" as const,
    observedAt: "2026-11-20",
    details: "Multiple non-functional fixtures reported along rear alleyway.",
  },
  reportedIncidents: {
    count: 3,
    source: "Public Safety Incident Log (Simulated Sample)",
    status: "demo-simulated" as const,
    observedAt: "Last 90 days",
    details: "3 non-violent property/nuisance reports between 10 PM and 2 AM.",
  },
  pedestrianActivity: {
    level: "Low / Deserted",
    source: "Pedestrian Footfall Proxy",
    status: "demo-simulated" as const,
    observedAt: "Current Evening Interval",
    details: "Low footfall after 8:30 PM; commercial offices closed.",
  },
  communityFeedback: {
    count: 2,
    source: "SafeWalk Community Submissions",
    status: "community-unverified" as const,
    observedAt: "Yesterday evening",
    details: "2 user flags: 'Dim lighting behind warehouse', 'Scaffold obstruction'.",
  },
};

const routeABreakdown = calculateAwarenessIndex(routeAFactors);

export const DEMO_ROUTE_FASTEST: RouteOption = {
  id: "route-fastest",
  label: "Fastest Direct Route",
  tagline: "Saves 4 minutes, but passes through unlit alleys and low-activity zones",
  distanceMeters: 1150,
  durationMinutes: 14,
  isDemo: true,
  geometry: [
    [37.7749, -122.4194],
    [37.7762, -122.4172],
    [37.7778, -122.4146], // Alleyway turn
    [37.7795, -122.4121], // Rear industrial path
    [37.7812, -122.4095],
    [37.7833, -122.4068],
  ],
  awarenessIndex: routeABreakdown.index,
  factors: routeAFactors,
  breakdown: routeABreakdown.breakdown,
  coverageLabel: "Limited Observation Coverage (Simulated)",
  explanation: "Direct route through secondary service roads with 32% streetlight coverage and low pedestrian presence after business hours.",
};

// Route B: Condition-Aware Route (via Grand Avenue Boulevard & Retail Promenade)
const routeBFactors = {
  lighting: {
    level: "High / Continuous LED",
    percentage: 88,
    source: "Municipal Streetlight Grid (Open Data Proxy)",
    status: "demo-simulated" as const,
    observedAt: "2026-11-24",
    details: "Continuous LED streetlights and illuminated bus shelters along Grand Ave.",
  },
  reportedIncidents: {
    count: 0,
    source: "Public Safety Incident Log (Simulated Sample)",
    status: "demo-simulated" as const,
    observedAt: "Last 90 days",
    details: "No incidents recorded in available public dataset for this corridor.",
  },
  pedestrianActivity: {
    level: "High / Active",
    source: "Pedestrian Footfall Proxy",
    status: "demo-simulated" as const,
    observedAt: "Current Evening Interval",
    details: "Active foot traffic; multiple open cafes, transit stops, and well-lit bank lobbies.",
  },
  communityFeedback: {
    count: 6,
    source: "SafeWalk Community Submissions",
    status: "community-unverified" as const,
    observedAt: "Today 19:40",
    details: "6 community ratings: 'Bright sidewalks', 'Friendly foot traffic', 'Visible bus stops'.",
  },
};

const routeBBreakdown = calculateAwarenessIndex(routeBFactors);

export const DEMO_ROUTE_AWARE: RouteOption = {
  id: "route-condition-aware",
  label: "Condition-Aware Route",
  tagline: "+4 mins walk: 88% continuous lighting & active pedestrian boulevard",
  distanceMeters: 1420,
  durationMinutes: 18,
  isDemo: true,
  geometry: [
    [37.7749, -122.4194],
    [37.7758, -122.4208], // Along Market Promenade
    [37.7780, -122.4168], // Grand Ave Boulevard
    [37.7801, -122.4128], // Main Retail Corridor
    [37.7818, -122.4093], // Well-lit Plaza
    [37.7833, -122.4068], // Campus Arrival
  ],
  awarenessIndex: routeBBreakdown.index,
  factors: routeBFactors,
  breakdown: routeBBreakdown.breakdown,
  coverageLabel: "Strong Observational Coverage (Simulated)",
  explanation: "Main boulevard route with 88% verified lighting fixtures, steady pedestrian footfall from evening storefronts, and positive community walk reports.",
};

// Route C: Transit Corridor (Alternative)
const routeCFactors = {
  lighting: {
    level: "Moderate",
    percentage: 64,
    source: "Municipal Streetlight Grid (Open Data Proxy)",
    status: "demo-simulated" as const,
    observedAt: "2026-11-22",
    details: "Standard streetlights along bus corridor; some shaded sidewalk sections.",
  },
  reportedIncidents: {
    count: 1,
    source: "Public Safety Incident Log (Simulated Sample)",
    status: "demo-simulated" as const,
    observedAt: "Last 90 days",
    details: "1 bicycle theft incident reported near transit station.",
  },
  pedestrianActivity: {
    level: "Moderate",
    source: "Pedestrian Footfall Proxy",
    status: "demo-simulated" as const,
    observedAt: "Current Evening Interval",
    details: "Moderate traffic coinciding with commuter bus arrivals.",
  },
  communityFeedback: {
    count: 3,
    source: "SafeWalk Community Submissions",
    status: "community-unverified" as const,
    observedAt: "2 days ago",
    details: "3 community notes: 'Good sidewalks, bus shelters well-lit'.",
  },
};

const routeCBreakdown = calculateAwarenessIndex(routeCFactors);

export const DEMO_ROUTE_TRANSIT: RouteOption = {
  id: "route-transit",
  label: "Transit Corridor Alternative",
  tagline: "Follows the bus transit line; moderate lighting and steady bus stops",
  distanceMeters: 1280,
  durationMinutes: 16,
  isDemo: true,
  geometry: [
    [37.7749, -122.4194],
    [37.7771, -122.4180],
    [37.7790, -122.4140],
    [37.7810, -122.4105],
    [37.7833, -122.4068],
  ],
  awarenessIndex: routeCBreakdown.index,
  factors: routeCFactors,
  breakdown: routeCBreakdown.breakdown,
  coverageLabel: "Moderate Coverage (Simulated)",
  explanation: "Follows the transit artery with 64% lighting coverage and periodic footfall around scheduled transit stops.",
};

export const INITIAL_MAP_POIS: MapMarkerPOI[] = [
  {
    id: "poi-light-1",
    position: [37.7780, -122.4168],
    type: "light",
    title: "High-Output Smart LED Corridor",
    description: "Public infrastructure proxy: Verified operational LED streetlights along Grand Ave.",
    status: "demo-simulated",
  },
  {
    id: "poi-hub-1",
    position: [37.7801, -122.4128],
    type: "safe-hub",
    title: "24/7 Transit Kiosk & Pharmacy",
    description: "Active storefront with illuminated exterior and constant staff presence.",
    status: "demo-simulated",
  },
  {
    id: "poi-incident-1",
    position: [37.7778, -122.4146],
    type: "incident",
    title: "Reported Incident: Broken Luminaire / Dim Area",
    description: "Public safety log proxy: Multiple reports of non-working lighting fixture in service lane.",
    status: "demo-simulated",
  },
  {
    id: "poi-feedback-1",
    position: [37.7818, -122.4093],
    type: "feedback",
    title: "Community Observation: Wide & Bright Sidewalk",
    description: "User submitted (2h ago): 'Great lighting, lots of runners and dog walkers even after 9pm.'",
    status: "community-unverified",
  },
];

export const INITIAL_COMMUNITY_FEEDBACK: JourneyFeedback[] = [
  {
    id: "fb-001",
    routeId: "route-condition-aware",
    routeName: "Condition-Aware Boulevard",
    submittedAt: "2026-11-25T10:15:00Z",
    lighting: "good",
    pedestrianActivity: "busy",
    obstructions: ["none"],
    comment: "Felt very visible along Grand Ave. All streetlights were working and several cafes were open.",
    verificationStatus: "unverified",
  },
  {
    id: "fb-002",
    routeId: "route-fastest",
    routeName: "Fastest Direct Route",
    submittedAt: "2026-11-24T21:40:00Z",
    lighting: "poor",
    pedestrianActivity: "quiet",
    obstructions: ["poor lighting", "scaffolding"],
    comment: "The shortcut through 6th alley had two burnt-out lamps and narrow construction fencing.",
    verificationStatus: "unverified",
  },
  {
    id: "fb-003",
    routeId: "route-condition-aware",
    routeName: "Condition-Aware Boulevard",
    submittedAt: "2026-11-24T19:20:00Z",
    lighting: "good",
    pedestrianActivity: "moderate",
    obstructions: ["none"],
    comment: "Wide clear sidewalks, clean crossings, and plenty of lighting from bus shelters.",
    verificationStatus: "unverified",
  },
];
