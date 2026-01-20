import { categoriesData } from "./associate-categories";

// categoriesData に対するテスト一式
// 「TypeScript Associate コースのカテゴリ定義が壊れていないか」を確認する
describe("categoriesData (TypeScript Associate)", () => {

  // テスト①
  // カテゴリが1件以上定義されていることを確認する
  // → 空配列になっていたら、画面に何も表示されなくなるため
  test("カテゴリが1件以上存在すること", () => {
    expect(categoriesData.length).toBeGreaterThan(0);
  });

  // テスト②
  // すべてのカテゴリの id が重複していないことを確認する
  // → id は画面表示やルーティングのキーになるため、重複するとバグる
  test("ids are unique", () => {
    // すべてのカテゴリから id だけを取り出す
    const ids = categoriesData.map((c) => c.id);

    // Set は重複を自動で除外するので
    // 元の配列とサイズが同じ = 重複なし
    expect(new Set(ids).size).toBe(ids.length);
  });

  // テスト③
  // file プロパティが必ず .json で終わっていることを確認する
  // → S3 から JSON ファイルを読み込む前提が壊れていないかのチェック
  test("files end with .json", () => {
    for (const c of categoriesData) {
      expect(c.file.endsWith(".json")).toBe(true);
    }
  });

  // テスト④
  // color に Tailwind のグラデーション指定が含まれていることを確認する
  // → UI デザインの前提（from-xxx to-xxx）が崩れていないかを見る
  test("color has gradient tokens", () => {
    for (const c of categoriesData) {
      expect(c.color).toContain("from-");
      expect(c.color).toContain("to-");
    }
  });
});
