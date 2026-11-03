export const admissionYear = 2026;
export const sourceUrls = {
  programs: 'https://tuyensinh.vku.udn.vn/nganh',
  combined: 'https://tuyensinh.vku.udn.vn/thong-bao/69af03ade1fedb5e0308e873',
  aptitude: 'https://tuyensinh.vku.udn.vn/thong-bao/69af034de1fedb5e0308e872',
  direct: 'https://tuyensinh.vku.udn.vn/thong-bao/69af04149a0df6334f053472',
  documents: 'https://tuyensinh.vku.udn.vn/thong-bao/6a029fac0004d709a40b5c02',
  scholarships: 'https://tuyensinh.vku.udn.vn/thong-bao/699fedf448d97e2c10006596',
  tuition:
    'https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-thu-hoc-phi-hoc-ky-1-nam-hoc-2026-2027-1397.html',
};
export const methods = [
  {
    code: '301',
    name: 'Xét tuyển thẳng',
    summary:
      'Dành cho các đối tượng đủ điều kiện tuyển thẳng theo quy chế, xét vào chương trình phù hợp với thành tích và yêu cầu đầu vào.',
    details: [
      'Nhóm thành tích gồm giải Nhất, Nhì, Ba kỳ thi học sinh giỏi quốc gia/quốc tế hoặc thi khoa học kỹ thuật cấp quốc gia/quốc tế do Bộ GD&ĐT tổ chức, cử tham gia.',
      'Các giải học sinh giỏi/khoa học kỹ thuật nêu trên có thời gian đạt giải không quá 3 năm tính đến xét tuyển; còn các nhóm đặc thù khác có điều kiện riêng.',
      'Không phải mọi giải thưởng đều đủ điều kiện: ngành phù hợp, điều kiện đầu vào và hồ sơ được Hội đồng tuyển sinh xem xét.',
    ],
    sourceUrl: sourceUrls.direct,
    sourceLabel: 'Quy định tuyển thẳng công bố 10/02/2026',
  },
  {
    code: '407',
    name: 'Xét tuyển kết hợp',
    summary:
      'Kết hợp kết quả học bạ và thi tốt nghiệp THPT; văn bản ngày 10/02/2026 ghi nguyên tắc và tổ hợp ở trạng thái dự kiến.',
    details: [
      'Thành phần điểm dự kiến: 60% điểm học bạ + 40% điểm thi tốt nghiệp THPT + điểm cộng + điểm ưu tiên; tổng sau cộng không vượt 30.',
      'Điểm học bạ mỗi môn lấy trung bình cả năm lớp 10, 11 và 12. Điểm học bạ và điểm thi phải cùng một tổ hợp xét tuyển.',
      'Điểm xét tuyển làm tròn 2 chữ số thập phân. Thí sinh phải cung cấp minh chứng hợp lệ để được hưởng điểm cộng và ưu tiên.',
    ],
    sourceUrl: sourceUrls.combined,
    sourceLabel: 'Nguyên tắc dự kiến công bố 10/02/2026',
  },
  {
    code: '402',
    name: 'Điểm đánh giá năng lực',
    summary:
      'Sử dụng kết quả kỳ thi ĐGNL của ĐHQG TP.HCM năm 2026; kết quả này có thể dùng xét tuyển tất cả ngành/chuyên ngành của trường.',
    details: [
      'Điểm ĐGNL được quy đổi về thang 30, cộng điểm cộng và điểm ưu tiên khu vực/đối tượng; tổng điểm không vượt 30.',
      'Văn bản ngày 10/02/2026 chưa công bố công thức quy đổi cụ thể. Website không tự xây công thức hoặc công cụ tính điểm.',
      'Kết quả và minh chứng ưu tiên phải hợp lệ. Văn bản quy định làm tròn điểm xét tuyển đến 2 chữ số thập phân.',
    ],
    sourceUrl: sourceUrls.aptitude,
    sourceLabel: 'Thông tin phương thức 402, ngày 10/02/2026',
  },
];
export const documentGroups = [
  {
    title: 'Minh chứng điểm cộng & chứng chỉ ngoại ngữ',
    description:
      'Thí sinh muốn dùng thành tích, chứng chỉ hoặc ưu tiên cần chuẩn bị minh chứng tương ứng, rõ ràng và hợp lệ.',
    deadline: '23:59 ngày 14/06/2026',
    iso: '2026-06-14',
  },
  {
    title: 'Thí sinh tự do',
    description:
      'Thí sinh tốt nghiệp THPT trước năm 2026 cần nộp minh chứng học bạ và phiếu kết quả thi tốt nghiệp THPT.',
    deadline: '23:59 ngày 14/06/2026',
    iso: '2026-06-14',
  },
  {
    title: 'Tuyển thẳng & ưu tiên xét tuyển',
    description:
      'Chuẩn bị hồ sơ chứng minh thuộc đối tượng tuyển thẳng/ưu tiên theo quy chế và ngành đăng ký. Đây là luồng hồ sơ riêng với thời hạn khác.',
    deadline: '23:59 ngày 19/06/2026',
    iso: '2026-06-19',
  },
];
export const scholarships = [
  { title: 'Thủ khoa', amount: 70000000, semesters: 6 },
  { title: 'Á khoa 1', amount: 50000000, semesters: 4 },
  { title: 'Á khoa 2', amount: 40000000, semesters: 3 },
  { title: 'TOP 10 xuất sắc', amount: 25000000, semesters: 2 },
];
export const scholarshipConditions = [
  'TOP 10 trong bảng mức 25 triệu loại trừ Thủ khoa và Á khoa; không phải mọi thí sinh trúng tuyển đều được nhận.',
  'Xếp hạng xét học bổng theo kết quả học bạ 60%, thi tốt nghiệp THPT 40% và điểm cộng thành tích theo đề án tuyển sinh.',
  'Học bổng được trừ dần vào học phí, không quy đổi ra tiền mặt và không được rút khi nghỉ học.',
  'Tính trên tín chỉ thực học của học phần đăng ký lần đầu; không bao gồm tiếng Anh dự bị, giáo dục quốc phòng và giáo dục thể chất.',
  'Nếu đủ điều kiện nhiều chính sách, chỉ nhận mức cao nhất theo thông báo. Các trường hợp đặc biệt do hội đồng xem xét.',
];
export const tuitionCohorts = [2020, 2021, 2022, 2023, 2024, 2025];
export const tuitionRates = [
  {
    id: 'fintech',
    title: 'Công nghệ Tài chính · Cử nhân',
    code: '734',
    rates: [null, null, null, null, null, 534300],
  },
  {
    id: 'business',
    title: 'Kinh doanh & quản lý · Cử nhân (các ngành còn lại)',
    code: '734',
    rates: [541200, 549600, 548800, 547200, 545700, 542600],
  },
  {
    id: 'engineering',
    title: 'Máy tính & CNTT · Kỹ sư',
    code: '748',
    rates: [602200, 598300, 568500, 567300, 566100, 563700],
  },
  {
    id: 'computing-bachelor',
    title: 'Máy tính & CNTT · Cử nhân',
    code: '748',
    rates: [null, null, 636900, 635300, 633800, 630700],
  },
  {
    id: 'media',
    title: 'Báo chí & thông tin · Cử nhân',
    code: '732',
    rates: [null, null, null, null, 578400, 575300],
  },
];
export const subjectCombinations = {
  'media-business': [
    ['D00', 'Toán · Tiếng Anh · Ngữ văn'],
    ['D09', 'Toán · Tiếng Anh · Lịch sử'],
    ['X26', 'Toán · Tiếng Anh · Tin học'],
    ['D10', 'Toán · Tiếng Anh · Địa lí'],
    ['X78', 'Ngữ văn · Tiếng Anh · GDKT&PL'],
    ['D66', 'Ngữ văn · Tiếng Anh · GDCD'],
    ['C00', 'Ngữ văn · Lịch sử · Địa lí'],
  ],
  computing: [
    ['A00', 'Toán · Vật lí · Hóa học'],
    ['X26', 'Toán · Tiếng Anh · Tin học'],
    ['A01', 'Toán · Vật lí · Tiếng Anh'],
    ['D01', 'Toán · Ngữ văn · Tiếng Anh'],
    ['X06', 'Toán · Vật lí · Tin học'],
    ['D07', 'Toán · Tiếng Anh · Hóa học'],
  ],
  semiconductor: [
    ['A00', 'Toán · Vật lí · Hóa học'],
    ['A01', 'Toán · Vật lí · Tiếng Anh'],
    ['X06', 'Toán · Vật lí · Tin học'],
    ['C01', 'Toán · Vật lí · Ngữ văn'],
    ['D07', 'Toán · Tiếng Anh · Hóa học'],
    ['X26', 'Toán · Tiếng Anh · Tin học'],
  ],
};
export function formatVnd(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}
