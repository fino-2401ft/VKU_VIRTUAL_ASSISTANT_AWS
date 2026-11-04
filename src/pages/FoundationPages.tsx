import { Link, useLocation } from 'react-router-dom';
import { contentRoutes } from '../data/routes';
import { ActionLink, EmptyState, FaqList, PageIntro, SourceLink } from '../components/ui';
import { official } from '../data/site';
import DemoContactForm from '../components/DemoContactForm';

export function ContentPage() {
  const { pathname } = useLocation();
  const page = contentRoutes.find((p) => p.path === pathname);
  if (!page) return <NotFoundPage />;
  return (
    <>
      <PageIntro {...page} />
      <section className="section container">
        <div className="reading-panel">
          <p className="eyebrow">THÔNG TIN CÓ NGUỒN · BIÊN TẬP 03.11.2026</p>
          <h2>{page.eyebrow}</h2>
          <p className="lead">{page.body}</p>
          <SourceLink href={page.source} />
          <div className="info-banner">
            Website demo học tập, không đại diện VKU. Dữ liệu và bố cục chuyên mục đang được triển
            khai theo từng giai đoạn.
          </div>
          <div className="actions">
            <ActionLink to="/nganh-dao-tao">Khám phá ngành học</ActionLink>
            <Link className="text-link" to="/thong-bao">
              Tra cứu thông báo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="Hỗ trợ bạn"
        title="Những điều bạn muốn biết."
        description="Hỏi đáp cơ bản để sử dụng thông tin đúng nguồn và hiểu rõ giới hạn bản demo."
      />
      <section className="container section reading-panel">
        <FaqList />
      </section>
    </>
  );
}
export function PendingDemoPage() {
  return (
    <>
      <PageIntro
        eyebrow="Trải nghiệm demo"
        title="Biểu mẫu đang được triển khai."
        description="Đây không phải kênh tiếp nhận tư vấn, hồ sơ hoặc đặt lịch của VKU."
      />
      <section className="container section">
        <div className="reading-panel">
          <h2>Không có thông tin nào được thu thập.</h2>
          <p className="lead">
            Trải nghiệm minh họa đang được chuẩn bị. Hiện chưa có biểu mẫu nhập dữ liệu hoặc lịch
            hẹn thực tế.
          </p>
          <SourceLink href={official.admissions}>Tra cứu kênh tuyển sinh chính thức</SourceLink>
        </div>
      </section>
    </>
  );
}
export function ContactFoundationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Liên hệ"
        title="Kết nối đúng kênh thông tin."
        description="Website demo học tập, không nhận hoặc chuyển tiếp tin nhắn đến VKU."
      />
      <section className="container section">
        <div className="reading-panel">
          <h2>Trụ sở nhà trường</h2>
          <p className="lead">470 Trần Đại Nghĩa, phường Ngũ Hành Sơn, TP. Đà Nẵng.</p>
          <div className="contact-grid">
            <article className="faculty-card">
              <h3>Văn phòng nhà trường</h3>
              <p>Thông tin chung và đầu mối liên hệ.</p>
              <p>
                <a href="tel:02363667117">0236 3 667 117</a>
                <br />
                <a href="mailto:info@vku.udn.vn">info@vku.udn.vn</a>
              </p>
              <SourceLink href="https://vku.udn.vn/vi/gioi-thieu/">
                Nguồn liên hệ nhà trường
              </SourceLink>
            </article>
            <article className="faculty-card">
              <h3>Tuyển sinh</h3>
              <p>Ngành học, phương thức và chính sách đầu vào.</p>
              <p>
                <a href="tel:02363667113">0236 3 667 113</a>
                <br />
                <a href="mailto:tuyensinh@vku.udn.vn">tuyensinh@vku.udn.vn</a>
              </p>
              <SourceLink href={official.admissions}>Nguồn liên hệ tuyển sinh</SourceLink>
            </article>
            <article className="faculty-card">
              <h3>Đào tạo</h3>
              <p>Thông báo học vụ và kênh thông tin đào tạo.</p>
              <p>
                <a href="tel:02366552688">0236 6 552 688</a>
                <br />
                <a href="mailto:daotao@vku.udn.vn">daotao@vku.udn.vn</a>
              </p>
              <SourceLink href={official.training}>Nguồn liên hệ đào tạo</SourceLink>
            </article>
          </div>
          <div className="actions">
            <SourceLink href="https://www.google.com/maps/search/?api=1&query=Truong+Dai+hoc+Cong+nghe+Thong+tin+va+Truyen+thong+Viet+Han+470+Tran+Dai+Nghia+Da+Nang">
              Mở tìm kiếm bản đồ
            </SourceLink>
            <SourceLink href={official.admissions}>Kênh tuyển sinh chính thức</SourceLink>
          </div>
          <DemoContactForm />
        </div>
      </section>
    </>
  );
}
export function NotFoundPage() {
  return (
    <>
      <PageIntro
        eyebrow="404 · Không tìm thấy"
        title="Có lẽ bạn cần một hướng đi khác."
        description="Đường dẫn không tồn tại hoặc chưa có nội dung được duyệt."
      />
      <section className="container section">
        <EmptyState title="Tiếp tục khám phá VKU">
          <Link to="/nganh-dao-tao">Tìm ngành học</Link> hoặc{' '}
          <Link to="/thong-bao">tra cứu thông báo</Link>.
        </EmptyState>
      </section>
    </>
  );
}
