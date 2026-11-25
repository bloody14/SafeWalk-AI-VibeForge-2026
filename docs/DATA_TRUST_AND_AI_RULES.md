# Data Trust, Route Indicators and AI Rules

This is a short product-truth guide, not a full security/compliance audit.

## Four labels for every observation

1. **Public source** — display source name and source/update date where known.
2. **Community observation** — display submission time and status (unverified, reviewed, rejected).
3. **DEMO / SIMULATED** — clearly visible badge wherever sample data is used.
4. **UNKNOWN / NO DATA** — explicitly show missing information; never turn missing data into a good or bad score.

## Route-awareness indicator

The route-awareness index is an illustrative comparison aid. It is not a probability of crime, a guarantee of personal safety, or a validated risk model. Show the factors that affect it. Antigravity must define and document a simple deterministic weighting method if it is used. Do not let an LLM invent the underlying score.

## Crime and lighting data

- Use real data only when an accessible, credible source exists and its geography/time coverage are appropriate.
- Do not scrape restricted systems or assume city-wide coverage.
- If no suitable source is available, use small, clearly labelled simulated observations for the prepared demo scenario.
- Do not invent exact real crime counts or claim that a neighbourhood is dangerous/safe.
- Prefer “reported incidents in available dataset” rather than “crime rate” when the dataset does not support a rate.

## Pedestrian activity

Use an actual source or label the indicator as a demonstration proxy. Do not use surveillance or track people.

## Community feedback

Feedback is a first-hand observation, not verified fact. Show it as unverified/pending. Do not automatically upgrade a route's public risk status based on one report.

## AI role

AI can:
- Explain route-factor differences in plain language.
- Summarize a structured route comparison.
- Suggest categories for a feedback report.
- Explain data limitations.

AI must not:
- Fabricate incident, lighting or crowd values.
- Claim the route is guaranteed safe.
- Predict crime or personal harm.
- Convert missing data into a positive safety claim.

## Minimal privacy baseline

- No mandatory account or login for the contest prototype.
- Ask for browser location permission only after a user action; manual origin entry must remain available.
- Do not store background location history.
- Do not send unnecessary personal data to the AI provider.
- Keep the Gemini key server-side and outside Git.

No enterprise security audit, penetration test, RBAC design, MFA, multi-tenant architecture or formal compliance effort is required for this two-hour prototype.
