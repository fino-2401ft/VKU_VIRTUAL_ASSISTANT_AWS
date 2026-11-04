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

Đọc docs/CURRENT_STATUS.md, TASK_BOARD.md, NEXT_STEPS.md, DECISIONS.md. Website có nội dung trực tiếp về ngành, mã/bằng/thời lượng/tổ hợp, phương thức/hồ sơ, bảng học phí theo khóa, học bổng và điều kiện. Giới thiệu/liên hệ và danh bạ chuyên môn đã bổ sung từ nguồn chính thức và bản HTML người dùng cung cấp.

Các form liên hệ/tư vấn, wizard hồ sơ và Campus Tour chỉ là demo. Có validation và thông báo chưa gửi; không POST/storage/upload hoặc tạo hồ sơ/booking. Nhóm bổ sung ảnh/tin/CLB/sự kiện đã bỏ theo yêu cầu; P5 hiệu năng và audit cuối còn tiếp tục.

Mốc kiểm tra 04/11/2026: build/typecheck/lint đạt, 10 unit/integration và 22 Playwright tests đạt. Screenshot thực tại docs/screenshots; đã kiểm axe desktop/mobile và overflow các trang nội dung ở sáu kích thước. Chưa có Lighthouse/full accessibility audit.

Skill được dùng từ `C:/Users/Admin/.codex/skills/ui-ux-pro-max/`; evidence trong docs/skill-evidence, không cần cài lại global. `scripts/seed_from_master.py` là công cụ trích seed ban đầu, không chạy lại để ghi đè các dữ liệu/audit đã biên tập.

E2E dùng Chrome có sẵn; `npm run test:e2e` tự mở/dừng server local 5175. Môi trường sandbox có thể chặn Vitest rename temp hoặc Chrome truy cập localhost; cần quyền chạy test ngoài sandbox khi gặp lỗi môi trường này.
Demo local là CSR/noindex, chưa có domain/canonical/sitemap hoặc SEO prerender. Static hosting về sau phải có SPA fallback tới index.html. Chưa push/deploy.
