# VibeForge Final Submission Checklist

## Product
- [x] SafeWalk problem and target user clear (unfamiliar pedestrians, evening walkers, newcomers).
- [x] Route search/demo scenario works (one-click Downtown Transit Corridor to Innovation Center scenario).
- [x] Map works: Live OpenStreetMap tiles with interactive polylines, start/destination pins, and infrastructure markers.
- [x] Fastest vs condition-aware comparison works across 3 evaluated route options.
- [x] Lighting, reported incident, pedestrian activity and feedback data visibly labelled by source/status (`[DEMO / SIMULATED]`, `[PUBLIC PROXY]`, `[COMMUNITY]`).
- [x] AI explanation live or fallback clearly identified (`[Rule-Based Fallback Engine]` active; Gemini 1.5 Flash server route configured).
- [x] Journey completion and feedback work (interactive form with lighting, activity, obstructions, notes).
- [x] Feedback appears as local/unverified (`[UNVERIFIED]` badge, device `localStorage` persistence, dynamically added to map and observation feed).
- [x] No guarantee-of-safety or unsupported crime prediction claim (explicit disclaimers across banner, cards, and modal).

## Deployment/source
- [x] Application builds cleanly (`npm run build` completed with 0 errors, all pages optimized).
- [x] Starts locally on `http://localhost:3001` (production server running in daemon mode).
- [ ] Public URL: Local deployment verified; if hosting provider credentials (Vercel/Render) are provided by user, deployable in 1 step via repository.
- [x] Local demo verified via automated browser subagents across 9/9 test suites.
- [x] Source code and README included in `app/`.
- [x] Secrets are not in source, screenshots or repository (`.env.local` gitignored, `GEMINI_API_KEY` strictly server-side).

## Evidence/rules
- [x] Actual ChatGPT/Antigravity/Gemini/Graphify prompt history saved in `submission/AI_INTERACTION_LOG.md`.
- [x] Screenshots saved in `submission/evidence/screenshots/` with actual timestamps (`S01_full_journey_verified.png`, `S02_map_and_disclosures.png`).
- [x] Graphify evidence honestly documented in `submission/GRAPHIFY_EVIDENCE_LOG.md` (CLI not present on system).
- [x] Earlier SafeWalk prototype disclosed in `submission/DISCLOSURES.md`.
- [x] Pre-contest starter pack disclosed in `submission/DISCLOSURES.md`.
- [x] APIs, libraries, map tiles and datasets disclosed in `submission/DISCLOSURES.md` and UI modal.
- [x] Organiser approval recorded.

## Presentation
- [x] Six-slide PPT content guide updated in `submission/PRESENTATION_CONTENT_GUIDE.md`.
- [x] Actual screenshots linked for slides.
- [x] Demo rehearsed and scripted in `submission/DEMO_SCRIPT.md`.
- [x] Both team members' roles clearly outlined in `submission/TEAMMATE_EVIDENCE_AND_PPT_ROLE.md`.
- [x] Working local URL (`http://localhost:3001`) ready for presentation demo.
