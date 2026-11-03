import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActionLink, FaqList, PageIntro, SectionHeading, SourceLink } from '../components/ui';
import { contentRoutes } from '../data/routes';
import {
  sourceUrls,
  methods,
  documentGroups,
  scholarships,
  scholarshipConditions,
  tuitionCohorts,
  tuitionRates,
  formatVnd,
} from '../data/admissions';
import { NotFoundPage } from './FoundationPages';

function TuitionSection() {
  const [cohort, setCohort] = useState(2025);
  const [group, setGroup] = useState('');
  const index = tuitionCohorts.indexOf(cohort);
  const rows = tuitionRates.filter((r) => !group || r.id === group);
  return (
    <>
      <SectionHeading
        eyebrow="HỌC PHÍ · HK1 NĂM HỌC 2026–2027"
        title="Tra cứu đơn giá theo khóa học."
      />
      <p className="lead">
        Áp dụng các khóa 2020–2025 theo thông báo ngày 07/10/2026. Đơn vị: đồng/tín chỉ.
      </p>
      <div className="filter-panel select-row">
        <label>
          Khóa tuyển sinh
          <select value={cohort} onChange={(e) => setCohort(Number(e.target.value))}>
            {tuitionCohorts.map((y) => (
              <option key={y} value={y}>
                Khóa {y}
              </option>
            ))}
          </select>
        </label>
        <label>
          Nhóm chương trình
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="">Tất cả chương trình</option>
            {tuitionRates.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="responsive-table"
        role="region"
        aria-label="Bảng đơn giá học phí theo khóa"
        tabIndex={0}
      >
        <table className="content-table">
          <caption>Học phí khóa {cohort} · HK1 2026–2027</caption>
          <thead>
            <tr>
              <th scope="col">Nhóm ngành / hệ đào tạo</th>
              <th scope="col">Mã nhóm ngành</th>
              <th scope="col">Đơn giá mỗi tín chỉ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <th scope="row">{r.title}</th>
                <td>{r.code}</td>
                <td>
                  {r.rates[index] === null
                    ? 'Không có mức thu trong văn bản'
                    : formatVnd(r.rates[index]!)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="info-banner">
        <strong>Đã qua thời hạn 30/10/2026</strong>
        <p>
          Bảng trên là đơn giá tín chỉ, không phải học phí trọn năm. Học phí học kỳ phụ thuộc số tín
          chỉ thực học. Ô không có mức thu không có nghĩa là miễn phí. Văn bản áp dụng các khóa 2025
          trở về trước, không suy rộng cho khóa khác.
        </p>
      </div>
      <div className="detail-grid">
        <article>
          <h3>Các học phần có quy định riêng</h3>
          <ul className="check-list">
            <li>
              Giáo dục quốc phòng và an ninh: 8 tín chỉ, 200.000 đồng/tín chỉ, tổng 1.600.000
              đồng/sinh viên.
            </li>
            <li>Giáo dục thể chất: 4 tín chỉ, đơn giá theo chương trình đại học chính quy.</li>
            <li>
              Sinh viên quốc tế áp dụng mức học phí như sinh viên Việt Nam theo mục 1.1 của thông
              báo.
            </li>
          </ul>
        </article>
        <aside className="detail-facts">
          <h3>Hỗ trợ về học phí</h3>
          <p>Phòng Kế hoạch – Tài chính</p>
          <p>
            <a href="tel:02363667114">0236 3667 114</a>
            <br />
            <a href="mailto:kehoachtaichinh@vku.udn.vn">kehoachtaichinh@vku.udn.vn</a>
          </p>
          <p className="small muted">
            Liên hệ trong giờ hành chính. Website demo không thu hoặc nhận thanh toán.
          </p>
        </aside>
      </div>
      <SourceLink href={sourceUrls.tuition}>Nguồn bảng học phí & phạm vi áp dụng</SourceLink>
      <section className="related-section">
        <SectionHeading
          eyebrow="HỌC BỔNG ĐẦU VÀO · KHÓA TUYỂN SINH 2026"
          title="Mức hỗ trợ và điều kiện nhận."
        />
        <div className="scholarship-grid">
          {scholarships.map((s) => (
            <article className="scholarship-card" key={s.title}>
              <p className="eyebrow">{s.title}</p>
              <h3>
                {s.amount / 1000000}
                <span> triệu đồng</span>
              </h3>
              <p>Tương đương 100% học phí {s.semesters} học kỳ đầu theo thông báo.</p>
            </article>
          ))}
        </div>
        <h3 className="related-section">Cần biết trước khi xét học bổng</h3>
        <ul className="check-list">
          {scholarshipConditions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="muted">
          Chính sách này dành cho khóa tuyển sinh 2026; không tự áp dụng cho năm khác. Xét cấp theo
          xếp hạng và quyết định của trường, không phải quyền lợi mặc định khi nhập học.
        </p>
        <SourceLink href={sourceUrls.scholarships}>Thông báo học bổng ngày 01/06/2026</SourceLink>
      </section>
    </>
  );
}

export default function AdmissionsPages() {
  const { pathname } = useLocation();
  const page = contentRoutes.find((p) => p.path === pathname);
  if (!page) return <NotFoundPage />;
  const isTuition = pathname.endsWith('/hoc-phi-hoc-bong');
  const isMethods = pathname.endsWith('/phuong-thuc');
  return (
    <>
      <PageIntro {...page} />
      <div className="container section">
        <nav className="subnav" aria-label="Thông tin tuyển sinh">
          <Link to="/tuyen-sinh" aria-current={pathname === '/tuyen-sinh' ? 'page' : undefined}>
            Tổng quan 2026
          </Link>
          <Link to="/tuyen-sinh/phuong-thuc" aria-current={isMethods ? 'page' : undefined}>
            Phương thức & hồ sơ
          </Link>
          <Link to="/tuyen-sinh/hoc-phi-hoc-bong" aria-current={isTuition ? 'page' : undefined}>
            Học phí & học bổng
          </Link>
        </nav>
        <p className="archive-note">
          Thông tin có năm áp dụng · Dữ liệu tuyển sinh 2026 được lưu để tham khảo, không phải đợt
          đăng ký đang mở.
        </p>
        {isTuition ? (
          <TuitionSection />
        ) : (
          <>
            {!isMethods && (
              <div className="admission-stats">
                <div>
                  <strong>1.500</strong>
                  <span>Chỉ tiêu năm 2026</span>
                </div>
                <div>
                  <strong>22</strong>
                  <span>Ngành / chuyên ngành</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>Phương thức xét tuyển</span>
                </div>
              </div>
            )}
            <SectionHeading
              eyebrow="TUYỂN SINH ĐẠI HỌC CHÍNH QUY 2026"
              title={
                isMethods
                  ? 'Đối chiếu điều kiện trước mọi thủ tục.'
                  : 'Chọn phương thức phù hợp với bạn.'
              }
            />
            <div className="method-grid">
              {methods.map((m) => (
                <article className="method-card" key={m.code}>
                  <span className="tag">MÃ PHƯƠNG THỨC {m.code}</span>
                  <h3>{m.name}</h3>
                  <p>{m.summary}</p>
                  <ul className="check-list">
                    {m.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <SourceLink href={m.sourceUrl}>{m.sourceLabel}</SourceLink>
                </article>
              ))}
            </div>
            <section className="related-section">
              <SectionHeading
                eyebrow="HỒ SƠ & MỐC THỜI GIAN ĐÃ CÔNG BỐ"
                title="Chuẩn bị theo đúng nhóm thí sinh."
              />
              <p className="lead">
                Thông báo ngày 11/05/2026 mở nhận hồ sơ từ 08:00 cùng ngày và quy định ba nhóm sau.
                Các hạn dưới đây đều đã qua.
              </p>
              <div className="steps-grid">
                {documentGroups.map((g) => (
                  <article className="step-card" key={g.title}>
                    <span className="tag">ĐÃ QUA THỜI HẠN</span>
                    <h3>{g.title}</h3>
                    <p>{g.description}</p>
                    <p>
                      <strong>Hạn nộp:</strong>
                      <br />
                      <time dateTime={g.iso}>{g.deadline}</time>
                    </p>
                  </article>
                ))}
              </div>
              <p className="info-banner">
                Đợt công bố nêu hai cách nộp: trực tuyến tại hệ thống xét tuyển VKU hoặc trực tiếp ở
                Bộ phận tuyển sinh. Website này chỉ trình bày thông tin lịch sử; không thu hồ sơ,
                nhận giấy tờ hoặc mở lại đợt đăng ký.
              </p>
              <SourceLink href={sourceUrls.documents}>Nguồn yêu cầu hồ sơ và thời hạn</SourceLink>
            </section>
            <section className="related-section">
              <SectionHeading
                eyebrow="TIẾP TỤC TÌM HIỂU"
                title="Từ ngành học đến chi phí học tập."
              />
              <div className="actions">
                <ActionLink to="/nganh-dao-tao">Xem 22 ngành đào tạo</ActionLink>
                {!isMethods && (
                  <ActionLink to="/tuyen-sinh/phuong-thuc" secondary>
                    Tìm hiểu phương thức
                  </ActionLink>
                )}
                <ActionLink to="/tuyen-sinh/hoc-phi-hoc-bong" secondary>
                  Học phí & học bổng
                </ActionLink>
              </div>
            </section>
          </>
        )}
        <section className="related-section">
          <SectionHeading eyebrow="GIẢI ĐÁP" title="Thông tin hữu ích trước khi lựa chọn" />
          <FaqList limit={4} />
        </section>
      </div>
    </>
  );
}
