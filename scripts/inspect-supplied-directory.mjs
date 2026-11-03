import { readFile, writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

// Parse markup as inert text: never run scripts or load private profile images.
const path = process.argv[2];
if (!path) throw new Error('Pass the supplied HTML text path');
const html = await readFile(path, 'utf8');
const { document } = new JSDOM(html).window;
const seen = new Set();
const faculty = [];
for (const card of document.querySelectorAll('.profile_details')) {
  const name = card.querySelector('h2')?.textContent.replace(/\s+/g, ' ').trim();
  if (!name || seen.has(name)) continue;
  seen.add(name);
  const profile = Array.from(card.querySelectorAll('a[href]'))
    .map((a) => a.href)
    .find((href) => /^https?:\/\/scv\.udn\.vn\/[a-zA-Z0-9._-]+\/?$/.test(href));
  faculty.push({
    name,
    role: 'Danh bạ chuyên môn',
    academicProfileUrl: profile ?? null,
    sourceKind: 'user-supplied-directory',
    checkedAt: '2026-11-03',
  });
}
await writeFile('src/data/faculty.json', JSON.stringify(faculty, null, 2) + '\n');
console.log(
  JSON.stringify(
    {
      facultyCount: faculty.length,
      academicProfiles: faculty.filter((f) => f.academicProfileUrl).length,
      sampleProfessionalNames: faculty.slice(0, 8).map((f) => f.name),
      note: 'Only professional names/role/academic profile links extracted; no student account, phone, email, photo, cookies or scripts retained.',
    },
    null,
    2,
  ),
);
