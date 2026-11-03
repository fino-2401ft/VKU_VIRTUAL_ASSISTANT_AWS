# VKU UNIVERSITY WEBSITE — MASTER IMPLEMENTATION PLAN FOR AI CODING AGENT

> **Phiên bản:** 1.0  
> **Ngày biên soạn / mốc kiểm chứng dữ liệu:** 03/11/2026 (Asia/Ho_Chi_Minh)  
> **Đề bài:** Website thông tin Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn (VKU), Đại học Đà Nẵng.  
> **Đối tượng đọc:** Codex / Claude Code / Cursor / các AI coding agent khác.  
> **Trạng thái:** SPEC ĐÃ CHỐT; CHƯA TRIỂN KHAI CODE.  
> **Skill bắt buộc cho thiết kế:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/  
> **Chú ý:** Đây là dự án **frontend demo do người học phát triển**, **KHÔNG PHẢI website chính thức của VKU**. Phải có nhãn phân biệt dễ nhìn, không tạo cảm giác một dịch vụ tiếp nhận hồ sơ chính thức.

---

## 0. HƯỚNG DẪN ƯU TIÊN CAO NHẤT CHO AGENT

Bạn là AI coding agent chịu trách nhiệm nghiên cứu có kiểm chứng, thiết kế và triển khai hoàn chỉnh frontend theo tài liệu này.

1. **Không hỏi lại** các quyết định đã chốt: website nhiều trang; React + Vite + TypeScript + Tailwind CSS; phong cách *Modern University × Technology & Innovation*; dữ liệu local; form chỉ demo, không backend.
2. **Đọc toàn bộ tài liệu này trước khi làm**, kiểm tra repository hiện có, `package.json`, trạng thái Git, version Node/npm, skill có sẵn và checkpoint.
3. **Dùng UI UX Pro Max Skill thật sự**, không chỉ viện dẫn tên: đọc `SKILL.md`, thực hiện design-system discovery, ghi quyết định vào `docs/DESIGN_SYSTEM.md`, triển khai token nhất quán và audit UX sau mỗi nhóm trang.
4. **Thông tin thực tế phải có nguồn**; không tự bịa thành tích, lãnh đạo hiện nhiệm, ngày tuyển sinh, chương trình học, học phí, học bổng, số điện thoại, trích dẫn của sinh viên, hình ảnh, lời chứng thực. Nếu không kiểm chứng được: thiết kế trạng thái `Đang cập nhật`, link nguồn chính thức hoặc bỏ phần đó.
5. **Không giả làm website của trường**: footer và các form có nhãn *Website giới thiệu VKU — sản phẩm demo học tập, không phải cổng chính thức*. Không thu, truyền, lưu dữ liệu nhạy cảm hay hồ sơ thật.
6. **Không có backend**, API, database, authentication, serverless endpoint, cron, CMS, crawler chạy trong browser. Không lấy/đồng bộ tự động tin mới. Dữ liệu là tập TypeScript/JSON đã biên tập, có ngày và link nguồn.
7. **Không khẳng định “đang mở đăng ký” khi đợt tuyển sinh đã qua**. Tuyển sinh năm 2026 là thông tin tham khảo lịch sử tại ngày 03/11/2026, trừ khi xác nhận đợt mới có hiệu lực.
8. **Làm theo giai đoạn**, build/test sau từng giai đoạn; ghi checkpoint để agent khác tiếp quản ngay cả khi hết context/token. Không tự ý xóa dữ liệu, sửa file ngoài repo, đẩy Git, deploy, đăng tải hoặc cài phần mềm hệ thống với đặc quyền quản trị.
9. Mục tiêu không phải “trang quảng cáo nhìn đẹp nhưng rỗng”; mọi route bắt buộc phải có nội dung, điều hướng, trạng thái rỗng/lỗi, responsiveness và semantic HTML.
10. Nếu yêu cầu xung đột: **đúng dữ liệu, an toàn, khả dụng và khả năng truy cập > hiệu ứng > trang trí**. Ghi mọi thay đổi phạm vi vào `docs/DECISIONS.md`.

---

## 1. PHẠM VI ĐÃ CHỐT

| Hạng mục | Quyết định |
|---|---|
| Loại sản phẩm | Website thông tin trường đại học nhiều trang (university information portal) |
| FE | React + Vite + TypeScript |
| CSS | Tailwind CSS; token tập trung, responsive mobile-first |
| Router | React Router (chọn phiên bản tương thích dự án) |
| Ngôn ngữ | Tiếng Việt là chính; chỉ thiết kế khả năng mở rộng i18n, **chưa cần** dữ liệu song ngữ đầy đủ |
| Dữ liệu | `src/data/*.ts` hoặc `src/data/*.json`, import tại build time |
| Tính năng | Tìm kiếm, lọc ngành, bộ lọc thông báo, FAQ accordion, ảnh gallery, form demo, animation tinh tế |
| Mạng/API | Chỉ liên kết ra nguồn VKU chính thức; không gọi API hoặc scrape thời gian thực |
| Form | Tương tác/validation frontend; tuyệt đối không thực hiện gửi hồ sơ hoặc lưu thông tin cá nhân |
| Người xem | Học sinh THPT, phụ huynh, sinh viên hiện tại, giảng viên, doanh nghiệp, khách truy cập |
| Phong cách | Modern University (sạch, nghiêm túc, ảnh campus) + Technology & Innovation (gradient xanh, grid, chuyển động có kiểm soát) |
| SEO | Metadata per route; sitemap/robots; nếu yêu cầu SEO cho crawler thực tế thì **ưu tiên prerender/SSG tĩnh**, không nhầm CSR với SSR |
| Hiệu năng | Tối ưu trải nghiệm trên thiết bị di động, ảnh và JS không gây lag |
| Tiêu chuẩn | TypeScript strict, ESLint, Prettier, Vitest/Testing Library, Playwright, Lighthouse, accessibility WCAG 2.2 AA làm mục tiêu |

### Mục tiêu người dùng

- **Học sinh/Phụ huynh:** hiểu VKU, chọn ngành, xem phương thức, học phí, học bổng, chuẩn bị hồ sơ theo **năm tuyển sinh được công bố**, biết cách liên hệ đúng kênh.
- **Sinh viên:** tìm nhanh thông báo học vụ, lịch thi, công tác sinh viên, học phí, phúc khảo và cổng thông tin đào tạo chính thức.
- **Đối tác/Khách:** nhận diện nhà trường, lịch sử, cơ sở vật chất, nghiên cứu, hoạt động, phương thức hợp tác.

### Không thuộc phạm vi

- Cổng đăng ký tuyển sinh/học vụ thật; đăng nhập tài khoản SV, tra cứu điểm cá nhân, dữ liệu cá nhân, tải hồ sơ thật, chatbot AI trực tuyến, thanh toán, email/SMS tự động, CMS, lịch đồng bộ realtime.
- Nội dung của trường phổ thông: xe buýt đón học sinh, bán trú/tiền ăn, Montessori, đồng phục phổ thông, chương trình Cambridge/IB chưa có xác minh. Thay bằng thông tin đại học: tín chỉ, ngành học, ký túc xá, nghiên cứu, Đoàn/Hội, việc làm, học bổng.
- Không hứa “việc làm 100%” hoặc số liệu thống kê khác chỉ vì một trang marketing hiển thị; cần báo cáo phương pháp và năm khảo sát nếu muốn đưa lên UI.

---

## 2. SỔ NGUỒN CHÍNH THỨC VÀ QUY TẮC XÁC THỰC

### 2.1. Danh mục nguồn gốc

