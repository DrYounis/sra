const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="SARA Admin"');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Unauthorized');
    return;
  }

  const base64Credentials = authHeader.slice(6);
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  const validUser = process.env.ADMIN_USER;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!username || !password || username !== validUser || password !== validPassword) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="SARA Admin"');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Unauthorized');
    return;
  }

  try {
    const htmlPath = path.join(__dirname, '..', 'private', 'admin.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
  }
};
