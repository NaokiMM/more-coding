/**
 * 為替レート計算ユーティリティ
 */

export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

/**
 * 為替レートを取得する
 * Next.jsのAPIルート経由で取得することでCORSの問題を回避
 * @param from 変換元の通貨コード（例: "JPY"）
 * @param to 変換先の通貨コード（例: "USD"）
 * @returns 為替レート情報
 */
export async function getExchangeRate(
  from: string = "JPY",
  to: string = "USD"
): Promise<ExchangeRateResponse> {
  // Next.jsのAPIルート経由で取得（CORSの問題を回避）
  const apiUrl = `/api/exchange-rate?from=${from}&to=${to}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    const data: ExchangeRateResponse = await response.json();

    if (!data || !data.rates) {
      throw new Error("無効なAPIレスポンスです");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("ネットワークエラー: APIに接続できませんでした");
    }
    throw error;
  }
}

/**
 * JPYからUSDに変換する
 * @param jpyAmount JPY金額
 * @param exchangeRate JPY/USD為替レート（1 JPY = X USD）
 * @returns USD金額
 */
export function convertJpyToUsd(
  jpyAmount: number,
  exchangeRate: number
): number {
  // 為替レートは 1 JPY = X USD の形式なので、JPY金額をレートで割る
  return jpyAmount * exchangeRate;
}

/**
 * JPYからUSDに変換する（為替レートを自動取得）
 * @param jpyAmount JPY金額
 * @returns USD金額
 */
export async function calculateUsdFromJpy(
  jpyAmount: number
): Promise<number> {
  try {
    const rateData = await getExchangeRate("JPY", "USD");
    const rate = rateData.rates?.USD;

    if (!rate || typeof rate !== "number") {
      throw new Error("為替レートが取得できませんでした");
    }

    return convertJpyToUsd(jpyAmount, rate);
  } catch (error) {
    console.error("為替レートの取得に失敗しました:", error);
    // エラーメッセージをより分かりやすくする
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("為替レートの取得に失敗しました。もう一度お試しください。");
  }
}