| Mã | Nguồn | URL | Dùng cho |
|---|---|---|---|
| S01 | Trang chủ VKU | https://vku.udn.vn/vi/ | Tin trường, đối ngoại, cấu trúc nhà trường |
| S02 | Giới thiệu VKU | https://vku.udn.vn/vi/gioi-thieu/ | Tên, thành lập, triết lý, lịch sử, campus |
| S03 | Ban giám hiệu | https://vku.udn.vn/vi/co-cau-to-chuc/ban-giam-hieu/ | **Phải kiểm tra nhiệm kỳ/hiện trạng trước khi đăng tên và ảnh** |
| S04 | Cổng tuyển sinh | https://tuyensinh.vku.udn.vn/ | Tin tuyển sinh theo năm |
| S05 | Danh sách ngành | https://tuyensinh.vku.udn.vn/nganh | Dữ liệu 22 lựa chọn năm 2026 |
| S06 | Phương thức tuyển sinh | https://tuyensinh.vku.udn.vn/phuongthuc | Phương thức năm 2026, không tái sử dụng cho 2027 |
| S07 | Sứ mạng, tầm nhìn | https://tuyensinh.vku.udn.vn/su-mang | Giá trị cốt lõi, triết lý |
| S08 | Thông tin tuyển sinh 2026 | https://tuyensinh.vku.udn.vn/thong-bao/699d270922d808765d0d6ad2 | Tổng chỉ tiêu, năm áp dụng |
| S09 | Học bổng tuyển sinh khóa 2026 | https://tuyensinh.vku.udn.vn/thong-bao/699fedf448d97e2c10006596 | Mức và điều kiện có thời hạn |
| S10 | Thông báo tuyển sinh 2026 | https://tuyensinh.vku.udn.vn/thong-bao/69af03ade1fedb5e0308e873 | Mã/tổ hợp ngành, kiểm tra chéo |
| S11 | Cổng đào tạo VKU | https://daotao.vku.udn.vn/ | Phân loại thông báo, nguồn danh sách |
| S12 | Khảo thí & ĐBCLGD | https://daotao.vku.udn.vn/vku-thong-bao-khao-thi | Lịch thi, phúc khảo |
| S13 | Công tác sinh viên | https://daotao.vku.udn.vn/vku-thong-bao-ctsv | Chính sách, hoạt động SV |
| S14 | Học phí HK1 2026–2027 | https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-thu-hoc-phi-hoc-ky-1-nam-hoc-2026-2027-1397.html | Học phí phân khóa/ngành/hệ, lưu ý đối tượng từ khóa 2025 trở về trước |
| S15 | Bảo hiểm năm 2027 | https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-ve-viec-thu-tien-bao-hiem-y-te-va-bao-hiem-than-the-nam-2027-doi-voi-sinh-vien-1399.html | Thông báo công tác tài vụ |
| S16 | Lịch thi thực tập HKI 2026–2027 | https://daotao.vku.udn.vn/thong-bao-khao-thi/thong-bao-lich-thi-ket-thuc-cac-hoc-phan-thuc-tap-hki-nam-hoc-2026-2027-1400.html | Bài thông báo có ngày |
| S17 | Xếp lớp Anh văn K26 | https://daotao.vku.udn.vn/thong-bao-khao-thi/thong-bao-ket-qua-xep-lop-tieng-anh-dau-vao-doi-voi-sinh-vien-khoa-tuyen-sinh-nam-2026-1396.html | Bài thông báo có ngày |
| S18 | Phúc khảo HK3 2025–2026 | https://daotao.vku.udn.vn/thong-bao-khao-thi/thong-bao-ket-qua-phuc-khao-hk32025-2026-1395.html | Thông báo khảo thí |
| S19 | Chính sách SV HK1 2026–2027 | https://daotao.vku.udn.vn/thong-bao-ctsv/ctsv-thong-bao-ve-viec-nop-ho-so-thuc-hien-che-do-chinh-sach-cho-sinh-vien-hoc-ky-1-nam-hoc-2026-2027-1387.html | Thông báo CTSV |
| S20 | Thư ngỏ mốc phát triển | https://vku.udn.vn/vi/thu-ngo-ky-niem-05-nam-thanh-lap-truong-dai-hoc-cong-nghe-thong-tin-va-truyen-thong-viet-han-hanh-trinh-22-nam-hinh-thanh-va-phat-trien/ | Tóm tắt tiền thân |
| S21 | GitHub skill | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | Cài đặt và hướng dẫn UI/UX |
| S22 | CLI skill README | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/cli/README.md | `uipro init --ai codex` |

**Giới hạn kiểm chứng:** Một số trang VKU/tuyensinh có thể phản hồi chậm hoặc lỗi khi agent truy cập. Ghi `unverified` và dùng thông tin đã kiểm chứng từ nguồn chính thức khác. Đừng lấp khoảng trống bằng số liệu tạo ra.

### 2.2. Quy ước mỗi dữ liệu thực tế

Mỗi record quan trọng lưu: `id`, `title/name`, `sourceUrl`, `sourceName`, `publishedAt` nếu có, `verifiedAt`, `academicYear`/`admissionYear` nếu áp dụng, `validFrom`, `validUntil` khi có, `status`, `isOfficialSource`, `summary`, `tags`. Không tự suy ra `validUntil` từ ngày đăng trừ khi nội dung thực sự nêu hạn. Khi hết hạn, hiển thị **Đã qua thời hạn** hoặc **Thông tin tham khảo**, không kêu gọi đăng ký.

**Tất cả số liệu nhạy với năm**, kể cả chỉ tiêu, học phí, học bổng, phương thức xét tuyển, điểm chuẩn, người giữ chức vụ, lịch thi, sự kiện đều phải mang thời điểm. Cần `docs/CONTENT_AUDIT.md` ghi URL, trạng thái xác minh, ngày, sai lệch và người duyệt.

### 2.3. Thông tin được xác minh để làm nội dung nền

- Tên: **Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn**, thành viên **Đại học Đà Nẵng**; tên viết tắt **VKU**. Nguồn S02.
- Thành lập theo **Quyết định 15/QĐ-TTg ngày 03/01/2020**; kế thừa các đơn vị tiền thân. Nguồn S02, S20.
- Triết lý giáo dục: **Nhân bản – Phụng sự – Khai phóng**. Hệ giá trị được trường giới thiệu: **Đức – Trí – Thể – Mỹ; Uy tín – Chất lượng – Chuyên nghiệp; Kế thừa – Đổi mới – Sáng tạo**. Nguồn S02, S07.
- Định hướng đào tạo: CNTT, truyền thông và kinh tế số; **không tự sáng tác slogan chính thức**. Hero có thể dùng copy marketing do nhóm biên tập nhưng không đặt trong dấu ngoặc như lời tuyên bố chính thức.
- Địa chỉ liên hệ chính thức (theo các cổng): **470 Trần Đại Nghĩa, phường Ngũ Hành Sơn, TP. Đà Nẵng**. Nguồn S02, S04.
- Điện thoại tổng đài trên website trường: **0236 3 667 117**, email **info@vku.udn.vn** (kiểm tra lại khi triển khai). Hotline tuyển sinh cổng tuyển sinh: **0236 3 667 113**, email **tuyensinh@vku.udn.vn**; các bài tuyển sinh có số hotline khác theo từng thời điểm. Hiển thị theo nhãn rõ ràng, không trộn lẫn. Nguồn S04, S03.
- Cổng đào tạo: **https://daotao.vku.udn.vn/**. Trang dành cho sinh viên chỉ link ngoài, không dựng form đăng nhập giả.
- Số liệu tuyển sinh **2026**: **1.500 chỉ tiêu, 22 ngành/chuyên ngành, 3 phương thức tuyển sinh**. Nguồn S04, S05, S08. **Không gọi đây là chỉ tiêu 2027**.
- Phương thức 2026 được cổng tuyển sinh mô tả: (1) xét tuyển thẳng theo quy chế; (2) xét tuyển kết hợp; (3) xét tuyển bằng điểm ĐGNL của ĐHQG TP.HCM. Xem quy định chi tiết chính thức S06, S10, không diễn giải lại công thức/tính điểm nếu chưa duyệt.
- Học bổng đầu vào 2026 theo S09 có các mức **70 triệu (thủ khoa), 50 triệu (á khoa 1), 40 triệu (á khoa 2), 25 triệu (nhóm TOP 10 theo điều kiện trong thông báo)**. Đây là thông tin của **khóa 2026**; không khẳng định tự động áp dụng cho mọi khóa. Những học bổng chuyên ngành/đối tượng khác phải xác minh điều kiện trong S09.
- Học phí thông báo HK1 2026–2027 S14 **áp dụng sinh viên các khóa 2025 trở về trước**, đơn giá khác nhau theo khóa, nhóm ngành, hệ cử nhân/kỹ sư. **Không đưa một giá đồng nhất “học phí VKU X đồng”**. Giữ link văn bản, có thể xây bảng có lựa chọn khóa và loại chương trình sau khi nhập đủ số liệu có kiểm chứng.
- Cơ sở vật chất: giới thiệu về campus, phòng thực hành, thư viện, ký túc xá tại S02. **Lưu ý nguồn giới thiệu có chỗ ghi 21,5 ha và chỗ ghi 23,5 ha**; không đưa diện tích làm bộ đếm/kỷ lục đến khi xác minh con số chính thức thống nhất.
- Trang ban giám hiệu S03 vẫn nhắc phân công nhiệm kỳ **2020–2025**, vì vậy **không được khẳng định chắc danh sách lãnh đạo đang đương nhiệm vào 2026** nếu chưa có nguồn cập nhật.

### 2.4. Dữ liệu tuyển sinh 2026: 22 ngành/chuyên ngành làm seed

Nguồn danh mục S05 (đã đối chiếu tổng số 22 mục và 1.500 chỉ tiêu). Tên trên UI có thể rút gọn để dễ đọc nhưng chi tiết phải giữ tên gốc, loại bằng và năm; dấu `&` có thể chuẩn hóa thành “và” trong nhãn hiển thị. Chỉ tiêu là **năm 2026**, không tự áp dụng về sau.

