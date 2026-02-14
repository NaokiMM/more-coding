/**
 * 為替換算ユーティリティ（currency.ts）のユニットテスト
 *
 * 対象: src/lib/currency.ts
 * 主に convertJpyToUsd（JPY → USD の換算）の挙動を検証する
 *
 * 動作方法:
 *   npm test                    … 全テストを実行
 *   npm test -- --testPathPattern=currency  … このファイルのみ実行
 *
 */
import { convertJpyToUsd } from "./currency";

describe("convertJpyToUsd", () => {
  test("JPYをUSDに正しく換算する", () => {
    // 1 JPY = 0.0067 USD の場合、1000 JPY = 6.7 USD
    expect(convertJpyToUsd(1000, 0.0067)).toBe(6.7);
  });

  test("0円は0 USDになる", () => {
    expect(convertJpyToUsd(0, 0.0067)).toBe(0);
  });

  test("為替レート0の場合は0になる", () => {
    expect(convertJpyToUsd(10000, 0)).toBe(0);
  });

  test("大きな金額でも計算できる", () => {
    const rate = 0.0067;
    const jpy = 1_000_000;
    expect(convertJpyToUsd(jpy, rate)).toBe(6700);
  });
});
