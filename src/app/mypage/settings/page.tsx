// マイページの設定画面

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmModal from "@/components/ConfirmModal";
import { getSession } from "@/lib/cognito";

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, signOut, refreshUser } = useAuth();

  // 認証チェック
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadedImageKey, setUploadedImageKey] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
      // プロフィール画像があれば設定
      if (user.picture || user["custom:picture"]) {
        setProfileImage((user.picture || user["custom:picture"]) ?? null);
      }
    }
  }, [user]);

  // 画像アップロード関数
  const uploadProfileImage = async (file: File): Promise<string | null> => {
    try {
      setUploadStatus("uploading");
      setErrors((prev) => ({ ...prev, image: "" }));

      // セッション取得
      const session = await getSession();
      if (!session) {
        throw new Error("認証が必要です");
      }

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "https://h7sqt3sfpj.execute-api.ap-northeast-1.amazonaws.com";

      // 1. プリサインドURL取得
      const presignResponse = await fetch(`${apiBaseUrl}/profile-image/presign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
        body: JSON.stringify({
          contentType: file.type,
        }),
      });

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "プリサインドURLの取得に失敗しました");
      }

      const { key, uploadUrl } = await presignResponse.json();

      // 2. S3に画像をアップロード
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("画像のアップロードに失敗しました");
      }

      setUploadStatus("success");
      setUploadedImageKey(key);
      return key;
    } catch (error) {
      setUploadStatus("error");
      const errorMessage = error instanceof Error ? error.message : "画像のアップロードに失敗しました";
      setErrors((prev) => ({ ...prev, image: errorMessage }));
      return null;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイル形式チェック
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ image: "JPEG、PNG、WebP形式のみ対応しています" });
      return;
    }

    // ファイルサイズチェック（5MB以下）
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ image: "画像サイズは5MB以下にしてください" });
      return;
    }

    setProfileImageFile(file);
    setErrors((prev) => ({ ...prev, image: "" }));

    // プレビュー用に画像を読み込み
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 自動アップロード
    await uploadProfileImage(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const session = await getSession();
      if (!session) {
        throw new Error("認証が必要です");
      }

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "https://h7sqt3sfpj.execute-api.ap-northeast-1.amazonaws.com";

      // 画像がアップロード済みの場合、keyを使用
      // まだアップロードされていない場合は再アップロード
      let imageKey = uploadedImageKey;
      if (profileImageFile && !uploadedImageKey && uploadStatus !== "uploading") {
        imageKey = await uploadProfileImage(profileImageFile);
        if (!imageKey) {
          setIsSubmitting(false);
          return;
        }
      }

      // ユーザー情報を更新
      const updatePayload: { name: string; picture?: string } = {
        name: formData.name,
      };
      if (imageKey) {
        updatePayload.picture = imageKey;
      }

      const response = await fetch(`${apiBaseUrl}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "設定の更新に失敗しました");
      }

      setSuccessMessage("設定を更新しました");
      
      // ユーザー情報を再読み込み
      await refreshUser();

      // フォームをリセット
      setProfileImageFile(null);
      setUploadStatus("idle");
      setUploadedImageKey(null);
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "設定の更新に失敗しました",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ローディング中または未認証の場合は何も表示しない
  if (loading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-slate-600 dark:text-slate-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                MC
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                More Coding
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/mypage"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                マイページ
              </Link>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ログアウト
              </button>
            </nav>
          </div>
        </div>
      </header>

      <ConfirmModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          signOut();
          router.push("/login");
        }}
        title="ログアウトしますか？"
        confirmLabel="ログアウト"
        cancelLabel="キャンセル"
      />

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link
            href="/mypage"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            マイページ
          </Link>
          <span aria-hidden>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">設定</span>
        </nav>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
          アカウント設定
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Info Card */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              アカウント情報
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  お名前
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500 dark:border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  placeholder="山田 太郎"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-500 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-400 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  メールアドレスは変更できません
                </p>
              </div>
            </div>
          </section>

          {/* Profile Image Card */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              プロフィール画像
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xl font-semibold text-white ring-2 ring-slate-200 dark:ring-slate-600">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="プロフィール"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{formData.name.charAt(0).toUpperCase() || "?"}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="image-upload"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                {profileImageFile && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="truncate">{profileImageFile.name}</span>
                    {uploadStatus === "uploading" && (
                      <span className="text-amber-600 dark:text-amber-400">アップロード中...</span>
                    )}
                    {uploadStatus === "success" && (
                      <span className="text-emerald-600 dark:text-emerald-400">✓ 完了</span>
                    )}
                    {uploadStatus === "error" && (
                      <span className="text-red-600 dark:text-red-400">✗ 失敗</span>
                    )}
                  </div>
                )}
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>
                )}
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  JPEG、PNG、WebP／5MB以下
                </p>
              </div>
            </div>
          </section>

          {/* Messages */}
          {successMessage && (
            <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
              {successMessage}
            </div>
          )}
          {errors.submit && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-center gap-4 pt-2">
            <div className="flex gap-3">
              <Link
                href="/mypage"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {isSubmitting ? "保存中..." : "変更を保存"}
              </button>
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <Link
              href="/mypage"
              className="inline-flex w-fit items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              マイページに戻る
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