| # | Tên hiển thị năm 2026 | Nhóm gợi ý cho bộ lọc | Chỉ tiêu 2026 |
|---|---|---|---:|
| 01 | Công nghệ Thông tin (Kỹ sư) | Công nghệ phần mềm & hệ thống | 180 |
| 02 | Công nghệ Thông tin (Cử nhân) | Công nghệ phần mềm & hệ thống | 120 |
| 03 | Công nghệ Game | Công nghệ phần mềm & hệ thống | 120 |
| 04 | Trí tuệ nhân tạo | AI & dữ liệu | 53 |
| 05 | Phân tích dữ liệu | AI & dữ liệu | 50 |
| 06 | An toàn thông tin | Công nghệ phần mềm & hệ thống | 70 |
| 07 | Công nghệ truyền thông | Truyền thông & thiết kế | 60 |
| 08 | Thiết kế Mỹ thuật số | Truyền thông & thiết kế | 60 |
| 09 | Công nghệ kỹ thuật máy tính (Kỹ sư) | Phần cứng & bán dẫn | 30 |
| 10 | Công nghệ kỹ thuật máy tính (Cử nhân) | Phần cứng & bán dẫn | 30 |
| 11 | Kỹ thuật phần mềm Ô tô | Phần cứng & bán dẫn | 30 |
| 12 | Thiết kế vi mạch bán dẫn | Phần cứng & bán dẫn | 40 |
| 13 | Đóng gói và kiểm thử vi mạch bán dẫn | Phần cứng & bán dẫn | 30 |
| 14 | Thiết bị bay không người lái | Phần cứng & bán dẫn | 30 |
| 15 | Kỹ thuật Robot và trí tuệ nhân tạo | AI & dữ liệu | 37 |
| 16 | Quản trị kinh doanh | Kinh tế số & quản trị | 60 |
| 17 | Marketing | Kinh tế số & quản trị | 135 |
| 18 | Công nghệ Tài chính | Kinh tế số & quản trị | 120 |
| 19 | Quản trị Logistics & Chuỗi cung ứng số | Kinh tế số & quản trị | 115 |
| 20 | Quản trị dịch vụ du lịch & lữ hành số | Kinh tế số & quản trị | 50 |
| 21 | Quản trị dự án Công nghệ thông tin | Kinh tế số & quản trị | 40 |
| 22 | Giải trí và truyền thông số | Kinh tế số & quản trị | 40 |
| | **Tổng** | | **1.500** |

**Agent bắt buộc:** nhập dữ liệu thành record có `admissionYear: 2026`, `quota: number`, `sourceUrl: S05`, `verifiedAt`, `degree` & `durationYears` chỉ sau khi đối chiếu từng mục S05, `description` chỉ viết tóm tắt trung tính đã xác minh; nếu chưa có chi tiết học phần chính thức thì đưa link chương trình tại nguồn, không tự bịa khung học phần/cơ hội việc làm/điểm chuẩn.

### 2.5. Tin/thông báo seed có thật

Các record ban đầu nên có tiêu đề, ngày, loại, source URL, `isArchived` tùy thời hạn thực tế, badge “Nguồn VKU”. Nội dung hiển thị là **tóm tắt ngắn**, button mở bài chính thức; không chép nguyên văn trang hay tái bản tệp chứa danh sách sinh viên có thông tin riêng tư.

| Ngày đăng | Nhóm | Tiêu đề rút gọn | Nguồn |
|---|---|---|---|
| 21/10/2026 | Tài vụ | Thu BHYT và bảo hiểm thân thể năm 2027 | S15 |
| 21/10/2026 | Khảo thí | Lịch thi kết thúc các học phần thực tập HKI 2026–2027 | S16 |
| 07/10/2026 | Học phí | Thu học phí HK1 năm học 2026–2027 | S14 |
| 05/10/2026 | Khảo thí | Kết quả xếp lớp tiếng Anh đầu vào K26 | S17 |
| 20/09/2026 | Khảo thí | Kết quả phúc khảo HK3 2025–2026 | S18 |
| 14/09/2026 | Công tác sinh viên | Hồ sơ thực hiện chế độ chính sách HK1 2026–2027 | S19 |
| 01/06/2026 | Tuyển sinh | Học bổng đầu vào khóa tuyển sinh 2026 | S09 |
| 14/02/2026 | Tuyển sinh | Công bố thông tin tuyển sinh năm 2026 | S08 |

Không đưa sự kiện tưởng tượng vào news card như một hoạt động đã diễn ra. Một số thông báo là yêu cầu hành chính có thời hạn, nên nhãn **Đã hết hạn** phải hiện nếu đã được xác minh; không đặt CTA “nộp ngay” trên tin cũ.

---

## 3. CHÂN DUNG THƯƠNG HIỆU VÀ ĐỊNH HƯỚNG THẨM MỸ

### 3.1. Creative direction

**Concept:** *Human-centered digital campus*. Trang web giúp người học thấy một môi trường đại học nhân bản trong thời đại công nghệ, thay vì một bảng tin hành chính khô khan.

- **Modern University:** nhiều khoảng trắng, typography có nhịp, ảnh đời sống/campus sắc nét, nội dung dễ kiểm chứng, thông tin tuyển sinh dễ tìm.
- **Technology & Innovation:** đường lưới mảnh, gradient xanh dương/cyan, điểm nhấn tương tác khi hover, một số mảng dark navy, shape trừu tượng tinh tế.
- **Không áp dụng glassmorphism tràn lan:** chỉ dùng thanh điều hướng nổi hoặc một vài card trên nền đủ tương phản; tuyệt đối không để chữ đọc khó trên ảnh.
- Vibe: chuyên nghiệp, trẻ trung, dẫn dắt bằng thông tin và hành động rõ ràng; không giống dashboard quản trị, không giống template startup SaaS.

### 3.2. Design tokens: đề xuất để skill kiểm chứng và tinh chỉnh

> **Các mã màu dưới đây là đề xuất của nhóm thiết kế, không khẳng định là bộ nhận diện thương hiệu được VKU phê duyệt.** Agent phải tham khảo logo/tài sản có quyền sử dụng trước khi hoàn thiện.

```css
:root {
  --color-brand-900: #08265a;
  --color-brand-800: #0b3b80;
  --color-brand-600: #155fbc;
  --color-accent-500: #13b8d1;
  --color-ink: #14223b;
  --color-muted: #64748b;
  --color-surface: #ffffff;
  --color-canvas: #f5f8fc;
  --color-border: #dbe5f0;
  --color-success: #147d57;
  --color-warning: #996100;
  --color-danger: #b42318;
  --radius-card: 1.25rem;
  --radius-button: .75rem;
  --shadow-card: 0 10px 36px rgba(9, 37, 88, 0.08);
}
```

- Typography Việt hóa tốt: thử **Be Vietnam Pro** (heading + body) hoặc phối **Be Vietnam Pro + Inter**; bảo đảm glyph tiếng Việt chính xác. Font dùng giấy phép hợp lệ, ưu tiên Google Fonts với fallback và `font-display: swap`.
- Type scale desktop: H1 `clamp(2.4rem, 5vw, 5rem)`, H2 `clamp(1.9rem, 3vw, 3rem)`, body 16–18px; mobile tối thiểu 16px cho nội dung chính.
- Layout: container max-width khoảng 1200–1280px; gutter mobile 20px, tablet 28px, desktop 36px; spacing scale 4/8/12/16/24/32/48/64/96.
- Card border nhẹ + shadow có kiểm soát; button primary nổi bật, secondary outline rõ; link có underline/focus state.
- Mọi component phải dùng design tokens, không hardcode màu và radius rải rác.
- **Không tự gắn logo giả.** Dùng logo VKU được phép sử dụng và lưu asset trong repo kèm nguồn/giấy phép; nếu chưa có, text wordmark “VKU” cùng nhãn demo, không vẽ biểu trưng chính thức sai.

### 3.3. Hình ảnh và multimedia

Ưu tiên ảnh campus, lab, thư viện, sân thể thao, sinh viên có nguồn từ trang VKU S01/S02 và các bài hoạt động. Mỗi hình cần `assetFilename`, `alt`, `sourceUrl`, `credit`, `licenseOrPermission`, `width`, `height`, `usage`. **Việc ảnh công khai xuất hiện trên website không mặc nhiên cho phép sao chép/tái sử dụng**: chỉ tải và dùng nếu có quyền hoặc được phép; nếu chưa rõ dùng ảnh placeholder có bản quyền phù hợp, chú thích minh họa, không giả mạo ảnh trường. Không hotlink hàng loạt ảnh từ server trường. Không dùng watermark, ảnh AI không gắn nhãn như ảnh chụp thật VKU. Video không tự phát tiếng, poster/fallback, lazy load.

### 3.4. Microinteraction

- Navbar: sticky, background sáng/blur vừa đủ khi scroll, desktop menu mở bằng click/keyboard và hover có kiểm soát; mobile drawer có focus trap và thoát Escape.
- Hero: fade/slide giới hạn 250–600ms; ảnh không parallax nặng, CTA có phản hồi.
- Program card: nâng 2–4px, shadow + border tinh tế; chip filter có active state rõ ràng.
- Section reveal: chỉ khi không cản nội dung/SEO; respect `prefers-reduced-motion`.
- Numbers: hạn chế counter animation gây hiểu sai; chỉ animate khi số liệu đã xác minh.
- Transition 150–250ms cho button, navigation, accordion; không dùng animation liên tục trên mọi card.
- LCP ưu tiên, không dùng full-screen video hero mặc định.

---

## 4. INFORMATION ARCHITECTURE VÀ ROUTE MAP

### 4.1. Điều hướng chính

**Header:** `Trang chủ` · `Giới thiệu` (dropdown) · `Ngành đào tạo` · `Tuyển sinh` (dropdown) · `Đời sống sinh viên` · `Tin tức & Thông báo` (dropdown) · `Liên hệ`  
**Utility nav:** `Tra cứu thông báo` · `Cổng đào tạo ↗` · `Tuyển sinh chính thức ↗`.  
**CTA:** “Khám phá ngành học” (nội bộ) và “Xem tuyển sinh chính thức” (mở trang nguồn có thông báo chuyển ra ngoài).

