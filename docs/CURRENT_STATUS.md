# Current status

Updated: 2026-11-03 21:51 (Asia/Bangkok)
Current phase: P3 implementation checkpoint; P4 next
Current task ID: VKU-301 DONE với giới hạn nội dung; VKU-401 TODO tiếp theo
Branch / last commit: Không có Git repository; không init/commit.

## Đã hoàn thành

- P0: đọc toàn bộ master, audit môi trường, dùng skill có sẵn, sổ nguồn S01–S22 và giới hạn xác minh.
- P1: Design System editorial navy/cyan, typography Việt self-host, 2 phương án, 5 wireframes; Home/menu 1440/390 screenshots đã xem.
- P2: Vite React TS strict + Tailwind v4 + Router; layout, metadata, lazy/loading/error/404, data contracts, 22 ngành, 6 thông báo, 22 nguồn và test scripts.
- P3: Home, Program explorer/detail/related, About/History/Leadership/Campus, Admissions/Methods/Tuition. Có năm/trạng thái nguồn, gallery dialog keyboard/Escape. Dữ liệu chưa kiểm chứng dùng trạng thái cập nhật/tham khảo, không tự bịa phần còn thiếu.
- Một phần chuẩn bị P4: Notices/detail/filter và FAQ đã hoạt động. Các route Life/Clubs/Research/News/Events/Contact vẫn là foundation có nguồn, chưa hoàn thiện layout/tương tác. Ba route demo chỉ có trạng thái thông báo, chưa có form/wizard/tour.

## Kết quả cuối

- `npm run typecheck`: PASS.
- `npm run build`: PASS, Vite 8.3.5; JS entry khoảng 302.57kB / gzip 95.26kB, có lazy chunks. Build cuối đã có credits/font license trong public.
- `npm run lint`, `npm run format:check`: PASS trước cập nhật checkpoint cuối; định dạng docs sẽ được kiểm lại.
- `npm test`: 2 files / 7 tests PASS (ngoài sandbox vì Vitest temp rename EPERM trong sandbox).
- `npm run test:e2e`: 14 tests PASS / 1.0m trên Chrome 1440/390. Bao gồm route smoke, search/filter/reset/detail/refresh, notices date/expiry/source, admissions liên trang, history/campus dialog, FAQ keyboard, 404.
- Axe: 0 violations trên 10 trang mỗi viewport 1440/390; không overflow và không runtime request ngoài localhost trong các trang đã kiểm tra. Không có nghĩa đã đạt toàn bộ WCAG.
- `node scripts/review-home.mjs`: PASS, Home 1440/390 overflow=false, axe=0; menu Escape PASS.
- Dependency audit: production 0; dev toolchain 11 moderate qua minimatch. Chưa áp dụng fix --force/downgrade.

## File và giới hạn

Toàn bộ file ứng dụng là mới: root configs/package-lock/README; src/app, components, data, lib, pages, styles, test; tests/e2e; scripts; public/assets; docs và screenshots. Master và bốn thư mục tài liệu học vụ được giữ nguyên. Không có Git diff vì không có repository.

Blockers nội dung: S01–S10 phần lớn timeout/502; ảnh/logo chưa có quyền tái sử dụng. Xung đột chỉ tiêu 1500 trong master và 1700 dự kiến từ snippet nguồn khác được ghi trong CONTENT_AUDIT; dữ liệu seed không được gắn verified. Degree/duration, học bổng, hotline, triết lý chi tiết, nhân sự 2026, timeline tiền thân chưa tái xác minh.

Known bugs/regressions: không có lỗi app đã biết trong phạm vi test hiện tại. Lần chạy E2E trước có 4 lỗi selector exact-text FAQ do dấu +; đã sửa locator summary, lần cuối 14/14 pass. Screenshot Admissions ban đầu chụp loading quá sớm, đã thêm chờ H1/fonts và chụp lại, đã xem desktop/mobile.

Chưa làm: P4 forms demo/contact validation/wizard/tour/events và hoàn thiện life/news; P5 320/768/1024/1920, Lighthouse, audit toàn bộ keyboard/forms/reduced-motion, tối ưu thêm, quyết định prerender/SEO production. Chưa có backend, push, commit hay deploy.

Next 1–3 actions: xem NEXT_STEPS.md. Dừng ở ranh giới này theo yêu cầu giới hạn token; không có source edit dang dở. Server kiểm thử tự đóng; không cần giữ server để resume.

Do not redo: không scaffold/cài lại skill hoặc đổi stack; không chạy seed extraction để ghi đè dữ liệu/audit đã biên tập; không đọc/tái xuất dữ liệu cá nhân trong thư mục học vụ; không sửa master hoặc audit fix --force.
