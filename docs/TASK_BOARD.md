# Task board

- VKU-001 · P0 · DONE · audit môi trường, toàn bộ master, skill/README. Evidence: DECISIONS, skill-evidence.
- VKU-002 · P0 · DONE (có giới hạn kiểm chứng) · kiểm tra S01–S22, ghi CONTENT_AUDIT; nguồn unavailable không được gắn verified. Nguồn nền tối thiểu S11/S14 truy cập được; thành lập từ S20 search index.
- VKU-101 · P1 · DONE · design alternatives, tokens, 5 wireframes, component contracts trong DESIGN_SYSTEM.
- VKU-102 · P1 · DONE · Home prototype + screenshot 1440/390/menu; build/typecheck/lint pass; 0 axe violations và không overflow. Evidence: UI_AUDIT, screenshots.
- VKU-201 · P2 · DONE · React/Vite/TS strict/Tailwind/Router, layout/metadata/lazy/loading/error/404, 22 ngành + 6 notices + 22 nguồn. Build/typecheck/lint, 7 unit/integration và 8 E2E pass. Không coi route foundation là trang hoàn thiện P3/P4.
- VKU-301 · P3 · DONE · Home/About/History/Leadership/Campus/Admissions/Methods/Tuition có bố cục riêng, nguồn hoặc trạng thái xác minh. Gate hành trình + desktop/mobile review đạt qua 14 E2E và screenshots. Nội dung chưa có nguồn đầy đủ dùng fallback đúng spec, không coi đã xác minh toàn bộ nội dung.
- VKU-302 · P3 · DONE (giới hạn dữ liệu) · Program explorer/detail/related: search/filter/sort/reset/query URL, unknown slug 404, nguồn và cảnh báo rõ. Screenshots desktop/mobile đã xem; degree/duration/mã ngành đã xác minh ở VKU-C01, filter bằng cấp đã mở.
- VKU-401 · P4 · DONE trong phạm vi điều chỉnh · Notices/FAQ/Contact + tư vấn/hồ sơ/tour demo đã hoạt động. Không bổ sung nhóm ảnh/tin/CLB/sự kiện theo người dùng; các route thuộc nhóm đó giữ nội dung nền/trạng thái sẵn có. P5 chưa hoàn tất.
- VKU-501 · P5 · TODO · 6 viewports, Playwright/axe/Lighthouse, SEO/audit/README. Dependency VKU-401; gate các kiểm thử pass và giới hạn minh bạch.
- VKU-C01 · User correction · DONE · Nội dung trực tiếp ngành/phương thức/hồ sơ/học phí/học bổng; danh bạ từ HTML bổ sung. Build/typecheck/lint, 10 unit và 16 E2E PASS. Đã xác minh lại nguồn; bỏ yêu cầu bổ sung nhóm ảnh/tin/CLB/sự kiện theo người dùng.
- VKU-401a · P4 · DONE · Contact/consultation demo forms: validation, xác nhận không gửi, không network/storage, keyboard.
- VKU-401b · P4 · DONE · Hồ sơ wizard/tour giả lập không upload/booking; không bổ sung dữ liệu hoạt động/ảnh/sự kiện.

Chỉ dùng DONE khi có bằng chứng nghiệm thu. DONE (có giới hạn kiểm chứng) của audit là đã kiểm tra và ghi kết quả, không có nghĩa mọi nguồn được xác minh.
