"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
      // プロフィール画像があれば設定
      if (user.picture || user["custom:picture"]) {
        setProfileImage(user.picture || user["custom:picture"]);
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
                SB
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SkillBoost
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
                onClick={() => {
                  if (confirm("ログアウトしますか？")) {
                    signOut();
                    router.push("/login");
                  }
                }}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ログアウト
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/mypage"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            マイページに戻る
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            設定
          </h1>
        </div>

        {/* Settings Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                プロフィール画像
              </label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-2xl font-bold text-white">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {formData.name.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                  >
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
                    <div className="mt-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {profileImageFile.name}
                      </p>
                      {uploadStatus === "uploading" && (
                        <p className="mt-1 text-xs text-blue-600">アップロード中...</p>
                      )}
                      {uploadStatus === "success" && (
                        <p className="mt-1 text-xs text-green-600">✓ アップロード完了</p>
                      )}
                      {uploadStatus === "error" && (
                        <p className="mt-1 text-xs text-red-600">✗ アップロード失敗</p>
                      )}
                    </div>
                  )}
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    JPEG、PNG、WebP形式、5MB以下
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
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
                className={`w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300"
                }`}
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
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
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                メールアドレスは変更できません
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "更新中..." : "変更を保存"}
              </button>
              <Link
                href="/mypage"
                className="rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

