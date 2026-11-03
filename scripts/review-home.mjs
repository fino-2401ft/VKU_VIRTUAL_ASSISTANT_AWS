/* global document, innerWidth */
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

const server = await createServer({ server: { host: '127.0.0.1', port: 5174, strictPort: true } });
await server.listen();
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5174/');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `docs/screenshots/home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `docs/screenshots/home-${width}-viewport.png` });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    if (width === 390) {
      await page.getByRole('button', { name: 'Mở menu điều hướng' }).click();
      await page.screenshot({ path: 'docs/screenshots/menu-390.png' });
      await page.keyboard.press('Escape');
      if (await page.getByRole('dialog').count())
        throw new Error('Dialog still visible after Escape');
    }
    results.push({
      width,
      overflow,
      violations: axe.violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        targets: nodes.map((n) => n.target),
      })),
    });
    await context.close();
  }
  await writeFile('docs/screenshots/home-review.json', JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  await server.close();
}
console.log(JSON.stringify(results, null, 2));
if (results.some((r) => r.overflow || r.violations.length)) process.exitCode = 1;
