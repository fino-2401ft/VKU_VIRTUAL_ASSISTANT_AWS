import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Code2,
  Cpu,
  Globe2,
  Layers3,
  Lightbulb,
  MoveUpRight,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActionLink, FaqList, PageMeta, SectionHeading, SourceLink } from '../components/ui';
import { official } from '../data/site';

const fields = [
  {
    icon: Code2,
    title: 'Công nghệ phần mềm & hệ thống',
    text: 'Khám phá các lựa chọn về công nghệ thông tin và phần mềm.',
    query: 'software',
    number: '01',
  },
  {
    icon: Sparkles,
    title: 'Trí tuệ nhân tạo & dữ liệu',
    text: 'Tìm hiểu các hướng học tập về AI, phân tích và dữ liệu.',
    query: 'ai-data',
    number: '02',
  },
  {
    icon: Cpu,
    title: 'Phần cứng & bán dẫn',
    text: 'Tiếp cận các lựa chọn về máy tính và công nghệ vi mạch.',
    query: 'hardware',
    number: '03',
  },
  {
    icon: Layers3,
    title: 'Truyền thông & thiết kế',
    text: 'Khám phá giao điểm của công nghệ, nội dung và sáng tạo.',
    query: 'media',
    number: '04',
  },
  {
    icon: Globe2,
    title: 'Kinh tế số & quản trị',
    text: 'Tìm hướng đi trong môi trường kinh doanh và chuyển đổi số.',
    query: 'digital-business',
    number: '05',
  },
];

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Khám phá VKU"
        description="Tìm ngành học, thông tin tuyển sinh tham khảo 2026 và thông báo có nguồn. Website demo học tập độc lập, không đại diện VKU."
      />
      <section className="hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="eyebrow light">
              <span />
              ĐẠI HỌC ĐÀ NẴNG · VKU
            </p>
            <h1>
              Khởi đầu
              <br />
              hành trình <span>công nghệ.</span>
            </h1>
            <p className="hero-description">
              Khám phá Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn. Tìm ngành học,
              kết nối thông tin, mở lối cho lựa chọn của bạn.
            </p>
            <div className="actions">
              <ActionLink to="/nganh-dao-tao">Khám phá ngành học</ActionLink>
              <Link className="hero-secondary" to="/tuyen-sinh">
                Tìm hiểu tuyển sinh
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
            <p className="hero-note">
              Thông tin tuyển sinh 2026 mang tính tham khảo.
              <br />
              Cập nhật mới nhất tại cổng chính thức.
            </p>
            <a className="scroll-cue" href="#discover">
              <ArrowDown size={16} aria-hidden="true" />
              CÙNG KHÁM PHÁ VKU
            </a>
          </div>
          <figure className="hero-visual">
            <div className="visual-topline">
              <span>HUMAN-CENTERED DIGITAL CAMPUS</span>
              <MoveUpRight size={22} aria-hidden="true" />
            </div>
            <img
              src="/assets/campus-illustration.svg"
              width="960"
              height="820"
              fetchPriority="high"
              alt="Minh họa vector một khuôn viên đại học, không phải ảnh hoặc kiến trúc thật của VKU"
            />
            <div className="visual-label">
              <BookOpen size={26} aria-hidden="true" />
              <span>
                Một hành trình học tập.
                <br />
                <strong>Nhiều hướng để khám phá.</strong>
              </span>
            </div>
            <figcaption>Minh họa ý tưởng · Không phải ảnh chụp VKU</figcaption>
          </figure>
        </div>
      </section>
      <section className="trust-strip" aria-label="Thông tin nền">
        <div className="container trust-grid">
          <div>
            <span className="trust-number">2020</span>
            <p>
              Mốc thành lập VKU
              <br />
              <SourceLink href="https://vku.udn.vn/vi/thu-ngo-ky-niem-05-nam-thanh-lap-truong-dai-hoc-cong-nghe-thong-tin-va-truyen-thong-viet-han-hanh-trinh-22-nam-hinh-thanh-va-phat-trien/">
                Quyết định 15/QĐ-TTg
              </SourceLink>
            </p>
          </div>
          <div>
            <Code2 aria-hidden="true" />
            <p>
              Công nghệ thông tin
              <br />
              <strong>Truyền thông · Kinh tế số</strong>
            </p>
          </div>
          <div>
            <Globe2 aria-hidden="true" />
            <p>
              Thành viên
              <br />
              <strong>Đại học Đà Nẵng</strong>
            </p>
          </div>
        </div>
      </section>
      <section className="section container" id="discover">
        <SectionHeading eyebrow="01 / TÌM HƯỚNG ĐI CỦA BẠN" title="Bạn muốn khám phá lĩnh vực nào?">
          <Link className="text-link" to="/nganh-dao-tao">
            Tất cả ngành học
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </SectionHeading>
        <p className="section-description">
          Bắt đầu từ điều bạn quan tâm. Các nhóm dưới đây giúp bạn định hướng tìm kiếm trong danh
          mục tham khảo năm 2026.
        </p>
        <div className="field-grid">
          {fields.map((f) => (
            <article className="field-card" key={f.title}>
              <div className="card-top">
                <f.icon size={28} aria-hidden="true" />
                <span>{f.number}</span>
              </div>
              <h3>
                <Link to={`/nganh-dao-tao?nhom=${f.query}`}>{f.title}</Link>
              </h3>
              <p>{f.text}</p>
              <ArrowUpRight className="card-arrow" aria-hidden="true" />
            </article>
          ))}
          <article className="field-card field-card-cta">
            <Lightbulb size={30} aria-hidden="true" />
            <h3>Chưa biết bắt đầu từ đâu?</h3>
            <p>Tìm hiểu thông tin và lựa chọn phù hợp với bạn.</p>
            <Link className="text-link" to="/faq">
              Xem câu hỏi thường gặp
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>
      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-art">
            <span className="eyebrow">THE NEXT CHAPTER STARTS WITH YOU</span>
            <div className="giant-vku" aria-hidden="true">
              VKU<span>.</span>
            </div>
            <div className="about-art-bottom">
              <span>
                Con người ở trung tâm.
                <br />
                Công nghệ mở hướng đi.
              </span>
              <MoveUpRight size={38} aria-hidden="true" />
            </div>
          </div>
          <div>
            <p className="eyebrow">02 / VỀ VIỆT – HÀN</p>
            <h2>
              Hiểu về trường.
              <br />
              Vững tin lựa chọn.
            </h2>
            <p className="lead">Một điểm bắt đầu để tìm hiểu VKU trong hệ thống Đại học Đà Nẵng.</p>
            <p>
              VKU theo đuổi triết lý Nhân bản – Phụng sự – Khai phóng, tập trung đào tạo và nghiên
              cứu công nghệ thông tin, truyền thông và kinh tế số. Khám phá 22 ngành/chuyên ngành
              tuyển sinh năm 2026 cùng thông tin bằng cấp, thời lượng và chi phí học tập.
            </p>
            <div className="about-values">
              <span>Học tập</span>
              <span>Kết nối</span>
              <span>Sáng tạo</span>
            </div>
            <p className="small muted">
              Các nhãn định hướng do nhóm demo biên tập, không phải slogan chính thức.
            </p>
            <ActionLink to="/gioi-thieu" secondary>
              Tìm hiểu về VKU
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="03 / TUYỂN SINH THAM KHẢO 2026"
          title="Từng bước đến gần lựa chọn của bạn."
        >
          <SourceLink href={official.admissions}>Cổng tuyển sinh chính thức</SourceLink>
        </SectionHeading>
        <div className="info-banner">
          Dữ liệu tuyển sinh năm 2026. Chưa xác nhận đợt tuyển sinh mới; hãy kiểm tra công bố còn
          hiệu lực tại VKU.
        </div>
        <div className="steps-grid">
          {[
            [
              '01',
              'Khám phá ngành học',
              'Tìm kiếm lĩnh vực phù hợp với điều bạn quan tâm.',
              '/nganh-dao-tao',
            ],
            [
              '02',
              'Đọc phương thức',
              'Xem văn bản tuyển sinh đúng năm và đối tượng.',
              '/tuyen-sinh/phuong-thuc',
            ],
            [
              '03',
              'Đối chiếu nguồn chính thức',
              'Kiểm tra điều kiện, thời hạn trước mọi thủ tục.',
              '/tuyen-sinh',
            ],
          ].map(([n, t, d, to]) => (
            <article className="step-card" key={n}>
              <span className="step-number">{n}</span>
              <h3>
                <Link to={to}>
                  {t}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section campus-section">
        <div className="container">
          <SectionHeading
            eyebrow="04 / KHÔNG GIAN & TRẢI NGHIỆM"
            title="Đại học, hơn cả giảng đường."
          >
            <Link className="text-link" to="/doi-song-sinh-vien">
              Khám phá đời sống
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </SectionHeading>
          <div className="campus-grid">
            {[
              [
                'Không gian học tập',
                'Tìm hiểu campus, thư viện và khu thực hành.',
                '/gioi-thieu/co-so-vat-chat',
                '01',
              ],
              [
                'Kết nối sinh viên',
                'Tra cứu các kênh hỗ trợ và hoạt động sinh viên.',
                '/doi-song-sinh-vien',
                '02',
              ],
              [
                'Campus Tour demo',
                'Khám phá tuyến tham quan minh họa, không tạo lịch hẹn.',
                '/campus-tour-demo',
                '03',
              ],
            ].map(([t, d, to, n]) => (
              <article className="campus-card" key={t}>
                <span className="campus-number" aria-hidden="true">
                  {n}
                </span>
                <div>
                  <h3>
                    <Link to={to}>
                      {t}
                      <ArrowUpRight size={21} aria-hidden="true" />
                    </Link>
                  </h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading eyebrow="05 / KẾT NỐI THÔNG TIN" title="Thông báo từ nguồn VKU.">
          <Link className="text-link" to="/thong-bao">
            Tra cứu thông báo
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </SectionHeading>
        <div className="notice-preview">
          <article>
            <span className="tag">TÀI VỤ · 07.10.2026</span>
            <h3>Học phí học kỳ 1, năm học 2026–2027</h3>
            <p>Áp dụng các khóa 2025 trở về trước. Thời hạn theo văn bản đã qua ngày 30/10/2026.</p>
            <SourceLink href="https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-thu-hoc-phi-hoc-ky-1-nam-hoc-2026-2027-1397.html">
              Xem văn bản gốc
            </SourceLink>
          </article>
          <div className="notice-aside">
            <BookOpen size={30} aria-hidden="true" />
            <h3>Thông tin học vụ đúng nơi.</h3>
            <p>Lịch thi, công tác sinh viên và thông báo đào tạo được công bố tại cổng trường.</p>
            <SourceLink href={official.training}>Đến cổng đào tạo</SourceLink>
          </div>
        </div>
      </section>
      <section className="research-strip">
        <div className="container section-heading">
          <div>
            <p className="eyebrow light">06 / NGHIÊN CỨU & HỢP TÁC</p>
            <h2>
              Mở rộng góc nhìn.
              <br />
              Kết nối tri thức.
            </h2>
          </div>
          <ActionLink to="/nghien-cuu-hop-tac" secondary>
            Tìm hiểu định hướng
          </ActionLink>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <p className="eyebrow">07 / GIẢI ĐÁP CÙNG BẠN</p>
          <h2>
            Bạn có
            <br />
            điều muốn hỏi?
          </h2>
          <p>Bắt đầu từ những thông tin thiết thực.</p>
          <Link className="text-link" to="/faq">
            Tất cả câu hỏi
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <FaqList limit={5} />
      </section>
      <section className="container final-cta">
        <div>
          <p className="eyebrow">SẴN SÀNG KHÁM PHÁ?</p>
          <h2>Bước tiếp theo bắt đầu từ bạn.</h2>
          <p>Tìm hiểu ngành học hoặc kết nối đúng kênh thông tin.</p>
        </div>
        <ActionLink to="/lien-he">Thông tin liên hệ</ActionLink>
      </section>
    </>
  );
}
