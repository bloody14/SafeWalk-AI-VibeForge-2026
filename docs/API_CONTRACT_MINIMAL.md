# SafeWalk AI — Minimal API/Integration Contract

This is a contest template. Antigravity should finalize the exact contract during implementation and keep it in this file. Do not build endpoints that the MVP does not need.

## Shared data shapes

### RouteOption

```json
{
  "id": "route-fastest",
  "label": "Fastest route",
  "distanceMeters": 1800,
  "durationMinutes": 22,
  "geometry": [],
  "isDemo": false,
  "awarenessIndex": 62,
  "factors": {
    "lighting": {"level": "limited-data", "source": "...", "observedAt": null, "status": "unknown"},
    "reportedIncidents": {"count": 0, "source": "...", "period": "...", "status": "demo"},
    "pedestrianActivity": {"level": "unknown", "source": "...", "status": "unknown"},
    "communityFeedback": {"count": 0, "summary": "No feedback yet", "status": "community-unverified"}
  },
  "coverageLabel": "Limited information",
  "explanation": ""
}
```

The sample values above are schema examples only, not factual claims. Do not show them as real data.

### JourneyFeedback

```json
{
  "id": "generated-id",
  "routeId": "route-aware",
  "submittedAt": "ISO-8601 timestamp",
  "lighting": "good|poor|mixed|not-sure",
  "pedestrianActivity": "busy|moderate|quiet|not-sure",
  "obstructions": [],
  "comment": "optional short text",
  "verificationStatus": "unverified"
}
```

Do not persist precise continuous location history or personal identity for the contest demo.

## Optional server endpoints

### `POST /api/ai/route-explanation`

Request:
```json
{
  "routeLabel": "Condition-aware option",
  "factors": {},
  "dataQuality": "limited|moderate|good"
}
```
Response:
```json
{
  "explanation": "...",
  "limitations": "...",
  "provider": "gemini|fallback"
}
```

The server must instruct the model to use only supplied facts, state uncertainty, and never assert that a route is safe or crime-free.

### `POST /api/ai/classify-feedback` (optional)

Request contains feedback categories and a short text comment. Response contains a suggested category, suggested priority and a short rationale. It is a suggestion, not an authoritative decision.

## Client persistence

For the two-hour MVP, use browser localStorage for submitted feedback and the local community-observation list. It is device/browser-local. Label it accurately. Do not claim that reports are globally shared with other users unless a real shared database is implemented and tested.

## Error contract

Return a simple error message and request identifier if available. If AI provider fails, return an explicit fallback response. The UI must not hang waiting for an AI provider.
