import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('demo forms validate and confirm without network or persistent storage', async ({ page }) => {
  const writes: string[] = [];
  page.on('request', (req) => {
    if (!['GET', 'HEAD'].includes(req.method())) writes.push(`${req.method()} ${req.url()}`);
  });
  await page.goto('/lien-he');
  await page.getByRole('button', { name: 'Xem kết quả demo' }).click();
  await expect(page.getByRole('alert')).toContainText('Hãy chọn một chủ đề');
  await expect(page.getByRole('alert')).toBeFocused();
  await page.getByLabel('Chủ đề', { exact: true }).selectOption('fees');
  await page.getByLabel('Nội dung minh họa').fill('Câu hỏi minh họa về học phí.');
  await page.getByRole('button', { name: 'Xem kết quả demo' }).click();
  await expect(page.getByRole('dialog')).toContainText('nội dung chưa được gửi');
  await page.screenshot({
    path: `docs/screenshots/contact-demo-result-${test.info().project.name}.png`,
  });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Xem kết quả demo' })).toBeFocused();
  await page.goto('/tuyen-sinh/tu-van-demo');
  await page.getByLabel('Nhóm ngành quan tâm').selectOption('ai-data');
  await page.getByLabel('Chủ đề', { exact: true }).selectOption('programs');
  await page.getByLabel('Email minh họa').fill('khong-hop-le');
  await page.getByRole('button', { name: 'Xem kết quả demo' }).click();
  await expect(page.getByRole('alert')).toContainText('Email chưa đúng định dạng');
  await page.getByLabel('Email minh họa').fill('');
  await page.getByRole('button', { name: 'Xem kết quả demo' }).click();
  await expect(page.getByRole('dialog')).toContainText('Không có thông tin nào được lưu hoặc gửi');
  await page.getByRole('button', { name: 'Đóng thông báo' }).click();
  expect(writes).toEqual([]);
  expect(
    await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })),
  ).toEqual({ local: 0, session: 0 });
  await expect(page.locator('input[type=file]')).toHaveCount(0);
});

test('application guide and campus tour do not create applications or bookings', async ({
  page,
}) => {
  await page.goto('/tuyen-sinh/ho-so-demo');
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  for (let step = 0; step < 3; step++) {
    for (const checkbox of await page.getByRole('checkbox').all()) await checkbox.check();
    await page
      .getByRole('button', { name: step === 2 ? 'Hoàn tất mô phỏng' : 'Tiếp tục', exact: true })
      .click();
  }
  await expect(page.getByRole('status')).toContainText('Không có hồ sơ nào được tạo hoặc gửi');
  await page.screenshot({
    path: `docs/screenshots/application-demo-${test.info().project.name}.png`,
  });
  await expect(page.locator('input[type=file]')).toHaveCount(0);
  await page.goto('/campus-tour-demo');
  await expect(page.locator('input[type=date],input[type=datetime-local]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Thử đặt lịch (demo)' }).click();
  await expect(page.getByRole('dialog')).toContainText('Không có lịch hẹn được ghi nhận');
  await page.screenshot({
    path: `docs/screenshots/tour-demo-result-${test.info().project.name}.png`,
  });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Thử đặt lịch (demo)' })).toBeFocused();
});

test('demo pages have no overflow and pass automated accessibility checks', async ({ page }) => {
  for (const route of [
    '/lien-he',
    '/tuyen-sinh/tu-van-demo',
    '/tuyen-sinh/ho-so-demo',
    '/campus-tour-demo',
  ]) {
    await page.goto(route);
    await expect(page.locator('main h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
      route,
    ).toEqual([]);
  }
});
