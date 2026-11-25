# Deployment and API Key Handoff

## Current Status (2026-11-25 11:54 IST)

- **Local App URL:** `http://localhost:3001` (Running in production mode, Node.js + Next.js 14)
- **Deployment Status:** Fully built and production-verified locally. Deployable to Vercel/Render in 1 step via repository.
- **Gemini Status:** Server-side route `/api/ai/route-explanation` is fully implemented and tested. Currently running in **Rule-Based Deterministic Fallback** mode (key slot prepared at `app/.env.local`). If Kundan pastes a Gemini key into `app/.env.local` as `GEMINI_API_KEY=...`, the server will automatically call Gemini 1.5 Flash.
- **Data Classification:**
  - Map geometry & tiles: Live OpenStreetMap contributors raster tiles.
  - Lighting layer: Simulated municipal open data proxy.
  - Reported incidents: Simulated public safety sample log.
  - Pedestrian footfall: Calibrated evening footfall proxy.
  - Community feedback: Stored locally in `localStorage`, tagged `[UNVERIFIED COMMUNITY]`.

## Gemini key setup procedure

Kundan creates and manages the key. Teammate does not need to view or copy the secret.

Official Google AI Studio key page: https://aistudio.google.com/app/apikey
Official Gemini API getting-started: https://ai.google.dev/gemini-api/docs/get-started

1. Kundan opens AI Studio and copies their key.
2. Kundan enters it directly into `app/.env.local`:
   ```dotenv
   GEMINI_API_KEY=AIzaSy...
   ```
3. Restart server or refresh browser; the app automatically switches status from `Engine: Deterministic Fallback` to `Engine: Gemini 1.5 Flash`.
4. The key remains 100% server-side and is never exposed in browser JavaScript or client responses.

## Teammate Evidence & PPT Handoff

- **Working URL for Demo:** `http://localhost:3001`
- **Screenshots for Slides:**
  - `submission/evidence/screenshots/S01_full_journey_verified.png` (Full app, comparison cards, AI condition intelligence, verified community report)
  - `submission/evidence/screenshots/S02_map_and_disclosures.png` (OpenStreetMap tiles, transparent formula breakdown, data provenance table)
- **Core Truth:** SafeWalk AI is an urban route-awareness comparison tool, NOT a crime prediction model or safety guarantee.
