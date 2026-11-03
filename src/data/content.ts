import seed from './programs2026.json';
import type { subjectCombinations } from './admissions';

export type VerificationStatus = 'verified' | 'unverified' | 'partial';
export type SourceMeta = {
  sourceUrl: string;
  sourceName: string;
  status: VerificationStatus;
  verifiedAt: string | null;
  checkedAt: string;
  isOfficialSource: boolean;
  publishedAt?: string;
  validUntil?: string;
};
export type ProgramGroup = 'software' | 'ai-data' | 'hardware' | 'media' | 'digital-business';
export type Program = SourceMeta & {
  id: string;
  name: string;
  slug: string;
  group: ProgramGroup;
  admissionYear: number;
  quota2026: number;
  officialDetailUrl: string;
  degree?: 'ky-su' | 'cu-nhan';
  durationYears?: number;
  admissionCode: string;
  officialName: string;
  discipline: string;
  subjectGroup: keyof typeof subjectCombinations;
  curriculumUrl: string;
  admissionSourceUrl: string;
};
export const programGroups: Record<ProgramGroup, string> = {
  software: 'Phần mềm & hệ thống',
  'ai-data': 'AI & dữ liệu',
  hardware: 'Phần cứng & bán dẫn',
  media: 'Truyền thông & thiết kế',
  'digital-business': 'Kinh tế số & quản trị',
};

function parseProgram(record: (typeof seed)[number]): Program {
  if (
    !(record.group in programGroups) ||
    record.status !== 'verified' ||
    record.admissionYear !== 2026 ||
    !Number.isInteger(record.quota2026) ||
    !['ky-su', 'cu-nhan'].includes(record.degree) ||
    !['media-business', 'computing', 'semiconductor'].includes(record.subjectGroup)
  ) {
    throw new Error(`Invalid program seed: ${record.id}`);
  }
  return {
    ...record,
    group: record.group as ProgramGroup,
    status: 'verified',
    degree: record.degree as Program['degree'],
    subjectGroup: record.subjectGroup as Program['subjectGroup'],
  };
}
export const programs = seed.map(parseProgram);

export const noticeCategories = {
  'tai-vu': 'Tài vụ',
  'khao-thi': 'Khảo thí',
  'cong-tac-sinh-vien': 'Công tác sinh viên',
  'tuyen-sinh': 'Tuyển sinh',
  'dao-tao': 'Đào tạo',
};
export type NoticeCategory = keyof typeof noticeCategories;
export type Notice = SourceMeta & {
  id: string;
  slug: string;
  title: string;
  category: NoticeCategory;
  publishedAt: string;
  academicYear: string;
  summary: string;
};
const trainingSource: SourceMeta = {
  sourceUrl: 'https://daotao.vku.udn.vn/',
  sourceName: 'Cổng thông tin đào tạo VKU',
  status: 'verified',
  verifiedAt: '2026-11-03',
  checkedAt: '2026-11-03',
  isOfficialSource: true,
};
export const notices: Notice[] = [
  {
    ...trainingSource,
    id: 'S15',
    slug: 'bao-hiem-2027',
    title: 'Thu BHYT và bảo hiểm thân thể năm 2027',
    publishedAt: '2026-10-21',
    academicYear: '2026–2027',
    category: 'tai-vu',
    summary:
      'Thông báo tài vụ về bảo hiểm dành cho sinh viên. Xem phạm vi, thời hạn và hướng dẫn chi tiết tại văn bản của trường.',
    sourceUrl:
      'https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-ve-viec-thu-tien-bao-hiem-y-te-va-bao-hiem-than-the-nam-2027-doi-voi-sinh-vien-1399.html',
  },
  {
    ...trainingSource,
    id: 'S16',
    slug: 'lich-thi-thuc-tap-hk1-2026',
    title: 'Lịch thi kết thúc các học phần thực tập HKI 2026–2027',
    publishedAt: '2026-10-21',
    academicYear: '2026–2027',
    category: 'khao-thi',
    summary:
      'Thông báo lịch thi thực tập học kỳ I. Hãy tra cứu tài liệu tại nguồn; bản demo không hiển thị lịch thi cá nhân.',
    sourceUrl:
      'https://daotao.vku.udn.vn/thong-bao-khao-thi/thong-bao-lich-thi-ket-thuc-cac-hoc-phan-thuc-tap-hki-nam-hoc-2026-2027-1400.html',
  },
  {
    ...trainingSource,
    id: 'S14',
    slug: 'hoc-phi-hk1-2026-2027',
    title: 'Thu học phí HK1 năm học 2026–2027',
    publishedAt: '2026-10-07',
    validUntil: '2026-10-30',
    academicYear: '2026–2027',
    category: 'tai-vu',
    summary:
      'Áp dụng sinh viên các khóa 2025 trở về trước, mức thu khác nhau theo khóa và chương trình. Hạn 30/10/2026 đã qua; không áp dụng thông báo này cho tân sinh viên K26.',
    sourceUrl:
      'https://daotao.vku.udn.vn/thong-bao-tai-vu/thong-bao-thu-hoc-phi-hoc-ky-1-nam-hoc-2026-2027-1397.html',
  },
  {
    ...trainingSource,
    id: 'S17',
    slug: 'xep-lop-tieng-anh-k26',
    title: 'Kết quả xếp lớp tiếng Anh đầu vào K26',
    publishedAt: '2026-10-05',
    academicYear: '2026–2027',
    category: 'khao-thi',
    summary:
      'Trường công bố thông tin xếp lớp tiếng Anh đầu vào khóa tuyển sinh năm 2026. Không tái bản danh sách hoặc thông tin định danh sinh viên trên bản demo.',
    sourceUrl:
      'https://daotao.vku.udn.vn/thong-bao-khao-thi/thong-bao-ket-qua-xep-lop-tieng-anh-dau-vao-doi-voi-sinh-vien-khoa-tuyen-sinh-nam-2026-1396.html',
  },
  {
    ...trainingSource,
    id: 'S18',
    slug: 'phuc-khao-hk3-2025-2026',
    title: 'Kết quả phúc khảo HK3 2025–2026',
    publishedAt: '2026-09-20',
    academicYear: '2025–2026',
    category: 'khao-thi',
    summary:
      'Thông báo kết quả phúc khảo học kỳ 3. Xem tài liệu gốc qua cổng đào tạo; bản demo không lưu hoặc hiển thị điểm của cá nhân.',
    sourceUrl:
      'https://daotao.vku.udn.vn/thong-bao-khao-thi/thong-bao-ket-qua-phuc-khao-hk32025-2026-1395.html',
  },
  {
    ...trainingSource,
    id: 'S19',
    slug: 'chinh-sach-sinh-vien-hk1-2026',
    title: 'Hồ sơ thực hiện chế độ chính sách HK1 2026–2027',
    publishedAt: '2026-09-14',
    academicYear: '2026–2027',
    category: 'cong-tac-sinh-vien',
    summary:
      'Thông báo của Công tác sinh viên về chế độ chính sách. Điều kiện và thời hạn cần đối chiếu tại văn bản; bản demo không nhận hồ sơ hoặc giấy tờ.',
    sourceUrl:
      'https://daotao.vku.udn.vn/thong-bao-ctsv/ctsv-thong-bao-ve-viec-nop-ho-so-thuc-hien-che-do-chinh-sach-cho-sinh-vien-hoc-ky-1-nam-hoc-2026-2027-1387.html',
  },
];
