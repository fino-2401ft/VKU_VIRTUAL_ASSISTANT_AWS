"""One-time seed extraction; no remote requests, no runtime scraping."""
from pathlib import Path
import re
import json

root = Path(__file__).resolve().parents[1]
master = (root / 'VKU_WEBSITE_AGENT_MASTER_PLAN.md').read_text(encoding='utf-8')
sources = []
for line in master.splitlines():
    if re.match(r'\| S\d\d \|', line):
        cells = [x.strip() for x in line.strip('|').split('|')]
        sid, name, url = cells[:3]
        available = sid in ['S11', 'S12', 'S13', 'S14', 'S15', 'S16', 'S17', 'S18', 'S19', 'S21', 'S22']
        status = 'verified' if available else 'unverified'
        note = ('Fetched using web tool on 2026-11-03; content available.' if available else 'Timeout/502 from web tool on 2026-11-03.')
        if sid == 'S20':
            status, note = 'partial', 'Official search index confirms establishment 03/01/2020; full page returns 502.'
        sources.append(dict(id=sid, name=name, url=url, status=status, checkedAt='2026-11-03', note=note))

(root / 'src/data/sources.json').write_text(json.dumps(sources, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
groups = ['software', 'software', 'software', 'ai-data', 'ai-data', 'software', 'media', 'media', 'hardware', 'hardware', 'hardware', 'hardware', 'hardware', 'hardware', 'ai-data', 'digital-business', 'digital-business', 'digital-business', 'digital-business', 'digital-business', 'digital-business', 'digital-business']
import unicodedata
def slug(value):
    value = unicodedata.normalize('NFD', value.lower().replace('đ', 'd'))
    value = ''.join(c for c in value if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', value).strip('-')
programs = []
for line in master.splitlines():
    if re.match(r'\| \d{2} \|', line):
        cells = [x.strip() for x in line.strip('|').split('|')]
        number, name, _, quota = cells
        programs.append(dict(id=number, slug=slug(name), name=name, group=groups[int(number)-1], admissionYear=2026, quota2026=int(quota), sourceUrl='https://tuyensinh.vku.udn.vn/nganh', sourceName='Cổng tuyển sinh VKU — danh mục ngành', officialDetailUrl='https://tuyensinh.vku.udn.vn/nganh', status='unverified', verifiedAt=None, checkedAt='2026-11-03', provenance='Seed transcribed from master plan; source not accessible in this session', isOfficialSource=True))
assert len(programs) == 22 and sum(p['quota2026'] for p in programs) == 1500
(root / 'src/data/programs2026.json').write_text(json.dumps(programs, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
audit = ['# Content audit', '', 'Checked: 03/11/2026 (Asia/Bangkok). Nguồn unavailable không đồng nghĩa thông tin sai; không gắn verifiedAt nếu chưa xác minh.', '', '## Sổ S01–S22', '']
for s in sources:
    audit += [f"- **{s['id']} — {s['status']}** · [{s['name']}]({s['url']}) · {s['note']}"]
audit += ['', '## Quyết định nội dung', '', '- Cổng đào tạo xác minh tên trường, tư cách thuộc Đại học Đà Nẵng, địa chỉ 470 Trần Đại Nghĩa, Phường Ngũ Hành Sơn, TP. Đà Nẵng. Footer S11 có điện thoại đào tạo 0236.6.552.688 và daotao@vku.udn.vn, không dùng nó làm tổng đài tuyển sinh.', '- S14 xác minh đăng 07/10/2026, áp dụng khóa 2025 trở về trước, hạn 30/10/2026: hiển thị Đã qua thời hạn tại mốc 03/11/2026. Không suy rộng cho K26 và không chép bảng giá thiếu ngữ cảnh.', '- S15–S19 có tiêu đề/ngày trên S11 và trang chi tiết hoạt động. Chỉ dùng tóm tắt, không sao chép danh sách sinh viên hoặc file đính kèm chứa dữ liệu cá nhân.', '- S20 search index xác minh Quyết định 15/QĐ-TTg ngày 03/01/2020; chưa duyệt toàn văn lịch sử 2003/2007/2017.', '- S05 không truy cập được: 22 records, tổng 1500 chỉ là seed theo master. degree/durationYears để trống, không đoán từ tên ngành.', '- Xung đột cần duyệt: bài chính thức https://vku.udn.vn/vi/vku-trien-khai-chien-dich-tuyen-sinh-nam-2026-tai-cac-tinh-khu-vuc-mien-trung/ có snippet dự kiến 1700 chỉ tiêu cho 22 lựa chọn; không dùng thay tổng seed hoặc khẳng định seed là kết quả mới nhất.', '- S09 chưa truy cập: không công bố mức học bổng 70/50/40/25 triệu là đã kiểm chứng.', '- Chưa xác minh lãnh đạo 2026, diện tích campus, hotline tuyển sinh, CLB cụ thể, social links: ẩn tên/số và dùng nguồn chính thức hoặc trạng thái cập nhật.', '', '## Asset audit', '', '- Không tái sử dụng logo/ảnh từ VKU khi chưa có quyền.', '- public/assets/campus-illustration.svg: minh họa vector do dự án tạo, không mô phỏng kiến trúc thật; alt và caption ghi rõ không phải ảnh VKU. Credit: VKU Demo project; usage: Home/campus placeholder; license: project-created asset.', '- Be Vietnam Pro: package @fontsource/be-vietnam-pro, self-host; giấy phép SIL OFL trong package, giữ thông báo license khi phân phối.', '', '## Nguồn nội dung nền tối thiểu', '', 'Gate P0 cho phép UI: S11/S14 có tên trường/địa chỉ và thông báo thật; S20 index xác minh mốc thành lập. Dữ liệu không đủ kiểm chứng dùng trạng thái pending, không tạo thành tích/cơ hội việc làm/lịch tuyển sinh.']
(root / 'docs/CONTENT_AUDIT.md').write_text('\n'.join(audit)+'\n', encoding='utf-8')
print(f'Extracted {len(sources)} sources; {len(programs)} programs; quota={sum(p["quota2026"] for p in programs)}')
