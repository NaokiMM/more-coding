/**
 * Vue.js Associate のカテゴリ定義（associate-categories.ts）のユニットテスト
 *
 * 対象: src/lib/categories/vue/associate-categories.ts
 * カテゴリが1件以上あること、id の一意性、.json ファイル指定、グラデーション指定を検証する
 *
 * 動作方法:
 *   npm test  … 全テストを実行
 *   npm test -- --testPathPattern=vue/associate-categories  … このファイルのみ実行
 */
import { categoriesData } from "./associate-categories";

describe("categoriesData (Vue.js Associate)", () => {
  test("カテゴリが1件以上存在すること", () => {
    expect(categoriesData.length).toBeGreaterThan(0);
  });

  test("ids are unique", () => {
    const ids = categoriesData.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("files end with .json", () => {
    for (const c of categoriesData) {
      expect(c.file.endsWith(".json")).toBe(true);
    }
  });

  test("color has gradient tokens", () => {
    for (const c of categoriesData) {
      expect(c.color).toContain("from-");
      expect(c.color).toContain("to-");
    }
  });
});
