# VKU — website giới thiệu (demo học tập)

Sản phẩm độc lập, không đại diện hoặc được VKU bảo trợ, không phải cổng tuyển sinh/học vụ chính thức.

## Chạy local

Node 20.19+ (máy hiện tại 20.20.2), npm. `npm install` rồi `npm run dev`.
`npm run build` tạo dist; `npm run preview` xem bản build. Các lệnh: `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:e2e`.

## Dữ liệu và phạm vi

Sửa dữ liệu trong src/data; mỗi record phải có URL nguồn, ngày kiểm chứng và trạng thái. Không tự cập nhật tin, không backend, không tài khoản thật, không gửi hay lưu form. Tuyển sinh 2026 là thông tin tham khảo, không mặc định đang mở. Xem docs/CONTENT_AUDIT.md trước khi dùng số liệu.

Ảnh/logo chính thức chưa có quyền tái sử dụng: dùng wordmark text và minh họa riêng có nhãn. Không phải ảnh chụp trường. Font Be Vietnam Pro self-host từ Fontsource (OFL), không tải font runtime.

Đường dẫn chính thức: [VKU](https://vku.udn.vn/vi/), [tuyển sinh](https://tuyensinh.vku.udn.vn/), [đào tạo](https://daotao.vku.udn.vn/).

## Tiến độ và bàn giao

Đọc docs/CURRENT_STATUS.md, TASK_BOARD.md, NEXT_STEPS.md, DECISIONS.md. Hiện P0–P3 có checkpoint triển khai; P4/P5 chưa hoàn thành. Programs, notices, About, Admissions hoạt động; Life/News/Events/Contact còn foundation, ba demo chưa có form/wizard/tour.

Mốc kiểm tra 03/11/2026: build/typecheck/lint đạt, 7 unit/integration và 14 Playwright tests đạt. Screenshot thực tại docs/screenshots. Axe đã kiểm 10 routes desktop/mobile, chưa có Lighthouse/full accessibility audit.

Skill được dùng từ `C:/Users/Admin/.codex/skills/ui-ux-pro-max/`; evidence trong docs/skill-evidence, không cần cài lại global. `scripts/seed_from_master.py` là công cụ trích seed ban đầu, không chạy lại để ghi đè các dữ liệu/audit đã biên tập.

E2E dùng Chrome có sẵn; `npm run test:e2e` tự mở/dừng server local 5175. Môi trường sandbox có thể chặn Vitest rename temp hoặc Chrome truy cập localhost; cần quyền chạy test ngoài sandbox khi gặp lỗi môi trường này.
Demo local là CSR/noindex, chưa có domain/canonical/sitemap hoặc SEO prerender. Static hosting về sau phải có SPA fallback tới index.html. Chưa push/deploy.
