# Next steps

1. VKU-401 / P4: thay ContactFoundationPage và PendingDemoPage bằng form demo có validation, modal “chưa được gửi”, wizard hồ sơ 3 bước và Campus Tour không booking. Không thu giấy tờ/upload/storage/network. Bắt đầu một task nhỏ: Contact form + tests chống POST/storage.
2. Hoàn thiện bố cục Life/Clubs/Research, News empty state có search/filter phù hợp, Events không tạo ngày giả. Giữ Notices/FAQ đang chạy; chỉ thêm tin/CLB/ảnh khi có nguồn và quyền. Tái kiểm nguồn tuyển sinh và xung đột chỉ tiêu nếu truy cập phục hồi.
3. VKU-501 / P5: kiểm 320/390/768/1024/1440/1920, forms/keyboard/reduced-motion/axe, Lighthouse mobile/desktop; xử lý dev dependency advisories tương thích; audit copy/metadata/README và ghi final DoD. Không tự deploy.

Resume: đọc master và tất cả docs checkpoint; kiểm tra package-lock và code hiện tại, chạy `npm run typecheck`, `npm run build`, `npm test` trước khi sửa. Hiện 7 unit/integration và 14 E2E pass. Trong môi trường này Vitest và Chrome localhost cần chạy ngoài sandbox; lỗi EPERM/ERR_NETWORK_ACCESS_DENIED không đồng nghĩa code fail. Không scaffold lại hoặc xóa thư mục có sẵn.

Chạy app: `npm run dev` → http://127.0.0.1:5173/. Chạy E2E: `npm run test:e2e` tự tạo/dừng server port 5175 và dùng Chrome đã cài. Review Home: `node scripts/review-home.mjs` tự tạo/dừng server 5174. Không cần cài thêm browser.
