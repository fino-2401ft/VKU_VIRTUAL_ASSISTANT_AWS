import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X, MapPin } from 'lucide-react';
import { navigation, official } from '../data/site';
import { SourceLink } from './ui';

function Wordmark() {
  return (
    <Link className="wordmark" to="/" aria-label="VKU Demo — Trang chủ">
      <span className="wordmark-type">
        VKU<span className="wordmark-dot">.</span>
      </span>
      <span className="wordmark-caption">
        VIỆT – HÀN UNIVERSITY
        <br />
        <strong>KHÁM PHÁ · KẾT NỐI · SÁNG TẠO</strong>
      </span>
    </Link>
  );
}

export default function Layout() {
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      document.querySelectorAll<HTMLDetailsElement>('.desktop-nav details[open]').forEach((d) => {
        if (!d.contains(event.target as Node)) d.open = false;
      });
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelectorAll<HTMLDetailsElement>('.desktop-nav details[open]').forEach((d) => {
      d.open = false;
    });
  }, [location.pathname]);
  function closeMenu() {
    dialog.current?.close();
    menuButton.current?.focus();
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <div className="utility">
        <div className="container utility-inner">
          <span>
            <span className="status-dot" />
            Website demo học tập · Không phải cổng chính thức VKU
          </span>
          <div>
            <SourceLink href={official.university}>Website VKU</SourceLink>
            <SourceLink href={official.training}>Cổng đào tạo</SourceLink>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Wordmark />
          <nav
            className="desktop-nav"
            aria-label="Điều hướng chính"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                const d = (e.target as HTMLElement).closest('details');
                if (d) {
                  d.open = false;
                  d.querySelector('summary')?.focus();
                }
              }
            }}
          >
            {navigation.map((n) =>
              n.children ? (
                <details
                  key={n.title}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node))
                      e.currentTarget.open = false;
                  }}
                >
                  <summary>
                    {n.title}
                    <ChevronDown size={13} aria-hidden="true" />
                  </summary>
                  <div className="dropdown">
                    {n.children.map(([label, to]) => (
                      <NavLink key={to} to={to}>
                        {label}
                      </NavLink>
                    ))}
                  </div>
                </details>
              ) : (
                <NavLink key={n.to} to={n.to}>
                  {n.title}
                </NavLink>
              ),
            )}
          </nav>
          <button
            className="menu-button"
            ref={menuButton}
            aria-label="Mở menu điều hướng"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              dialog.current?.showModal();
              setMenuOpen(true);
            }}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <dialog
        id="mobile-navigation"
        ref={dialog}
        className="mobile-dialog"
        aria-labelledby="mobile-nav-title"
        onClose={() => {
          setMenuOpen(false);
          menuButton.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu">
          <div className="section-heading">
            <h2 id="mobile-nav-title">Khám phá VKU</h2>
            <button className="icon-button" onClick={closeMenu} aria-label="Đóng menu">
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Điều hướng di động">
            <Link to="/" onClick={closeMenu}>
              Trang chủ
            </Link>
            {navigation.map((n) => (
              <div key={n.to}>
                <Link to={n.to} onClick={closeMenu}>
                  {n.title}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                {n.children && (
                  <div className="mobile-subnav">
                    {n.children
                      .filter(([, to]) => to !== n.to)
                      .map(([label, to]) => (
                        <Link key={to} to={to} onClick={closeMenu}>
                          {label}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <p className="small muted">Sản phẩm demo học tập, không đại diện VKU.</p>
        </div>
      </dialog>
      <main id="main-content">
        <Suspense
          fallback={
            <div className="container section" role="status">
              Đang tải nội dung…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Wordmark />
              <p>
                Trường Đại học Công nghệ Thông tin
                <br />
                và Truyền thông Việt – Hàn
                <br />
                Đại học Đà Nẵng
              </p>
              <p className="footer-address">
                <MapPin size={18} aria-hidden="true" />
                470 Trần Đại Nghĩa, phường Ngũ Hành Sơn, TP. Đà Nẵng
              </p>
              <SourceLink href={official.training}>Nguồn thông tin trường</SourceLink>
            </div>
            <div>
              <h2>Khám phá</h2>
              <Link to="/gioi-thieu">Giới thiệu VKU</Link>
              <Link to="/nganh-dao-tao">Ngành đào tạo</Link>
              <Link to="/doi-song-sinh-vien">Đời sống sinh viên</Link>
              <Link to="/nghien-cuu-hop-tac">Nghiên cứu & hợp tác</Link>
              <Link to="/campus-tour-demo">Campus Tour demo</Link>
            </div>
            <div>
              <h2>Thông tin hữu ích</h2>
              <Link to="/tuyen-sinh">Tuyển sinh tham khảo 2026</Link>
              <Link to="/thong-bao">Thông báo học vụ</Link>
              <Link to="/faq">Câu hỏi thường gặp</Link>
              <Link to="/lien-he">Liên hệ & dữ liệu demo</Link>
              <Link to="/doi-song-sinh-vien/cau-lac-bo">Nhóm hoạt động sinh viên</Link>
            </div>
            <div>
              <h2>Cổng chính thức</h2>
              <SourceLink href={official.university}>Website VKU</SourceLink>
              <SourceLink href={official.admissions}>Cổng tuyển sinh</SourceLink>
              <SourceLink href={official.training}>Cổng đào tạo</SourceLink>
              <p className="small">
                Liên kết ngoài mở tại website nhà trường. Thông tin trên bản demo không tự cập nhật.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Website giới thiệu VKU — sản phẩm demo học tập, không phải cổng chính thức.</p>
            <span>Biên tập theo nguồn · 03.11.2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}
