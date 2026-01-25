import { NextRequest, NextResponse } from "next/server";

export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

/**
 * 為替レートを取得するAPIルート
 * GET /api/exchange-rate?from=JPY&to=USD
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from") || "JPY";
    const to = searchParams.get("to") || "USD";

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_FRANKFURTER_API_BASE_URL ||
      "https://api.frankfurter.dev";
    const url = `${apiBaseUrl}/latest?from=${from}&to=${to}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // サーバーサイドからのリクエストなのでCORSの問題は発生しない
      cache: "no-store", // リアルタイムの為替レートを取得
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

    const data: ExchangeRateResponse = await response.json();

    if (!data || !data.rates) {
      return NextResponse.json(
        {
          error: "無効なAPIレスポンスです",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("為替レートの取得に失敗しました:", error);
    return NextResponse.json(
      {
        error: "為替レートの取得に失敗しました",
        details:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
