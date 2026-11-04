import { useRef, useState, type FormEvent } from 'react';
import { SourceLink } from './ui';
import { official } from '../data/site';
import { programGroups } from '../data/content';

export default function DemoContactForm({ consultation = false }: { consultation?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const summary = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const submit = useRef<HTMLButtonElement>(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const email = String(fields.get('email') || '').trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Email chưa đúng định dạng; bạn có thể để trống trường này.';
    if (!fields.get('topic')) next.topic = 'Hãy chọn một chủ đề để thử biểu mẫu.';
    if (consultation && !fields.get('group')) next.group = 'Hãy chọn nhóm ngành bạn muốn tìm hiểu.';
    if (!consultation && String(fields.get('message') || '').trim().length < 10)
      next.message = 'Nhập ít nhất 10 ký tự nội dung minh họa.';
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    dialog.current?.showModal();
  }
  const errorProps = (name: string) => ({
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `demo-${name}-error` : undefined,
  });
  const error = (name: string) =>
    errors[name] ? (
      <p className="field-error" id={`demo-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;
  return (
    <section className="related-section">
      <p className="eyebrow">BIỂU MẪU DEMO · KHÔNG GỬI THÔNG TIN</p>
      <h2>{consultation ? 'Thử chọn nhu cầu tư vấn.' : 'Thử biểu mẫu liên hệ.'}</h2>
      <p className="lead">
        Chỉ nhập nội dung giả lập. Bạn có thể để trống tên và email; biểu mẫu không lưu hoặc chuyển
        thông tin đến nhà trường.
      </p>
      <form className="demo-form" noValidate onSubmit={handleSubmit}>
        {Object.keys(errors).length > 0 && (
          <div className="error-summary" ref={summary} tabIndex={-1} role="alert">
            <h3>Vui lòng kiểm tra các mục sau</h3>
            <ul>
              {Object.entries(errors).map(([name, message]) => (
                <li key={name}>
                  <a href={`#demo-${name}`}>{message}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-grid">
          <label htmlFor="demo-name">
            Tên gọi / biệt danh (không bắt buộc)
            <input
              id="demo-name"
              name="nickname"
              autoComplete="off"
              maxLength={60}
              placeholder="Ví dụ: Bạn học sinh A"
            />
          </label>
          <div>
            <label htmlFor="demo-email">
              Email minh họa (không bắt buộc)
              <input
                id="demo-email"
                name="email"
                type="email"
                autoComplete="off"
                maxLength={120}
                placeholder="ban@example.com"
                {...errorProps('email')}
              />
            </label>
            {error('email')}
          </div>
        </div>
        {consultation && (
          <div>
            <label htmlFor="demo-group">Nhóm ngành quan tâm</label>
            <select id="demo-group" name="group" defaultValue="" {...errorProps('group')}>
              <option value="">Chọn nhóm ngành</option>
              {Object.entries(programGroups).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {error('group')}
          </div>
        )}
        <div>
          <label htmlFor="demo-topic">Chủ đề</label>
          <select id="demo-topic" name="topic" defaultValue="" {...errorProps('topic')}>
            <option value="">Chọn chủ đề</option>
            <option value="programs">Ngành học & chương trình</option>
            <option value="admissions">Phương thức & hồ sơ tuyển sinh</option>
            <option value="fees">Học phí & học bổng</option>
            <option value="other">Thông tin khác</option>
          </select>
          {error('topic')}
        </div>
        <div>
          <label htmlFor="demo-message">
            Nội dung minh họa {consultation ? '(không bắt buộc)' : '(tối thiểu 10 ký tự)'}
            <textarea
              id="demo-message"
              name="message"
              rows={5}
              maxLength={1200}
              placeholder="Nhập câu hỏi giả lập, không nhập giấy tờ hoặc thông tin nhạy cảm."
              {...errorProps('message')}
            />
          </label>
          {error('message')}
        </div>
        <button ref={submit} className="button" type="submit">
          Xem kết quả demo
        </button>
      </form>
      <dialog
        ref={dialog}
        className="demo-dialog"
        aria-labelledby="demo-result-title"
        onClose={() => submit.current?.focus()}
      >
        <h2 id="demo-result-title">Đây là bản demo, nội dung chưa được gửi.</h2>
        <p>
          Bạn vừa xem thử biểu mẫu. Không có thông tin nào được lưu hoặc gửi; không có yêu cầu tư
          vấn nào được tạo. Vui lòng liên hệ VKU qua kênh chính thức.
        </p>
        <SourceLink href={official.admissions}>Thông tin tuyển sinh chính thức</SourceLink>
        <button className="button" onClick={() => dialog.current?.close()}>
          Đóng thông báo
        </button>
      </dialog>
    </section>
  );
}
