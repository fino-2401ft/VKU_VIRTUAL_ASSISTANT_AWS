import { useSearchParams, Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { programs, programGroups, type Program } from '../data/content';
import { filterPrograms } from '../lib/filters';
import { EmptyState, PageIntro, SourceLink } from '../components/ui';
import { official } from '../data/site';

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="program-card">
      <div className="card-top">
        <span className="tag">{programGroups[program.group]}</span>
        <span>{program.id}</span>
      </div>
      <h2>
        <Link to={`/nganh-dao-tao/${program.slug}`}>{program.name}</Link>
      </h2>
      <p className="muted">
        {program.degree === 'ky-su' ? 'Kỹ sư' : 'Cử nhân'} ·{' '}
        {String(program.durationYears).replace('.', ',')} năm
        <br />
        Mã xét tuyển: <strong>{program.admissionCode}</strong>
      </p>
      <div className="program-card-bottom">
        <span>
          Chỉ tiêu {program.admissionYear}: <strong>{program.quota2026}</strong>
          <small>{program.discipline}</small>
        </span>
        <Link
          className="icon-button"
          to={`/nganh-dao-tao/${program.slug}`}
          aria-label={`Xem ${program.name}`}
        >
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
export function ProgramProvenance() {
  return (
    <aside className="info-banner">
      <strong>22 ngành/chuyên ngành · 1.500 chỉ tiêu năm 2026</strong>
      <p>
        Chương trình cử nhân 4 năm, kỹ sư 4,5 năm theo danh mục tuyển sinh đã công bố. Đây là dữ
        liệu tham khảo của năm 2026, không phải thông báo mở đăng ký.
      </p>
      <SourceLink href={official.programs}>Nguồn danh mục VKU · Kiểm tra 03/11/2026</SourceLink>
    </aside>
  );
}
export default function ProgramsPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const rawGroup = params.get('nhom') || '';
  const group = rawGroup in programGroups ? rawGroup : '';
  const sort = params.get('sap-xep') === 'quota' ? 'quota' : 'name';
  const rawDegree = params.get('bang') || '';
  const degree = ['ky-su', 'cu-nhan'].includes(rawDegree) ? rawDegree : '';
  const found = filterPrograms({ query, group, degree, sort });
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  }
  return (
    <>
      <PageIntro
        eyebrow="Ngành đào tạo"
        title="Tìm một hướng đi của riêng bạn."
        description="Khám phá danh mục ngành theo lĩnh vực bạn quan tâm. Tìm kiếm có hoặc không dấu tiếng Việt."
      />
      <section className="section container">
        <ProgramProvenance />
        <div className="filter-panel">
          <div className="search-field">
            <label htmlFor="program-search">Tìm ngành học</label>
            <div>
              <Search size={20} aria-hidden="true" />
              <input
                id="program-search"
                type="search"
                value={query}
                onChange={(e) => update('q', e.target.value)}
                placeholder="Ví dụ: trí tuệ nhân tạo"
              />
            </div>
          </div>
          <div className="filter-row">
            <fieldset className="filter-chips">
              <legend>Nhóm lĩnh vực</legend>
              <button aria-pressed={!group} onClick={() => update('nhom', '')}>
                Tất cả
              </button>
              {Object.entries(programGroups).map(([key, label]) => (
                <button key={key} aria-pressed={group === key} onClick={() => update('nhom', key)}>
                  {label}
                </button>
              ))}
            </fieldset>
            <div className="select-row">
              <label>
                Bằng cấp
                <select value={degree} onChange={(e) => update('bang', e.target.value)}>
                  <option value="">Tất cả bằng cấp</option>
                  <option value="ky-su">Kỹ sư · 4,5 năm</option>
                  <option value="cu-nhan">Cử nhân · 4 năm</option>
                </select>
              </label>
              <label>
                Năm dữ liệu
                <select aria-label="Năm dữ liệu" value="2026" onChange={() => {}}>
                  <option value="2026">Tham khảo 2026</option>
                </select>
              </label>
              <label>
                Sắp xếp
                <select value={sort} onChange={(e) => update('sap-xep', e.target.value)}>
                  <option value="name">Tên ngành A–Z</option>
                  <option value="quota">Chỉ tiêu 2026 giảm dần</option>
                </select>
              </label>
            </div>
          </div>
          <p className="small muted">
            Lọc đồng thời theo tên ngành, lĩnh vực và bằng cấp. Mã xét tuyển và tổ hợp dự kiến có
            trong trang chi tiết.
          </p>
        </div>
        <div className="results-bar">
          <p role="status" aria-live="polite">
            Tìm thấy <strong>{found.length}</strong> / {programs.length} lựa chọn
          </p>
          <button className="text-button" onClick={() => setParams({})}>
            Xóa bộ lọc
          </button>
        </div>
        {found.length ? (
          <div className="program-grid">
            {found.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        ) : (
          <EmptyState title="Chưa tìm thấy ngành phù hợp">
            Thử từ khóa khác hoặc dùng nút “Xóa bộ lọc” để xem lại toàn bộ danh mục.
          </EmptyState>
        )}
      </section>
    </>
  );
}
