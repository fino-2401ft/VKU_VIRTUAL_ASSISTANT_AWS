# VKU Demo — Design System

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