**Footer:** thông tin cơ bản, bản đồ, chuyên mục, các cổng chính thức, chính sách dữ liệu demo, bản quyền asset/nguồn, nhãn *Website demo học tập, không đại diện VKU*.

### 4.2. Routes bắt buộc

| Route | Trang | Mức ưu tiên | Đặc tả |
|---|---|---|---|
| `/` | Trang chủ | P0 | Hero, giá trị, chọn ngành, tuyển sinh theo năm, thông báo, campus, hoạt động, FAQ, CTA |
| `/gioi-thieu` | Tổng quan VKU | P0 | Bản sắc, triết lý, điểm nhấn, lĩnh vực thế mạnh, link nguồn |
| `/gioi-thieu/lich-su` | Lịch sử phát triển | P1 | Timeline 2003/2007/2017/2020 và các mốc có nguồn, không bịa danh hiệu |
| `/gioi-thieu/lanh-dao` | Lãnh đạo & đội ngũ | P1 | Bố cục profile có trạng thái “Đang xác minh thông tin nhiệm kỳ”, không hiển thị tên hiện nhiệm nếu không chắc |
| `/gioi-thieu/co-so-vat-chat` | Campus & cơ sở vật chất | P0 | Gallery trường, khu giảng đường, lab, thư viện, ký túc xá, accessibility |
| `/nganh-dao-tao` | Khám phá ngành học | P0 | 22 ngành tuyển sinh 2026, search, filter, sort, clear filter, nguồn |
| `/nganh-dao-tao/:slug` | Chi tiết ngành | P0 | Tên, hệ, thời lượng nếu xác minh, khóa/năm áp dụng, chỉ tiêu 2026, chương trình/nguồn, nhóm liên quan |
| `/tuyen-sinh` | Tuyển sinh | P0 | Overview theo năm, 3 phương thức năm 2026, timeline có trạng thái đã qua, CTA nguồn |
| `/tuyen-sinh/phuong-thuc` | Phương thức & hồ sơ | P0 | Giải thích trung tính, checklist, quy trình theo văn bản, không giả form nộp thật |
| `/tuyen-sinh/hoc-phi-hoc-bong` | Học phí & học bổng | P0 | Bảng có bộ lọc năm/khóa nếu đủ dữ liệu, alert áp dụng, link quy định, scholarship card |
| `/tuyen-sinh/tu-van-demo` | Đăng ký tư vấn (demo) | P1 | Form minh họa không truyền/lưu thông tin, dẫn sang hotline chính thức |
| `/tuyen-sinh/ho-so-demo` | Mô phỏng quy trình hồ sơ | P1 | Wizard checklist với dữ liệu minh họa, không upload file và không thu CCCD |
| `/campus-tour-demo` | Tham quan trường (demo) | P1 | Gallery + lịch tham quan minh họa, đặt lịch giả lập không tạo booking |
| `/doi-song-sinh-vien` | Đời sống VKU | P0 | Câu lạc bộ, hoạt động, ký túc xá, sinh viên, dịch vụ hỗ trợ, nghiên cứu |
| `/doi-song-sinh-vien/cau-lac-bo` | CLB & hoạt động | P1 | Danh sách chỉ thêm tên CLB có nguồn, nếu không có thì chỉ trình bày nhóm hoạt động định tính |
| `/nghien-cuu-hop-tac` | Nghiên cứu & hợp tác | P1 | Định hướng nghiên cứu, liên kết doanh nghiệp, link các nguồn kiểm chứng |
| `/tin-tuc` | Tin tức & sự kiện | P0 | Grid/editorial layout, search/filter, năm, phân trang client |
| `/lich-su-kien` | Lịch & sự kiện | P1 | Chỉ ngày có nguồn/được kiểm chứng; lịch học vụ xem từ cổng trường |
| `/tin-tuc/:slug` | Chi tiết bài | P1 | Tóm tắt gốc của nhóm, metadata, nguồn chính thức, bài liên quan |
| `/thong-bao` | Thông báo học vụ | P0 | Tìm kiếm, lọc loại/từ khóa/năm, danh sách thông báo đã kiểm chứng, hiển thị hạn |
| `/thong-bao/:slug` | Chi tiết thông báo | P0 | Tóm tắt + ngày + trạng thái + liên kết “Xem văn bản gốc” |
| `/lien-he` | Liên hệ | P0 | Tổng đài đúng nhóm, email, địa chỉ, map link, form demo không gửi |
| `/faq` | FAQ | P1 | Hỏi đáp tuyển sinh, học phí, ký túc xá, cổng đào tạo, nguồn cuối câu |
| `*` | 404 | P0 | Có đường về trang chủ và gợi ý tìm ngành/thông báo |

**Không phải làm nhiều layout rời rạc:** reuse component/section để giữ nhất quán. Route 404, loading state cho lazy chunks, scroll restoration và page transition tối thiểu là bắt buộc.

### 4.3. Bố cục chi tiết từng nhóm trang

#### A. Trang chủ `/` (trang được chăm chút nhất)

1. **Utility bar:** “Trang demo giới thiệu VKU” nhỏ nhưng rõ; liên kết nguồn trường/cổng tuyển sinh/cổng đào tạo.
2. **Navbar sticky** responsive, logo/wordmark, menu và 1 CTA; tránh hơn 2 CTA nổi bật cạnh nhau.
3. **Hero có ảnh/video campus hợp lệ:** headline ví dụ do nhóm viết “Khám phá hành trình công nghệ tại VKU”; subheading mô tả trường thành viên ĐHĐN; 2 CTA “Khám phá ngành đào tạo”, “Tìm hiểu tuyển sinh”; ghi chú thông tin tuyển sinh năm 2026.
4. **Trust bar:** mốc 2020, trọng tâm CNTT–Truyền thông–Kinh tế số, 22 lựa chọn tuyển sinh **năm 2026**. Không đưa tỷ lệ việc làm không kiểm chứng.
5. **Khám phá ngành học:** 6 ngành nổi bật có đa dạng lĩnh vực + “Xem tất cả 22 ngành (2026)”; card khác nhau đúng nội dung.
6. **About split-section:** ảnh campus + triết lý và giá trị VKU, link đến giới thiệu.
7. **“Tuyển sinh tại VKU”:** 3 bước khám phá ngành → tham khảo phương thức → truy cập cổng chính thức; banner “Thông tin năm 2026, xem cập nhật tại cổng chính thức”.
8. **Cuộc sống VKU:** 3–4 card campus, ký túc xá, lab, sinh viên; nếu ảnh chưa cấp phép thì dùng minh họa rõ ràng.
9. **Tin tức & Thông báo:** 2 tab, tối đa 3–4 record thật, ngày đăng, category chip, link “Xem từ VKU”.
10. **Hoạt động/Hợp tác/Nghiên cứu:** bento cards hiện đại với nội dung xác minh.
11. **FAQ top 5:** accordion accessible.
12. **CTA cuối:** “Bạn muốn tìm hiểu VKU?” với link liên hệ / tư vấn demo và CTA chính thức, tiếp theo footer.

#### B. Tuyển sinh

- Hero chuyên trang, chọn năm 2026 (mặc định) và nhãn **Dữ liệu tuyển sinh đã công bố năm 2026**.
- Một số chỉ tiêu/tổng số phương thức chỉ hiển thị khi chọn đúng năm.
- Cards 3 phương thức; không viết sai cách tính điểm, không xây calculator xét tuyển vì có nhiều quy tắc và nguồn cần cập nhật.
- Checklist hồ sơ theo nguồn và chỉ khi xác minh; những tài liệu chỉ có đợt cũ phải ghi “tham khảo 2026”.
- Timeline thông báo theo thời gian thực tế; không tạo nút “Nộp hồ sơ ngay” cho kỳ đã kết thúc.
- Khu học phí & hỗ trợ, liên kết sang trang chi tiết. FAQ ngắn, CTA cổng tuyển sinh.

#### C. Danh sách/chi tiết ngành

- Search không phân biệt hoa-thường và dấu tiếng Việt (normalize), debounce nếu cần; không tự ý đổi route khi người dùng đang nhập.
- Filter theo nhóm gợi ý, kỹ sư/cử nhân (chỉ mục có degree đã xác thực), năm 2026. Có sort alphabet/quota 2026, cùng button “Xóa bộ lọc”.
- Card hiển thị tên, loại chương trình, thời lượng (khi có), tags, chỉ tiêu 2026; link chi tiết hoạt động.
- Chi tiết ngành không sáng tác môn học, mức lương, tỷ lệ có việc làm hay doanh nghiệp tuyển dụng. Cho phép section “Chương trình chi tiết” mở website chính thức.
- Hiển thị ngành liên quan cùng nhóm và breadcrumb.

#### D. Tin tức vs. Thông báo

- **Tin tức** = hoạt động, sự kiện, câu chuyện tại VKU; chỉ xuất bản bài có link thật, đủ ảnh bản quyền hoặc card không ảnh.
- **Thông báo** = tuyển sinh, đào tạo, khảo thí, học phí, công tác sinh viên. Có tab/category tương ứng cổng trường.
- Search + filter query text, category, year. Client-side pagination 6–9 bài/trang; giữ filter trong URL query nếu tiện.
- Detail: nội dung tóm tắt chính xác, có nguồn, ngày, loại, badge “Tham khảo”, link gốc.
- Không sao chép danh sách định danh của sinh viên từ các trang kết quả kỳ thi hoặc phúc khảo; không embed Google Sheet/Drive chứa thông tin riêng tư.

