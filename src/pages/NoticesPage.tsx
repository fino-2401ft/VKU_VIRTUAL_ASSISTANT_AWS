import { Link, useSearchParams, useParams } from 'react-router-dom';
import { notices, noticeCategories } from '../data/content';
import { filterNotices, isExpired, formatDate } from '../lib/filters';
import { EmptyState, PageIntro, SourceLink } from '../components/ui';
import { NotFoundPage } from './FoundationPages';

export default function NoticesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const rawCategory = params.get('loai') || '';
  const category = rawCategory in noticeCategories ? rawCategory : '';
  const year = params.get('nam') === '2026' ? '2026' : '';
  const found = filterNotices({ query, category, year });
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }
  return (
    <>
      <PageIntro
        eyebrow="Thông báo học vụ"
        title="Tìm thông tin bạn cần."
        description="Tóm tắt từ cổng đào tạo VKU. Dữ liệu biên tập tĩnh, kiểm chứng ngày 03/11/2026; không tự động cập nhật."
      />
      <section className="container section">
        <div className="filter-panel notice-filters">
          <label>
            Từ khóa
            <input
              type="search"
              value={query}
              placeholder="Tìm thông báo không dấu…"
              onChange={(e) => update('q', e.target.value)}
            />
          </label>
          <label>
            Loại thông báo
            <select value={category} onChange={(e) => update('loai', e.target.value)}>
              <option value="">Tất cả loại</option>
              {Object.entries(noticeCategories).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label>
            Năm đăng
            <select value={year} onChange={(e) => update('nam', e.target.value)}>
              <option value="">Tất cả năm</option>
              <option value="2026">2026</option>
            </select>
          </label>
        </div>
        <div className="results-bar">
          <p role="status">{found.length} thông báo · Mới đến cũ</p>
          <button className="text-button" onClick={() => setParams({})}>
            Xóa bộ lọc
          </button>
        </div>
        {found.length ? (
          <div className="notice-list">
            {found.map((n) => (
              <article key={n.id}>
                <div>
                  <span className="tag">{noticeCategories[n.category]}</span>
                  <time dateTime={n.publishedAt}>{formatDate(n.publishedAt)}</time>
                </div>
                <h2>
                  <Link to={`/thong-bao/${n.slug}`}>{n.title}</Link>
                </h2>
                <p>{n.summary}</p>
                <span className="small muted">
                  Nguồn VKU · {isExpired(n.validUntil) ? 'Đã qua thời hạn' : 'Thông tin tham khảo'}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="Không có thông báo phù hợp">Thử từ khóa hoặc bộ lọc khác.</EmptyState>
        )}
      </section>
    </>
  );
}
export function NoticeDetailPage() {
  const { slug } = useParams();
  const notice = notices.find((n) => n.slug === slug);
  if (!notice) return <NotFoundPage />;
  return (
    <>
      <PageIntro
        eyebrow={`Thông báo · ${noticeCategories[notice.category]}`}
        title={notice.title}
        description={`Đăng ${formatDate(notice.publishedAt)} · Năm học ${notice.academicYear} · Nguồn VKU`}
      />
      <section className="container section">
        <div className="reading-panel">
          <Link className="text-link" to="/thong-bao">
            ← Tất cả thông báo
          </Link>
          <div className="info-banner">
            {isExpired(notice.validUntil)
              ? `Đã qua thời hạn (${formatDate(notice.validUntil!)}). Chỉ để tham khảo.`
              : 'Thông tin tham khảo. Hãy kiểm tra thời hạn và đối tượng trong văn bản gốc.'}
          </div>
          <h2>Tóm tắt thông báo</h2>
          <p className="lead">{notice.summary}</p>
          <p>
            Nhóm demo chỉ tóm tắt nội dung, không tiếp nhận hồ sơ, hiển thị điểm hoặc tái bản danh
            sách sinh viên.
          </p>
          <p className="small muted">
            Kiểm chứng nguồn ngày 03/11/2026. Nội dung không tự động cập nhật.
          </p>
          <SourceLink href={notice.sourceUrl}>Xem văn bản gốc</SourceLink>
        </div>
      </section>
    </>
  );
}
