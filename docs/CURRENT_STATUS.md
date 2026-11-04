# Current status

Updated: 2026-11-04 (Asia/Bangkok)
Current phase: P4 checkpoint hoàn tất trong phạm vi điều chỉnh; P5 tiếp theo
Current task ID: VKU-C01, VKU-401a, VKU-401b DONE; VKU-501 TODO
Git: không có repository; không init/commit/push/deploy.

## Đã hoàn thành

P0–P3 nền tảng và bố cục đã có. Theo điều chỉnh của người dùng, website đã hiển thị nội dung trực tiếp thay vì chỉ dẫn link:

- 22 ngành/1500 chỉ tiêu năm 2026 đã đọc và đối chiếu nguồn chính thức: mã xét tuyển, bằng cấp, thời gian 4/4,5 năm, tổ hợp dự kiến và ngành liên quan. Bộ lọc bằng cấp hoạt động.
- Ba phương thức 301/407/402 có đối tượng, nguyên tắc và yêu cầu; giữ nhãn dự kiến ở phần nguồn ghi dự kiến. Ba nhóm hồ sơ và hạn năm 2026 được trình bày trực tiếp, nhãn đã qua hạn.
- Bảng học phí tín chỉ HK1 2026–2027 cho các khóa 2020–2025, chọn khóa/nhóm chương trình; ô thiếu giữ null. Bốn mức học bổng 70/50/40/25 triệu có điều kiện và cách khấu trừ.
- Giới thiệu/triết lý/giá trị và lịch sử có nội dung. Ban giám hiệu gắn nhiệm kỳ 2020–2025. Danh bạ trích từ HTML người dùng có tìm kiếm không dấu, lọc học vị, phân trang; 491 mục/178 link khoa học hợp lệ, không coi là thống kê nhân sự cơ hữu. Không lưu tài khoản, liên hệ cá nhân, ảnh hoặc scripts trong dữ liệu app.
- Liên hệ có địa chỉ, số/email văn phòng/tuyển sinh/đào tạo, nguồn đi kèm. Không bổ sung ảnh/tin/CLB/sự kiện theo mục 5 người dùng bỏ.

## Kiểm thử gần nhất

- Build/typecheck/lint PASS.
- Unit/integration: 10/10 PASS (3 files).
- E2E cuối: 22/22 PASS (1.4m). Có search/detail, tuition filters, scholarship values, faculty search/rank/pagination, form validation, modal focus/Escape, không POST/storage, wizard và tour không hồ sơ/booking, keyboard, 404 và source checks.
- Axe 0 violations trên 11 routes ở 1440/390; không runtime request ngoài localhost trong các trang kiểm tra.
- scripts/review-content.mjs: 24 trường hợp (4 trang x 320/390/768/1024/1440/1920), không overflow. Screenshots tuition/faculty/program-detail/contact đã lưu; đã xem học phí desktop và đội ngũ mobile.
- Lần E2E trước fail 2 do nhãn link nguồn học phí đổi; selector cập nhật đúng nhãn, lần sau 16/16 PASS.

## Demo hoàn thành và giới hạn

Đã thêm form liên hệ và tư vấn với trường cá nhân tùy chọn, validation inline + summary có focus, modal nói rõ chưa gửi. Wizard hồ sơ 3 bước có quay lại/làm lại, không upload. Tour giả lập chọn chủ đề, không ngày/suất hoặc booking thật. Các trạng thái chỉ trong bộ nhớ React; không network hoặc storage. Bộ test 22/22 xác nhận và axe trên các route demo cũng không có violations. Đã xem screenshot modal desktop/mobile và wizard. Không có lỗi app đang biết trong phạm vi đã test. Không có source edit dang dở.

P5 còn Lighthouse, full form/keyboard/reduced-motion audit và dev dependency advisories (production audit trước 0, dev trước 11 moderate). Chưa prerender, robots noindex, chưa có domain; không canonical/sitemap giả.

Do not redo: không scaffold/cài lại skill, không chạy seed_from_master.py ghi đè dữ liệu đã xác minh, không dùng số 1700 dự kiến thay danh mục đã đọc, không yêu cầu riêng dữ liệu K26, không thêm phần 5 đã bỏ. Raw HTML riêng người dùng không được chép vào source/public.

Next: NEXT_STEPS.md. Nguồn và bằng chứng: CONTENT_AUDIT.md, docs/research, docs/screenshots.

Dừng tại ranh giới tính năng demo để lưu checkpoint trước khi gần hết ngữ cảnh theo yêu cầu người dùng. Tiếp tục VKU-501, không làm lại nguồn/thiết kế hoặc mở rộng nhóm nội dung 5 đã bỏ.
