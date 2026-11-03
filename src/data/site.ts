export const official = {
  university: 'https://vku.udn.vn/vi/',
  admissions: 'https://tuyensinh.vku.udn.vn/',
  programs: 'https://tuyensinh.vku.udn.vn/nganh',
  training: 'https://daotao.vku.udn.vn/',
};

export const navigation = [
  {
    title: 'Giới thiệu',
    to: '/gioi-thieu',
    children: [
      ['Tổng quan VKU', '/gioi-thieu'],
      ['Lịch sử phát triển', '/gioi-thieu/lich-su'],
      ['Lãnh đạo & đội ngũ', '/gioi-thieu/lanh-dao'],
      ['Cơ sở vật chất', '/gioi-thieu/co-so-vat-chat'],
    ],
  },
  { title: 'Ngành đào tạo', to: '/nganh-dao-tao' },
  {
    title: 'Tuyển sinh',
    to: '/tuyen-sinh',
    children: [
      ['Thông tin tuyển sinh', '/tuyen-sinh'],
      ['Phương thức & hồ sơ', '/tuyen-sinh/phuong-thuc'],
      ['Học phí & học bổng', '/tuyen-sinh/hoc-phi-hoc-bong'],
      ['Tư vấn demo', '/tuyen-sinh/tu-van-demo'],
      ['Hướng dẫn hồ sơ demo', '/tuyen-sinh/ho-so-demo'],
    ],
  },
  { title: 'Đời sống sinh viên', to: '/doi-song-sinh-vien' },
  {
    title: 'Tin tức',
    to: '/tin-tuc',
    children: [
      ['Tin tức & hoạt động', '/tin-tuc'],
      ['Thông báo học vụ', '/thong-bao'],
      ['Lịch & sự kiện', '/lich-su-kien'],
    ],
  },
  { title: 'Liên hệ', to: '/lien-he' },
];

export const faqs = [
  {
    question: 'Đây có phải website chính thức của VKU không?',
    answer:
      'Đây là sản phẩm demo học tập độc lập. Mọi thủ tục tuyển sinh và học vụ cần thực hiện qua các cổng chính thức của VKU.',
    source: official.university,
  },
  {
    question: 'Thông tin tuyển sinh trên website áp dụng năm nào?',
    answer:
      'Dữ liệu tham khảo trong dự án gắn với năm 2026. Không áp dụng mặc định cho năm 2027 và không có thông báo đang mở đăng ký. Hãy xem công bố mới trên cổng tuyển sinh.',
    source: official.admissions,
  },
  {
    question: 'Tìm thông báo và lịch học vụ chính thức ở đâu?',
    answer:
      'Bạn có thể đọc tóm tắt và lọc thông báo khảo thí, tài vụ, công tác sinh viên ngay tại mục Thông báo. Lịch học và dữ liệu cá nhân được tra cứu tại cổng đào tạo chính thức; website demo không hiển thị tài khoản hoặc điểm cá nhân.',
    source: official.training,
  },
  {
    question: 'Học phí có giống nhau cho mọi khóa không?',
    answer:
      'Không. Bảng học phí HK1 năm học 2026–2027 trên trang Học phí & học bổng cho phép chọn khóa 2020–2025 và nhóm chương trình. Đơn giá tính theo tín chỉ, không phải tổng tiền cả năm; văn bản không áp dụng cho tân sinh viên K26.',
    source:
      'https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-thu-hoc-phi-hoc-ky-1-nam-hoc-2026-2027-1397.html',
  },
  {
    question: 'Biểu mẫu demo có gửi thông tin cho trường không?',
    answer:
      'Không. Biểu mẫu chỉ minh họa tương tác frontend, không có backend và không lưu hoặc gửi thông tin. Muốn liên hệ thật, vui lòng sử dụng kênh được VKU công bố.',
    source: official.university,
  },
];
