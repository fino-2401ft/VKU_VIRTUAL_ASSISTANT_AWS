import { useParams, Link } from 'react-router-dom';
import { programs, programGroups } from '../data/content';
import { PageIntro, SourceLink, SectionHeading } from '../components/ui';
import { NotFoundPage } from './FoundationPages';
import { ProgramCard, ProgramProvenance } from './ProgramsPage';
import { subjectCombinations } from '../data/admissions';

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);
  if (!program) return <NotFoundPage />;
  const related = programs
    .filter((p) => p.group === program.group && p.id !== program.id)
    .slice(0, 3);
  return (
    <>
      <PageIntro
        eyebrow="Chi tiết ngành · Tham khảo 2026"
        title={program.name}
        description={`Nhóm gợi ý: ${programGroups[program.group]}. Phân nhóm do dự án demo biên tập để hỗ trợ tìm kiếm.`}
      />
      <section className="container section">
        <Link className="text-link" to="/nganh-dao-tao">
          ← Quay lại danh mục ngành
        </Link>
        <ProgramProvenance />
        <div className="detail-grid">
          <article className="reading-panel">
            <p className="eyebrow">THÔNG TIN CHƯƠNG TRÌNH · {program.admissionYear}</p>
            <h2>
              {program.degree === 'ky-su' ? 'Chương trình kỹ sư' : 'Chương trình cử nhân'} ·{' '}
              {String(program.durationYears).replace('.', ',')} năm
            </h2>
            <p className="lead">{program.officialName}</p>
            <p>
              Chương trình thuộc khối {program.discipline.toLowerCase()}, có {program.quota2026} chỉ
              tiêu tuyển sinh năm {program.admissionYear}. Mã xét tuyển{' '}
              <strong>{program.admissionCode}</strong> dùng để phân biệt đúng ngành/chuyên ngành và
              loại bằng khi tìm hiểu tuyển sinh.
            </p>
            <h3 className="related-section">Tổ hợp xét tuyển kết hợp (dự kiến 2026)</h3>
            <p>
              Văn bản phương thức 407 ngày 10/02/2026 công bố các tổ hợp dưới đây ở trạng thái dự
              kiến. Điểm học bạ và điểm thi THPT phải dùng cùng một tổ hợp.
            </p>
            <ul className="subject-list">
              {subjectCombinations[program.subjectGroup].map(([code, subjects]) => (
                <li key={code}>
                  <strong>{code}</strong>
                  <span>{subjects}</span>
                </li>
              ))}
            </ul>
            <SourceLink href={program.admissionSourceUrl}>
              Nguồn mã ngành & tổ hợp dự kiến
            </SourceLink>
            <p>
              Thời lượng trên là thời gian chương trình theo danh mục. Kế hoạch học phần chi tiết
              theo khóa được công bố tại cổng đào tạo.
            </p>
            <SourceLink href={program.curriculumUrl}>Chương trình học phần chính thức</SourceLink>
            <SourceLink href={program.officialDetailUrl}>Xem danh mục ngành tại VKU</SourceLink>
          </article>
          <aside className="detail-facts">
            <h2>Dữ liệu tham khảo</h2>
            <dl>
              <div>
                <dt>Năm tuyển sinh</dt>
                <dd>{program.admissionYear}</dd>
              </div>
              <div>
                <dt>Chỉ tiêu 2026</dt>
                <dd>{program.quota2026}</dd>
              </div>
              <div>
                <dt>Bằng cấp / thời lượng</dt>
                <dd>
                  {program.degree === 'ky-su' ? 'Kỹ sư' : 'Cử nhân'} ·{' '}
                  {String(program.durationYears).replace('.', ',')} năm
                </dd>
              </div>
              <div>
                <dt>Mã xét tuyển</dt>
                <dd>{program.admissionCode}</dd>
              </div>
              <div>
                <dt>Ngày kiểm tra</dt>
                <dd>03/11/2026</dd>
              </div>
            </dl>
          </aside>
        </div>
        {related.length > 0 && (
          <section className="related-section">
            <SectionHeading eyebrow="TIẾP TỤC KHÁM PHÁ" title="Cùng nhóm lĩnh vực" />
            <div className="program-grid">
              {related.map((p) => (
                <ProgramCard key={p.id} program={p} />
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}