#### E. Giới thiệu, campus, đời sống

- Timeline đơn giản có icon/ảnh, không trang trí thành “giải thưởng” không có nguồn.
- Giới thiệu các khu thực hành/thư viện/KTX có chỗ đặt ảnh thật đã được cấp phép; danh sách dịch vụ phù hợp đại học.
- Lãnh đạo/giảng viên: nếu chưa cập nhật nhiệm kỳ thì đưa link chính thức “Xem cơ cấu tổ chức cập nhật tại VKU”, tránh đóng khung profile sai.
- Campus gallery keyboard accessible, lightbox đóng Escape, caption nguồn ảnh.
- CLB sinh viên: chỉ nêu các hoạt động/nhóm cụ thể nếu có đường dẫn nguồn; không tự phát minh tên.

#### F. Trải nghiệm đăng ký demo và Campus Tour

Ba trải nghiệm frontend để người xem hiểu quy trình nhưng **không được coi là kênh đăng ký chính thức**:

1. **Đăng ký tư vấn demo** `/tuyen-sinh/tu-van-demo`: chọn nhóm ngành quan tâm, chủ đề hỏi đáp, tùy chọn để trống mọi trường cá nhân; validate trên client. Không gửi email/số điện thoại, không dùng localStorage, không hiển thị “tư vấn viên sẽ liên hệ”. Kết thúc hiện modal **“Bạn vừa xem thử biểu mẫu. Không có thông tin nào được gửi. Hãy dùng hotline/email tuyển sinh chính thức.”**
2. **Mô phỏng chuẩn bị hồ sơ** `/tuyen-sinh/ho-so-demo`: 3 bước xem checklist → tài liệu tham khảo → hoàn tất hướng dẫn; chỉ dùng checkbox/giá trị mô phỏng, **không yêu cầu CCCD, bảng điểm, học bạ, ảnh căn cước, upload file, địa chỉ nhà**. Nếu người xem muốn nộp hồ sơ, hướng ra hệ thống được VKU công bố còn hiệu lực; đợt 2026 đã qua nên không show CTA nộp ngay.
3. **Campus Tour demo** `/campus-tour-demo`: ảnh/tuyến tham quan bằng nội dung giới thiệu campus, nút “Thử đặt lịch” mở biểu mẫu giả lập chỉ chọn chủ đề/tour **không có suất đặt thực tế**; không tự tạo lịch trống/suất còn lại. Kết thúc nói rõ **không có lịch hẹn được ghi nhận** và kèm liên hệ trường. Chỉ khi có nguồn VKU công bố chương trình Campus Tour mới được cập nhật ngày thật.

**Lịch và sự kiện** `/lich-su-kien`: calendar/list switcher dùng **chỉ sự kiện có ngày và link nguồn**; tách tin hoạt động đã qua với sự kiện sắp tới có xác minh. Lịch tuần chính thức có liên kết tại https://lichtuan.vku.udn.vn/ (đường dẫn có trên cổng đào tạo S11); không suy đoán lịch học/lịch thi cá nhân.

#### G. Liên hệ, hỗ trợ, FAQ

- Hiển thị địa chỉ, hotline và email **phân loại** (văn phòng/tuyển sinh) cùng link `tel:`/`mailto:`.
- Mở Google Maps bằng URL tìm kiếm có tên/trụ sở, **không tự chế kinh độ/vĩ độ**. Nếu cần bản đồ nhúng phải kiểm tra quyền/cấu hình, lazy load và sự đồng ý/riêng tư phù hợp.
- Form demo: họ tên (có thể là nickname), email **không bắt buộc**, chủ đề, nội dung; validate frontend; **không lưu vào localStorage/sessionStorage/indexedDB, không gửi bất cứ đâu**. Sau submit chỉ hiển thị “Đây là bản demo, nội dung chưa được gửi. Vui lòng liên hệ VKU qua kênh chính thức.” Không mô phỏng “gửi thành công”. Nếu muốn an toàn hơn, không cho nhập thông tin cá nhân nhạy cảm, kèm helper text.
- Link dẫn sang cổng/tài khoản chính thức; không nhúng widget Messenger/Zalo giả khi chưa xác minh URL OA/fanpage.

---

## 5. TRIỂN KHAI UI UX PRO MAX SKILL

### 5.1. Kiểm tra trước khi cài

```powershell
node --version
npm --version
python --version
# Hoặc nếu môi trường dùng python3:
python3 --version
```

Đọc README hiện tại của repo **trước khi cài** vì CLI có thể thay đổi. Hiện hướng dẫn chính thức dùng gói `ui-ux-pro-max-cli` và lệnh `uipro`, hỗ trợ Codex qua `.agents/skills/ui-ux-pro-max/`.

**Cách khuyến nghị theo project** (chạy trong thư mục root của repo):

```powershell
# Nếu muốn tránh cài global:
npx ui-ux-pro-max-cli init --ai codex

# Hoặc nếu chủ dự án đồng ý cài CLI global:
npm install -g ui-ux-pro-max-cli
uipro init --ai codex
```

Đối với agent **không phải Codex**: dùng `uipro init --ai claude|cursor|copilot|...` phù hợp, theo README; không tự cài tất cả khi chỉ cần một. Nếu không biết agent nào, giữ Codex là chuẩn đã xác định và trình ra thay đổi; `uipro init --ai universal` có thể dùng khi workflow hỗ trợ agent standard.

**Chú ý an toàn:** Khi lệnh cần network/permission, thiếu Python, lỗi npm, hoặc thay đổi global environment, hỏi người dùng cho phép thao tác đó trước khi thực hiện. Không tự cài Python hoặc sửa PATH toàn máy. Chỉ sử dụng skill có nguồn chính thức; nếu không kết nối mạng thì ghi blocker, tiếp tục xây frontend với design brief trong tài liệu, không giả vờ “đã chạy skill”.

### 5.2. Sử dụng thật trong quy trình

1. Xác nhận `SKILL.md` đã được tạo (Codex thường tại `.agents/skills/ui-ux-pro-max/SKILL.md`); đọc file này.
2. Dùng script trong **đường dẫn thực tế được cài**, đừng hardcode `.claude` trong dự án Codex.
3. Tra cứu style, typography, màu, UX và stack `React + Tailwind`, ghi ít nhất 2 phương án, chọn 1 có lý do vào `docs/DESIGN_SYSTEM.md`.
4. Tạo tokens và trang mẫu Home, chụp screenshot desktop/mobile, sửa theo skill, rồi mới triển khai các trang còn lại.
5. Sau mỗi phase, audit thiết kế với checklist anti-pattern, responsive, spacing, contrast, focus và consistency.

Ví dụ **chỉ khi đã kiểm tra đúng đường dẫn**:

```powershell
python .agents/skills/ui-ux-pro-max/scripts/search.py "modern university higher education admissions technology human centered" --design-system -f markdown
python .agents/skills/ui-ux-pro-max/scripts/search.py "university editorial clean responsive" --domain style
python .agents/skills/ui-ux-pro-max/scripts/search.py "accessible readable vietnamese" --domain typography
```

Nếu cú pháp khác với bản skill đã cài, hãy dùng `--help` và làm theo file `SKILL.md`. Tên script, tham số cần xác minh, không coi các ví dụ là mã bất biến.

**Output bắt buộc:** `docs/DESIGN_SYSTEM.md` ghi palette thực tế, type scale, components, accessibility constraints, screenshots đã kiểm và những khuyến nghị đã dùng từ skill; file `docs/UI_AUDIT.md` ghi lỗi/phương án sửa.

---

## 6. KIẾN TRÚC CODE VÀ DỮ LIỆU

### 6.1. Cấu trúc đề xuất

