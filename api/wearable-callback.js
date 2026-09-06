// api/wearable-callback.js
// Google Health OAuth callback (Phase 0.5, step 4):
// validates state + PKCE, exchanges the code, resolves health_user_id, and binds
// it to the browser session. Token/consent persistence is Phase 1 (after the
// at-rest encryption in sql/001_wearable_schema.sql is applied).

const supabase = require('../lib/supabase');
const oauth = require('../lib/oauth');

function sendText(res, status, message) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(message);
}

function redirect(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
}

module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const error = url.searchParams.get('error');
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (error) {
    return redirect(res, '/assessment.html?wearable=cancelled');
  }
  if (!code || !state) {
    return sendText(res, 400, 'Missing code or state');
  }

  try {
    // 1. Validate the single-use state and recover the bound session + verifier.
    const rows = await supabase.select('oauth_states', {
      state: `eq.${state}`,
      select: 'state,session_id,code_verifier,expires_at',
    });
    const row = rows && rows[0];
    if (!row || new Date(row.expires_at).getTime() < Date.now()) {
      return sendText(res, 400, 'Invalid or expired OAuth state');
    }
    await supabase.remove('oauth_states', { state: `eq.${state}` });

    // 2. Exchange the authorization code for tokens (PKCE).
    const tokens = await oauth.exchangeCode({ code, verifier: row.code_verifier });

    // 3. Resolve the Google Health user id (VERIFY endpoint before pilot).
    const healthUserId = await oauth.fetchHealthUserId(tokens.access_token);

    // 4. Bind session → health_user_id.
    await supabase.update(
      'wearable_sessions',
      { health_user_id: healthUserId },
      { session_id: `eq.${row.session_id}` }
    );

    // Phase 1 (after token encryption is in place):
    //   - insert consent_records (consent_text + version) for this user
    //   - insert wearable_connections (access_token, refresh_token, expires_at,
    //     consent_version)

    redirect(res, '/assessment.html?wearable=connected');
  } catch (err) {
    console.error('wearable-callback error', err);
    sendText(res, 500, 'Internal Server Error');
  }
};
