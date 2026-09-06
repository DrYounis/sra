-- ============================================================================
-- SARA — Wearable/IoT integration schema (Phase 0.5)
-- Google Health API connector. Run this in the Supabase SQL editor.
--
-- Design notes:
--   * No Supabase Auth users. Identity is the browser `session_id` (until OAuth)
--     and then Google Health's `health_user_id`.
--   * All writes go through Vercel serverless functions using the SERVICE-ROLE
--     key, which bypasses RLS. RLS is enabled on every table so the public
--     anon/authenticated roles have NO access to biometric data.
--   * `gen_random_uuid()` is core in modern Postgres — no extension needed.
-- ============================================================================

-- 1. Browser session → Google Health user binding (Phase 0.5, step 4)
create table if not exists wearable_sessions (
  session_id     uuid primary key,
  health_user_id text,                 -- filled once OAuth completes; null before
  created_at     timestamptz not null default now(),
  expires_at     timestamptz not null default now() + interval '30 days'
);

-- 2. Single-use OAuth state + PKCE verifier (Phase 0.5, step 4 / Phase 1)
create table if not exists oauth_states (
  state         text primary key,
  session_id    uuid not null references wearable_sessions(session_id) on delete cascade,
  code_verifier text not null,
  created_at    timestamptz not null default now(),
  expires_at    timestamptz not null default now() + interval '10 minutes'
);

-- 3. Consent audit trail (Phase 1, step 2 — PDPL requirement)
create table if not exists consent_records (
  id             uuid primary key default gen_random_uuid(),
  health_user_id text not null,
  consent_text   text not null,
  version        integer not null,
  consented_at   timestamptz not null default now(),
  unique (health_user_id, version)
);

-- 4. OAuth tokens per connected user (Phase 1, step 1)
create table if not exists wearable_connections (
  health_user_id  text primary key,    -- Google Health user id (up to 63 chars)
  access_token    text not null,       -- ⚠️ must be encrypted at rest — see bottom
  refresh_token   text not null,       -- ⚠️ must be encrypted at rest — see bottom
  expires_at      timestamptz not null,
  connected_at    timestamptz not null default now(),
  consent_version integer not null,
  foreign key (health_user_id, consent_version)
    references consent_records(health_user_id, version) on delete restrict
);

-- 5. Persisted assessment scores (Phase 0.5, step 3)
create table if not exists assessment_scores (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references wearable_sessions(session_id) on delete cascade,
  score      numeric not null,
  risk_level text,
  payload    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists assessment_scores_session_idx
  on assessment_scores(session_id);

-- 6. Normalized daily device metrics (Phase 2)
create table if not exists daily_metrics (
  health_user_id text not null,
  date           date not null,
  steps          bigint,
  resting_hr     numeric,
  sleep_hours    numeric,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  primary key (health_user_id, date)
);

-- ============================================================================
-- Row Level Security — enable on everything, grant nothing to anon/authenticated.
-- Service-role key (used by serverless functions) bypasses RLS.
-- ============================================================================
alter table wearable_sessions     enable row level security;
alter table oauth_states          enable row level security;
alter table consent_records       enable row level security;
alter table wearable_connections  enable row level security;
alter table assessment_scores     enable row level security;
alter table daily_metrics         enable row level security;

-- No policies are granted: public (anon) and authenticated roles are denied by
-- default. Do NOT add permissive policies for these tables — biometric data must
-- never be readable from the client.

-- ============================================================================
-- Token encryption (REQUIRED before Phase 1 stores any token)
--
-- `access_token` / `refresh_token` are declared plain text above for scaffolding.
-- Before writing real OAuth tokens, encrypt them at rest using ONE of:
--
--   Option A — Supabase Transparent Column Encryption (TCE, simplest, if enabled
--             for your project):
--     alter table wearable_connections
--       alter column access_token  type text encrypted,
--       alter column refresh_token type text encrypted;
--
--   Option B — pgsodium column encryption (works on free tier):
--     Follow the official "encrypted columns" guide and wrap these two columns in
--     a security-definer view + trigger:
--     https://supabase.com/docs/guides/database/extensions/pgsodium
--
-- Do not run the pilot with plaintext tokens — this is a PDPL hard requirement,
-- not a nice-to-have.
-- ============================================================================
