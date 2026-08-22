import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const root = process.cwd();
const cvHtml = path.join(root, 'public', 'cv', 'index.html');
const publicPdf = path.join(
  root,
  'public',
  'cv',
  'CV-Daniel-Garcia-Ortega.pdf',
);
const sourcePdf = path.join(
  root,
  'input',
  'cv',
  'output',
  'pdf',
  'cv-daniel-garcia-ortega-portfolio.pdf',
);

await mkdir(path.dirname(sourcePdf), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(pathToFileURL(cvHtml).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: publicPdf,
    printBackground: true,
    preferCSSPageSize: true,
  });
  await copyFile(publicPdf, sourcePdf);
  console.log(`CV exportado en ${publicPdf}`);
  console.log(`Copia de trabajo en ${sourcePdf}`);
} finally {
  await browser.close();
}
