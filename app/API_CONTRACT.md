# SafeWalk AI — API Contract

## Endpoints

### 1. `POST /api/ai/route-explanation`

Generates structured natural-language explanation and trade-off comparison between routes based strictly on supplied parameters.

#### Request Body
```json
{
  "selectedRoute": {
    "id": "route-condition-aware",
    "label": "Condition-Aware Route",
    "durationMinutes": 18,
    "distanceMeters": 1420,
    "awarenessIndex": 88,
    "factors": {
      "lighting": { "level": "High / Continuous LED", "percentage": 88, "status": "demo-simulated" },
      "reportedIncidents": { "count": 0, "status": "demo-simulated" },
      "pedestrianActivity": { "level": "High / Active", "status": "demo-simulated" },
      "communityFeedback": { "count": 6, "status": "community-unverified" }
    }
  },
  "comparisonRoute": {
    "id": "route-fastest",
    "label": "Fastest Direct Route",
    "durationMinutes": 14,
    "distanceMeters": 1150,
    "awarenessIndex": 38
  }
}
```

#### Response Body (200 OK)
```json
{
  "explanation": "The Condition-Aware Route prioritizes well-lit transit arteries with 88% verified operational streetlighting...",
  "tradeOffSummary": "Choosing this route adds approximately 4 min of walking in exchange for a +50 pt higher observational awareness index.",
  "limitations": "Notice: Awareness indicators are heuristic aggregations of available municipal open-data proxies and unverified community reports. SafeWalk does not predict crime or assure personal safety.",
  "provider": "gemini | fallback",
  "modelUsed": "gemini-1.5-flash | Rule-Based Deterministic Fallback Engine"
}
```

---

### 2. `POST /api/ai/classify-feedback`

Categorizes user-submitted feedback observations and determines appropriate priority/tag.

#### Request Body
```json
{
  "comment": "Broad sidewalks, busy transit stop at the corner, good evening visibility.",
  "lighting": "good",
  "pedestrianActivity": "busy",
  "obstructions": ["none"]
}
```

#### Response Body (200 OK)
```json
{
  "category": "high-visibility-zone",
  "priority": "low",
  "suggestedTag": "Well-Lit Corridor",
  "provider": "gemini | fallback"
}
```

---

## Client Storage Contract (`localStorage`)

- **Key:** `safewalk_community_feedback`
- **Format:** Array of `JourneyFeedback` objects
```json
[
  {
    "id": "fb-1732514800000",
    "routeId": "route-condition-aware",
    "routeName": "Condition-Aware Route",
    "submittedAt": "2026-11-25T11:35:00.000Z",
    "lighting": "good",
    "pedestrianActivity": "busy",
    "obstructions": ["none"],
    "comment": "Wide sidewalk with clear pedestrian crossings.",
    "verificationStatus": "unverified"
  }
]
```
