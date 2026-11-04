import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { PageMeta } from '../components/ui';
import { notices, programs, type Notice } from '../data/content';
import { formatDate } from '../lib/filters';

function NoticeRows({ items }: { items: Notice[] }) {
  return (
    <ul className="portal-rows">
      {items.map((n) => (
        <li key={n.id}>
          <Link to={`/thong-bao/${n.slug}`}>{n.title}</Link>
          <time dateTime={n.publishedAt}> - {formatDate(n.publishedAt)}</time>
        </li>
      ))}
    </ul>
  );
}

function NoticePanel({
  title,
  items,
  category = '',
}: {
  title: string;
  items: Notice[];
  category?: string;
}) {
  return (
    <section className="portal-panel">
      <h2>{title}</h2>
      <NoticeRows items={items} />
      <Link className="portal-more" to={`/thong-bao${category ? `?loai=${category}` : ''}`}>
        Xem thêm »
      </Link>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Thông tin đào tạo & tuyển sinh"
        description="Tra cứu thông báo học vụ, ngành đào tạo và thông tin tuyển sinh VKU. Bản demo học tập, dữ liệu tham khảo năm 2026."
      />
      <h1 className="sr-only">Thông tin đào tạo & tuyển sinh VKU</h1>
      <div className="container portal-layout">
        <aside className="portal-sidebar" aria-label="Tiện ích và thông tin nổi bật">
          <a
            className="portal-image-link"
            href="https://elearning2.vku.udn.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/portal/icon-elearning.jpg"
              width="555"
              height="300"
              alt="E-learning — Hệ thống học trực tuyến VKU (mở tab mới)"
            />
          </a>
          <a
            className="portal-image-link"
            href="https://daotao.vku.udn.vn/tra-cuu-van-bang-chung-chi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/portal/tracuuvanbang.jpg"
              width="392"
              height="120"
              alt="Tra cứu văn bằng, chứng chỉ tại cổng đào tạo VKU (mở tab mới)"
            />
          </a>
          <a
            className="portal-image-link"
            href="http://elib.vku.udn.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/portal/elib.jpg"
              width="394"
              height="122"
              alt="Thư viện tài nguyên số VKU (mở tab mới)"
            />
          </a>
          <a
            className="portal-image-link"
            href="https://daotao.vku.udn.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/portal/dktc.png"
              width="392"
              height="129"
              alt="Đăng ký tín chỉ — truy cập cổng đào tạo chính thức (mở tab mới)"
            />
          </a>
          <section className="sidebar-highlights">
            <h2>TIN NỔI BẬT</h2>
            <NoticeRows items={notices} />
            <Link className="portal-more" to="/thong-bao">
              Xem thêm »
            </Link>
          </section>
          <section className="sidebar-directory">
            <h2>THÔNG TIN HỮU ÍCH</h2>
            <Link to="/gioi-thieu">Tìm hiểu về VKU</Link>
            <Link to="/gioi-thieu/lanh-dao">Lãnh đạo & đội ngũ</Link>
            <Link to="/faq">Câu hỏi thường gặp</Link>
            <Link to="/lien-he">Thông tin liên hệ</Link>
          </section>
        </aside>
        <div className="portal-content">
          <NoticePanel title="Thông báo từ Phòng đào tạo" items={notices} />
          <NoticePanel
            title="Thông báo về Kế hoạch Tài chính"
            items={notices.filter((n) => n.category === 'tai-vu')}
            category="tai-vu"
          />
          <NoticePanel
            title="Thông báo từ Phòng Khảo thí và Đảm bảo chất lượng"
            items={notices.filter((n) => n.category === 'khao-thi')}
            category="khao-thi"
          />
          <NoticePanel
            title="Thông báo về Công tác sinh viên"
            items={notices.filter((n) => n.category === 'cong-tac-sinh-vien')}
            category="cong-tac-sinh-vien"
          />
          <section className="portal-panel">
            <h2>Chương trình đào tạo</h2>
            <ul className="portal-rows program-rows">
              {programs.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <Link to={`/nganh-dao-tao/${p.slug}`}>{p.name}</Link>
                  <span className="portal-meta">
                    {' '}
                    — {p.degree === 'ky-su' ? 'Kỹ sư' : 'Cử nhân'} ·{' '}
                    {String(p.durationYears).replace('.', ',')} năm
                  </span>
                </li>
              ))}
            </ul>
            <Link className="portal-more" to="/nganh-dao-tao">
              Tất cả ngành học »
            </Link>
          </section>
          <div className="portal-bottom-grid">
            <section className="portal-panel">
              <h2>Thông tin tuyển sinh</h2>
              <ul className="portal-rows">
                <li>
                  <Link to="/tuyen-sinh">Tìm hiểu tuyển sinh</Link>
                </li>
                <li>
                  <Link to="/tuyen-sinh/phuong-thuc">Phương thức & hồ sơ tuyển sinh 2026</Link>
                </li>
                <li>
                  <Link to="/tuyen-sinh/hoc-phi-hoc-bong">Học phí & học bổng</Link>
                </li>
                <li>
                  <Link to="/tuyen-sinh/tu-van-demo">Tư vấn tuyển sinh demo</Link>
                </li>
              </ul>
            </section>
            <section className="portal-panel">
              <h2>Học tập & kết nối</h2>
              <ul className="portal-rows">
                <li>
                  <Link to="/doi-song-sinh-vien">Đời sống sinh viên</Link>
                </li>
                <li>
                  <Link to="/nghien-cuu-hop-tac">Nghiên cứu & hợp tác</Link>
                </li>
                <li>
                  <Link to="/campus-tour-demo">Campus Tour demo</Link>
                </li>
                <li>
                  <Link to="/faq">Giải đáp câu hỏi thường gặp</Link>
                </li>
              </ul>
            </section>
          </div>
          <p className="portal-data-note">
            <BookOpen size={16} aria-hidden="true" /> Dữ liệu tham khảo năm 2026, biên tập từ nguồn
            VKU; không tự động cập nhật.
          </p>
        </div>
      </div>
    </>
  );
}
