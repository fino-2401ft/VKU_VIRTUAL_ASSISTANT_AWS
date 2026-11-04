import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DemoContactForm from '../components/DemoContactForm';
import { PageIntro, SourceLink } from '../components/ui';
import { official } from '../data/site';

const steps = [
  {
    title: 'Xác định nhu cầu',
    text: 'Chọn ngành quan tâm và đọc yêu cầu đúng năm trước khi chuẩn bị hồ sơ.',
    checks: [
      'Tôi đã xem thông tin ngành và bằng cấp.',
      'Tôi đã phân biệt thông tin tham khảo với đợt đăng ký còn hiệu lực.',
    ],
  },
  {
    title: 'Đọc hướng dẫn hồ sơ',
    text: 'Mỗi nhóm thí sinh có yêu cầu và thời hạn riêng. Bản mô phỏng không yêu cầu tải lên bất kỳ giấy tờ nào.',
    checks: [
      'Tôi hiểu cần đối chiếu minh chứng theo nhóm thí sinh.',
      'Tôi biết các hạn tuyển sinh 2026 được trình bày trên website đã qua.',
    ],
  },
  {
    title: 'Hoàn tất hướng dẫn',
    text: 'Muốn thực hiện thủ tục thật, sử dụng hệ thống được VKU công bố và kiểm tra thời hạn mới nhất.',
    checks: ['Tôi hiểu đây chỉ là hướng dẫn, không tạo hồ sơ tuyển sinh.'],
  },
];

function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [invalid, setInvalid] = useState(false);
  const [complete, setComplete] = useState(false);
  const panel = useRef<HTMLHeadingElement>(null);
  function focusPanel() {
    requestAnimationFrame(() => panel.current?.focus());
  }
  function next() {
    if (!steps[step].checks.every((_, i) => checked[`${step}-${i}`])) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    if (step === 2) setComplete(true);
    else setStep(step + 1);
    focusPanel();
  }
  return (
    <div className="reading-panel">
      <ol className="wizard-steps" aria-label="Các bước hướng dẫn">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={!complete && step === i ? 'step' : undefined}>
            <span>{i + 1}</span>
            {s.title}
          </li>
        ))}
      </ol>
      {complete ? (
        <div className="info-banner" role="status">
          <h2 ref={panel} tabIndex={-1}>
            Bạn đã hoàn tất mô phỏng.
          </h2>
          <p>
            Không có hồ sơ nào được tạo hoặc gửi. Không có giấy tờ được thu thập. Hãy kiểm tra công
            bố mới của VKU trước khi thực hiện thủ tục thật.
          </p>
          <button
            className="button button-secondary"
            onClick={() => {
              setStep(0);
              setChecked({});
              setComplete(false);
              focusPanel();
            }}
          >
            Làm lại hướng dẫn
          </button>
        </div>
      ) : (
        <>
          <h2 ref={panel} tabIndex={-1}>
            Bước {step + 1}: {steps[step].title}
          </h2>
          <p className="lead">{steps[step].text}</p>
          <fieldset className="wizard-checks">
            <legend>Đánh dấu những nội dung bạn đã hiểu</legend>
            {steps[step].checks.map((label, i) => (
              <label key={label}>
                <input
                  type="checkbox"
                  checked={!!checked[`${step}-${i}`]}
                  onChange={(e) => setChecked({ ...checked, [`${step}-${i}`]: e.target.checked })}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          {invalid && (
            <p className="field-error" role="alert">
              Hãy xác nhận các nội dung ở bước này trước khi tiếp tục.
            </p>
          )}
          <div className="actions">
            <button
              className="button button-secondary"
              disabled={step === 0}
              onClick={() => {
                setStep(step - 1);
                setInvalid(false);
                focusPanel();
              }}
            >
              Quay lại
            </button>
            <button className="button" onClick={next}>
              {step === 2 ? 'Hoàn tất mô phỏng' : 'Tiếp tục'}
            </button>
          </div>
        </>
      )}
      <SourceLink href={official.admissions}>Tra cứu thông tin tuyển sinh chính thức</SourceLink>
    </div>
  );
}

function TourDemo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [topic, setTopic] = useState('campus');
  return (
    <div className="reading-panel">
      <h2>Chọn một chủ đề để khám phá.</h2>
      <p className="lead">
        Tuyến minh họa gồm không gian học tập, thư viện và khu sinh hoạt. Đây không phải chương
        trình tham quan có ngày giờ hoặc suất đặt thực tế.
      </p>
      <ol className="guide-list">
        <li>
          <h3>Không gian học tập</h3>
          <p>
            Tìm hiểu vai trò giảng đường, khu thực hành và phòng thí nghiệm trong hành trình học
            tập.
          </p>
        </li>
        <li>
          <h3>Thư viện & học liệu</h3>
          <p>Khám phá cách tìm giáo trình, tài liệu tham khảo và học liệu điện tử.</p>
        </li>
        <li>
          <h3>Sinh hoạt trong campus</h3>
          <p>Tìm hiểu các tiện ích và kênh tra cứu thông tin ký túc xá.</p>
        </li>
      </ol>
      <label>
        Chủ đề tham quan minh họa
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="campus">Tổng quan campus</option>
          <option value="learning">Không gian học tập</option>
          <option value="library">Thư viện & học liệu</option>
        </select>
      </label>
      <button ref={opener} className="button" onClick={() => dialog.current?.showModal()}>
        Thử đặt lịch (demo)
      </button>
      <dialog
        ref={dialog}
        className="demo-dialog"
        aria-labelledby="tour-result-title"
        onClose={() => opener.current?.focus()}
      >
        <h2 id="tour-result-title">Không có lịch hẹn được ghi nhận.</h2>
        <p>
          Bạn vừa thử tương tác minh họa. Không có booking được tạo, không có ngày giờ hoặc suất
          tham quan nào được giữ. Để hỏi về tham quan thực tế, hãy liên hệ nhà trường.
        </p>
        <SourceLink href={official.university}>Kênh liên hệ VKU</SourceLink>
        <button className="button" onClick={() => dialog.current?.close()}>
          Đóng thông báo
        </button>
      </dialog>
    </div>
  );
}

export default function DemoPages() {
  const { pathname } = useLocation();
  const consultation = pathname.endsWith('/tu-van-demo');
  const application = pathname.endsWith('/ho-so-demo');
  return (
    <>
      <PageIntro
        eyebrow="Trải nghiệm demo"
        title={
          consultation
            ? 'Thử tìm hiểu nhu cầu tư vấn.'
            : application
              ? 'Mô phỏng chuẩn bị hồ sơ.'
              : 'Khám phá Campus Tour demo.'
        }
        description="Trải nghiệm minh họa để tìm hiểu quy trình. Không gửi thông tin, tạo hồ sơ hoặc đặt lịch với VKU."
      />
      <section className="container section">
        {consultation ? (
          <div className="reading-panel">
            <DemoContactForm consultation />
          </div>
        ) : application ? (
          <ApplicationWizard />
        ) : (
          <TourDemo />
        )}
      </section>
    </>
  );
}
