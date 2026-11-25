# SafeWalk AI

AI-assisted urban route-awareness platform helping pedestrians compare walking routes using available information about street lighting, publicly reported incidents, pedestrian activity proxies, and community observations.

## Prerequisites

- **Node.js**: v18.17+ or v20+ (Tested on Node v24.14.0)
- **npm**: v9+ (Tested on npm v11.9.0)

## Quick Start (Local Run)

1. Navigate to the `app/` folder:
   ```bash
   cd app
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. (Optional) Set up server-side Gemini API key:
   - Copy `.env.example` to `.env.local`:
     ```bash
     copy .env.example .env.local
     ```
   - Insert your key: `GEMINI_API_KEY=your_key_here`
   - *Note: If no key is configured, SafeWalk automatically uses its robust, deterministic rule-based fallback engine.*

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Run production build:
   ```bash
   npm run build
   npm run start
   ```

## Key Features

- **Interactive Map:** OpenStreetMap / CARTO tiles with multiple route overlays and point-of-interest markers (streetlights, incidents, safe hubs).
- **Fastest vs Condition-Aware Comparison:** Clear delta visualization (+4 mins for +50 pt awareness).
- **Transparent Deterministic Heuristic:** 0–100 Awareness Index calculated in code; mathematical formula inspectable in the UI.
- **Server-Side Gemini AI Route Explanation:** Explains trade-offs and uncertainty in plain English, with instant fallback.
- **Post-Journey Feedback:** Save walk observations locally in `localStorage` with `[UNVERIFIED COMMUNITY]` badges.
- **Data Trust & Disclosure Modal:** Complete data provenance, source tags, and limitation warnings.
