import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { contentRoutes, demoRoutes } from '../../src/data/routes';

test('required route foundations, headings, metadata and safe external links', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of [...contentRoutes, ...demoRoutes]) {
    await page.goto(route.path);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).not.toContainText('Có lẽ bạn cần');
    await expect(page).toHaveTitle(/VKU Demo/);
  }
  await page.goto('/nganh-dao-tao/khong-ton-tai');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Có lẽ bạn cần');
  await page.goto('/thong-bao/khong-ton-tai');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Có lẽ bạn cần');
  await page.goto('/');
  const targetLinks = page.locator('a[target="_blank"]');
  for (const a of await targetLinks.all())
    await expect(a).toHaveAttribute('rel', 'noopener noreferrer');
  expect(errors).toEqual([]);
});

test('navigation to accent-insensitive program search, detail and refresh', async ({
  page,
}, info) => {
  await page.goto('/');
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Mở menu điều hướng' }).click();
    await page
      .getByRole('dialog')
      .getByRole('link', { name: 'Ngành đào tạo', exact: true })
      .click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  } else {
    await page
      .getByRole('navigation', { name: 'Điều hướng chính' })
      .getByRole('link', { name: 'Ngành đào tạo', exact: true })
      .click();
  }
  await page.getByLabel('Tìm ngành học').fill('tri tue nhan tao');
  await expect(page.locator('.program-card')).toHaveCount(2);
  await page
    .getByRole('heading', { name: 'Trí tuệ nhân tạo', exact: true })
    .getByRole('link')
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Trí tuệ nhân tạo');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Trí tuệ nhân tạo');
  await expect(page.getByRole('link', { name: /Xem danh mục ngành tại VKU/ })).toHaveAttribute(
    'href',
    'https://tuyensinh.vku.udn.vn/nganh',
  );
  await expect(page.locator('main')).toContainText('7480107');
  await expect(page.locator('main')).toContainText('Kỹ sư · 4,5 năm');
  await expect(page.locator('main')).not.toContainText('Chưa tái xác minh');
});

test('notice category filter, details, source and actual expiry', async ({ page }) => {
  await page.goto('/thong-bao');
  await page.getByLabel('Loại thông báo').selectOption('khao-thi');
  await expect(page.locator('.notice-list article')).toHaveCount(3);
  await page
    .getByRole('heading', { name: /Lịch thi kết thúc/ })
    .getByRole('link')
    .click();
  await expect(page.getByRole('link', { name: /Xem văn bản gốc/ })).toHaveAttribute(
    'href',
    /vku\.udn\.vn/,
  );
  await expect(page.locator('main')).toContainText('21/10/2026');
  await page.goto('/thong-bao/hoc-phi-hk1-2026-2027');
  await expect(page.locator('main')).toContainText('Đã qua thời hạn (30/10/2026)');
});

test('core pages: axe, no overflow, no external runtime requests', async ({ page }, info) => {
  const external: string[] = [];
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:5175') && !r.url().startsWith('data:'))
      external.push(r.url());
  });
  for (const route of [
    '/',
    '/nganh-dao-tao',
    '/tuyen-sinh',
    '/tuyen-sinh/phuong-thuc',
    '/tuyen-sinh/hoc-phi-hoc-bong',
    '/gioi-thieu',
    '/gioi-thieu/lanh-dao',
    '/gioi-thieu/co-so-vat-chat',
    '/thong-bao',
    '/lien-he',
    '/faq',
  ]) {
    await page.goto(route);
    await expect(page.locator('main h1')).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      route,
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
  expect(external).toEqual([]);
  await page.goto('/nganh-dao-tao?q=tri+tue+nhan+tao');
  await expect(page.locator('.program-card')).toHaveCount(2);
  await page.screenshot({
    path: `docs/screenshots/programs-${info.project.name}.png`,
    fullPage: true,
  });
  await page.goto('/tuyen-sinh');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `docs/screenshots/admissions-${info.project.name}.png`,
    fullPage: true,
  });
});

test('admissions journey connects methods, tuition, FAQs and official source', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Tìm hiểu tuyển sinh', exact: true }).click();
  await page.getByRole('link', { name: 'Tìm hiểu phương thức', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Đối chiếu điều kiện trước mọi thủ tục.' }),
  ).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Thông tin tuyển sinh' })
    .getByRole('link', { name: 'Học phí & học bổng' })
    .click();
  await expect(page.locator('main')).toContainText('các khóa 2025 trở về trước');
  await expect(page.locator('main')).toContainText('Đã qua thời hạn 30/10/2026');
  await expect(page.locator('tbody')).toContainText('563.700');
  await page.getByLabel('Khóa tuyển sinh').selectOption('2023');
  await expect(page.locator('tbody')).toContainText('567.300');
  await page.getByLabel('Nhóm chương trình').selectOption('fintech');
  await expect(page.locator('tbody')).toContainText('Không có mức thu trong văn bản');
  await expect(page.getByRole('heading', { name: '70 triệu đồng' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Nguồn bảng học phí & phạm vi áp dụng/ }),
  ).toHaveAttribute('href', /1397\.html$/);
  await page
    .locator('summary')
    .filter({ hasText: 'Học phí có giống nhau cho mọi khóa không?' })
    .click();
  await expect(page.locator('details[open]')).toContainText('tân sinh viên K26');
});

test('professional directory search, rank and pagination from supplied HTML', async ({ page }) => {
  await page.goto('/gioi-thieu/lanh-dao');
  await expect(page.locator('main')).toContainText('2020–2025');
  await expect(page.locator('.faculty-grid').last().locator('article')).toHaveCount(12);
  await page.getByRole('button', { name: 'Trang sau' }).click();
  await expect(page.getByRole('navigation', { name: 'Phân trang giảng viên' })).toContainText(
    'Trang 2',
  );
  await page.getByLabel('Tìm giảng viên').fill('huynh cong phap');
  await expect(page.locator('.faculty-grid').last().locator('article')).toHaveCount(1);
  await expect(page.locator('.faculty-grid').last()).toContainText('Huỳnh Công Pháp');
  await page.getByLabel('Học hàm / học vị').selectOption('ths');
  await expect(page.locator('main')).toContainText('Không tìm thấy giảng viên');
});

test('about and history journey; campus gallery keyboard escape restores focus', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Tìm hiểu về VKU', exact: true }).click();
  await page
    .getByRole('heading', { name: 'Lịch sử phát triển', exact: true })
    .getByRole('link')
    .click();
  await expect(page.locator('time[datetime="2020-01-03"]')).toHaveText('03.01.2020');
  await page
    .getByRole('navigation', { name: 'Khám phá giới thiệu' })
    .getByRole('link', { name: 'Không gian VKU' })
    .click();
  const opener = page.getByRole('button', { name: 'Phóng to minh họa campus, không phải ảnh VKU' });
  await opener.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('keyboard FAQ and helpful 404 return journey', async ({ page }) => {
  await page.goto('/faq');
  const question = page
    .locator('summary')
    .filter({ hasText: 'Đây có phải website chính thức của VKU không?' });
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details[open]')).toContainText('sản phẩm demo học tập độc lập');
  await page.goto('/duong-dan-khong-ton-tai');
  await page.getByRole('link', { name: 'Tìm ngành học', exact: true }).click();
  await expect(page.getByLabel('Tìm ngành học')).toBeVisible();
});