```text
vku-university-web/
├── public/
│   ├── assets/{logo,campus,programs,news,illustrations}/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml              # tạo khi route ổn định, URL production biết rõ
├── src/
│   ├── app/App.tsx
│   ├── app/router.tsx
│   ├── components/
│   │   ├── layout/{SiteHeader,DesktopNav,MobileNav,SiteFooter,PageShell}.tsx
│   │   ├── ui/{Button,Container,Breadcrumb,SectionHeading,Modal,Accordion,EmptyState,SourceLink}.tsx
│   │   ├── home/{HomeHero,FeaturedPrograms,LatestNotices,CampusHighlights}.tsx
│   │   ├── programs/{ProgramCard,ProgramFilters,ProgramGrid}.tsx
│   │   ├── news/{NoticeCard,NewsCard,ContentFilters}.tsx
│   │   └── contact/DemoContactForm.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── LeadershipPage.tsx
│   │   ├── FacilitiesPage.tsx
│   │   ├── ProgramsPage.tsx
│   │   ├── ProgramDetailPage.tsx
│   │   ├── AdmissionsPage.tsx
│   │   ├── AdmissionConsultationDemoPage.tsx
│   │   ├── ApplicationGuideDemoPage.tsx
│   │   ├── CampusTourDemoPage.tsx
│   │   ├── EventsCalendarPage.tsx
│   │   ├── AdmissionMethodsPage.tsx
│   │   ├── TuitionScholarshipsPage.tsx
│   │   ├── StudentLifePage.tsx
│   │   ├── ClubsPage.tsx
│   │   ├── ResearchPage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── NewsDetailPage.tsx
│   │   ├── NoticesPage.tsx
│   │   ├── NoticeDetailPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── FaqPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── data/
│   │   ├── university.ts
│   │   ├── programs2026.ts
│   │   ├── admission2026.ts
│   │   ├── announcements.ts
│   │   ├── news.ts
│   │   ├── faqs.ts
│   │   ├── navigation.ts
│   │   └── sources.ts
│   ├── types/{content,program,notice}.ts
│   ├── hooks/{useDocumentTitle,useScrollToTop}.ts
│   ├── lib/{search,dates,filters,seo}.ts
│   ├── styles/globals.css
│   └── test/
├── tests/e2e/
├── docs/
│   ├── DESIGN_SYSTEM.md
│   ├── CONTENT_AUDIT.md
│   ├── DECISIONS.md
│   ├── CURRENT_STATUS.md
│   ├── TASK_BOARD.md
│   ├── NEXT_STEPS.md
│   └── UI_AUDIT.md
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Cấu trúc này **là định hướng**, không phải yêu cầu tạo file rỗng cho đủ; chỉ khởi tạo khi có code/data thực sự. Tổ chức dễ mở rộng, không over-engineer (Redux/global state không cần; useState/useMemo hoặc URL search params đủ cho demo).

### 6.2. Typescript data contracts tham khảo

```ts
export type SourceMeta = {
  sourceUrl: string;
  sourceName: string;
  verifiedAt: string; // ISO YYYY-MM-DD
  publishedAt?: string;
  validFrom?: string;
  validUntil?: string;
};

export type Program = SourceMeta & {
  id: string;
  slug: string;
  name: string;
  group: "software" | "ai-data" | "hardware" | "media" | "digital-business";
  admissionYear: 2026;
  quota2026: number;
  degree?: "ky-su" | "cu-nhan";
  durationYears?: number;
  shortDescription?: string;   // Chỉ nội dung kiểm chứng được
  officialDetailUrl: string;
  featured?: boolean;
};

export type NoticeCategory =
  | "tuyen-sinh" | "dao-tao" | "khao-thi" | "tai-vu" | "cong-tac-sinh-vien";

export type Notice = SourceMeta & {
  id: string;
  slug: string;
  title: string;
  category: NoticeCategory;
  academicYear?: string;
  summary: string;
  importance?: "normal" | "important";
};

export type DemoFormStatus = "idle" | "invalid" | "demo-only";
```

**Bắt buộc:** `sourceUrl` phải dùng URL thực, `publishedAt` có ISO hợp lệ, `quota2026` tổng đúng 1500, 22 `slug` không trùng. Không nhập bài tin chỉ có tên nhưng không có URL nguồn vào trạng thái `published`. `officialDetailUrl` với ngành: nếu link trực tiếp chi tiết không có, link trang ngành S05 và ghi rõ là trang danh mục, không chế URL.

### 6.3. Frontend dependencies

Gợi ý: `react`, `react-dom`, `vite`, `typescript`, `tailwindcss`, `react-router-dom` hoặc React Router package theo phiên bản chính thức, `lucide-react`; tùy nhu cầu `motion`/`framer-motion` nếu tương thích; `vitest`, `@testing-library/react`, `@testing-library/user-event`, `playwright`, `axe-core`/`@axe-core/playwright`, ESLint, Prettier.

- Kiểm tra phiên bản hiện hành và compatibility thực tế, không pin bừa các major version.
- Tailwind v4 và v3 khác cách cấu hình; đọc docs bản được cài, tuyệt đối không trộn cấu hình hai đời.
- Không cài 10 thư viện animation/carousel; CSS transition, native scroll snap và một gói motion là đủ.
- `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e` phải hoạt động theo README.
- Dữ liệu import tĩnh; không có fetch từ VKU trong runtime. Tránh phụ thuộc network khi người xem duyệt website (ngoại trừ link/ảnh/font ngoài nếu được phê duyệt).
- Nếu host Vite SPA trên static hosting, cấu hình fallback đến `index.html` cho deep links; nếu không hỗ trợ thì chọn pre-render static route.

### 6.4. SEO đúng bản chất SPA

- Từng trang có title, meta description, canonical theo `siteUrl`, Open Graph/Twitter card nếu có URL và asset hợp lệ, heading H1 duy nhất.
- Client-side `document.title` không đảm bảo search/social crawlers render meta. Nếu yêu cầu SEO nghiêm túc, thêm **static prerender/SSG các route quan trọng** tương thích Vite mà **không thêm backend**; kiểm tra HTML output cho `/`, `/gioi-thieu`, `/nganh-dao-tao`, `/tuyen-sinh`, `/lien-he` và detail quan trọng.
- `sitemap.xml` chỉ tạo khi có domain production; trong demo không điền `https://vku.udn.vn` làm canonical hoặc `sitemap.xml` (đây không phải domain của nhóm).
- Khi chỉ chạy localhost, có thể để robots noindex và ghi rõ limitation SEO; không tuyên bố SEO hoàn chỉnh nếu chỉ CSR.
- Ảnh hero có `fetchpriority`/preload khi phù hợp, `width`/`height`; ảnh phần dưới lazy load; responsive srcset/WebP/AVIF và fallback.

---

## 7. YÊU CẦU FUNCTIONAL, INTERACTION, RESPONSIVE

### 7.1. Tiêu chuẩn tương tác frontend

| Module | Hành vi thành công | Trạng thái khác phải có |
|---|---|---|
| Menu desktop/mobile | Điều hướng đến mọi route, aria-expanded khi mở | Escape, click outside, focus management |
| Program search | Tìm theo tên có/không dấu, lọc đúng 22 ngành 2026 | Empty state, clear filter, no results |
| Filters | Nhiều bộ lọc hoạt động cùng lúc, badge kết quả | Reset tất cả, khóa filter không hợp lệ |
| News/Notice search | Filter loại/năm/từ khóa, sắp theo ngày | 0 kết quả, nguồn thiếu, link ngoài lỗi |
| Detail page | Load theo slug, title/related links đúng | Slug không tồn tại → 404 hữu ích |
| FAQ | Mở/đóng bằng click/Enter/Space | aria-controls, aria-expanded, focus outline |
| Gallery | Lightbox/zoom ảnh nếu có quyền sử dụng | Image error fallback, close Escape |
| Form demo | Validate cần thiết và thông báo “không gửi” | Tránh thông báo thành công sai sự thật |
| Wizard hồ sơ demo | Checklist 3 bước không chứa thông tin cá nhân thật | Không upload, không lưu giấy tờ, không tạo hồ sơ tuyển sinh |
| Campus Tour demo | Giới thiệu tour minh họa và xác nhận “không đặt lịch” | Không bịa ngày/giờ có sẵn, không sinh booking |
| External source | Link đúng URL nguồn, tab mới tùy UX | `rel="noopener noreferrer"` khi `target="_blank"` |
| Scroll/navigation | Điểm đến đúng, có scroll-to-top, back/forward | Deep link refresh, anchor, mobile sticky header |

### 7.2. Responsive requirements

- **Mobile nhỏ 320px và 360/375/390px:** không horizontal scroll, navbar hamburger, hero xếp dọc, filter drawer/chips scroll, không giấu CTA quan trọng.
- **Tablet 768px–1024px:** grid 2 cột nếu phù hợp; menu không vỡ; bảng học phí có overflow ngang có nhãn/đầu cột rõ hoặc chuyển sang stacked data cards.
- **Desktop 1280px–1440px/1920px:** content không quá trải rộng, hero và ảnh chất lượng; menu có dropdown ổn định.
- Sticky header không che anchor headings; touch targets >= 44×44px; không hover-only functionality.
- Dark sections riêng được phép; không nhất thiết có global dark mode (không bắt buộc). Nếu thêm theme switcher, phải kiểm đủ theme trước khi hoàn thành.

### 7.3. Accessibility tối thiểu (hướng WCAG 2.2 AA)

- HTML có `lang="vi"`, semantic `header/nav/main/footer`, skip-to-content; chỉ một `main`, heading đúng thứ bậc.
- Tương phản thông thường >= 4.5:1, chữ lớn >= 3:1; không đặt text trực tiếp trên ảnh sáng mà thiếu overlay thích hợp.
- Focus visible rõ, keyboard navigation hoàn chỉnh, không keyboard trap trừ modal có cơ chế thoát đúng.
- Tất cả button/link có accessible name, icon-only có aria-label, inputs có label, lỗi form được mô tả bằng text và gắn `aria-describedby`.
- Alt mô tả đúng nội dung ảnh, không nhét từ khóa; icon trang trí `aria-hidden`, landmark hợp lý.
- `prefers-reduced-motion: reduce` tắt/chuyển animation, tránh flashing; không auto-play video/slider ảnh hưởng người dùng.
- Không dùng màu để phân biệt trạng thái một mình; có text/badge.

### 7.4. Chất lượng và an toàn

