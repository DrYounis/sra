// api/wearable-connect.js
// Starts the Google Health OAuth flow (Phase 0.5, step 4 / Phase 1, step 3):
// generates state + PKCE, binds them to the browser session, redirects to Google.

const supabase = require('../lib/supabase');
const { getOrCreateSession } = require('../lib/session');
const oauth = require('../lib/oauth');

module.exports = async (req, res) => {
  try {
    const sessionId = await getOrCreateSession(req, res);

    const state = oauth.randomString(32);
    const { verifier, challenge } = oauth.generatePkce();

    await supabase.insert('oauth_states', [
      { state, session_id: sessionId, code_verifier: verifier },
    ]);

    const url = oauth.buildAuthUrl({ state, challenge });

    res.statusCode = 302;
    res.setHeader('Location', url);
    res.end();
  } catch (err) {
    console.error('wearable-connect error', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
  }
};
