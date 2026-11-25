# Gemini API Key — Quick Setup

Gemini is optional. SafeWalk must remain demonstrable without an API key through an explicitly labelled deterministic fallback.

## Create the key

1. Open the official Google AI Studio API keys page: https://aistudio.google.com/app/apikey
2. Sign in with the Google account that will own the key.
3. If prompted, create/select a Google project and choose **Create API key**.
4. Copy the key once and keep it private.
5. Check the account's usage/limits in AI Studio. Paid usage/billing may apply depending on model, account and quota.

Google's current Gemini API getting-started guide explains that new users can have a project/key created in AI Studio and that an API key is required to authenticate API calls: https://ai.google.dev/gemini-api/docs/get-started

## Add it to the local application

Ask Antigravity to create the required local server-side environment file and `.env.example` placeholder. Then enter the key directly into the local environment file or IDE secret manager using the variable name the code expects (prefer `GEMINI_API_KEY`). Do not paste the real key into ChatGPT or a public Antigravity prompt.

Example format (placeholder only):

```dotenv
GEMINI_API_KEY=PASTE_YOUR_KEY_LOCALLY
```

- Keep `.env.local` or `.env` ignored by Git.
- Never prefix a secret with `NEXT_PUBLIC_` or expose it to browser JavaScript.
- Do not commit the key.
- Do not take screenshots of the key.
- For deployment, add it in the hosting provider's server-side Environment Variables/Secrets settings; do not put it in frontend build variables.

## How it should be used in SafeWalk

Send only the structured route factors and non-sensitive summaries to Gemini. Ask it to explain trade-offs and uncertainty. Route scores are calculated by transparent application logic, not invented by Gemini.

## If the key is unavailable

Do not lose time. Continue with deterministic route explanations and clearly label them as rule-based fallback. The website must work without Gemini.
