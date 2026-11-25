# SafeWalk AI — Presentation Content for Teammate (PPT 6 Slides)

This document contains the verified facts, technical architecture, feature list, screenshot references, demo sequence, and product boundaries ready to copy directly into the teammate's 6-slide presentation deck.

---

## Slide 1: Title & Vision
- **Title:** SafeWalk AI
- **Subtitle:** Urban Walking Route-Awareness Platform
- **Tagline:** *"Compare walking routes with more context than just distance and travel time."*
- **Team / Context:** Built during VibeForge 2026 Hackathon.
- **Visual:** SafeWalk AI brand logo with emerald shield icon and dark modern interface hero banner.

---

## Slide 2: The Urban Pedestrian Problem
- **The Blind Spot:** Conventional GPS apps optimize solely for shortest distance and travel time.
- **The Human Reality:** When walking in an unfamiliar city or after dark, pedestrians care about:
  1. Street lighting consistency (avoiding dark alleys and burnt-out lamps).
  2. Pedestrian footfall & active commercial storefronts (safety in numbers).
  3. Historical public incident patterns.
  4. Fresh community observations from fellow walkers.
- **The Risk:** Navigators blindly direct pedestrians into deserted cut-throughs to save 3-4 minutes.

---

## Slide 3: The SafeWalk Solution & Core Flow
- **Product Definition:** An urban route-awareness comparison engine — NOT a crime prediction tool and NOT a false safety guarantee.
- **The 4-Step User Journey:**
  1. **Select Corridor:** Type endpoints or click 1-Click Evening Demo (Downtown Transit to University Tech Hub).
  2. **Compare Routes:** Condition-Aware Route (Active Blvd, 18 min, 85/100 Awareness) vs. Fastest Route (Industrial Alley, 14 min, 15/100 Awareness).
  3. **Inspect Heuristics:** Open the transparent mathematical formula breakdown (Lighting + Activity - Incidents + Community notes).
  4. **Complete Walk & Submit Feedback:** Rate observed lighting, footfall, and hazards; feedback immediately updates local community layer.

---

## Slide 4: Working Product Walkthrough & Screenshot Evidence
- **Screenshot 1:** `submission/evidence/screenshots/S01_full_journey_verified.png`
  - *Proves:* Interactive OpenStreetMap with color-coded polylines (green, amber, indigo), side-by-side comparison cards, AI condition intelligence card, and live community observation feed.
- **Screenshot 2:** `submission/evidence/screenshots/S02_map_and_disclosures.png`
  - *Proves:* Live OSM tile rendering, inspectable deterministic formula breakdown (`Baseline 50 + Lighting +20... = 85`), and transparency disclosures modal with dataset provenance classification.
- **Demo Script:** Follows 2-minute script in `submission/DEMO_SCRIPT.md`.

---

## Slide 5: Full-Stack Architecture & AI Engine
- **Frontend & Server:** Single Next.js 14 App Router application with TypeScript and Tailwind CSS.
- **Geospatial Mapping:** Leaflet & OpenStreetMap live tile layer with zero proprietary API key lock-in.
- **Deterministic Heuristic Calculator:** Application-level deterministic scoring (10 to 92 index). Eliminates LLM hallucinations and score fabrication.
- **Server-Side AI Integration:**
  - Route: `POST /api/ai/route-explanation`
  - Primary: Google Gemini 1.5 Flash via server-side `GEMINI_API_KEY` (strict privacy hygiene, zero client exposure).
  - Fallback: Robust deterministic rule-based natural language generator.
- **Client Persistence:** Browser `localStorage` for post-journey reviews, visibly tagged `[UNVERIFIED COMMUNITY]`.

---

## Slide 6: Product Boundaries, Data Truth & Future Roadmap
- **Truth in Data:**
  - Explicit badges on every indicator: `[DEMO / SIMULATED]`, `[PUBLIC PROXY]`, `[UNVERIFIED COMMUNITY]`, and `[UNKNOWN]`.
  - Missing data rule: Missing data is never treated as positive or negative.
- **Clear Ethical Boundaries:**
  - No crime prediction ML.
  - No real-time citizen surveillance or continuous location tracking.
  - No false guarantees of personal safety.
- **Future Production Roadmap:**
  - Direct integration with verified municipal open-data portals (DOT streetlight APIs).
  - Decentralized community moderation and verification pipeline.
  - Offline tile caching for low-connectivity pedestrian corridors.
