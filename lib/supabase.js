// lib/supabase.js
// Minimal Supabase PostgREST client over Node's global fetch — no npm dependency.
// SERVER-ONLY: uses the service-role key. Never expose this key client-side.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function assertConfigured() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  }
}

async function request(method, table, { query = {}, body, headers: extra } = {}) {
  assertConfigured();

  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Prefer: 'return=representation',
      ...extra,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(`Supabase ${method} ${table}: ${res.status} ${text}`);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

module.exports = {
  request,
  select: (table, query) => request('GET', table, { query }),
  insert: (table, rows) => request('POST', table, { body: rows }),
  update: (table, patch, query) => request('PATCH', table, { query, body: patch }),
  remove: (table, query) => request('DELETE', table, { query }),
};
