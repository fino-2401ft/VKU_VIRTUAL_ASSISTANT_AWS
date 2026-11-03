# Task board

- VKU-001 · P0 · DONE · audit môi trường, toàn bộ master, skill/README. Evidence: DECISIONS, skill-evidence.
- VKU-002 · P0 · DONE (có giới hạn kiểm chứng) · kiểm tra S01–S22, ghi CONTENT_AUDIT; nguồn unavailable không được gắn verified. Nguồn nền tối thiểu S11/S14 truy cập được; thành lập từ S20 search index.
- VKU-101 · P1 · DONE · design alternatives, tokens, 5 wireframes, component contracts trong DESIGN_SYSTEM.
- VKU-102 · P1 · DONE · Home prototype + screenshot 1440/390/menu; build/typecheck/lint pass; 0 axe violations và không overflow. Evidence: UI_AUDIT, screenshots.
- VKU-201 · P2 · DONE · React/Vite/TS strict/Tailwind/Router, layout/metadata/lazy/loading/error/404, 22 ngành + 6 notices + 22 nguồn. Build/typecheck/lint, 7 unit/integration và 8 E2E pass. Không coi route foundation là trang hoàn thiện P3/P4.
- VKU-301 · P3 · DONE · Home/About/History/Leadership/Campus/Admissions/Methods/Tuition có bố cục riêng, nguồn hoặc trạng thái xác minh. Gate hành trình + desktop/mobile review đạt qua 14 E2E và screenshots. Nội dung chưa có nguồn đầy đủ dùng fallback đúng spec, không coi đã xác minh toàn bộ nội dung.
- VKU-302 · P3 · DONE (giới hạn dữ liệu) · Program explorer/detail/related: search/filter/sort/reset/query URL, unknown slug 404, nguồn và cảnh báo rõ. Screenshots desktop/mobile đã xem; degree/duration chưa có dữ liệu xác minh nên chưa mở filter.
- VKU-401 · P4 · TODO · News/Notices/Life/Contact/FAQ + demo wizard/tour/events. Dependency VKU-301; gate không route rỗng hoặc form gửi dữ liệu.
- VKU-501 · P5 · TODO · 6 viewports, Playwright/axe/Lighthouse, SEO/audit/README. Dependency VKU-401; gate các kiểm thử pass và giới hạn minh bạch.
- VKU-C01 · User correction · IN_PROGRESS · Nội dung trực tiếp ngành/phương thức/hồ sơ/học phí/học bổng; danh bạ từ HTML bổ sung. Có dữ liệu và UI thực; đang nghiệm thu E2E cuối. Mục ảnh/tin/CLB/sự kiện bổ sung được loại khỏi phạm vi theo yêu cầu mới.

Chỉ dùng DONE khi có bằng chứng nghiệm thu. DONE (có giới hạn kiểm chứng) của audit là đã kiểm tra và ghi kết quả, không có nghĩa mọi nguồn được xác minh.
