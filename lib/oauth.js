// lib/oauth.js
// Google OAuth 2.0 (authorization code + PKCE) helpers for the Google Health API.
// Uses only Node built-ins (`crypto`, global `fetch`).

const crypto = require('crypto');

const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

function randomString(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64url');
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest();
}

function generatePkce() {
  const verifier = randomString(64); // 43–128 chars, base64url
  const challenge = sha256(verifier).toString('base64url');
  return { verifier, challenge };
}

function assertGoogleConfigured() {
  const required = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REDIRECT_URI',
    'GOOGLE_HEALTH_SCOPES',
  ];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing env vars: ${missing.join(', ')}`);
  }
}

function buildAuthUrl({ state, challenge }) {
  assertGoogleConfigured();
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: process.env.GOOGLE_HEALTH_SCOPES,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    access_type: 'offline', // request a refresh token
    prompt: 'consent',      // force the consent screen for biometric scope
  });
  return `${AUTH_URL}?${params.toString()}`;
}

async function exchangeCode({ code, verifier }) {
  assertGoogleConfigured();
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
      code_verifier: verifier,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(`Google token exchange failed: ${JSON.stringify(data)}`);
    err.status = res.status;
    throw err;
  }
  return data; // { access_token, refresh_token, expires_in, ... }
}

// Resolve the Google Health `health_user_id` (distinct from the OAuth `sub`).
// ⚠️ VERIFY the exact endpoint + response field against current Google Health API
// docs before pilot — do not assume.
async function fetchHealthUserId(accessToken) {
  const url = process.env.GOOGLE_HEALTH_IDENTITY_URL
    || 'https://health.googleapis.com/v1beta/user/getIdentity';
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`getIdentity failed: ${JSON.stringify(data)}`);
  }
  const id = data.healthUserId || data.health_user_id;
  if (!id) throw new Error('No healthUserId in getIdentity response');
  return id;
}

module.exports = {
  randomString,
  generatePkce,
  buildAuthUrl,
  exchangeCode,
  fetchHealthUserId,
  assertGoogleConfigured,
};
