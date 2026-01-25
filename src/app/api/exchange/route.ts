import { NextRequest, NextResponse } from "next/server";

// Node.js runtime を明示
export const runtime = "nodejs";

interface FrankfurterResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

interface ExchangeResponse {
  converted: number;
  from: string;
  to: string;
  amount: number;
  rate: number;
}

/**
 * JPY価格をUSDに換算する内部API
 * GET /api/exchange?from=JPY&to=USD&amount=980
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from") || "JPY";
    const to = searchParams.get("to") || "USD";
    const amountParam = searchParams.get("amount");

    if (!amountParam) {
      return NextResponse.json(
        { error: "amount パラメータが必要です" },
        { status: 400 }
      );
    }

    const amount = parseFloat(amountParam);
    if (isNaN(amount) || amount < 0) {
      return NextResponse.json(
        { error: "amount は正の数値である必要があります" },
        { status: 400 }
      );
    }

    // サーバー側の環境変数を使用（NEXT_PUBLIC_ なし）
    const apiBaseUrl = process.env.FRANKFURTER_API_BASE_URL;
    const url = `${apiBaseUrl}/latest?from=${from}&symbols=${to}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // キャッシュはしない
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "為替レートの取得に失敗しました",
          details: `HTTP error! status: ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data: FrankfurterResponse = await response.json();

    if (!data || !data.rates || typeof data.rates[to] !== "number") {
      return NextResponse.json(
        {
          error: "無効なAPIレスポンスです",
        },
        { status: 500 }
      );
    }

    const rate = data.rates[to];
    const converted = amount * rate;

    const result: ExchangeResponse = {
      converted,
      from,
      to,
      amount,
      rate,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("為替換算に失敗しました:", error);
    return NextResponse.json(
      {
        error: "為替換算に失敗しました",
        details:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
