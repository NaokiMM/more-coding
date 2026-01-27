/**
 * 共通fetchラッパー
 * 認証トークンを自動的に付与し、エラーハンドリングを行う
 */

/**
 * localStorageからaccessTokenを取得
 * キーが*.accessTokenで終わるものを探す
 */
export function getAccessTokenFromStorage(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  // localStorageの全キーを確認
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes(".accessToken")) {
      const token = localStorage.getItem(key);
      if (token) {
        return token;
      }
    }
  }

  return null;
}

/**
 * APIリクエストの共通ラッパー
 * 認証トークンを自動的に付与し、エラーハンドリングを行う
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URLが設定されていません");
  }
  // 末尾スラッシュを削除
  baseUrl = baseUrl.replace(/\/$/, "");

  const token = getAccessTokenFromStorage();
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers,
    });

    const text = await res.text();

    if (!res.ok) {
        console.error({ status: res.status, text });
      
        if (res.status === 401) {
          throw new Error("認証が切れています。再ログインしてください。");
        }
      
        throw new Error(`API request failed with status ${res.status}`);
      }

    // JSONパースを試みる
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  } catch (error) {
    // fetch自体のエラー（ネットワークエラーなど）
    if (error instanceof TypeError) {
      console.error("Network Error:", error.message);
      throw new Error(`ネットワークエラー: ${error.message}`);
    }
    throw error;
  }
}
