// lib/session.js
// Cookie + session handling for binding a browser to a Google Health user.

const crypto = require('crypto');
const supabase = require('./supabase');

const SESSION_COOKIE = 'sara_session';
const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

function readCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

function setSessionCookie(res, sessionId) {
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`
  );
}

function readJsonBody(req) {
  // Some runtimes pre-parse the body and expose it on req.body; prefer that.
  if (req.body !== undefined && req.body !== null) {
    return Promise.resolve(
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    );
  }
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) req.destroy(); // 1 MB guard
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Returns an existing valid session id, or creates one and sets the cookie.
async function getOrCreateSession(req, res) {
  const cookies = readCookies(req);
  const existing = cookies[SESSION_COOKIE];

  if (existing) {
    const rows = await supabase.select('wearable_sessions', {
      session_id: `eq.${existing}`,
      select: 'session_id,expires_at',
    });
    const row = rows && rows[0];
    if (row && new Date(row.expires_at).getTime() > Date.now()) {
      return existing;
    }
  }

  const sessionId = crypto.randomUUID();
  await supabase.insert('wearable_sessions', [{ session_id: sessionId }]);
  setSessionCookie(res, sessionId);
  return sessionId;
}

module.exports = {
  SESSION_COOKIE,
  readCookies,
  setSessionCookie,
  readJsonBody,
  getOrCreateSession,
};
