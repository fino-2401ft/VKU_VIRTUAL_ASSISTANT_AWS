# VKU Demo — Design System

## Bổ sung hình ảnh và font — 04/11/2026

Theo yêu cầu tiếp theo: thay wordmark tự dựng bằng logo_2021.png và bốn ô tiện ích bằng icon-elearning.jpg, tracuuvanbang.jpg, elib.jpg, dktc.png từ trang mẫu. Banner dẫn tới dịch vụ thật, mở tab mới có rel an toàn; form demo vẫn giữ nguyên. Logo mobile dùng khung hình phía trái và tên trường bằng chữ bên cạnh. Mọi ảnh có width/height đúng kích thước nguồn.

Nội dung và tiêu đề dùng Inter 400/500/600/700 với đầy đủ dấu tiếng Việt; font được subset Latin/Vietnamese và lưu WOFF (khoảng 45 KB mỗi weight). Menu desktop dùng UTM Bebas đúng CSS trang mẫu. Không request font/ảnh từ bên ngoài khi chạy. Nguồn và giấy phép/ghi nhận ở public/assets/credits.json. Ảnh review 05-images, 06-fonts và bản cuối 07-complete tại docs/screenshots/reference.

## Thiết kế trước lần bổ sung hình ảnh — 04/11/2026

Theo yêu cầu mới, dùng ảnh cổng đào tạo người dùng gửi làm mẫu: thanh tiện ích đỏ, masthead trắng, tên trường đỏ/cam/xanh, menu và footer vàng #ffd414. Trang chủ hai cột 23,4% / phần còn lại, khoảng cách 2,2%; container 89,5%, tối đa 1712px. Nội dung Arial 16–20px; tiêu đề khối đỏ 22–29px trên nền xám với vạch vàng. Tên trường dùng Georgia. Bo góc 4–5px; bỏ hero và các khối marketing cũ. Dưới 600px nội dung chính lên trước, tiện ích phía sau.

Triển khai tại src/styles/portal.css, sau globals.css. Wordmark chữ do dự án dựng, không phải bản logo chính thức. Banner học tập SVG tạo tại dự án. Giữ các route, dữ liệu và form demo. Không bổ sung thông báo giả để lấp đủ dòng ảnh mẫu. Font Arial thay font tải từ Fontsource; package cũ giữ lại, không phát sinh request font.

Ảnh từng phần và bản cuối: docs/screenshots/reference/. Các mục dưới đây ghi lại thiết kế trước lần điều chỉnh này.

03/11/2026 · Concept: Human-centered digital campus. Đây là lựa chọn thiết kế của dự án học tập, không phải nhận diện được VKU phê duyệt.

## Discovery thật từ UI UX Pro Max

Script: `C:/Users/Admin/.codex/skills/ui-ux-pro-max/scripts/search.py`.
Đã đọc skill, quick-reference và pro-rules (phần native chỉ tham khảo, không đồng nhất với web).
Lệnh và kết quả phù hợp lưu tại `docs/skill-evidence/*.txt`.

- Phương án A — Swiss Modernism 2.0: grid hình học, navy, typography học thuật. Mạch lạc nhưng gợi ý serif EB Garamond/Crimson Text thiên về trường truyền thống.
- Phương án B — Editorial Grid / Magazine + Vietnamese Friendly: headline sans lớn, khối ảnh/minh họa bất đối xứng, thẻ ngành dễ đọc, news phân cấp. Phù hợp tuyển sinh và công nghệ hơn. **Chọn B**, dùng tính kỷ luật grid của A.
- Generator hai lần trả Portfolio Grid không đúng ngữ cảnh; đã loại, không sinh MASTER tự động từ kết quả này.
- Typography match: Be Vietnam Pro + Noto Sans. Dùng Be Vietnam Pro self-host (400/500/600/700), fallback system sans để giảm tài nguyên.
- UX match: keyboard navigation, visible focus, không để sticky header che focus. React stack: Testing Library queries theo role/label (truy vấn đầu không match, đã retry `accessible`). Tailwind: grid gap và responsive visibility.

## Tokens triển khai

