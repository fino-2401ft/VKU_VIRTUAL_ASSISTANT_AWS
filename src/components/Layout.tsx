import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X, MapPin, Search } from 'lucide-react';
import { navigation, official } from '../data/site';
import { SourceLink } from './ui';

function Wordmark() {
  return (
    <Link className="wordmark" to="/" aria-label="VKU Demo — Trang chủ">
      <img
        className="portal-school-logo"
        src="/assets/portal/logo_2021.png"
        width="1099"
        height="149"
        alt="Đại học Đà Nẵng — Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn — Cổng thông tin đào tạo"
        fetchPriority="high"
      />
      <span className="mobile-school-name">
        <span>ĐẠI HỌC ĐÀ NẴNG</span>
        <strong>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG VIỆT – HÀN</strong>
        <b>CỔNG THÔNG TIN ĐÀO TẠO</b>
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
          <nav className="utility-links" aria-label="Liên kết nhanh">
            <Link to="/thong-bao">Thông báo</Link>
            <Link to="/gioi-thieu/lanh-dao">Danh bạ</Link>
            <Link to="/tuyen-sinh/phuong-thuc">Hướng dẫn hồ sơ</Link>
            <Link to="/lien-he">Liên hệ</Link>
          </nav>
          <div>
            <SourceLink href={official.university}>Website VKU</SourceLink>
            <SourceLink href={official.training}>Cổng đào tạo</SourceLink>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Wordmark />
          <span className="header-demo">Bản demo học tập · Không phải cổng chính thức</span>
        </div>
        <div className="navigation-bar">
          <div className="container navigation-inner">
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
            <form className="header-search" action="/thong-bao" role="search">
              <label className="sr-only" htmlFor="header-query">
                Tìm thông báo
              </label>
              <input id="header-query" type="search" name="q" placeholder="Tìm kiếm…" />
              <button type="submit" aria-label="Tìm kiếm thông báo">
                <Search size={18} aria-hidden="true" />
              </button>
            </form>
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
          <p className="footer-title">
            Trường Đại học Công nghệ Thông tin &amp; Truyền thông Việt – Hàn, Đại học Đà Nẵng
          </p>
          <p className="footer-address">
            <MapPin size={18} aria-hidden="true" /> 470 Trần Đại Nghĩa, phường Ngũ Hành Sơn, TP. Đà
            Nẵng
          </p>
          <div className="footer-links">
            <SourceLink href={official.university}>Website VKU</SourceLink>
            <SourceLink href={official.admissions}>Cổng tuyển sinh</SourceLink>
            <SourceLink href={official.training}>Cổng đào tạo</SourceLink>
            <Link to="/lien-he">Liên hệ</Link>
          </div>
          <p className="footer-disclaimer">
            Website demo học tập độc lập · Không phải cổng chính thức VKU · Dữ liệu tham khảo năm
            2026
          </p>
        </div>
      </footer>
    </>
  );
}
