# SafeWalk AI — Official Project Brief

## Product

**SafeWalk AI — AI-powered urban route-awareness platform for people unfamiliar with a city or neighbourhood.**

## Problem statement

A person who has recently moved to a new city, is visiting an unfamiliar neighbourhood, or needs to walk somewhere at night may not know which streets have better lighting, where publicly reported crime incidents have occurred, which routes have limited pedestrian activity, or whether available information is recent and reliable.

Conventional navigation primarily helps users find routes by distance and estimated travel time. It may not provide an understandable comparison of available street-condition and community-observation information that matters when choosing between unfamiliar walking routes. Newcomers can therefore struggle to make informed route choices, particularly after dark.

## Proposed solution

SafeWalk AI is a map-based urban route-awareness platform. It compares available walking routes using transparently labelled information such as street-lighting conditions, appropriately sourced/aggregated public incident information, pedestrian-activity indicators or proxies, and feedback from people who have completed a route.

It shows the fastest option alongside a condition-aware alternative where the data supports a meaningful comparison; explains trade-offs, data coverage and freshness; and allows users to submit post-journey feedback. Feedback is shown as user-submitted and unverified until reviewed. The prototype can demonstrate how future route awareness may improve as observations accumulate.

SafeWalk does not guarantee a safe route, establish that an area is crime-free, predict crime, or replace local authorities/emergency services.

## Target users

- People newly moved to a city/neighbourhood.
- Students and working professionals unfamiliar with local areas.
- Visitors and tourists walking in unfamiliar places.
- People choosing between walking routes, especially after dark.

## Core user journey

1. Enter origin and destination or choose a labelled demonstration scenario.
2. Display a walking route or alternatives using an available routing source; if unavailable, use a visibly labelled preconfigured demo route.
3. Display route-condition indicators for lighting, reported incidents, pedestrian activity and community feedback where data is available.
4. Show source, date/freshness, coverage and confidence/unknown status.
5. Compare fastest travel time with a condition-aware alternative; never present the score as a validated probability of safety.
6. Read an AI-generated explanation based only on the structured factors supplied to it.
7. Start/complete the journey and submit structured feedback about observed lighting, activity, obstructions or other conditions.
8. Show the feedback in a community-observation list/map layer; mark it unverified or pending review.

## Must-have MVP

1. Responsive polished web interface.
2. Origin/destination route search or one-click demo journey.
3. Map with at least two route options when routing provider returns alternatives; otherwise one working route plus a labelled sample alternative.
4. Fastest vs condition-aware route comparison with transparent factor breakdown.
5. Lighting, reported-incident, pedestrian activity and community-feedback indicators with clear source labels.
6. AI explanation of route trade-offs if Gemini key is configured; deterministic explanation fallback if not.
7. Mark journey complete and submit route feedback.
8. Persist demo feedback in browser local storage (or lightweight local persistence); show that it is local demo feedback, not a global live community network.
9. An uncluttered explanation of data limitations.

## Nice-to-have only if ahead of time

- One preselected city/area scenario with prepared demonstration observations.
- Optional browser location permission (never request automatically).
- Filters for time of day or observation recency.
- Small operations view showing submitted feedback and its status.
- Photo attachment only if trivial; otherwise omit.

## Out of scope in 120 minutes

- User registration, login, MFA, RBAC or password recovery.
- City-wide real-time crime feeds unless a verified, open, accessible source is already ready.
- Crime prediction or ML trained on invented data.
- Real-time crowd tracking, surveillance or background location tracking.
- Complex admin suite, microservices, multi-tenant architecture, production database or enterprise security program.
- Any feature that cannot be tested during the remaining time.

## Data and score honesty

Each observation must be identified as one of:
- Public/verified source data: name the source and the available update date.
- Community feedback: show submission time and unverified/pending/reviewed status.
- Demonstration/simulated data: visibly label it as DEMO / SIMULATED.
- Unknown/no data: show “No data available”; do not interpret missing data as safe or unsafe.

A route-awareness indicator is a prototype heuristic, not a validated crime-risk score or safety probability. Expose the main contributing factors. AI may explain structured data; AI must not invent missing incident, lighting or crowd values.

## Success criteria

A first-time user can complete the core journey in under two minutes: select a destination, compare available routes, understand the condition labels and explanation, mark the journey complete, and submit feedback that appears in the app.
