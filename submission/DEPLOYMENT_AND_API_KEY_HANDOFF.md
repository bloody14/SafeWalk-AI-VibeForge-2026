# Deployment and API Key Handoff

## Gemini key setup owner

Kundan creates and manages the key. Teammate does not need to view or copy the secret.

Official Google AI Studio key page: https://aistudio.google.com/app/apikey
Official Gemini API getting-started: https://ai.google.dev/gemini-api/docs/get-started

1. Kundan signs in to AI Studio.
2. Kundan selects or creates a project and creates an API key.
3. Kundan enters the key directly into a local ignored server environment file or the hosting provider's server-side environment settings.
4. Antigravity verifies that the server can call Gemini without printing the key.
5. Evidence should show only that integration works; never capture the key.

Gemini key is optional. If not ready within the timebox, use deterministic route explanation and state that Gemini was not connected.

## Teammate handoff

Kundan shares only:
- Local app URL and/or public deployment URL.
- What actually works.
- Whether Gemini is live or fallback.
- What data is real, public, community or demo.
- Screenshot paths and actual limitations.

Do not share the API key.
