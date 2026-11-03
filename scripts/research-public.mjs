import { mkdir, writeFile, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const urls = [
  ['programs', 'https://tuyensinh.vku.udn.vn/nganh'],
  ['methods', 'https://tuyensinh.vku.udn.vn/phuongthuc'],
  ['scholarships', 'https://tuyensinh.vku.udn.vn/thong-bao/699fedf448d97e2c10006596'],
  ['admission', 'https://tuyensinh.vku.udn.vn/thong-bao/69af03ade1fedb5e0308e873'],
  [
    'tuition',
    'https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-thu-hoc-phi-hoc-ky-1-nam-hoc-2026-2027-1397.html',
  ],
  ['about', 'https://vku.udn.vn/vi/gioi-thieu/'],
  ['aptitude', 'https://tuyensinh.vku.udn.vn/thong-bao/69af034de1fedb5e0308e872'],
  ['direct', 'https://tuyensinh.vku.udn.vn/thong-bao/69af04149a0df6334f053472'],
  ['documents', 'https://tuyensinh.vku.udn.vn/thong-bao/6a029fac0004d709a40b5c02'],
  ['leadership', 'https://vku.udn.vn/vi/co-cau-to-chuc/ban-giam-hieu/'],
  [
    'history',
    'https://vku.udn.vn/vi/thu-ngo-ky-niem-05-nam-thanh-lap-truong-dai-hoc-cong-nghe-thong-tin-va-truyen-thong-viet-han-hanh-trinh-22-nam-hinh-thanh-va-phat-trien/',
  ],
];
await mkdir('docs/research', { recursive: true });
const log = [];
for (const [id, url] of urls) {
  try {
    try {
      await access(`docs/research/${id}.html`);
      log.push({ id, url, status: 'cached' });
      continue;
    } catch {
      /* First retrieval. */
    }
    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const { document } = new JSDOM(html).window;
    document.querySelectorAll('script,style,nav,footer').forEach((e) => e.remove());
    const text = document.body.textContent
      .replace(/[\t ]+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    await writeFile(`docs/research/${id}.txt`, text);
    await writeFile(`docs/research/${id}.html`, html);
    log.push({ id, url, status: 'fetched', length: text.length });
  } catch (e) {
    log.push({ id, url, status: 'unavailable', error: e.message });
  }
}
await writeFile('docs/research/access-log.json', JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 2));
