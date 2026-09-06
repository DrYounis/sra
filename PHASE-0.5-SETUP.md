# SARA — Phase 0.5 Setup (Wearable backend)

Status: code scaffolded. **Not runnable until you provision Supabase + set env vars.**

## What was built

| File | Purpose |
|------|---------|
| `sql/001_wearable_schema.sql` | Tables + constraints + RLS + token-encryption notes |
| `lib/supabase.js` | Minimal Supabase REST client (fetch, no npm) |
| `lib/session.js` | Session cookie + body parsing + `getOrCreateSession` |
| `lib/oauth.js` | Google OAuth (PKCE, state, token exchange, identity) |
| `api/session.js` | Establishes the `sara_session` cookie |
| `api/assessment.js` | Persists assessment score server-side |
| `api/wearable-connect.js` | Starts OAuth (state + PKCE → redirect) |
| `api/wearable-callback.js` | OAuth callback → binds `health_user_id` to session |
| `js/assessment.js` (edited) | Fire-and-forget POST to `/api/assessment` |

## Env vars to set (Vercel → Project → Environment Variables)

| Name | Example / notes |
|------|-----------------|
| `SUPABASE_URL` | `https://<ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only. Never put in client code or a public var.** |
| `GOOGLE_CLIENT_ID` | From Google Cloud OAuth client |
| `GOOGLE_CLIENT_SECRET` | Server-only |
| `GOOGLE_REDIRECT_URI` | `https://<your-domain>/api/wearable-callback` |
| `GOOGLE_HEALTH_SCOPES` | Space-separated. **VERIFY against Google Health API docs.** |
| `GOOGLE_HEALTH_IDENTITY_URL` | Optional; default is a placeholder. **VERIFY before pilot.** |

Add these to `Vercel` (production + preview), not `vercel.json`, and keep the
service-role key + client secret out of any terminal paste / logs.

## Run order

1. Provision a Supabase project (free tier). **Choose the region you've already
   vetted for the cross-border transfer question** (Phase 0 item 5).
2. Run `sql/001_wearable_schema.sql` in the Supabase SQL editor.
3. Apply token encryption (bottom of the schema file) **before Phase 1** — do not
   store plaintext tokens.
4. Complete Phase 0: create the Google Cloud OAuth client, set the redirect URI
   to `/api/wearable-callback`, and VERIFY the scope strings + identity endpoint.
5. Set the env vars above and redeploy.

## What I could NOT verify

- No Supabase project or Google credentials exist yet, so **none of this has been
  run or tested.** It is scaffolding, not a working integration.
- The Google Health `getIdentity` endpoint + response field (`healthUserId`) are
  placeholders pending verification against current docs.
- The OAuth scope strings are not set — they need your Phase 0 research.
- Token encryption is documented but not applied (pending your Supabase plan's
  TCE/pgsodium availability).

## Security notes

- `SUPABASE_SERVICE_ROLE_KEY` and `GOOGLE_CLIENT_SECRET` are server-only.
- RLS is enabled on every table with no public policies; the service-role key
  bypasses RLS, the anon key cannot read biometric data.
- The session cookie is `HttpOnly; SameSite=Lax` and carries only an unguessable
  UUID — the `wearable_sessions` row is the source of truth.
