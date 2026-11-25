# Deployment Quick Guide

## Goal

Deploy one integrated application using an existing hosting account. Prefer one app and one service rather than separate frontend/backend hosts.

## Before the contest

The team may check that they can sign into an existing hosting account and know where environment variables are configured. Do not prebuild or deploy the competition application before the official period.

## During the contest

1. Antigravity detects which hosting CLI/account is already available (for example Vercel, Netlify, Render or another supported provider).
2. Choose the provider that supports the selected framework and server-side API routes with least setup.
3. Deploy the working application as soon as the core route/feedback flow works.
4. Add `GEMINI_API_KEY` only as a server-side environment variable if available.
5. Open the actual public URL in a fresh browser session.
6. Test route/demo search, route comparison, feedback and AI/fallback.
7. Save the URL, timestamp and screenshot in the evidence log.

Do not spend time creating new accounts, adding billing or configuring a complex database. Do not claim deployment until the public link has actually loaded and been tested.

## Local fallback

Keep the local dev server and a known working demo scenario available. If hosting fails, record that the app is runnable locally and state honestly that public deployment was blocked.
