// 会員登録ページ

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/cognito";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

// パスワードポリシーの要件を取得する関数
const getPasswordPolicyRequirements = (): { ja: string; en: string } => {
  return {
    ja: "パスワードは以下の要件を満たす必要があります：8文字以上、大文字・小文字・数字・記号をそれぞれ1文字以上含む / Password must meet the following requirements: at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character",
    en: "Password must meet the following requirements: at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character",
  };
};

// Cognitoエラーメッセージを日英両方で表示するためのヘルパー関数
const formatCognitoError = (errorMessage: string): string => {
  // 既に日英両方の形式の場合はそのまま返す
  if (errorMessage.includes(" / ")) {
    return errorMessage;
  }

  // パスワードポリシー関連のエラーの場合は具体的な要件を表示
  if (
    errorMessage.toLowerCase().includes("password did not conform") ||
    errorMessage.toLowerCase().includes("password policy") ||
    errorMessage.toLowerCase().includes("invalid password format")
  ) {
    const policy = getPasswordPolicyRequirements();
    return policy.ja;
  }

  // 一般的なCognitoエラーメッセージのマッピング
  const errorMap: Record<string, { ja: string; en: string }> = {
    "User already exists": {
      ja: "このメールアドレスは既に登録されています",
      en: "User already exists",
    },
    "Invalid email address format": {
      ja: "メールアドレスの形式が無効です",
      en: "Invalid email address format",
    },
    "An account with the given email already exists": {
      ja: "このメールアドレスは既に登録されています",
      en: "An account with the given email already exists",
    },
  };

  // エラーメッセージがマッピングに存在する場合はそれを使用
  const matchedKey = Object.keys(errorMap).find((key) =>
    errorMessage.toLowerCase().includes(key.toLowerCase())
  );

  if (matchedKey) {
    return `${errorMap[matchedKey].ja} / ${errorMap[matchedKey].en}`;
  }

  // マッピングにない場合は、元のメッセージに英語の説明を追加
  return `${errorMessage} / Registration failed`;
};

export default function SignupPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "名前を入力してください / Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください / Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください / Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "パスワードを入力してください / Please enter your password";
    } else {
      // パスワードの詳細なバリデーション
      const password = formData.password;
      const requirements: string[] = [];
      const requirementsEn: string[] = [];

      if (password.length < 8) {
        requirements.push("8文字以上");
        requirementsEn.push("at least 8 characters");
      }
      if (!/[A-Z]/.test(password)) {
        requirements.push("大文字を1文字以上");
        requirementsEn.push("at least one uppercase letter");
      }
      if (!/[a-z]/.test(password)) {
        requirements.push("小文字を1文字以上");
        requirementsEn.push("at least one lowercase letter");
      }
      if (!/[0-9]/.test(password)) {
        requirements.push("数字を1文字以上");
        requirementsEn.push("at least one number");
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        requirements.push("記号を1文字以上");
        requirementsEn.push("at least one special character");
      }

      if (requirements.length > 0) {
        newErrors.password = `パスワードは以下の要件を満たす必要があります：${requirements.join("、")} / Password must meet the following requirements: ${requirementsEn.join(", ")}`;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません / Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await signUp(
        formData.email,
        formData.password,
        formData.name
      );

      if (result.success) {
        // 会員登録成功
        if (result.requiresConfirmation) {
          // メール確認が必要な場合、確認画面へリダイレクト
          router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        } else {
          // メール確認が不要な場合（自動確認）、自動的にログイン
          try {
            // 少し待ってからログインを試みる（Cognitoの処理が完了するまで）
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            const loginResult = await signIn(formData.email, formData.password);
            if (loginResult.success) {
              // ユーザー情報を更新
              await refreshUser();
              // マイページへリダイレクト
              router.push("/mypage");
            } else {
              // ログインに失敗した場合は、ログイン画面へ
              const loginError = loginResult.error || "ログインに失敗しました";
              setErrors({
                submit: `会員登録は完了しましたが、ログインに失敗しました: ${loginError}。ログイン画面からログインしてください。 / Registration completed, but login failed: ${loginError}. Please log in from the login page.`,
              });
              setIsSubmitting(false);
            }
          } catch (loginError) {
            console.error("ログインエラー:", loginError);
            setErrors({
              submit: `会員登録は完了しましたが、ログインに失敗しました。ログイン画面からログインしてください。 / Registration completed, but login failed. Please log in from the login page.`,
            });
            setIsSubmitting(false);
          }
        }
      } else {
        const errorMessage = result.error || "会員登録に失敗しました";
        setErrors({ 
          submit: formatCognitoError(errorMessage)
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "会員登録に失敗しました";
      setErrors({
        submit: formatCognitoError(errorMessage),
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header
        rightContent={
          <div className="flex items-center gap-4">
            <Link
              href="/login/corporate"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              法人ログイン
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              ログイン
            </Link>
          </div>
        }
      />

      {/* Signup Form */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              会員登録
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              アカウントを作成して学習を始めましょう
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  パスワード
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="8文字以上"
                />
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                ) : (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      パスワード要件 / Password requirements:
                    </p>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5 ml-4 list-disc">
                      <li>8文字以上 / At least 8 characters</li>
                      <li>大文字を1文字以上含む / At least one uppercase letter</li>
                      <li>小文字を1文字以上含む / At least one lowercase letter</li>
                      <li>数字を1文字以上含む / At least one number</li>
                      <li>記号を1文字以上含む / At least one special character</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  パスワード（確認）
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="パスワードを再入力"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "登録中..." : "会員登録"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                すでにアカウントをお持ちですか？{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ログイン
                </Link>
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <svg
                className="mr-2 h-5 w-5"
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
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