- Kiểm soát kích thước ảnh; không dùng `innerHTML`/`dangerouslySetInnerHTML` cho nội dung biên tập không kiểm soát.
- Form demo không gửi mạng (dùng DevTools Network xác minh), không log email/nội dung form ra console hoặc analytics.
- Không dùng API key hay token, không yêu cầu credentials VKU hoặc student code.
- Không lừa người dùng nhấn đăng ký đã đóng; không mở trang clone login.
- Tối ưu ảnh: lazy-load ảnh ngoài viewport, size đúng, fallback asset; font hợp lệ, self-host nếu được phép.

---

## 8. PHASES, TASK BOARD VÀ MỐC NGHIỆM THU

### P0 — Audit môi trường, source & skill

- [ ] Kiểm tra cấu trúc repo, Git, Node/npm, dependencies.
- [ ] Đọc tài liệu master, README skill và SKILL.md; cài đúng loại agent nếu được phép.
- [ ] Tạo `docs/CONTENT_AUDIT.md` với S01–S22, thời điểm, link còn truy cập, tình trạng ảnh/quyền sử dụng.
- [ ] Xác minh thêm những nguồn chưa rõ: Ban giám hiệu 2026, ảnh campus được phép, tin hoạt động, mạng xã hội chính thức, ngành chi tiết.
- [ ] Ghi `docs/CURRENT_STATUS.md`, `TASK_BOARD.md`, `DECISIONS.md`, `NEXT_STEPS.md`.
- **Gate:** không bắt đầu dựng UI nếu chưa có nguồn nền tối thiểu hoặc chưa có design direction.

### P1 — Design system & wireframe

- [ ] Chạy UI UX Pro Max Skill, ghi phương án style/typography/color/UX.
- [ ] Xây layout/wireframe cho desktop/mobile ít nhất Home, Programs, Admissions, Notices, Contact.
- [ ] Chốt palette/tokens, responsive grids, cards, buttons, nav, headings, forms.
- [ ] Tạo `docs/DESIGN_SYSTEM.md` và screenshot preview đầu tiên.
- **Gate:** có screen Home 1440px + 390px, khác biệt thẩm mỹ có chủ đích, CTA đúng.

### P2 — Scaffold FE + foundation

- [ ] Tạo Vite React TS, Tailwind, Router, ESLint, typecheck, test scripts.
- [ ] Tạo page shell, header/footer, routes, 404, breadcrumbs, accessible core components.
- [ ] Import data source + 22 ngành + notices nguồn thật, validate schema/tổng chỉ tiêu.
- [ ] Ảnh placeholder có quy tắc/asset credit, không để broken image.
- **Gate:** `npm run build` và `npm run typecheck` pass, navbar tất cả route không dead link.

### P3 — Home, About, Admissions, Programs (core)

- [ ] Home đủ 12 section hoặc lý do hợp lý nếu tối giản.
- [ ] Giới thiệu/lịch sử/cơ sở vật chất; lãnh đạo hiển thị an toàn theo nguồn hiện hành.
- [ ] Tuyển sinh/phương thức/học phí–học bổng, nhãn năm 2026 và status đã qua phù hợp.
- [ ] Program explorer 22 ngành, detail và related, search/filter/sort.
- **Gate:** tối thiểu 5 tuyến hành trình người dùng hoàn chỉnh; không dữ liệu bịa; UI desktop/mobile đã review.

### P4 — News, Notices, Student life, Contact

- [ ] Tin tức, thông báo, chi tiết và filter/search, nguồn chính thức hoạt động.
- [ ] Đời sống, CLB, nghiên cứu & hợp tác có nội dung thật hoặc trạng thái đang cập nhật.
- [ ] Contact, FAQ, form demo validation + thông báo không gửi, map link.
- [ ] 3 tương tác demo: tư vấn, wizard hồ sơ an toàn và Campus Tour (không booking), lịch sự kiện chỉ có nguồn.
- [ ] Full keyboard/a11y review.
- **Gate:** không route rỗng, không form gửi dữ liệu, link ngoài đúng.

### P5 — Polish, SEO & QA

- [ ] Audit màn hình 320/390/768/1024/1440/1920, cả mobile menu/modal/filter.
- [ ] SEO metadata, robots/sitemap đúng domain, cân nhắc static prerender cho routes.
- [ ] Tối ưu ảnh, web fonts, bundle; reduced motion.
- [ ] Vitest/UI tests, Playwright critical flows, axe scan, Lighthouse mobile & desktop.
- [ ] Audit copy tiếng Việt, ngày và trường dữ liệu, kiểm tra các banner “demo”.
- [ ] Đọc checklist Definition of Done và viết báo cáo cuối.
- **Gate:** build/lint/typecheck/tests pass; screenshot proof + các giới hạn còn lại được ghi rõ.

### Prioritization / scope control

**P0** = trang chủ, ngành, tuyển sinh, thông báo, giới thiệu, cơ sở vật chất, liên hệ, layout, data provenance và kiểm thử chính.  
**P1** = lịch sử, lãnh đạo, CLB, nghiên cứu, tin tức chi tiết, FAQ mở rộng.  
**P2** (tùy thời gian) = lightbox gallery nâng cao, search gợi ý, animation bổ sung, pre-render chi tiết toàn bộ ngành.

Không hy sinh P0 cho hiệu ứng. Mỗi phase kết thúc bằng checkpoint và kiểm thử; ưu tiên tối ưu RAM, hạn chế build/test song song quá mức nếu máy yếu.

---

## 9. KIỂM THỬ VÀ DEFINITION OF DONE

### 9.1. Unit/integration tests tối thiểu

- Program data: đúng 22 record, tổng `quota2026 === 1500`, slug unique, URL nguồn chính thức nonempty và hợp lệ.
- Search không dấu: `cong nghe thong tin` tìm được `Công nghệ Thông tin`; kết hợp search/filter trả đúng subset, reset khôi phục đủ 22.
- Notice filtering theo category, ngày và năm; records sắp xếp mới → cũ.
- Demo form: sai dữ liệu báo lỗi, submit hợp lệ **chỉ** xuất thông báo “chưa được gửi”, không gọi network/storage.
- Demo hồ sơ/tour: không có input giấy tờ, không có upload, không tạo lịch booking, không hiển thị ngày giả; CTA dẫn nguồn thật.
- Routes: các URL chính render, slug không hợp lệ 404, aria labels menu/accordion đúng.

### 9.2. E2E flow (Playwright)

1. 390px: mở mobile navigation → Ngành đào tạo → search “tri tue nhan tao” → chọn ngành → click liên kết chính thức.
2. 1440px: Home → Tuyển sinh → Phương thức → Học phí & Học bổng → kiểm thấy nhãn năm và nguồn.
3. Thông báo → filter `Khảo thí` → mở bài → thấy published date + official link, không lộ dữ liệu cá nhân.
4. Liên hệ → nhập form demo → kết quả “chưa gửi” → không có request POST.
4b. Mô phỏng hồ sơ và Campus Tour → hoàn tất wizard → không file upload, không lịch thật, thông báo demo chính xác.
5. Keyboard: tab đến menu, accordion, modal; Escape đóng overlay; reduced motion không ép animation.
6. Refresh deep link `/nganh-dao-tao/{slug}` trên preview/host để phát hiện SPA fallback lỗi.

### 9.3. Checklist final acceptance

- [ ] Tất cả routes trong mục 4 đã dựng và có nội dung đủ.
- [ ] Desktop/mobile usable, không overflow ngang ở 320px.
- [ ] Design system nhất quán, homepage mang đặc trưng VKU/campus và yếu tố công nghệ.
- [ ] Dùng **đúng** UI UX Pro Max Skill và có file audit chứng minh.
- [ ] Không phải website giả mạo; demo notice ở header/footer/form.
- [ ] 22 ngành & 1500 chỉ tiêu ghi chính xác **năm 2026**; không chép cho năm khác.
- [ ] Không công khai dữ liệu cá nhân ở thông báo.
- [ ] Tuition/Scholarship ghi rõ đối tượng, năm, nguồn.
- [ ] News/Notice đều có liên kết nguồn và ngày; không hiển thị ngày giả.
- [ ] Nút/link có ý nghĩa, không dead link hoặc '#'.
- [ ] Form demo không network/storage và nói rõ không được gửi; hồ sơ giả lập không upload, Campus Tour không tạo booking.
- [ ] Header/nav, FAQ, filter và gallery dùng keyboard được.
- [ ] Không có TypeScript error, build fail, runtime error nghiêm trọng.
- [ ] Lighthouse, axe, screenshot desktop/mobile được ghi trong `docs/UI_AUDIT.md`.
- [ ] SEO mô tả trung thực: CSR vs prerender; không dùng canonical của website VKU.
- [ ] Có README, lệnh chạy, nguồn ảnh/nguồn dữ liệu, CHECKPOINT/RESUME.

---

## 10. CƠ CHẾ CHECKPOINT / RESUME KHI NGẮT PHIÊN

**BẮT BUỘC** với mọi coding agent: trạng thái trong repository phải thay thế được trí nhớ phiên chat. Không phụ thuộc vào nội dung hội thoại cũ.

### Các file trạng thái phải có

`docs/CURRENT_STATUS.md`

```md
# Current status
Updated: YYYY-MM-DD HH:mm (Asia/Ho_Chi_Minh)
Current phase: P?
Current task ID: VKU-???
Branch / last commit: ...
Completed: ...
In progress: ...
Last commands + exact results: ...
Files modified: ...
Blockers: ...
Unverified facts/links: ...
Known bugs/regressions: ...
Next 1–3 concrete actions: ...
Do not redo: ...
```

