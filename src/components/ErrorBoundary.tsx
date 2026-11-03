import { Component, type ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="container section">
        <p className="eyebrow">VKU · DEMO HỌC TẬP</p>
        <h1>Chưa thể tải nội dung.</h1>
        <p className="lead">Hãy tải lại trang để thử lại, hoặc trở về trang chủ.</p>
        <div className="actions">
          <button className="button" onClick={() => window.location.reload()}>
            Tải lại trang
          </button>
          <a href="/" className="text-link">
            Về trang chủ
          </a>
        </div>
      </main>
    );
  }
}
