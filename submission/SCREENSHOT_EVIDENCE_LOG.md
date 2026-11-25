# Screenshot and Recording Evidence Log

Capture actual application and tool screenshots. Save original files in `submission/evidence/screenshots/`. Do not fabricate, backdate or edit screenshots to misrepresent the product.

| ID | Actual timestamp (IST) | File | Screen/state | Viewport/device | What it proves | Related prompt/interaction |
|---|---|---|---|---|---|---|
| S01 | 2026-11-25 12:30:15 | `submission/evidence/screenshots/S01_main_application.png` | Landing page, route search, and OpenStreetMap base | Desktop (1280x900) | App loads at localhost:3001 with Product Notice banner, origin/destination inputs, and OpenStreetMap tiles | QA Audit Test 1-2 |
| S02 | 2026-11-25 12:30:35 | `submission/evidence/screenshots/S02_map_and_route_comparison.png` | 3 route overlays, POI pins, and 3 comparison cards | Desktop (1280x900) | All 3 walking routes (green, amber, indigo) rendered with POIs and comparison cards (92, 15, 68 Index) | QA Audit Test 3-5 |
| S03 | 2026-11-25 12:30:52 | `submission/evidence/screenshots/S03_expanded_formula.png` | Expanded deterministic formula calculation | Desktop (1280x900) | Transparent mathematical derivation (`Baseline 50 + Lighting +20 + Activity +15... = 92`) with no hallucinated safety scores | QA Audit Test 6 |
| S04 | 2026-11-25 12:30:58 | `submission/evidence/screenshots/S04_transparency_disclosures.png` | Data Trust, Provenance & Disclosures Modal | Desktop (1280x900) | Complete provenance classification table (OSM public tiles, simulated proxies, unverified community feedback) | QA Audit Test 8 |
| S05 | 2026-11-25 12:30:05 | `submission/evidence/screenshots/S05_journey_feedback_form.png` | Post-Journey Review modal dialog | Desktop (1280x900) | User feedback form with lighting, activity, obstruction checkboxes, and comment field | QA Audit Test 9 |
| S06 | 2026-11-25 12:31:22 | `submission/evidence/screenshots/S06_community_feedback_submitted.png` | Community observation feed & map update | Desktop (1280x900) | New observation added to feed with [UNVERIFIED] badge and interactive community pin placed on map | QA Audit Test 10 |
| S07 | 2026-11-25 12:31:55 | `submission/evidence/screenshots/S07_mobile_responsive.png` | Mobile responsive layout | Mobile (390x844) | Mobile-adapted single-column layout for navigation, map, AI intelligence card, and route cards | QA Audit Test 14 |

## Verification Summary

- **Map rendering:** OpenStreetMap live standard tiles (`tile.openstreetmap.org`) loaded with zero API keys or watermarks.
- **Interactive polylines:** 3 distinct SVG polyline paths: Condition-Aware Boulevard (solid green), Fastest Direct Alley (dashed amber), and Transit Corridor (dashed indigo).
- **Deterministic awareness indicator:** Formula inspectable on every card; mathematically derived from structured factors and capped at 92.
- **Local feedback flow:** Tested with live submission; stored directly in browser `localStorage` and marked `[UNVERIFIED]`.
- **Persistence:** Feed persists across browser page reloads.
