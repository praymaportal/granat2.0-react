import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function minifyCss(from, to) {
  const css = await fs.readFile(from, 'utf8');
  const result = await esbuild.transform(css, {
    loader: 'css',
    minify: true
  });
  await fs.writeFile(to, result.code, 'utf8');
}

async function minifyJs(from, to, format) {
  const js = await fs.readFile(from, 'utf8');
  const result = await esbuild.transform(js, {
    loader: 'js',
    format,
    minify: true
  });
  await fs.writeFile(to, result.code, 'utf8');
}

async function run() {
  const styleCss = path.join(DIST_DIR, 'style.css');
  const styleMin = path.join(DIST_DIR, 'style.min.css');
  const es = path.join(DIST_DIR, 'granat-ui.es.js');
  const esMin = path.join(DIST_DIR, 'granat-ui.es.min.js');
  const cjs = path.join(DIST_DIR, 'granat-ui.cjs');
  const cjsMin = path.join(DIST_DIR, 'granat-ui.min.cjs');

  const missing = [];
  for (const f of [styleCss, es, cjs]) {
    // eslint-disable-next-line no-await-in-loop
    if (!(await fileExists(f))) missing.push(path.relative(DIST_DIR, f));
  }
  if (missing.length) {
    throw new Error(
      `minify-dist: missing build outputs in dist/: ${missing.join(', ')} (run \`npm run build\` first)`
    );
  }

  await Promise.all([
    minifyCss(styleCss, styleMin),
    minifyJs(es, esMin, 'esm'),
    minifyJs(cjs, cjsMin, 'cjs')
  ]);

  // Keep output minimal and deterministic.
  // eslint-disable-next-line no-console
  console.log('minify-dist: wrote style.min.css, granat-ui.es.min.js, granat-ui.min.cjs');
}

await run();

