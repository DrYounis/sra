// api/assessment.js
// Persists an assessment score server-side (Phase 0.5, step 3), so it can later
// be joined to device data via the session → health_user_id binding.

const supabase = require('../lib/supabase');
const { readJsonBody, getOrCreateSession } = require('../lib/session');

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end();
    return;
  }

  try {
    const body = await readJsonBody(req);
    const score = Number(body.sara_score);
    if (!Number.isFinite(score)) {
      return sendJson(res, 400, { error: 'missing_or_invalid_sara_score' });
    }

    const sessionId = await getOrCreateSession(req, res);
    const rows = await supabase.insert('assessment_scores', [
      {
        session_id: sessionId,
        score,
        risk_level: body.risk_level || null,
        payload: body,
      },
    ]);

    sendJson(res, 200, { ok: true, id: rows && rows[0] && rows[0].id });
  } catch (err) {
    console.error('assessment error', err);
    sendJson(res, 500, { error: 'assessment_error' });
  }
};
