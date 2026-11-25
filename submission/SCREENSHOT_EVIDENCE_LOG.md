# Screenshot and Recording Evidence Log

Capture actual application and tool screenshots. Save original files in `submission/evidence/screenshots/`. Do not fabricate, backdate or edit screenshots to misrepresent the product.

| ID | Actual timestamp (IST) | File | Screen/state | Viewport/device | What it proves | Related prompt/interaction |
|---|---|---|---|---|---|---|
| S01 | 2026-11-25 11:50:24 | `submission/evidence/screenshots/S01_full_journey_verified.png` | Complete App & Verification Flow | Desktop (1280x900) | Full page with interactive Leaflet map, Route Comparison cards, AI Condition Intelligence, and newly submitted community feedback in list and on map | Antigravity Browser Verification |
| S02 | 2026-11-25 11:52:45 | `submission/evidence/screenshots/S02_map_and_disclosures.png` | Clean OpenStreetMap Tiles & Disclosures Modal | Desktop (1280x900) | Clean standard OSM basemap tiles, Provenance classification table, and contest honesty disclosures | Antigravity Screenshot Collector |

## Verification Summary

- **Map rendering:** OpenStreetMap live raster tiles loaded with zero API key dependencies.
- **Interactive polylines:** Active route highlighted in green (`#10b981`, stroke-width 6), secondary routes in dashed amber (`#f59e0b`) and indigo (`#6366f1`).
- **Deterministic awareness indicator:** Formula inspectable on every route card; verified zero safety score fabrication.
- **Local feedback flow:** Tested with live submission; stored directly in `localStorage` and marked `[UNVERIFIED]`.
