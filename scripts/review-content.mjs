/* global document, innerWidth */
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
import { writeFile } from 'node:fs/promises';

const server = await createServer({ server: { host: '127.0.0.1', port: 5176, strictPort: true } });
await server.listen();
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 } });
    const page = await context.newPage();
    for (const [id, route] of [
      ['program-detail', '/nganh-dao-tao/tri-tue-nhan-tao'],
      ['tuition', '/tuyen-sinh/hoc-phi-hoc-bong'],
      ['faculty', '/gioi-thieu/lanh-dao'],
      ['contact', '/lien-he'],
    ]) {
      await page.goto(`http://127.0.0.1:5176${route}`);
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      results.push({ width, route, overflow });
      if ([390, 1440].includes(width)) {
        await page.screenshot({ path: `docs/screenshots/${id}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `docs/screenshots/${id}-${width}-viewport.png` });
      }
    }
    await context.close();
  }
  await writeFile('docs/screenshots/content-review.json', JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  await server.close();
}
console.log(
  JSON.stringify({ checked: results.length, failures: results.filter((r) => r.overflow) }, null, 2),
);
if (results.some((r) => r.overflow)) process.exitCode = 1;
