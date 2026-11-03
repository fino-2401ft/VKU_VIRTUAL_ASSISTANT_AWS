import { describe, expect, it } from 'vitest';
import { programs, notices } from '../data/content';
import sources from '../data/sources.json';
import { filterPrograms, filterNotices, isExpired } from '../lib/filters';

describe('data provenance and invariants', () => {
  it('matches the verified 22/1500 catalog and degree/duration/code records', () => {
    expect(programs).toHaveLength(22);
    expect(programs.reduce((s, p) => s + p.quota2026, 0)).toBe(1500);
    expect(new Set(programs.map((p) => p.slug)).size).toBe(22);
    expect(
      programs.every(
        (p) =>
          p.admissionYear === 2026 &&
          p.verifiedAt === '2026-11-03' &&
          p.status === 'verified' &&
          !!p.admissionCode &&
          (p.degree === 'ky-su'
            ? p.durationYears === 4.5
            : p.degree === 'cu-nhan' && p.durationYears === 4),
      ),
    ).toBe(true);
    expect(new Set(programs.map((p) => p.admissionCode)).size).toBe(22);
    expect(programs.find((p) => p.slug === 'tri-tue-nhan-tao')?.admissionCode).toBe('7480107');
  });
  it('contains 22 official source records and valid URLs', () => {
    expect(sources).toHaveLength(22);
    for (const item of [...programs, ...notices]) {
      expect(new URL(item.sourceUrl).hostname).toMatch(/(^|\.)vku\.udn\.vn$/);
      expect(item.sourceName.length).toBeGreaterThan(0);
    }
  });
  it('keeps notices verified, dated, and protects against inferred expiry', () => {
    for (const notice of notices) {
      expect(notice.status).toBe('verified');
      expect(Number.isNaN(Date.parse(notice.publishedAt))).toBe(false);
    }
    expect(isExpired('2026-10-30')).toBe(true);
    expect(isExpired(undefined)).toBe(false);
    expect(isExpired('2026-11-03')).toBe(false);
  });
});
describe('search and filters', () => {
  it('finds Vietnamese text without diacritics and combines group/query', () => {
    expect(filterPrograms({ query: 'CONG NGHE THONG TIN' })).toHaveLength(3);
    expect(filterPrograms({ query: 'tri tue nhan tao', group: 'ai-data' })).toHaveLength(2);
    expect(filterPrograms({ query: 'tri tue nhan tao', group: 'media' })).toHaveLength(0);
    expect(filterPrograms()).toHaveLength(22);
  });
  it('sorts quota descending without changing source data', () => {
    const original = programs.map((p) => p.id);
    const sorted = filterPrograms({ sort: 'quota' });
    expect(sorted[0].quota2026).toBe(180);
    expect(programs.map((p) => p.id)).toEqual(original);
  });
  it('filters notices by category/year/text and sorts newest first', () => {
    expect(filterNotices({ category: 'khao-thi' })).toHaveLength(3);
    expect(filterNotices({ year: '2027' })).toHaveLength(0);
    expect(filterNotices({ query: 'hoc phi', category: 'tai-vu', year: '2026' })[0].id).toBe('S14');
    const dates = filterNotices().map((n) => n.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});
