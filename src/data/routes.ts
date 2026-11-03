import { official } from './site';

// P2 route foundations. Domain-specific layouts/content are developed in P3/P4.
export const contentRoutes = [
  {
    path: '/gioi-thieu',
    eyebrow: 'Về Việt – Hàn',
    title: 'Tìm hiểu VKU.',
    description:
      'Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn, thành viên Đại học Đà Nẵng.',
    body: 'Đối chiếu bản sắc, cơ cấu và định hướng phát triển tại nguồn nhà trường. Trang này đang được triển khai sâu hơn ở P3; các thành tích, số liệu diện tích và nhân sự chưa đủ xác minh sẽ không xuất hiện.',
    source: official.university,
  },
  {
    path: '/gioi-thieu/lich-su',
    eyebrow: 'Lịch sử phát triển',
    title: 'Một mốc khởi đầu. Một hành trình tiếp nối.',
    description: 'VKU được thành lập ngày 03/01/2020 theo Quyết định 15/QĐ-TTg.',
    body: 'Mốc thành lập đã đối chiếu từ chỉ mục bài thư ngỏ chính thức. Timeline các đơn vị tiền thân năm 2003/2007/2017 đang chờ kiểm chứng toàn văn; chưa thể hiển thị như dữ liệu đã duyệt.',
    source:
      'https://vku.udn.vn/vi/thu-ngo-ky-niem-05-nam-thanh-lap-truong-dai-hoc-cong-nghe-thong-tin-va-truyen-thong-viet-han-hanh-trinh-22-nam-hinh-thanh-va-phat-trien/',
  },
  {
    path: '/gioi-thieu/lanh-dao',
    eyebrow: 'Lãnh đạo & đội ngũ',
    title: 'Con người tạo nên VKU.',
    description:
      'Thông tin lãnh đạo theo nhiệm kỳ công bố và danh bạ giảng viên, giúp bạn tìm hiểu đội ngũ chuyên môn.',
    body: 'Nguồn ban giám hiệu chưa truy cập được trong phiên kiểm tra. Không hiển thị tên hoặc ảnh người giữ chức vụ hiện nhiệm khi chưa có xác nhận cho năm 2026.',
    source: 'https://vku.udn.vn/vi/co-cau-to-chuc/ban-giam-hieu/',
  },
  {
    path: '/gioi-thieu/co-so-vat-chat',
    eyebrow: 'Không gian VKU',
    title: 'Khám phá không gian học tập.',
    description: 'Tìm hiểu khuôn viên, khu thực hành, thư viện và ký túc xá qua nguồn chính thức.',
    body: 'Ảnh VKU chưa có quyền tái sử dụng, nên bản demo hiện chỉ có minh họa ý tưởng được gắn nhãn. Không công bố diện tích campus khi các nguồn còn chưa thống nhất.',
    source: official.university,
  },
  {
    path: '/tuyen-sinh',
    eyebrow: 'Tuyển sinh tham khảo 2026',
    title: 'Tìm hiểu trước. Lựa chọn vững vàng.',
    description:
      'Dữ liệu tuyển sinh năm 2026 chỉ để tham khảo, không phải thông báo đang mở đăng ký.',
    body: 'Danh mục và phương thức đang chờ tái xác minh từ cổng tuyển sinh. Các nguồn có chênh lệch số chỉ tiêu dự kiến; bản demo chưa công bố một tổng số là kết quả cuối cùng. Xem thông báo còn hiệu lực từ VKU trước mọi thủ tục.',
    source: official.admissions,
  },
  {
    path: '/tuyen-sinh/phuong-thuc',
    eyebrow: 'Phương thức & hồ sơ',
    title: 'Đọc đúng năm. Kiểm tra đúng điều kiện.',
    description: 'Phương thức tuyển sinh phải được đối chiếu với văn bản năm áp dụng.',
    body: 'Nguồn phương thức năm 2026 chưa truy cập được ở phiên kiểm chứng. Không diễn giải công thức xét tuyển hoặc tự tạo checklist giấy tờ. Bản demo không tiếp nhận hồ sơ và không tính điểm xét tuyển.',
    source: 'https://tuyensinh.vku.udn.vn/phuongthuc',
  },
  {
    path: '/tuyen-sinh/hoc-phi-hoc-bong',
    eyebrow: 'Học phí & học bổng',
    title: 'Thông tin tài chính cần đúng đối tượng.',
    description: 'Học phí và học bổng phụ thuộc năm, khóa học và chương trình.',
    body: 'Thông báo học phí HK1 2026–2027 áp dụng các khóa 2025 trở về trước; thời hạn nộp 30/10/2026 đã qua. Không suy rộng cho tân sinh viên K26. Mức học bổng đầu vào chưa được tái xác minh nên chưa công bố trên bản demo.',
    source:
      'https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-thu-hoc-phi-hoc-ky-1-nam-hoc-2026-2027-1397.html',
  },
  {
    path: '/doi-song-sinh-vien',
    eyebrow: 'Đời sống sinh viên',
    title: 'Kết nối để trải nghiệm đại học.',
    description: 'Tra cứu kênh công tác sinh viên, ký túc xá và hỗ trợ học tập.',
    body: 'Cổng đào tạo có chuyên mục Công tác sinh viên và liên kết Tổ Quản lý Ký túc xá & Phục vụ cộng đồng. Thông tin điều kiện, phí và chỗ ở cần xem công bố thực tế, bản demo không nhận đăng ký hoặc đặt chỗ.',
    source: official.training,
  },
  {
    path: '/doi-song-sinh-vien/cau-lac-bo',
    eyebrow: 'CLB & hoạt động',
    title: 'Tìm cộng đồng cùng sở thích.',
    description: 'Chuyên mục hoạt động sinh viên đang được biên tập từ nguồn trường.',
    body: 'Chưa có danh sách CLB được xác minh trong phiên này. Không tự tạo tên CLB, lịch sinh hoạt hoặc thông tin người phụ trách. Hãy theo dõi kênh nhà trường để tìm hoạt động phù hợp.',
    source: official.university,
  },
  {
    path: '/nghien-cuu-hop-tac',
    eyebrow: 'Nghiên cứu & hợp tác',
    title: 'Kết nối tri thức và thực tiễn.',
    description: 'Tra cứu công bố về hoạt động khoa học và hợp tác tại VKU.',
    body: 'Cổng đào tạo có liên kết Phòng Quản lý Khoa học & Hợp tác quốc tế. Danh mục dự án, đối tác và thành tích đang chờ nguồn được duyệt; không sử dụng logo doanh nghiệp hoặc tuyên bố hợp tác chưa xác minh.',
    source: official.university,
  },
  {
    path: '/tin-tuc',
    eyebrow: 'Tin tức & hoạt động',
    title: 'Câu chuyện VKU, từ nguồn chính thức.',
    description: 'Tin hoạt động được tách biệt với thông báo học vụ và tuyển sinh.',
    body: 'Chưa có bài hoạt động đủ nguồn nội dung và quyền ảnh được duyệt để xuất bản local. Xem tin trường tại website VKU; bạn có thể tra cứu các thông báo học vụ đã xác minh trong chuyên mục Thông báo.',
    source: official.university,
  },
  {
    path: '/lich-su-kien',
    eyebrow: 'Lịch & sự kiện',
    title: 'Theo dõi lịch từ đúng nguồn.',
    description: 'Chưa có sự kiện sắp tới được xác minh để đưa vào lịch local.',
    body: 'Thông báo có ngày đăng không đồng nghĩa sự kiện diễn ra vào ngày đó. Bản demo không tạo lịch giả hoặc suy đoán lịch học, lịch thi cá nhân. Tra cứu lịch tuần qua liên kết chính thức trên cổng đào tạo.',
    source: 'https://lichtuan.vku.udn.vn/',
  },
] as const;

export const demoRoutes = [
  { path: '/tuyen-sinh/tu-van-demo', title: 'Tư vấn ngành học (demo)' },
  { path: '/tuyen-sinh/ho-so-demo', title: 'Mô phỏng chuẩn bị hồ sơ' },
  { path: '/campus-tour-demo', title: 'Campus Tour (demo)' },
] as const;
