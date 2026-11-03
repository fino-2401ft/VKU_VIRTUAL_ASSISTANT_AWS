import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdmissionsPages from '../pages/AdmissionsPages';
import { scholarships, tuitionRates, tuitionCohorts, methods } from '../data/admissions';
import faculty from '../data/faculty.json';

describe('substantive sourced content', () => {
  it('contains historical policy amounts and nulls rather than treating missing rates as free', () => {
    expect(scholarships.map((s) => s.amount)).toEqual([70000000, 50000000, 40000000, 25000000]);
    expect(
      tuitionRates.find((r) => r.id === 'engineering')?.rates[tuitionCohorts.indexOf(2025)],
    ).toBe(563700);
    expect(tuitionRates.find((r) => r.id === 'fintech')?.rates[0]).toBeNull();
    expect(methods.map((m) => m.code)).toEqual(['301', '407', '402']);
  });
  it('renders fee values and scholarship conditions without leaving the site', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/tuyen-sinh/hoc-phi-hoc-bong']}>
        <AdmissionsPages />
      </MemoryRouter>,
    );
    expect(within(screen.getByRole('table')).getByText(/563.700/)).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('Khóa tuyển sinh'), '2020');
    expect(within(screen.getByRole('table')).getByText(/602.200/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '70 triệu đồng' })).toBeInTheDocument();
    expect(
      screen.getByText(/không quy đổi ra tiền mặt và không được rút khi nghỉ học/),
    ).toBeInTheDocument();
  });
  it('exports only academic directory fields, never private account/contact fields', () => {
    expect(faculty.length).toBeGreaterThan(0);
    for (const person of faculty) {
      expect(Object.keys(person).sort()).toEqual([
        'academicProfileUrl',
        'checkedAt',
        'name',
        'role',
        'sourceKind',
      ]);
      if (person.academicProfileUrl)
        expect(person.academicProfileUrl).toMatch(/^https?:\/\/scv\.udn\.vn\/[a-zA-Z0-9._-]+\/?$/);
    }
    expect(faculty.some((person) => JSON.stringify(person).includes('@'))).toBe(false);
    expect(faculty.some((person) => JSON.stringify(person).includes('uploads/sinhvien'))).toBe(
      false,
    );
  });
});
