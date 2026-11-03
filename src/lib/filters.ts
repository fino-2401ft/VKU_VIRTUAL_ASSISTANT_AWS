import { programs, notices, type Program, type Notice } from '../data/content';
import { normalize } from './search';

export function filterPrograms({
  query = '',
  group = '',
  degree = '',
  sort = 'name',
} = {}): Program[] {
  return programs
    .filter(
      (p) =>
        normalize(p.name).includes(normalize(query)) &&
        (!group || p.group === group) &&
        (!degree || p.degree === degree),
    )
    .sort((a, b) =>
      sort === 'quota'
        ? b.quota2026 - a.quota2026 || a.name.localeCompare(b.name, 'vi')
        : a.name.localeCompare(b.name, 'vi'),
    );
}
export function filterNotices({ query = '', category = '', year = '' } = {}): Notice[] {
  return notices
    .filter(
      (n) =>
        normalize(`${n.title} ${n.summary}`).includes(normalize(query)) &&
        (!category || n.category === category) &&
        (!year || n.publishedAt.startsWith(year)),
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function isExpired(validUntil?: string, asOf = '2026-11-03') {
  return !!validUntil && validUntil < asOf;
}
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Bangkok',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00+07:00`));
}
