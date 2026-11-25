# SafeWalk AI — Application Architecture

## Overview

SafeWalk AI is a single full-stack web application built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Leaflet / OpenStreetMap**. It compares walking routes using transparent street-condition indicators (lighting, pedestrian activity proxies, reported incidents, and community feedback) and provides structured trade-off explanations via a server-side Gemini AI integration with automatic deterministic fallback.

## System Topology

```
Browser Client (React + Leaflet + Tailwind)
  ├── Route Search & One-Click Urban Scenarios
  ├── Dynamic Interactive Map (OSM / CARTO Tiles)
  ├── Route Comparison Cards (Fastest vs Condition-Aware)
  ├── Post-Journey Feedback Form (Stored in localStorage)
  └── Transparency & Disclosures Modal
         │
         │ Fetch (/api/ai/route-explanation)
         ▼
Next.js Server-side API Route (Node.js runtime)
  ├── Reads process.env.GEMINI_API_KEY securely on the server
  ├── Primary: Google Gemini 1.5 Flash (Structured Prompting)
  └── Fallback: Deterministic Rule-Based Heuristic Engine
```

## Key Architectural Principles

1. **Route-Awareness, Not Crime Prediction:** The platform presents relative street condition indicators and explicitly disclaims crime prediction, safety guarantees, or surveillance.
2. **Deterministic Heuristics:** The 0–100 Awareness Index is computed deterministically in application code based on verified weights (Lighting 25%, Activity 25%, Incident penalties 30%, Community feedback 20%). The LLM never invents or adjusts underlying safety scores.
3. **Graceful Fallbacks:** The app operates 100% reliably even if the routing API, map tiles, or Gemini API keys are missing or offline.
4. **Zero-Database Lightweight Persistence:** For the prototype demo, post-journey observations are persisted in browser `localStorage` and immediately reflected as `[UNVERIFIED COMMUNITY]` observations on the map.
5. **Key Hygiene:** `GEMINI_API_KEY` is strictly server-side and never exposed in browser bundles or client code.
