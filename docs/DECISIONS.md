# Quyết định triển khai

Ngày: 03/11/2026 · Asia/Bangkok.

- D01: Triển khai tại root hiện có. Giữ nguyên master plan và bốn thư mục tài liệu học vụ, không đọc/tái xuất dữ liệu sinh viên. Không tự init Git, commit, push hoặc deploy.
- D02: Local-only theo master plan. Áp dụng nhánh local-only của Sites; không đăng ký hosting. React/Vite/TypeScript strict, Tailwind v4 qua plugin Vite, React Router; không backend/runtime fetch.
- D03: Skill có sẵn tại `C:/Users/Admin/.codex/skills/ui-ux-pro-max/`. Đã đọc SKILL.md và README upstream. Không cài global hoặc ghi vào thư mục .agents bị bảo vệ. Dùng script tuyệt đối, lưu bằng chứng tra cứu trong docs/skill-evidence.
- D04: Generator `university education technology`, thử lại `university education`, đều trả pattern Portfolio Grid không phù hợp cổng đại học. Không áp dụng/persist pattern này. Domain style có Editorial Grid hợp lệ; typography có Vietnamese Friendly; kết hợp thiết kế biên tập với grid Swiss, navy/cyan theo brief.
- D05: Không sao chép logo/ảnh trường khi chưa có quyền. Dùng text wordmark và minh họa SVG tự tạo có nhãn, không giả ảnh campus VKU. Font self-host từ package Fontsource có giấy phép OFL, không gọi Google Fonts runtime.
- D06: Seed 22 ngành / 1500 được giữ để kiểm tra dữ liệu theo master, nhưng S05 chưa truy cập được. Không coi đó là xác minh mới. Cần banner provenance trước khi công bố. Kết quả tìm kiếm nguồn VKU còn nêu dự kiến 1700; giữ xung đột để duyệt, không tự sửa tổng.
- D07: Node 20.20.2 tương thích Vite 8.3.5 và plugin React 6.2.1. Vitest mới nhất 5.1 yêu cầu Node 22.12+, chọn Vitest 4.1.12. ESLint nhánh 9. Phiên bản khóa chính xác bằng package-lock.json sau khi cài.
- D08: Gate P1 yêu cầu Home desktop/mobile được render và xem trước khi triển khai rộng. Scaffold kỹ thuật tối thiểu là phần phục vụ prototype P1; chưa coi P2 hoàn thành.
- D09: Chưa có domain production: robots noindex, không canonical/sitemap giả. CSR chưa đáp ứng SEO crawler hoàn chỉnh.
- D10: Các route P2 có nội dung nền/nguồn nhưng không được tính là hoàn thiện P3/P4. News chưa có bài đủ điều kiện thì empty state; slug news trả 404. Demo forms ở trạng thái chưa triển khai, không dựng form gửi giả.
- D11: Program data JSON qua parser kiểm nhóm/năm/quota, giữ verifiedAt=null. Degree/duration bỏ trống. Trạng thái nguồn hiển thị rõ trên card/detail; không suy degree từ tên.
- D12: `npm audit` có 11 moderate thuộc dev toolchain minimatch; production audit 0. Không áp dụng downgrade/override major mù vì dễ phá API glob; lưu audit để xử lý ở P5.
- D13: P3 dùng 5 nhóm lĩnh vực trên Home thay 6 ngành nổi bật và không hiển thị tổng chỉ tiêu như trust counter. Phương thức có nhãn tham khảo 2026/chưa tái xác minh, scholarship chỉ link nguồn. History giữ mốc 2020 đã đối chiếu index; các mốc khác để pending. Đây là fallback cho nguồn thiếu theo spec, không tự mở rộng dữ liệu.
- D14: Dừng phiên tại checkpoint P3 theo yêu cầu giới hạn token, chưa mở P4. Chưa có form thật, backend, storage, push hoặc deploy. Các tác vụ tiếp theo ghi cụ thể trong NEXT_STEPS.
- D15 (user correction): Không bắt buộc dữ liệu K26; chấp nhận năm có nguồn, luôn ghi năm áp dụng. Nội dung các mục ngành/tuyển sinh/học phí/học bổng phải hiển thị trực tiếp; link chỉ làm dẫn chứng. Bỏ yêu cầu bổ sung nhóm ảnh/tin/CLB/sự kiện (mục 5) khỏi phạm vi lượt này.
- D16: Truy cập trực tiếp ngoài sandbox đã đọc được danh mục và văn bản tuyển sinh 2026. Đối chiếu đủ 22 ngành/tổng 1500, bằng cấp/thời lượng và mã xét tuyển; gỡ cảnh báo chưa tái xác minh đã lỗi thời. Mốc 1700 dự kiến không thay danh mục 1500 công bố tại nguồn đã đọc.
- D17: HTML người dùng là danh bạ giảng viên từ cổng đào tạo, gồm cả ngữ cảnh tài khoản riêng. Chỉ trích tên chuyên môn, nhãn Giảng viên và liên kết hồ sơ khoa học; không chép tài khoản, ảnh hồ sơ, số điện thoại/email cá nhân hay scripts. Không dùng 491 mục danh bạ làm số lượng nhân sự cơ hữu VKU. Ban giám hiệu trình bày theo nhiệm kỳ 2020–2025 mà nguồn ghi rõ, không tự gắn hiện nhiệm 2026.
- D18 (04/11): Hoàn thiện các demo bằng state React cục bộ và native dialog; form có error summary nhận focus + lỗi inline. Tên/email tùy chọn, không thu giấy tờ. Không có submit mạng/storage. Wizard/tour không ngày giờ/suất hoặc booking. Không bổ sung dữ liệu hoạt động mới thuộc mục 5 đã bỏ.
- D19: Nhãn select mới tách khỏi phần options để accessible name đúng “Chủ đề”; test đầu phát hiện lỗi này, đã sửa UI và rerun cả 22 E2E pass. P4 được đánh giá trong phạm vi người dùng đã điều chỉnh; P5 vẫn còn Lighthouse/audit cuối.
