import { chromium } from '@playwright/test';
import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';

const phase = process.argv[2] || 'final';
await mkdir('docs/screenshots/reference', { recursive: true });
const server = await createServer({ server: { host: '127.0.0.1', port: 5176, strictPort: true } });
await server.listen();
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1913, height: 1100 },
    deviceScaleFactor: 1,
  });
  await page.goto('http://127.0.0.1:5176/');
  await page.locator('main h1').waitFor({ state: 'attached' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
  if (phase === '01-header') {
    await page.screenshot({
      path: `docs/screenshots/reference/${phase}.png`,
      clip: { x: 0, y: 0, width: 1913, height: 238 },
    });
  } else {
    await page.screenshot({
      path: `docs/screenshots/reference/${phase}-desktop.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `docs/screenshots/reference/${phase}-viewport.png` });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.screenshot({
      path: `docs/screenshots/reference/${phase}-mobile.png`,
      fullPage: true,
    });
  }
  if (['04-final', '07-complete'].includes(phase)) {
    const results = [];
    for (const width of [320, 390, 768, 1024, 1440, 1913]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of [
        '/',
        '/thong-bao',
        '/nganh-dao-tao',
        '/tuyen-sinh/hoc-phi-hoc-bong',
        '/lien-he',
      ]) {
        await page.goto(`http://127.0.0.1:5176${route}`);
        await page.locator('main h1').waitFor({ state: 'attached' });
        await page.evaluate(() => document.fonts.ready);
        await page
          .locator('img')
          .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        );
        results.push({ width, route, overflow });
        if (overflow) throw new Error(`Overflow: ${route} at ${width}`);
        if ([390, 1440].includes(width) && ['/thong-bao', '/nganh-dao-tao'].includes(route)) {
          await page.screenshot({
            path: `docs/screenshots/reference/${phase}-${route.slice(1)}-${width}.png`,
            fullPage: true,
          });
        }
      }
    }
    await page.goto('http://127.0.0.1:5176/');
    await page.getByRole('searchbox', { name: 'Tìm thông báo', exact: true }).fill('hoc phi');
    await page.getByRole('button', { name: 'Tìm kiếm thông báo', exact: true }).click();
    await page.waitForURL('**/thong-bao?q=hoc+phi');
    await page.locator('.notice-list article').first().waitFor();
    if ((await page.locator('.notice-list article').count()) !== 1)
      throw new Error('Header search failed');
    await writeFile(
      `docs/screenshots/reference/${phase}-review.json`,
      JSON.stringify({ results, headerSearch: 'passed' }, null, 2),
    );
  }
  console.log(`Screenshots saved: ${phase}`);
} finally {
  await browser.close();
  await server.close();
}
