import { useEffect, type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqs } from '../data/site';

export function SourceLink({
  href,
  children = 'Xem nguồn chính thức',
}: {
  href: string;
  children?: ReactNode;
}) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (mở tab mới)</span>
    </a>
  );
}
export function ActionLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? 'button-secondary' : ''}`} to={to}>
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function FaqList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map((f) => (
        <details key={f.question}>
          <summary>
            {f.question}
            <span aria-hidden="true">+</span>
          </summary>
          <div>
            <p>{f.answer}</p>
            <SourceLink href={f.source} />
          </div>
        </details>
      ))}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <PageMeta title={title} description={description} />
      <header className="page-intro">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            {eyebrow}
          </p>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
        </div>
      </header>
    </>
  );
}
export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} · VKU Demo`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    const heading = document.querySelector<HTMLHeadingElement>('h1');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }, [title, description]);
  return null;
}
export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{children || 'Nội dung đang được xác minh từ nguồn chính thức.'}</p>
      <ActionLink to="/">Về trang chủ</ActionLink>
    </div>
  );
}
