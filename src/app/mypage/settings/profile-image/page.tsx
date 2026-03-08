// 設定・プロフィール画像

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SettingsLayout from "@/components/SettingsLayout";
import { getSession } from "@/lib/cognito";

export default function ProfileImageSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [successMessage, setSuccessMessage] = useState("");

  /**
  * プロフィール画像の初期表示処理
  *
  * - Cognito の user に picture があればそれを表示
  * - なければ API Gateway (/profile-image) から取得
  * - API 呼び出し時は JWT（Bearer）で認証する
  *
  * ※ ここで JWT が正しく送れないと
  *    API Gateway の JWT Authorizer に弾かれて 404 になる
  */
  useEffect(() => {
    if (user) {
      if (user.picture || user["custom:picture"]) {
        setProfileImage(
          (user.picture || user["custom:picture"]) ?? null
        );
      } else {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          if (!apiBaseUrl) {
            throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
          }

        // Cognito のログインセッションを取得する
        getSession().then((session) => {
          if (!session) return;
          // API Gateway (/profile-image) から画像URLを取得する
          fetch(`${apiBaseUrl}/profile-image`, {
            headers: { Authorization: `Bearer ${session.idToken}` },
          })
            // API Gateway からのレスポンスを処理する
            .then((res) => (res.ok ? res.json() : null))
            // 画像URLを設定する
            .then((data) => data?.url && setProfileImage(data.url))
            // エラーが発生した場合は空のオブジェクトを返す
            .catch(() => {});
        });
      }
    }
  }, [user]);

  /**
  * プロフィール画像をアップロードする処理
  *
  * 処理の流れ：
  * 1. Cognito セッションを取得（JWT 認証）
  * 2. API Gateway (/profile-image) に POST して
  *    S3 用のプリサインドURLを取得
  * 3. 取得したURLへ直接 PUT で画像をアップロード（JWT不要）
  * 4. アップロード完了後、API に PUT で確定通知（JWT必須）
  * 5. GET /profile-image で最新の画像URLを再取得
  *
  * ※ API Gateway は JWT Authorizer を使用しているため、
  *    Authorization ヘッダに正しい JWT を付けないと
  *    404（認証エラー扱い）になる
  */
  const uploadProfileImage = async (file: File): Promise<string | null> => {
    try {
      setUploadStatus("uploading");
      setErrors((prev) => ({ ...prev, image: "" }));

      const session = await getSession();
      if (!session) throw new Error("認証が必要です");


      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiBaseUrl) {
          throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
        }

      const presignResponse = await fetch(`${apiBaseUrl}/profile-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
        body: JSON.stringify({ contentType: file.type }),
      });

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || "プリサインドURLの取得に失敗しました"
        );
      }

      const { key, uploadUrl } = await presignResponse.json();
      if (!uploadUrl || !key)
        throw new Error("サーバーからの応答が不正です");

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadResponse.ok)
        throw new Error("画像のアップロードに失敗しました");

      const commitResponse = await fetch(`${apiBaseUrl}/profile-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
        body: JSON.stringify({ key }),
      });

      if (!commitResponse.ok) {
        const errData = await commitResponse.json().catch(() => ({}));
        throw new Error(errData.message || "画像の確定に失敗しました");
      }

      setUploadStatus("success");

      const urlResponse = await fetch(`${apiBaseUrl}/profile-image`, {
        headers: { Authorization: `Bearer ${session.idToken}` },
      });
      if (urlResponse.ok) {
        const data = await urlResponse.json();
        if (data.url) setProfileImage(data.url);
      }
      return key;
    } catch (error) {
      setUploadStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : "画像のアップロードに失敗しました";
      setErrors((prev) => ({ ...prev, image: errorMessage }));
      return null;
    }
  };

  /**
  * ファイル選択時のイベントハンドラ
  *
  * 処理の流れ：
  * 1. ファイルを取得（input[type="file"]）
  * 2. ファイル形式・サイズのバリデーション
  * 3. FileReader で即時プレビュー表示
  * 4. uploadProfileImage() を呼び出して画像をアップロード
  * 5. 成功したら /me API に PUT してユーザー情報を更新
  *
  * ※ 4,5 の API 呼び出しは JWT 認証必須
  */
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ image: "JPEG、PNG、WebP形式のみ対応しています" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ image: "画像サイズは5MB以下にしてください" });
      return;
    }

    setProfileImageFile(file);
    setErrors((prev) => ({ ...prev, image: "" }));

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);

    const key = await uploadProfileImage(file);
    if (key) {
      const session = await getSession();
      if (!session) return;

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiBaseUrl) {
          throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
        }
        
      const updateRes = await fetch(`${apiBaseUrl}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
        body: JSON.stringify({ picture: key }),
      });
      if (updateRes.ok) {
        setSuccessMessage("プロフィール画像を更新しました");
        await refreshUser();
      }
    }
  };

  /**
  * プロフィール画像がない場合の代替表示用文字
  *
  * 設定画面のプロフィール画像エリアで、
  * 画像が未設定のときにユーザー名の頭文字を表示するために使用する
  */
  const displayName = user?.name || "";
  const initialLetter = displayName.charAt(0).toUpperCase() || "?";
  // console.log("initialLetter:", initialLetter);
  const [imgError, setImgError] = useState(false);

  /**
  * プロフィール画像設定ページの表示部分
  *
  * - SettingsLayout：設定画面共通レイアウト
  * - 画像プレビュー、アップロードUIを内包
  */
  return (
    <SettingsLayout
      breadcrumbTail="プロフィール画像"
      title="プロフィール画像"
    >
      <div className="space-y-6">

        {/* プロフィール画像エリア */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-semibold text-white ring-2 ring-slate-200 dark:ring-slate-600">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="プロフィール画像を配置"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initialLetter}</span>
              )}
            </div>

            {/* 画像選択ボタンエリア */}
            <div className="min-w-0 flex-1">
              <label
                htmlFor="image-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                画像を選択
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={uploadStatus === "uploading"}
                className="hidden"
              />

              {/* アップロード中のファイル名表示エリア */}
              {profileImageFile && (
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate">{profileImageFile.name}</span>
                  {uploadStatus === "uploading" && (
                    <span className="text-amber-600 dark:text-amber-400">
                      アップロード中...
                    </span>
                  )}

                  {/* アップロード成功時のメッセージ表示エリア */}
                  {uploadStatus === "success" && (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ✓ 完了
                    </span>
                  )}

                  {/* アップロード失敗時のメッセージ表示エリア */}
                  {uploadStatus === "error" && (
                    <span className="text-red-600 dark:text-red-400">
                      ✗ 失敗
                    </span>
                  )}
                </div>
              )}
              {errors.image && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.image}
                </p>
              )}
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                JPEG、PNG、WebP／5MB以下
              </p>
            </div>
          </div>
        </section>

        {/* 成功メッセージエリア */}
        {successMessage && (
          <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
            {successMessage}
          </div>
        )}

        {/* 設定に戻るボタンエリア */}
        <div className="flex justify-between pt-2">
          <Link
            href="/mypage/settings"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            設定に戻る
          </Link>
        </div>
      </div>
    </SettingsLayout>
  );
}
