# SafeWalk AI — Two-Minute Demo Script

*Walkthrough script tailored to the actual working Next.js SafeWalk AI implementation on `http://localhost:3001`.*

### 0:00–0:20 — Problem
“A person newly arrived in a city or walking after dark may know their destination, but conventional navigation only optimizes for distance and travel time. It doesn't tell them which streets have working streetlights, where pedestrian footfall remains active from open storefronts, or what recent walkers observed.”

### 0:20–0:45 — Route Search & Comparison
“On the SafeWalk AI homepage, we click **'Load Evening Demo Scenario'** (Downtown Metro Station to University Innovation Hub & Public Library). The interactive OpenStreetMap immediately renders three calibrated corridors:
- **Condition-Aware Route (Active Boulevard):** 18 min walk, 1420 meters, Awareness Index **85/100**.
- **Fastest Direct Route (Industrial Alley):** 14 min walk, 1150 meters, Awareness Index **15/100**.
- **Transit Corridor Alternative:** 16 min walk, 1280 meters, Awareness Index **67/100**.
Notice how clicking between cards instantly updates the map polylines and highlights the selected corridor.”

### 0:45–1:10 — Transparent Deterministic Heuristic
“Unlike black-box models that invent safety probabilities, SafeWalk uses a transparent, deterministic algorithm. Clicking **'Inspect Deterministic Formula Breakdown'** reveals the exact math:
`Baseline (50) + Lighting (+20) + Activity (0) + Incident Factor (+5) + Community Observations (+10) = 85/100`.
Every indicator carries a clear provenance badge: `[DEMO / SIMULATED]`, `[PUBLIC PROXY]`, or `[COMMUNITY]`. Missing data is explicitly marked `UNKNOWN` and never scored as safe.”

### 1:10–1:35 — Server-Side AI Intelligence & Fallback
“Our server-side route intelligence endpoint analyzes the structured factors to synthesize plain-English trade-offs: *'Choosing this route adds approximately 4 minutes of walking in exchange for a +70 pt higher observational awareness index along illuminated commercial storefronts.'* When Gemini API is present, it uses Gemini 1.5 Flash; otherwise, it seamlessly provides our rule-based deterministic fallback.”

### 1:35–2:00 — Post-Journey Review & Local Persistence
“After completing a walk, clicking **'Start Journey'** opens the Post-Journey Review modal. We select lighting ('Bright / Good'), activity ('Moderate'), check any obstructions, and add a note: *'Very clear sidewalks and good evening visibility'*.
Upon clicking submit, the observation is saved locally in browser `localStorage`, immediately appears in the Community Walk Observations feed tagged `[UNVERIFIED]`, and places an interactive `💬` marker on the map for subsequent walkers.”
