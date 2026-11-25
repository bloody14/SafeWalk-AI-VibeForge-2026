# VibeForge SafeWalk AI — Pre-existing Resource Disclosure

## Earlier SafeWalk concept

Before VibeForge, the team explored SafeWalk and created an early static frontend prototype using Vanilla HTML/CSS/JavaScript. Its README described simulated fastest-vs-safest route UI and simulated lighting, crime-risk and crowd indicators with generated explanations.

The team reports receiving organiser approval to build a completely fresh implementation during the contest, with disclosure. Preserve and provide the actual approval message if requested.

**Competition implementation:** Build fresh source code during the official contest window (Started: 2026-11-25 11:18 AM IST). All source code in `app/` is freshly created from scratch in this competition session. No code, assets, or dependencies were copied from the old prototype.

## Pre-contest documentation pack

This generic SafeWalk planning/prompt/evidence pack was prepared before the competition. Disclose its use if asked. It contains planning documentation and blank templates, not the newly built application.

## Other resources — fill actual details

| Resource, library, API, dataset, template or service | Source/provider | How used | Pre-existing or obtained during contest | Disclosure done |
|---|---|---|---|---|
| Next.js / React / TypeScript | Open Source (Vercel) | Full-stack framework & server API routes | Installed during contest | Disclosed |
| Tailwind CSS & Lucide Icons | Open Source | UI styling and accessible iconography | Installed during contest | Disclosed |
| Leaflet & React-Leaflet | Open Source | Interactive route and point-of-interest map | Installed during contest | Disclosed |
| OpenStreetMap & CartoDB | OpenStreetMap Contributors / Carto | Map tiles and base geospatial reference | Public web service queried during contest | Disclosed |
| OSRM Public Routing API | Open Source Routing Machine | Real-time pedestrian routing calculation | Public API queried during contest | Disclosed |
| Google Gemini API (`@google/genai` / AI Studio) | Google Cloud / AI Studio | Server-side structured route factor explanation | Official API called via server route | Disclosed |

## Data provenance

- Map tiles: OpenStreetMap contributors via CartoDB / OSM standard tiles.
- Pedestrian routes: Calculated via OSRM pedestrian profile or fallback calibrated demo corridor (Downtown Transit to University Tech Hub).
- Street lighting / reported incident datasets: Explicitly badged as `[DEMO / SIMULATED]` and `[PUBLIC INCIDENT REPORT PROXY]` to ensure absolute data transparency.
- Community feedback: Stored locally in browser `localStorage`, marked as `[UNVERIFIED COMMUNITY SUBMISSION]` and never misrepresented as verified or globally synchronised facts.

## Organiser approval

- Approval reported: Yes.
- Start timestamp: 2026-11-25 11:18:38 IST.
- Scope approved: Fresh SafeWalk full-stack implementation with full documentation & disclosure.
