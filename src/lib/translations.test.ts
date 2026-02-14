/**
 * 翻訳ユーティリティ（translations.ts）のユニットテスト
 *
 * 対象: src/lib/translations.ts
 * useTranslation の挙動と、ja/en でキーが揃っているかを検証する
 *
 * 動作方法:
 *   npm test                           … 全テストを実行
 *   npm test -- --testPathPattern=translations  … このファイルのみ実行
 *
 */
import { translations, useTranslation } from "./translations";

describe("translations", () => {
  test("ja と en で同じキーが定義されていること", () => {
    const jaKeys = Object.keys(translations.ja).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(jaKeys).toEqual(enKeys);
  });

  test("各言語に1件以上キーが存在すること", () => {
    expect(Object.keys(translations.ja).length).toBeGreaterThan(0);
    expect(Object.keys(translations.en).length).toBeGreaterThan(0);
  });
});

describe("useTranslation", () => {
  test("ja で正しい日本語が返ること", () => {
    const t = useTranslation("ja");
    expect(t("nav.home")).toBe("ホーム");
    expect(t("common.loading")).toBe("読み込み中...");
  });

  test("en で正しい英語が返ること", () => {
    const t = useTranslation("en");
    expect(t("nav.home")).toBe("Home");
    expect(t("common.loading")).toBe("Loading...");
  });

  test("存在しないキーはそのまま返ること", () => {
    const t = useTranslation("ja");
    expect(t("unknown.key" as "nav.home")).toBe("unknown.key");
  });
});
