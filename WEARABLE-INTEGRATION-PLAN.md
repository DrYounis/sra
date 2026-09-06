# SARA — Wearable/IoT Data Integration Plan
**Module:** Biometric Data Connector (Google Health API)
**Cost target:** $0 (dev time only)
**Status:** v3.1 — re-based against actual sara.plus repo + session-binding fix (2026-09-05)

**Change from v2:** v2 assumed a Next.js + Supabase stack. The actual repo is static HTML/CSS/JS with a single Vercel serverless function (`api/admin.js`) as its only server-side code — no database, no user accounts, no server-side scoring. This version re-bases the plan on what exists.

---

## Phase 0 — Prerequisites (Day 0)
1. Register a project in Google Cloud Console, enable the Google Health API.
2. Create Google OAuth 2.0 credentials (client ID/secret).
3. Draft a separate, explicit consent screen for biometric/wearable data, distinct from existing assessment consent.
4. File a DPIA covering this data flow before onboarding any pilot user with a connected wearable.
5. Confirm Supabase project region vs. Google Health API data residency; if either leg sits outside Saudi Arabia, get legal sign-off on cross-border transfer safeguards first.

## Phase 0.5 — Introduce the missing backend (Days 1–2)
1. Provision a Supabase project (free tier — net-new dependency, not "add a table").
2. Use Google Health's `health_user_id` (returned on OAuth connect) as the primary key — no login/signup system needed.
3. Add server-side assessment persistence: on submit, POST score + session id to a new Vercel function writing to Supabase, alongside the existing Formspree submission.
4. **Bind assessment to OAuth connection:** short-lived session cookie on first visit → carried through OAuth `state` param → callback attaches `health_user_id` to that session → assessment POST carries same cookie. Join path: `session_id → health_user_id → daily_metrics`.
5. Set up Supabase Vault (`pgsodium`) before any token touches a table.

## Phase 1 — Backend Connector (Days 2–4)
1. `wearable_connections`: `health_user_id` (PK), `access_token`/`refresh_token` (Vault-encrypted), `expires_at`, `connected_at`, `consent_version` (FK → `consent_records`).
2. `consent_records`: `id`, `health_user_id`, `consent_text`, `version`, `consented_at`.
3. OAuth callback as `api/wearable-callback.js` (matches `api/admin.js` pattern) — `state` validation + PKCE, treated like a payment-flow handshake.
4. On-demand token refresh (check `expires_at`), no cron needed for refresh.
5. Store only: steps, heart rate, sleep duration.

## Phase 2 — Data Sync (Days 4–5)
1. Daily batch via Vercel cron — confirmed $0 on Hobby tier, once-per-day cadence, ±59 min precision (fine for this use).
2. `daily_metrics`: `health_user_id`, `date`, `steps`, `resting_hr`, `sleep_hours`, `UNIQUE(health_user_id, date)`, upsert on write.
3. Don't fabricate missing-data days.

## Phase 3 — Cross-reference with assessment (blocked on Phase 0.5, not "Day 5")
1. Join persisted assessment scores to `daily_metrics` by `health_user_id`.
2. Flag data source (self-reported vs. device-verified) at the data layer — no per-user dashboard exists yet to display it.

## Phase 4 — Right-to-erasure (new)
1. "Delete my wearable data" flow: purge `wearable_connections` + `daily_metrics`, revoke Google Health OAuth grant.

## Phase 5 — Pilot Test
1. Onboard subset of pilot users (Fitbit + Android/Google Fit, same API).
2. Measure connection completion, data consistency, week-1 drop-off.
3. No Apple HealthKit yet — defer, native iOS cost.

## Explicit Deferrals
Apple HealthKit, real-time streaming, additional biometrics (SpO2/ECG/glucose), full auth system.

## Confirmed
Rate limits (300/min/user, 86.4M/day project); Fitbit Web API deprecates Sept 2026 → build on Google Health API; PDPL requires explicit consent + minimization + DPIA; Vercel Hobby cron works at $0.

## Still Open (legal, not technical)
CCHI/SAMA wearable-data classification check; cross-border transfer safeguard sign-off.
