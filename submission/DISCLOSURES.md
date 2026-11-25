# VibeForge SafeWalk AI — Pre-existing Resource Disclosure

## Earlier SafeWalk concept

Before VibeForge, the team explored SafeWalk and created an early static frontend prototype using Vanilla HTML/CSS/JavaScript. Its README described simulated fastest-vs-safest route UI and simulated lighting, crime-risk and crowd indicators with generated explanations.

The team reports receiving organiser approval to build a completely fresh implementation during the contest, with disclosure. Preserve and provide the actual approval message if requested.

**Competition implementation:** Build fresh source code during the official contest window (Started: 2026-11-25 11:18 AM IST). All source code in `app/` is freshly created from scratch in this competition session. No code, assets, or dependencies were copied from the old prototype.

## Pre-contest documentation pack

This generic SafeWalk planning/prompt/evidence pack was prepared before the competition. Disclose its use if asked. It contains planning documentation and blank templates, not the newly built application.

## Other resources — actual details

| Resource, library, API, dataset, template or service | Source/provider | How used | Pre-existing or obtained during contest | Disclosure done |
|---|---|---|---|---|
| Next.js 14 / React 18 / TypeScript | Open Source (Vercel) | Full-stack framework & server API routes | Installed during contest | Disclosed |
| Tailwind CSS & Lucide Icons | Open Source | UI styling and accessible iconography | Installed during contest | Disclosed |
| Leaflet & React-Leaflet | Open Source | Interactive route and point-of-interest map | Installed during contest | Disclosed |
| OpenStreetMap Standard Tiles | OpenStreetMap Contributors (`tile.openstreetmap.org`) | Public map tiles (no proprietary key required) | Public web service queried during contest | Disclosed |
| Google Gemini API (`@google/genai` / AI Studio) | Google Cloud / AI Studio | Server-side structured route factor explanation (with deterministic fallback) | Official API integration in server route | Disclosed |

## Data provenance

- **Map tiles:** OpenStreetMap contributors standard raster tiles (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`). No CARTO or third-party proprietary key endpoints are used.
- **Pedestrian routes:** Pre-calibrated demonstration walking corridors (Downtown Transit to University Innovation Hub) with interactive route geometries. No live external routing service (e.g. OSRM) is queried; search queries use simulated resolution.
- **Street lighting, incident, and pedestrian datasets:** Explicitly badged as `[DEMO / SIMULATED]` and `[DEMO PROXY]`. These are not measured real-world lux levels, verified police dispatch records, or live crowd surveillance feeds.
- **Community feedback:** Stored locally in browser `localStorage`, marked as `[UNVERIFIED COMMUNITY OBSERVATION]` and never misrepresented as verified or globally synchronised facts.
- **Route-Awareness Index:** A transparent, deterministic application-level heuristic (10–92/100). Not a statistically validated crime-risk score or safety probability.

## Organiser approval

- Approval reported: Yes (reported by team participant).
- Actual date/person/channel/reference: Verbal/channel confirmation reported by participant; formal written record pending upload by team.
- Start timestamp: 2026-11-25 11:18:38 IST.
- Scope approved: Fresh SafeWalk full-stack implementation with full documentation & disclosure.
