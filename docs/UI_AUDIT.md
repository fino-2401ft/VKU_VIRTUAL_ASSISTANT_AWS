# UI audit

03/11/2026. P1 đã chạy Chrome headless/Playwright + axe. Chưa tuyên bố đạt toàn bộ WCAG.

- Thiết kế: editorial university, navy/cyan; chỉ một vùng dark navy hero; body 16px; không giả ảnh campus.
- P1 cần screenshot 1440/390, kiểm typography Việt, mobile menu, CTA, focus, overflow.
- P5 cần bổ sung 320/768/1024/1920, forms/modals/keyboard, axe và Lighthouse.

## P1 — Home prototype

- `node scripts/review-home.mjs` (ngoài sandbox, Vite/Chrome cùng môi trường) PASS 03/11/2026 21:35.
- Screenshot thực: screenshots/home-1440.png, home-390.png; ảnh viewport riêng và menu-390.png. Đã xem ảnh desktop/mobile/menu.
- Axe tags wcag2a/wcag2aa/wcag21aa/wcag22aa: 0 violations trên Home 1440/390. Chi tiết home-review.json.
- Mobile lần đầu có overflow: Tailwind `.container` width 100% cộng margin của CTA cuối. Đã sửa width calc theo gutter; rerun cả hai viewport overflow=false.
- Typography hero ban đầu ngắt “công nghệ” giữa dòng. Đã đặt cụm nhấn thành dòng riêng; giữ glyph tiếng Việt. Tăng nội dung paragraph quan trọng lên 16px.
- Menu native dialog mở được, Escape đóng được; chưa hoàn thành review tab loop thủ công trên mọi trang.
- `npm run typecheck`, `npm run build`, `npm run lint` PASS cho prototype.
- Chưa có ảnh campus được cấp phép: minh họa có alt/caption rõ ràng. Chưa đạt gate P5 về asset/performance/đa trang.

## P2 — Foundation và chương mục dữ liệu

- `npm test`: 2 files / 7 tests PASS (ngoài sandbox do EPERM rename temp trong sandbox).
- `npm run test:e2e`: 8 tests PASS / 43.0s, Chrome desktop 1440 và mobile 390. Có smoke các route foundation, invalid slug, menu → search không dấu → detail → refresh, notices filter/source/expiry.
- Axe 0 violations trên Home, Programs, Admissions foundation, Notices, Contact foundation và FAQ ở hai viewport. Chỉ là kiểm tra tự động, không thay review thủ công toàn bộ WCAG.
- Không overflow và không request runtime ngoài localhost trên 6 trang trên.
- Đã xem screenshots/programs-desktop.png và programs-mobile.png. Provenance banner dài có chủ đích do xung đột chỉ tiêu; nội dung nghề nghiệp/chương trình chưa xác minh được bỏ.
- Native menu bổ sung aria-expanded/controls, click-outside desktop và bố cục nút đóng; cần rerun E2E sau thay đổi cuối.
- Npm audit: production 0 vulnerabilities; toolchain dev có 11 moderate qua minimatch <11.0.1. Không chạy audit fix --force vì npm đề xuất downgrade phá cấu hình. File dependency-audit*.json lưu chi tiết; cần xử lý tương thích ở P5.

## P3 — Core content checkpoint 21:51

- Build/typecheck/lint/format PASS; unit/integration 7/7 PASS; E2E cuối 14/14 PASS (1.0m).
- Axe 0 violations + không overflow tại 1440/390 trên 10 routes: Home, Programs, Admissions, Methods, Tuition, About, Campus, Notices, Contact foundation, FAQ.
- Đã nghiệm thu hành trình Home → ngành → detail → refresh/nguồn; notices → lọc → detail; Home → Admissions → Methods → Tuition → FAQ; About → History → Campus/gallery; FAQ keyboard và 404 → ngành.
- Gallery mở bằng Enter, Escape đóng và trả focus; menu có aria-expanded/controls, desktop dropdown click-outside/Escape. Chưa thay thế review screen reader thủ công.
- Screenshots admissions-desktop/mobile đã xem. Lần chụp đầu gặp loading do không đợi lazy component; đã sửa test chờ H1/fonts và chụp lại.
- E2E lần trước fail 4 test do exact text bao gồm dấu + trong summary; đã sửa selector vào native summary, rerun 14 pass. Không giảm assertion hoặc tăng timeout để che lỗi.
- Home/menu screenshots cập nhật lần cuối 21:50; Home review 0 axe/no overflow. Menu nút đóng đã cùng hàng heading.
- Giảm homepage từ 6 ngành nổi bật thành 5 nhóm lĩnh vực + CTA FAQ vì từng ngành chưa tái xác minh. Không dùng 1500 làm trust counter, không hiển thị học bổng chưa kiểm chứng. Đây là fallback nội dung có chủ đích.
- Asset credits tại public/assets/credits.json, OFL license được giữ trong public. Không dùng logo/ảnh trường chưa có quyền.
- Chưa chạy Lighthouse hoặc 320/768/1024/1920; chưa nghiệm thu P4 form/wizard/tour, tin hoạt động và lịch sự kiện. P5 còn TODO.

## Content correction + P4 demo checkpoint — 04/11/2026

- Nội dung đã hiển thị trực tiếp: mã/bằng/thời lượng/tổ hợp ngành, ba phương thức, hồ sơ/hạn, bảng học phí chọn khóa/nhóm, học bổng và điều kiện, giới thiệu/liên hệ/danh bạ. Không còn banner chưa xác minh ở dữ liệu đã đọc được nguồn. Sổ nguồn mới thay thế các giới hạn nội dung P3 cũ ở trên.
- Unit/integration: 10/10 PASS; build/typecheck/lint PASS. E2E cuối 22/22 PASS (1.4m), gồm 16 foundation/content tests và 6 demo tests desktop/mobile.
- Axe các trang nội dung và form/wizard/tour tại 1440/390: 0 violations; modal contact cũng đã scan. Không có POST và localStorage/sessionStorage vẫn trống sau thao tác demo. Không input upload hoặc ngày booking.
- Form invalid có summary nhận focus, lỗi liên kết trường. Modal đóng bằng Escape/trả focus. Wizard có validation checklist, back/reset; hoàn tất nói rõ không tạo hồ sơ. Tour không tạo lịch hẹn.
- Đã xem contact-demo-result-desktop/mobile.png, application-demo-desktop.png, tour-demo-result-mobile.png. Layout và copy xác nhận đúng; không có thông tin thật trong ảnh test.
- scripts/review-content.mjs: 24/24 trường hợp không overflow (4 trang x 320/390/768/1024/1440/1920). Các demo mới được kiểm tại 1440/390, còn viewport trung gian/reduced-motion/zoom ở P5.
- Test đầu phát hiện select accessible label bao gồm options do label bọc select; đã tách label + htmlFor. Rerun toàn bộ PASS, không giảm assertion.
- Chưa có Lighthouse, chưa nhận đạt WCAG toàn diện. Không thêm ảnh/tin/CLB/sự kiện theo mục 5 người dùng đã bỏ.