`docs/TASK_BOARD.md`: tasks có ID, priority, dependencies, `TODO | IN_PROGRESS | BLOCKED | DONE`, đường dẫn file, tiêu chí nghiệm thu.  
`docs/NEXT_STEPS.md`: 1–3 hành động trực tiếp để tiếp tục, câu lệnh test/build trước khi làm tiếp.  
`docs/DECISIONS.md`: quyết định kiến trúc/UI, lý do, hệ quả, thông tin cần user phê duyệt.  
`docs/CONTENT_AUDIT.md`: trạng thái xác minh dữ liệu với source URL và ngày.  
`docs/UI_AUDIT.md`: screenshot/viewports, vấn đề và mức ưu tiên.

### Quy tắc cập nhật

- **Trước khi sửa:** đọc `CURRENT_STATUS`, `TASK_BOARD`, `NEXT_STEPS`, `DECISIONS`; `git status` để không ghi đè công việc dang dở.
- **Sau mỗi task**: update status + tests, mark DONE chỉ khi tiêu chí nghiệm thu đạt.
- **Trước khi hết context/ngắt bởi người dùng/lỗi**: cập nhật ngay 5 file, lưu task đang dở, file đã thay đổi, câu lệnh cuối/stacktrace, việc tiếp theo; dừng tại ranh giới nhỏ nhất an toàn.
- Nếu thất bại build/test: **ghi blocker và không đánh dấu DONE**.
- Không tự commit/push/deploy nếu người dùng chưa cho phép; dù không có commit vẫn ghi các file đã sửa và Git diff summary.
- Khi context/token gần hết, ưu tiên ghi checkpoint thay vì bắt đầu một route mới.

### Resume protocol

1. Đọc tài liệu master này; đọc tất cả file `docs/*STATUS*`, `TASK_BOARD`, `NEXT_STEPS`, `DECISIONS`, `CONTENT_AUDIT`, `DESIGN_SYSTEM`.
2. Chạy `git status`, xem diff và danh sách file, kiểm tra dependency trước khi thay đổi.
3. Chạy nhanh test/build phù hợp mốc hiện tại.
4. Chọn task `IN_PROGRESS` trước, không lặp task đã DONE; nếu phát hiện mâu thuẫn ưu tiên giải quyết regression.
5. Tiếp tục tối đa một nhiệm vụ nhỏ tại một thời điểm, cập nhật checkpoint.
6. Kết thúc bằng báo cáo ngắn: đã hoàn thành, đã test, lỗi/tồn đọng, next steps.

---

## 11. PROMPT KHỞI ĐỘNG DÀNH CHO AGENT

Sao chép nguyên khối dưới đây vào Codex/Claude Code/Cursor sau khi đặt file master ở thư mục repo:

```text
Bạn là Senior Frontend Engineer kiêm UI/UX Designer chịu trách nhiệm hoàn thành website VKU.
Đọc TOÀN BỘ file VKU_WEBSITE_AGENT_MASTER_PLAN.md trong root project và coi đây là specification chính.

Yêu cầu đã chốt: React + Vite + TypeScript + Tailwind CSS; website nhiều trang; phong cách Modern University kết hợp Technology & Innovation; dữ liệu local; không backend; form demo không gửi dữ liệu. Website demo học tập, không phải cổng chính thức VKU.

Bắt đầu bằng audit repository/môi trường và đọc checkpoint trong docs/ nếu có. Kiểm tra/cài UI UX Pro Max Skill theo hướng dẫn trong master plan (tôn trọng quyền truy cập và môi trường), dùng skill thực sự để chọn design system. Xác minh các thông tin VKU từ source URL được liệt kê, không tự bịa.

Sau đó triển khai tuần tự P0 → P5, code có thể chạy thật, responsive và accessible. Mỗi task hoàn thành phải build/typecheck/test mức phù hợp và cập nhật docs/CURRENT_STATUS.md, TASK_BOARD.md, NEXT_STEPS.md, DECISIONS.md; ghi dữ liệu chưa xác minh trong CONTENT_AUDIT.md.

Không hỏi lại lựa chọn đã chốt. Không tự động tạo backend, fetch/scrape runtime, đăng nhập thật, gửi form thật, push/deploy hoặc phát hành website như trang VKU chính thức. Khi vướng blocker, ghi rõ và tiếp tục các task độc lập an toàn. Khi token/context gần hết, ưu tiên lưu checkpoint thay vì mở task mới.

Bây giờ thực hiện P0 và P1, sau đó tiếp tục các phase theo dependency nếu điều kiện nghiệm thu đạt. Cuối lượt báo các file đã tạo/sửa, kết quả test và 3 việc tiếp theo.
```

## 12. PROMPT TIẾP TỤC CÔNG VIỆC

```text
Tiếp tục dự án VKU từ trạng thái hiện có, KHÔNG bắt đầu lại từ đầu.

1. Đọc VKU_WEBSITE_AGENT_MASTER_PLAN.md.
2. Đọc docs/CURRENT_STATUS.md, TASK_BOARD.md, NEXT_STEPS.md, DECISIONS.md, DESIGN_SYSTEM.md, CONTENT_AUDIT.md, UI_AUDIT.md nếu tồn tại.
3. Kiểm tra git status, code hiện tại, scripts và chạy build/test tối thiểu để phát hiện regression.
4. Tiếp tục task IN_PROGRESS; không thực hiện lại task DONE, không làm mất thay đổi chưa commit.
5. Tuân thủ UI UX Pro Max Skill, dữ liệu VKU nguồn chính thức, form chỉ demo và quy tắc an toàn.
6. Sau mỗi task cập nhật checkpoint; trước khi dừng luôn lưu đúng tình trạng, lỗi, kiểm thử và next steps.

Bắt đầu thực thi ngay task ưu tiên cao nhất đang chưa hoàn thành.
```

---

## 13. CÁC ĐIỂM CẦN CHỐT THÊM NẾU CÓ CƠ HỘI (KHÔNG CHẶN CODING)

Các điểm sau chưa cần hỏi lại người dùng vì spec đã đủ để triển khai. Chỉ trình phê duyệt khi liên quan tới quyền truy cập hoặc chất lượng nội dung:

1. **Ảnh/logo và quyền sử dụng:** cần ảnh chính thức hoặc giấy phép; tạm dùng image placeholders có nguồn rõ ràng, không giả ảnh VKU.
2. **Domain sẽ deploy:** hiện chưa có; cứ chạy local, không tạo canonical/sitemap giả. Khi có domain mới cấu hình SEO/deploy chính xác.
3. **Nhân sự/ban giám hiệu 2026:** nguồn chính thức có mốc nhiệm kỳ 2020–2025 nên phải xác thực lại.
4. **Số liệu campus:** nguồn giới thiệu có hai con số diện tích khác nhau (21,5/23,5 ha). Tránh dùng cho đến khi có văn bản cập nhật.
5. **Các chính sách 2027:** đến ngày lập tài liệu chưa có nguồn xác minh tuyển sinh 2027. Dựng sẵn hỗ trợ đa năm nhưng chỉ show số liệu 2026 có gắn nhãn.
6. **Mạng xã hội chính thức:** chỉ đặt link khi xác thực từ footer hoặc thông báo chính thức; nếu thiếu thì ẩn icon, không để `#`.
7. **News thực tế:** có thể bổ sung 4–8 bài hoạt động mới có nguồn tại S01 khi agent thực thi, ghi ngày và URL; không dùng tin tuyển sinh/học vụ để giả thành bài sự kiện.
8. **Bảng giá học phí:** dữ liệu S14 không áp dụng tân sinh viên K26; đừng tự áp dụng cho mọi người. Ưu tiên giải thích nguyên tắc khác nhau theo khóa/hệ và link văn bản gốc; chỉ tạo bảng khi hoàn thiện nguồn đúng đối tượng.

---

## 14. GHI CHÚ KHI BÀN GIAO

Trong README dự án, giải thích:

- Website là sản phẩm giới thiệu/demo độc lập, **không đại diện hoặc được VKU bảo trợ** (trừ khi chủ dự án có xác nhận chính thức về sau).
- Nơi sửa dữ liệu thật: `src/data/*`, cách thêm nguồn/ảnh và ngày kiểm chứng.
- Cách chạy: `npm install` rồi `npm run dev`, cách build và preview.
- Hạn chế: thông báo không tự cập nhật, không có backend, form không gửi, thông tin tuyển sinh và học phí phụ thuộc năm/khóa.
- Liên kết gốc để người dùng tiếp tục các thao tác tuyển sinh/học vụ đúng website chính thức.
- Nơi xem tiến độ: `docs/CURRENT_STATUS.md`, `docs/TASK_BOARD.md` và `docs/NEXT_STEPS.md`.

**Điều kiện hoàn thành thực sự:** người xem trên điện thoại hoặc desktop có thể hiểu VKU, tìm ngành, đọc tuyển sinh theo năm, mở thông báo từ nguồn thật và liên hệ đúng nơi; giao diện hiện đại nhất quán nhưng không gây hiểu nhầm website demo với website chính thức.

---

**END OF MASTER PLAN**
