import { useState } from 'react';
import faculty from '../data/faculty.json';
import { normalize } from '../lib/search';
import { SourceLink } from './ui';

export default function FacultyDirectory() {
  const [query, setQuery] = useState('');
  const [rank, setRank] = useState('');
  const [page, setPage] = useState(1);
  const found = faculty.filter(
    (f) =>
      normalize(f.name).includes(normalize(query)) &&
      (!rank ||
        (rank === 'pgs'
          ? f.name.startsWith('PGS.')
          : rank === 'ts'
            ? /^(TS\.|TS |Tiến sĩ)/.test(f.name)
            : /^(ThS\.|ThS |Thạc sĩ)/.test(f.name))),
  );
  const pageCount = Math.max(1, Math.ceil(found.length / 12));
  const safePage = Math.min(page, pageCount);
  return (
    <section className="related-section">
      <p className="eyebrow">ĐỘI NGŨ GIẢNG VIÊN</p>
      <h2>Tra cứu danh bạ chuyên môn.</h2>
      <p className="lead">
        Tên và học hàm/học vị được biên tập từ bản trích xuất danh bạ trên cổng đào tạo. Các mục
        trong danh bạ không được dùng làm thống kê nhân sự cơ hữu hay xác nhận chức vụ hiện nhiệm.
      </p>
      <div className="filter-panel notice-filters">
        <label>
          Tìm giảng viên
          <input
            type="search"
            value={query}
            placeholder="Nhập tên có hoặc không dấu"
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </label>
        <label>
          Học hàm / học vị
          <select
            value={rank}
            onChange={(e) => {
              setRank(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Tất cả</option>
            <option value="pgs">Phó giáo sư</option>
            <option value="ts">Tiến sĩ</option>
            <option value="ths">Thạc sĩ</option>
          </select>
        </label>
      </div>
      <p className="results-bar" role="status">
        {found.length} kết quả · Trang {safePage}/{pageCount}
      </p>
      <div className="faculty-grid">
        {found.slice((safePage - 1) * 12, safePage * 12).map((f) => (
          <article className="faculty-card" key={f.name}>
            <span className="tag">{f.role}</span>
            <h3>{f.name.replace(/\.(?=\S)/g, '. ')}</h3>
            {f.academicProfileUrl && (
              <SourceLink href={f.academicProfileUrl}>Hồ sơ khoa học</SourceLink>
            )}
          </article>
        ))}
      </div>
      {!found.length && (
        <p className="empty-state">Không tìm thấy giảng viên. Thử tên khác hoặc đổi bộ lọc.</p>
      )}
      <nav className="pagination" aria-label="Phân trang giảng viên">
        <button
          className="button button-secondary"
          disabled={safePage === 1}
          onClick={() => setPage(safePage - 1)}
        >
          Trang trước
        </button>
        <span>
          Trang {safePage} / {pageCount}
        </span>
        <button
          className="button button-secondary"
          disabled={safePage === pageCount}
          onClick={() => setPage(safePage + 1)}
        >
          Trang sau
        </button>
      </nav>
      <p className="small muted">
        Nguồn: bản trích xuất danh bạ trên cổng đào tạo, biên tập ngày 03/11/2026. Chỉ hiển thị
        thông tin chuyên môn; không hiển thị tài khoản sinh viên hoặc liên hệ cá nhân.
      </p>
    </section>
  );
}
