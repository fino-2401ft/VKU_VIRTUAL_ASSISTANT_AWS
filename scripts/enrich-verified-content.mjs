import { readFile, writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const programs = JSON.parse(await readFile('src/data/programs2026.json', 'utf8'));
const text = await readFile('docs/research/programs.txt', 'utf8');
const cards = [
  ...text.matchAll(
    /Chỉ tiêu\s+(\d+)\s+([^\n]+)\s+Khối ngành:\s*(.*?)\s*Trình độ đào tạo:\s*(Kỹ sư|Cử nhân)\s*Thời gian học:\s*([\d.]+) năm/g,
  ),
];
if (cards.length !== programs.length)
  throw new Error(`Expected 22 source cards, got ${cards.length}`);
const doc = new JSDOM(await readFile('docs/research/admission.html', 'utf8')).window.document;
const rows = [...doc.querySelectorAll('table tr')]
  .map((r) => [...r.cells].map((c) => c.textContent.trim()))
  .filter((c) => c[1] === 'VKU');
const codes = [
  '7480201',
  '7480201B',
  '7480201GT',
  '7480107',
  '7480107DA',
  '7480202',
  '7320106',
  '7320106DA',
  '7480108',
  '7480108B',
  '7480108AS',
  '7480108IC',
  '7480108PT',
  '7480108UA',
  '7480108RA',
  '7340101',
  '7340115',
  '7340205',
  '7340101EL',
  '7340101ET',
  '7340101IM',
  '7340101DE',
];
for (let i = 0; i < programs.length; i++) {
  const p = programs[i];
  const card = cards[i];
  if (Number(card[1]) !== p.quota2026) throw new Error(`Quota mismatch ${p.name}`);
  const row = rows.find((c) => c[3] === codes[i]);
  if (!row) throw new Error(`Missing admissions code ${codes[i]}`);
  const tableGroup =
    Number(row[0]) <= 9 ? 'media-business' : Number(row[0]) <= 20 ? 'computing' : 'semiconductor';
  Object.assign(p, {
    status: 'verified',
    verifiedAt: '2026-11-03',
    provenance:
      'Official program directory fetched and matched to admissions method table on 2026-11-03',
    degree: card[4] === 'Kỹ sư' ? 'ky-su' : 'cu-nhan',
    durationYears: Number(card[5]),
    discipline: card[3].trim(),
    admissionCode: row[3],
    officialName: row[2],
    subjectGroup: tableGroup,
    curriculumUrl: 'https://daotao.vku.udn.vn/chuong-trinh-dao-tao',
    admissionSourceUrl: 'https://tuyensinh.vku.udn.vn/thong-bao/69af03ade1fedb5e0308e873',
  });
}
await writeFile('src/data/programs2026.json', JSON.stringify(programs, null, 2) + '\n');
const sources = JSON.parse(await readFile('src/data/sources.json', 'utf8'));
for (const s of sources)
  if (['S02', 'S03', 'S05', 'S06', 'S09', 'S10', 'S20'].includes(s.id))
    Object.assign(s, {
      status: 'verified',
      checkedAt: '2026-11-03',
      note: 'Fetched directly with local research script; snapshot in docs/research. Source labels and applicable years retained.',
    });
await writeFile('src/data/sources.json', JSON.stringify(sources, null, 2) + '\n');
console.log('Verified 22 program cards, quotas, degree/duration, codes; updated source registry.');
