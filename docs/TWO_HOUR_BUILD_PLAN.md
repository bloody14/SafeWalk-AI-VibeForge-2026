# Two-Hour SafeWalk Build and Delivery Plan

**Hard timebox: 120 minutes.** Target a public demo URL by approximately minute 100–105, leaving a final verification and submission buffer. The plan is a target, not a guarantee: hosting account setup, network/API delays or platform queues can prevent public deployment.

| Minute | Work | Required checkpoint |
|---|---|---|
| 0–5 | Confirm official start, open workspace and read brief | Start time and scope recorded |
| 5–15 | Antigravity scaffolds the single full-stack app | App starts locally |
| 15–40 | Route search, map and route cards | User can see a route/demo scenario |
| 40–60 | Fastest vs condition-aware comparison; factor panel | Comparison and labels work |
| 60–75 | Journey complete and feedback flow | Feedback appears and persists locally |
| 75–88 | Gemini route explanation / feedback classification | Real AI works if key ready; otherwise explicit fallback |
| 88–95 | Feature freeze; fix only critical failures | Full core journey works locally |
| 95–105 | Deploy using an already accessible hosting account | Public page loads if provider allows |
| 105–115 | Test public link, capture screenshots and evidence | Evidence set saved; local fallback retained |
| 115–120 | PPT/demo/submission handoff | Required submission artifacts ready |

## Priority order

P0: app starts, route/demo map, route comparison, feedback flow, working build.
P1: AI explanation, extra indicators, visual polish, public deployment.
P2: animations, additional city data, photo uploads, account system, extra analytics. Drop P2 first.

## Scope freeze

At minute 60, stop adding new major modules. At minute 88–95, freeze features entirely. Do not change architecture, framework or database after the core journey is working.

## Two-attempt recovery rule

For a failing feature:
1. Spend up to 3–5 minutes diagnosing and making one targeted fix.
2. Spend up to 3–5 minutes trying one simpler alternative.
3. If still broken, remove/disable the feature and use an honest fallback.

Do not spend 20 minutes debugging an optional map provider, AI model or styling detail.

## Internet degradation

- Keep one preloaded demo location/route and condition dataset in the project.
- Keep route visualization functional if geocoding/routing is unavailable.
- Keep feedback local in the browser.
- Keep AI optional with a deterministic explanation fallback.
- Keep the local app running while deployment is attempted.

## Deployment rule

Check hosting login early. Deploy the working core as soon as it is stable; do not wait until the last ten minutes. Use an existing account only; do not create a new account or enter payment information during the sprint. If public deployment fails, submit the working local demo and clearly report that the live link could not be completed.
