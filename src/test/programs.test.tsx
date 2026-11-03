import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProgramsPage from '../pages/ProgramsPage';

describe('program explorer', () => {
  it('searches, filters, resets and exposes empty state with labeled controls', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProgramsPage />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole('article')).toHaveLength(22);
    await user.type(screen.getByLabelText('Tìm ngành học'), 'tri tue nhan tao');
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Truyền thông & thiết kế' }));
    expect(
      screen.getByRole('heading', { name: 'Chưa tìm thấy ngành phù hợp' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Xóa bộ lọc' }));
    expect(screen.getAllByRole('article')).toHaveLength(22);
  });
});
