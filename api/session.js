// api/session.js
// Establishes the short-lived browser session cookie (Phase 0.5, step 4).

const { getOrCreateSession } = require('../lib/session');

module.exports = async (req, res) => {
  try {
    const sessionId = await getOrCreateSession(req, res);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ session_id: sessionId }));
  } catch (err) {
    console.error('session error', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'session_error' }));
  }
};