- Primary/navy `#08265a`; brand `#155fbc`; cyan `#13b8d1` chỉ trang trí, không dùng chữ trắng nhỏ trên cyan.
- Ink `#14223b`; muted `#52647a`; canvas `#f5f8fc`; surface `#ffffff`; border `#dbe5f0`.
- Accent warm `#f3dca4` dùng badge nền, chữ navy; danger `#b42318`; success `#147d57`.
- Type: H1 clamp(2.4rem,5vw,5rem), H2 clamp(1.9rem,3vw,3rem); body 16px/1.7, hero 18px. Heading line-height 1.14, không cắt dấu tiếng Việt.
- Container 1248px, gutter 20/28/36px. Nhịp 4/8/12/16/24/32/48/64/96px.
- Radius card 20px, button 12px; chỉ một shadow nhẹ. Icon Lucide 20/24px, stroke đồng nhất, decorative aria-hidden.
- Motion hover 180ms, lift 3px, intro tối đa 500ms. Reduced motion tắt animation và smooth scroll.

## Component contract

- Header: utility nhãn demo dễ thấy, wordmark text VKU, main nav, CTA khám phá ngành. Dropdown click/keyboard; mobile native dialog với Escape và trả focus.
- Buttons: primary navy/white, secondary viền navy, focus ring rõ. Control tối thiểu 44px; link nội tuyến có underline.
- Cards: semantic article, một link tiêu đề chính, group/nguồn/năm nhìn thấy. Không tạo vùng click giả không dùng keyboard.
- FAQ dùng details/summary native, nhãn câu hỏi đầy đủ.
- Forms: label thật, lỗi sát trường, không lưu hay truyền nội dung. Submit phải nói rõ chưa gửi.
- Modal/drawer: native dialog.showModal, focus mặc định, close/Escape, restore focus.
- Sources: link ngoài có nhãn nguồn, mở tab mới kèm noopener noreferrer.

## Wireframe responsive

- Home desktop: utility → navbar → hero 55/45 với minh họa lớn → thông tin nền → ngành nổi bật → about split → hướng dẫn tuyển sinh 3 bước → campus → notices → nghiên cứu → FAQ → CTA → footer. Mobile theo cùng thứ tự, hero và mọi grid một cột; không ẩn CTA.
- Programs desktop: breadcrumb/title/year banner → search full width → group chips + degree/sort → count/reset → 3-column cards. Mobile controls xếp dọc, chip wrap, card 1 cột.
- Admissions: title/year/status → 3 phương thức → quy trình tham khảo → học phí/học bổng → FAQ/nguồn. Mobile card xếp dọc.
- Notices: title → search/category/year → kết quả sắp mới đến cũ → pagination; chi tiết có ngày/hạn/nguồn. Mobile list 1 cột.
- Contact: title + demo banner → kênh liên hệ phân loại và form 2 cột; mobile nguồn trước form. Map là link tìm kiếm, không iframe.

## Gate P1

Chờ screenshot Home 1440px và 390px, review trước khi triển khai các trang còn lại. Kết quả thực đo và lỗi ghi ở UI_AUDIT.md, không tự nhận đạt WCAG chỉ dựa checklist.

## Điều chỉnh nội dung theo yêu cầu người dùng

Nội dung tuyển sinh/ngành/học phí/học bổng hiển thị trực tiếp trước nguồn. Giữ nhãn năm gọn, bỏ banner “chưa xác minh” khi đã đối chiếu. Bảng học phí có bộ chọn khóa 2020–2025 và nhóm ngành, caption/th/td đầy đủ; overflow chỉ trong vùng bảng có nhãn và focus được. Bốn scholarship cards cho mức tiền và số học kỳ; điều kiện ngay dưới. Danh bạ dạng card 3/2/1 cột, search không dấu, lọc học vị, phân trang 12 mục; không dùng số mục danh bạ làm trust stat nhân sự. Skill query `table responsive --domain ux` đã dùng cho vùng bảng mobile; evidence content-tables.txt. Không bổ sung ảnh/tin/CLB/sự kiện theo phần 5 người dùng đã bỏ.
