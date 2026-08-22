import { spawnSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = process.cwd();
const astroCli = path.join(root, 'node_modules', 'astro', 'bin', 'astro.mjs');
const output = path.join(root, 'dist');
const basePath = '/PORTFOLIO/';
const environment = {
  ...process.env,
  SITE_URL: 'http://127.0.0.1:4321',
  BASE_PATH: '/PORTFOLIO',
};

const build = spawnSync(process.execPath, [astroCli, 'build'], {
  cwd: root,
  env: environment,
  stdio: 'inherit',
});

if (build.status !== 0) process.exit(build.status ?? 1);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1:4321');
  if (!url.pathname.startsWith(basePath)) {
    response.writeHead(302, { Location: basePath });
    response.end();
    return;
  }

  const relativeUrl = decodeURIComponent(url.pathname.slice(basePath.length));
  const requestedPath =
    relativeUrl.endsWith('/') || relativeUrl === ''
      ? path.join(relativeUrl, 'index.html')
      : relativeUrl;
  const resolvedPath = path.resolve(output, requestedPath);
  const safePath = resolvedPath.startsWith(output)
    ? resolvedPath
    : path.join(output, '404.html');

  try {
    const fileStat = await stat(safePath);
    if (!fileStat.isFile()) throw new Error('Not a file');
    const content = await readFile(safePath);
    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type':
        contentTypes.get(path.extname(safePath)) ?? 'application/octet-stream',
    });
    response.end(content);
  } catch {
    const content = await readFile(path.join(output, '404.html'));
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(content);
  }
});

server.listen(4321, '127.0.0.1', () => {
  console.log(`E2E server ready at http://127.0.0.1:4321${basePath}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
