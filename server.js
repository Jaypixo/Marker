const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4173;
const SITE_ROOT = path.join(__dirname, 'website');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

// website/ is fully self-contained (its own copy of remarker.js included) so
// this server's behavior matches a static host like Cloudflare Pages exactly.
function resolveFile(urlPath) {
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
  if (urlPath === '/favicon.ico') urlPath = '/favicon.svg';

  let filePath = path.join(SITE_ROOT, urlPath);
  if (!path.extname(filePath) && !fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }
  return filePath;
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.normalize(resolveFile(urlPath));

  if (!filePath.startsWith(SITE_ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Site running at http://localhost:${PORT}/`);
});
