/**
 * Playwright のサンプルテスト（初期セットアップ時に自動生成された例）
 *
 * 目的:
 * - Playwright のテストランナー・設定が正しく動くか確認する
 * - 自分のアプリ用のテストを書くときの参考・テンプレートとして使う
 *
 * 内容: playwright.dev にアクセスし、タイトルと「Get started」リンクの動作を検証している。
 * 自分のアプリをテストする場合は、このファイルを参考に新しい spec を追加するか、
 * テスト対象の URL や要素に書き換えて使う。
 */
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
