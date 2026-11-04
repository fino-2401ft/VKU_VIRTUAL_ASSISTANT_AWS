# Next steps

1. VKU-501 / P5: Lighthouse desktop/mobile trên production preview, đọc báo cáo rồi tối ưu các điểm thực sự ảnh hưởng. Không tuyên bố đã đạt điểm Lighthouse khi chưa chạy. Chưa có lighthouse trong dependency.
2. QA form/wizard/tour ở 320/768/1024/1920 và reduced-motion/keyboard/zoom; hiện E2E 22/22 và axe demo đã đạt 1440/390. Nội dung ngành/học phí/đội ngũ trước đó đã qua 24 kiểm tra overflow sáu viewport.
3. Xử lý dev dependency advisory minimatch theo cách tương thích (production audit trước 0, dev 11 moderate), audit copy/SEO/README/DoD rồi bàn giao. Không tự deploy, không tìm riêng K26, không bổ sung nhóm ảnh/tin/CLB/sự kiện đã bỏ.

Resume: đọc master + CURRENT_STATUS/DECISIONS/TASK_BOARD/CONTENT_AUDIT; giữ thay đổi hiện có. Baseline: build/typecheck/lint, 10 unit và 22 E2E pass. Browser/Vitest có thể cần quyền chạy ngoài sandbox do localhost/temp bị chặn. npm run dev để xem local; test:e2e tự tạo/dừng server 5175. Chỉ chạy lại các check bị ảnh hưởng khi có thay đổi; không scaffold hoặc chạy seed_from_master.py ghi đè dữ liệu đã biên tập.
