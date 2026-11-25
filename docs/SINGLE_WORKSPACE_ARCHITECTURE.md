# SafeWalk AI — Single-Workspace Architecture (Contest MVP)

## Architecture rule

One computer, one Antigravity workspace, one repository, one implementation owner and one integrated application. Antigravity builds the frontend and backend/API in the same project. Do not split coding across team members or separate repositories. The teammate does not create a competing source tree.

## Preferred architecture

Use a **single full-stack web application** so the browser UI and server-side AI endpoint deploy together. Prefer a React-based full-stack framework that has server-side API routes and a simple one-command deployment path already supported by the user's authenticated hosting account. If the workspace or existing setup strongly favors Vite + a small Node/FastAPI server, Antigravity may use that instead, but must explain the choice in a few lines and keep it as one repository and one deployable service where practical.

Do not spend time debating framework alternatives. Choose the path that starts locally fastest and can be deployed with the account already available.

## Logical components

1. **Web UI** — route search, map, route cards, factor breakdown, AI explanation, journey completion, feedback form.
2. **Route provider adapter** — geocoding/routing provider when reachable; predictable demo route fallback when unavailable.
3. **Condition dataset/adapter** — verified source data if immediately available; otherwise clearly labelled demo observations.
4. **Route-awareness calculator** — deterministic and transparent logic; LLM does not calculate authoritative route safety.
5. **Server-side AI endpoint** — optional Gemini call for natural-language explanation/classification. API key remains server-side.
6. **Feedback store** — browser localStorage for the contest MVP; feedback stays in the current browser/device. Do not claim global synchronisation.
7. **Submission/evidence folder** — logs, screenshots, Graphify outputs, PPT material and disclosure.

## Simplest deployment model

Prefer one deployable application. Use the first hosting provider already accessible/logged in from the user's machine (for example Vercel, Netlify, Render or another existing service). Avoid signing up for a new provider, adding a separate database or connecting multiple hosting products during the sprint.

If using a static frontend plus server API, ensure the public API URL is configured correctly. If deployment takes too long, preserve the working local demo and submit a truthful status; do not claim a public deployment that has not been opened and tested.

## Data flow

- User enters origin/destination.
- Route adapter returns route geometry and distance/time, or a labelled demo route.
- Condition adapter associates available observations to route segments/area.
- Deterministic route-awareness logic calculates a comparative indicator from available known factors only.
- UI displays source, freshness, coverage, unknown fields and DEMO labels.
- AI endpoint receives only the structured route comparison summary, not raw user location history, and generates an explanation.
- User marks journey complete and submits structured observations.
- Feedback is saved locally and displayed as unverified/pending; it does not become a verified public fact automatically.

## Suggested route indicators

- Lighting condition/coverage.
- Publicly reported incident information, only where a credible and appropriately scoped source is available.
- Pedestrian activity or a clearly labelled proxy/observation.
- Recent community observations and feedback.
- Data recency and coverage.

No source does not mean no incidents. Missing lighting data does not imply poor or good lighting.

## UI pages/views

Keep the app as one coherent experience, not many separate admin screens:
- Welcome/search view.
- Route comparison/map view.
- Route details/explanation panel.
- Journey completed/feedback modal.
- Simple community observations panel (optional compact view).

## API endpoint guidance

If the selected stack uses server routes, implement only the required endpoints, such as:
- `POST /api/ai/route-explanation` — explain a supplied structured comparison.
- `POST /api/ai/classify-feedback` — classify feedback if useful.
- `GET /api/demo/route-data` — return labelled route/observation demo data if needed.

If no real backend is needed for a feature, use local client logic rather than building artificial APIs. The app must have a real server-side endpoint for Gemini when the key is configured.

## Essential implementation choices

- Use a proven map library such as Leaflet if compatible with the chosen framework.
- Use OpenStreetMap tiles only with proper attribution and respect provider usage limits.
- Use routing/geocoding services only if they respond reliably; include a demo route fallback.
- Avoid maps that require an API key unless the user already has a working key.
- Use localStorage for demo feedback so the full journey can be shown without database setup.
- Keep route score logic transparent and deterministic; show an explanatory factor breakdown.
- Keep AI optional. The product remains functional without a Gemini key.

## Required environment files

- `.env.example` — placeholder names only.
- `.env.local` / `.env` — local secrets, ignored by Git.
- Hosting environment variables — server-side secret only.

Never use a public/browser-prefixed variable for the Gemini key. Never commit or screenshot a real key.

## Definition of done

- App runs locally.
- Route search/demo scenario works.
- Route is visible and comparison cards render.
- Condition indicators identify data source/freshness or DEMO/UNKNOWN.
- AI explanation works with key or an honestly labelled fallback.
- Journey completion and feedback work and persist in the browser.
- App builds successfully.
- Public deployment is verified if credentials/provider access permit.
- Local demo remains available regardless of public deployment.


## Workspace layout

Keep the extracted starter pack as the workspace root. During the competition, create the working application in `app/` and preserve `docs/`, `prompts/` and `submission/` at the root:

```text
VibeForge_SafeWalk_Single_Operator_Pack/
├── app/                         # New competition application source
│   ├── frontend and server code
│   ├── package/config files
│   └── README.md                # App-specific run instructions
├── docs/                        # Planning/architecture templates
├── prompts/                     # The two main prompts
└── submission/                  # Actual logs, screenshots, PPT content
```

Use a single repository rooted at the pack folder or, if Antigravity determines the hosting/deployment tool requires it, initialise Git in the workspace and keep `app/` as the application subdirectory. Do not create a parallel repository.
