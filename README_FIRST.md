# SafeWalk AI — VibeForge Single-Operator Starter Pack

**Operating model: one computer, one ChatGPT CTO conversation, one Antigravity workspace, one project repository.**

This pack replaces the earlier two-developer/cross-branch plan. Do not use the old Member A/Member B coding prompts. This version assumes Kundan is the only person operating ChatGPT and Antigravity on the development computer. The teammate is the evidence, presentation and demo-support lead; they do not edit application source code in a second workspace.

## Product definition

**SafeWalk AI — AI-powered urban route-awareness platform for people unfamiliar with a city or neighbourhood.**

A newcomer may not know which walking areas have better street lighting, where publicly reported crime incidents have occurred, which routes have low pedestrian activity at night, or how recent those observations are. Conventional navigation primarily optimises distance and travel time. SafeWalk compares walking-route options using available route-condition information, explains the trade-offs, and collects feedback after a completed journey.

The correct core journey is:
1. Enter an origin and destination (or select a clearly labelled demo scenario).
2. See a fastest route and a condition-aware alternative where route data supports it.
3. Inspect available lighting, reported-incident, pedestrian-activity and community-feedback indicators, including data freshness and coverage.
4. Read an explanation of why route indicators differ and what is unknown.
5. Mark the journey complete and submit observed route-condition feedback.
6. See the feedback reflected in the local demo's community-observation view, clearly marked as user-submitted and unverified until reviewed.

SafeWalk is a **route-awareness aid**, not a guarantee of personal safety, a crime-prediction system, or an emergency service.

## What this pack is

This is a pre-contest planning, prompt and evidence template pack. It is not a finished SafeWalk application. Disclose this pack if the organisers ask about pre-existing resources. The new competition application itself must be created during the official competition period.

The team has reported that organisers approved a fresh SafeWalk implementation with disclosure of the earlier prototype. Preserve the actual organiser approval message as evidence. The earlier prototype was a static Vanilla HTML/CSS/JavaScript concept with simulated route indicators. Do not reuse its source code, assets or screenshots in the competition build unless the organisers expressly approve that reuse. See `submission/DISCLOSURES.md`.

## Single-operator team arrangement

- **Kundan:** only coding operator; uses this ChatGPT conversation and one Antigravity workspace to build the complete application, frontend, backend/API endpoints, AI integration, local run, deployment and technical fixes.
- **Teammate:** does not code or operate a separate Antigravity project. They capture genuine screenshots/recording, maintain evidence and prompt records from actual outputs shared by Kundan, prepare the PowerPoint and help rehearse the demo. They may help enter account settings or API-key setup only while Kundan controls the account and does not disclose the secret in chat.
- **ChatGPT:** CTO, project strategist, prompt writer, reviewer, presentation/pitch helper and evidence-log editor based only on information the team shares. ChatGPT cannot see the local desktop or Antigravity session unless screenshots/reports are uploaded.
- **Antigravity:** executes code changes and terminal/browser operations in the one local workspace.

No second coding branch, no independent teammate implementation, no cross-machine frontend/backend merge.

## Two-hour delivery target

- 0–10 min: confirm rules/start time, inspect environment and lock MVP.
- 10–20 min: scaffold one full-stack app and get it running locally.
- 20–55 min: route search/map and fastest vs condition-aware comparison.
- 55–75 min: route-condition indicators, explanation and visible data labels.
- 75–90 min: journey-complete feedback flow and persistence.
- 90–100 min: Gemini integration if key is ready; fallback otherwise.
- 100–110 min: deploy the working version using an already accessible hosting account.
- 110–120 min: public-link smoke test, screenshots, PPT and submission.

Start deployment as soon as the core vertical slice is stable; do not wait until minute 100 if a preview can be deployed sooner. A 120-minute target is aggressive; hosting login, quotas, account setup or network conditions may prevent public deployment. Keep a verified local demo as fallback and report deployment truthfully.

## Use only these two main prompts

1. `prompts/CHATGPT_CTO_START_PROMPT.md` — upload this pack ZIP and the VibeForge rulebook to a **new ChatGPT conversation**, then paste this prompt.
2. `prompts/ANTIGRAVITY_SINGLE_OPERATOR_BUILD_PROMPT.md` — open the extracted pack/workspace in Antigravity and paste this prompt. It directs Antigravity to create the complete application on this computer.

There is no separate teammate ChatGPT onboarding prompt and no Member B Antigravity coding prompt in this pack.

## API key

The Gemini API key must be created by the account owner through Google AI Studio if Gemini integration is used. The key is a secret. Do not paste it into ChatGPT, a public prompt, screenshots, source code or a Git commit. Put it directly into a local ignored environment file or the hosting provider's server-side environment settings. See `docs/GEMINI_API_KEY_SETUP.md`.

Official instructions: https://aistudio.google.com/app/apikey and https://ai.google.dev/gemini-api/docs/get-started

## Evidence and PPT

The teammate's job is described in `submission/TEAMMATE_EVIDENCE_AND_PPT_ROLE.md`. Keep the actual prompt history, timestamps, Antigravity reports, Graphify outputs, screenshots and deployment evidence. Do not invent or backdate any record. The teammate prepares the PPT from actual features/screenshots and shares the draft with Kundan/ChatGPT for review.

## First actions

1. Create an empty folder such as `VibeForge_Contest` (keep the earlier starter pack separate). Extract this ZIP so the `VibeForge_SafeWalk_Single_Operator_Pack` folder appears inside it.
2. Open the extracted `VibeForge_SafeWalk_Single_Operator_Pack` folder itself in Antigravity. Keep the pack docs at the root; Antigravity creates application source inside `app/`.
3. Open a new ChatGPT conversation; upload this ZIP and the original VibeForge Participant Rulebook PDF; paste `prompts/CHATGPT_CTO_START_PROMPT.md`.
4. Paste `prompts/ANTIGRAVITY_SINGLE_OPERATOR_BUILD_PROMPT.md` into the single Antigravity workspace after confirming the official competition window has begun.
5. Give the teammate `submission/TEAMMATE_EVIDENCE_AND_PPT_ROLE.md` and the correct project brief.

## Scope discipline

Do not build a large enterprise system. Do not add registration, MFA, RBAC, admin permission matrices, penetration testing, microservices, complex database architecture or production compliance work. The two-hour objective is a polished, demonstrable prototype with a complete route-awareness and post-journey feedback workflow. Keep only essential handling of API keys and truthful data labels.
