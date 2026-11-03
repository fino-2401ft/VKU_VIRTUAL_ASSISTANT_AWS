import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Cpu, MapPin, X } from 'lucide-react';
import { ActionLink, PageIntro, SectionHeading, SourceLink } from '../components/ui';
import { official } from '../data/site';
import { contentRoutes } from '../data/routes';
import { NotFoundPage } from './FoundationPages';
import FacultyDirectory from '../components/FacultyDirectory';

export default function AboutPages() {
  const { pathname } = useLocation();
  const page = contentRoutes.find((p) => p.path === pathname);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  if (!page) return <NotFoundPage />;
  return (
    <>
      <PageIntro {...page} />
      <div className="container section">
        <nav className="subnav" aria-label="Khám phá giới thiệu">
          {contentRoutes
            .filter((p) => p.path.startsWith('/gioi-thieu'))
            .map((p) => (
              <Link
                key={p.path}
                to={p.path}
                aria-current={p.path === pathname ? 'page' : undefined}
              >
                {p.eyebrow}
              </Link>
            ))}
        </nav>
        {pathname === '/gioi-thieu' && (
          <>
            <div className="about-grid">
              <div className="about-art">
                <p className="eyebrow">VIỆT – HÀN · ĐẠI HỌC ĐÀ NẴNG</p>
                <div className="giant-vku" aria-hidden="true">
                  VKU<span>.</span>
                </div>
                <p>
                  Thông tin rõ ràng.
                  <br />
                  Lựa chọn có cơ sở.
                </p>
              </div>
              <article>
                <p className="eyebrow">BẢN SẮC NHÀ TRƯỜNG</p>
                <h2>Một điểm bắt đầu để hiểu về VKU.</h2>
                <p className="lead">
                  Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn là thành viên Đại
                  học Đà Nẵng.
                </p>
                <p>
                  Trường được thành lập theo Quyết định 15/QĐ-TTg ngày 03/01/2020, tập trung đào tạo
                  và nghiên cứu công nghệ thông tin, truyền thông và kinh tế số. Trụ sở tại 470 Trần
                  Đại Nghĩa, phường Ngũ Hành Sơn, TP. Đà Nẵng.
                </p>
                <p className="lead">
                  <strong>Nhân bản – Phụng sự – Khai phóng</strong>
                </p>
                <p>
                  Triết lý giáo dục đặt người học ở trung tâm, chú trọng phát triển con người toàn
                  diện, tư duy đổi mới và tinh thần đóng góp cho xã hội.
                </p>
                <SourceLink href="https://vku.udn.vn/vi/gioi-thieu/">
                  Nguồn giới thiệu VKU
                </SourceLink>
              </article>
            </div>
            <section className="related-section">
              <SectionHeading eyebrow="GIÁ TRỊ CỐT LÕI" title="Nền tảng của hành trình học tập." />
              <div className="steps-grid">
                {[
                  [
                    'Đức – Trí – Thể – Mỹ',
                    'Phát triển con người toàn diện, gắn tri thức với đạo đức và sức khỏe.',
                  ],
                  [
                    'Uy tín – Chất lượng – Chuyên nghiệp',
                    'Định hướng chất lượng trong đào tạo, nghiên cứu và hoạt động phục vụ.',
                  ],
                  [
                    'Kế thừa – Đổi mới – Sáng tạo',
                    'Tiếp nối nền tảng đã có và khuyến khích tư duy đổi mới.',
                  ],
                ].map(([title, description]) => (
                  <article className="step-card" key={title}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="related-section">
              <SectionHeading eyebrow="CÙNG TÌM HIỂU" title="Ba hướng khám phá VKU" />
              <div className="steps-grid">
                {[
                  [
                    'Lịch sử phát triển',
                    'Tìm mốc thành lập và nguồn lịch sử nhà trường.',
                    '/gioi-thieu/lich-su',
                  ],
                  [
                    'Không gian học tập',
                    'Tra cứu campus, thư viện và khu thực hành.',
                    '/gioi-thieu/co-so-vat-chat',
                  ],
                  [
                    'Ngành học của bạn',
                    'Tìm kiếm trong danh mục tham khảo theo lĩnh vực.',
                    '/nganh-dao-tao',
                  ],
                ].map(([t, d, to], i) => (
                  <article className="step-card" key={to}>
                    <span className="step-number">0{i + 1}</span>
                    <h3>
                      <Link to={to}>{t}</Link>
                    </h3>
                    <p>{d}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
        {pathname.endsWith('/lich-su') && (
          <section className="reading-panel">
            <p className="eyebrow">DÒNG THỜI GIAN CÓ NGUỒN</p>
            <h2>Mốc thành lập đã đối chiếu</h2>
            <ol className="timeline">
              <li>
                <time dateTime="2020-01-03">03.01.2020</time>
                <h3>Thành lập Trường Đại học CNTT và Truyền thông Việt – Hàn</h3>
                <p>
                  Theo Quyết định 15/QĐ-TTg, trên cơ sở hợp nhất Trường Cao đẳng CNTT Hữu nghị Việt
                  – Hàn, Trường Cao đẳng CNTT và Khoa CNTT & Truyền thông thuộc Đại học Đà Nẵng.
                </p>
                <SourceLink href={page.source}>Đọc thư ngỏ của trường</SourceLink>
              </li>
              <li>
                <time dateTime="2025-01-03">03.01.2025</time>
                <h3>Kỷ niệm 5 năm thành lập trường</h3>
                <p>
                  Thư ngỏ kỷ niệm gọi đây là hành trình 22 năm hình thành và phát triển, tính cả
                  truyền thống các đơn vị tiền thân. Mốc 2020 là năm thành lập VKU, không đồng nhất
                  với thời điểm ra đời của từng đơn vị cấu thành.
                </p>
                <SourceLink href={page.source}>Nguồn thư ngỏ kỷ niệm 5 năm</SourceLink>
              </li>
            </ol>
          </section>
        )}
        {pathname.endsWith('/lanh-dao') && (
          <>
            <section>
              <SectionHeading
                eyebrow="BAN GIÁM HIỆU · THÔNG TIN NHIỆM KỲ 2020–2025"
                title="Lãnh đạo và lĩnh vực phụ trách."
              />
              <p className="archive-note">
                Danh sách và nhiệm vụ dưới đây theo trang phân công nhiệm kỳ 2020–2025. Đây là thông
                tin có mốc nhiệm kỳ, không phải xác nhận nhân sự hiện nhiệm năm 2026.
              </p>
              <div className="faculty-grid">
                {[
                  [
                    'PGS.TS. Huỳnh Công Pháp',
                    'Hiệu trưởng',
                    'Điều hành chung; tổ chức cán bộ, chiến lược phát triển, kế hoạch tài chính và đầu tư cơ sở vật chất.',
                  ],
                  [
                    'TS. Trần Thế Sơn',
                    'Phó Hiệu trưởng',
                    'Khoa học công nghệ, hợp tác quốc tế, dự án ODA-KOICA và quản lý, phát triển hạ tầng số.',
                  ],
                  [
                    'TS. Huỳnh Ngọc Thọ',
                    'Phó Hiệu trưởng',
                    'Đào tạo, tuyển sinh, khảo thí, bảo đảm chất lượng giáo dục, công tác sinh viên và học liệu.',
                  ],
                ].map(([name, role, description]) => (
                  <article className="faculty-card" key={name}>
                    <span className="tag">{role}</span>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
              <SourceLink href={page.source}>Nguồn phân công nhiệm vụ Ban giám hiệu</SourceLink>
            </section>
            <FacultyDirectory />
          </>
        )}
        {pathname.endsWith('/co-so-vat-chat') && (
          <>
            <div className="about-grid">
              <figure>
                <button
                  ref={opener}
                  className="gallery-opener"
                  onClick={() => dialog.current?.showModal()}
                  aria-label="Phóng to minh họa campus, không phải ảnh VKU"
                >
                  {imageFailed ? (
                    <span>Minh họa tạm không hiển thị</span>
                  ) : (
                    <img
                      src="/assets/campus-illustration.svg"
                      width="960"
                      height="820"
                      loading="lazy"
                      alt="Minh họa khuôn viên đại học, không mô phỏng campus thật VKU"
                      onError={() => setImageFailed(true)}
                    />
                  )}
                </button>
                <figcaption className="small muted">
                  Minh họa do dự án tạo · Không phải ảnh VKU · Nhấn để phóng to
                </figcaption>
              </figure>
              <article>
                <p className="eyebrow">KHÔNG GIAN HỌC TẬP</p>
                <h2>Tìm hiểu campus từ nguồn trường.</h2>
                <p className="lead">
                  Ảnh campus và số liệu diện tích đang chờ xác minh và quyền sử dụng. Minh họa ở đây
                  không thể hiện vị trí hoặc kiến trúc thực tế.
                </p>
                <SourceLink href={official.university}>Xem giới thiệu campus chính thức</SourceLink>
                <ActionLink to="/campus-tour-demo" secondary>
                  Khám phá Campus Tour demo
                </ActionLink>
              </article>
            </div>
            <div className="steps-grid related-section">
              {[
                [
                  Cpu,
                  'Khu thực hành',
                  'Các phòng thực hành và phòng thí nghiệm phục vụ lĩnh vực công nghệ thông tin, truyền thông và công nghệ số theo định hướng đào tạo của trường.',
                ],
                [
                  BookOpen,
                  'Thư viện & học liệu',
                  'Thư viện cung cấp giáo trình, sách tham khảo và học liệu điện tử phục vụ học tập, nghiên cứu. Người học có thể tra cứu tài nguyên số và sử dụng không gian đọc.',
                ],
                [
                  MapPin,
                  'Ký túc xá',
                  'Ký túc xá nằm trong khuôn viên trường, có phòng ở 8 người, khu vệ sinh khép kín, wifi, khu ăn uống và các sân thể thao. Bản demo không tiếp nhận đặt chỗ.',
                ],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Cpu;
                return (
                  <article className="step-card" key={String(t)}>
                    <I aria-hidden="true" />
                    <h3>{String(t)}</h3>
                    <p>{String(d)}</p>
                    <SourceLink href={official.training}>Kênh tra cứu chính thức</SourceLink>
                  </article>
                );
              })}
            </div>
            <dialog
              className="image-dialog"
              ref={dialog}
              aria-labelledby="gallery-title"
              onClose={() => opener.current?.focus()}
              onClick={(e) => {
                if (e.target === e.currentTarget) dialog.current?.close();
              }}
            >
              <div className="section-heading">
                <h2 id="gallery-title">Minh họa ý tưởng campus</h2>
                <button
                  className="icon-button"
                  onClick={() => dialog.current?.close()}
                  aria-label="Đóng hình minh họa"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <img
                src="/assets/campus-illustration.svg"
                width="960"
                height="820"
                alt="Minh họa tự tạo, không phải ảnh campus VKU"
              />
              <p className="small muted">
                Credit: VKU Demo project. Tài sản do dự án tạo, không mô tả trường thật.
              </p>
            </dialog>
          </>
        )}
      </div>
    </>
  );
}
