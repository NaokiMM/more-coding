// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmSignUp, resendConfirmationCode, signIn } from "@/lib/cognito";
import { useAuth } from "@/contexts/AuthContext";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "code") {
      setCode(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setErrors({ code: "確認コードを入力してください" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // 確認コードを検証
      const result = await confirmSignUp(email, code);

      if (result.success) {
        // 確認成功後、パスワードを使って自動ログイン
        if (password) {
          try {
            const loginResult = await signIn(email, password);
            if (loginResult.success) {
              await refreshUser();
              router.push("/mypage");
            } else {
              // ログインに失敗した場合は、ログイン画面へ
              setErrors({
                submit: "確認が完了しました。ログイン画面からログインしてください。",
              });
              setIsSubmitting(false);
            }
          } catch (loginError) {
            setErrors({
              submit: "確認が完了しました。ログイン画面からログインしてください。",
            });
            setIsSubmitting(false);
          }
        } else {
          // パスワードがない場合は、ログイン画面へ
          setErrors({
            submit: "確認が完了しました。ログイン画面からログインしてください。",
          });
          setIsSubmitting(false);
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } else {
        setErrors({ submit: result.error || "確認コードの検証に失敗しました" });
        setIsSubmitting(false);
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "確認コードの検証に失敗しました",
      });
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setErrors({});

    try {
      const result = await resendConfirmationCode(email);
      if (result.success) {
        setErrors({
          success: "確認コードを再送信しました。メールをご確認ください。",
        });
      } else {
        setErrors({ submit: result.error || "確認コードの再送信に失敗しました" });
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "確認コードの再送信に失敗しました",
      });
    } finally {
      setIsResending(false);
    }
  };

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
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              ログイン
            </Link>
          </div>
        </div>
      </header>

      {/* Verify Email Form */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              メールアドレスの確認
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {email}に送信された確認コードを入力してください
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Code */}
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  確認コード
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={handleChange}
                  maxLength={6}
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 text-center text-2xl tracking-widest ${
                    errors.code
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="123456"
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                )}
              </div>

              {/* Password (optional, for auto-login after confirmation) */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  パスワード（確認後、自動ログインする場合）
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  placeholder="パスワードを入力（任意）"
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  パスワードを入力すると、確認後に自動的にログインします
                </p>
              </div>

              {/* Success Message */}
              {errors.success && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  {errors.success}
                </div>
              )}

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
                {isSubmitting ? "確認中..." : "確認する"}
              </button>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? "送信中..." : "確認コードを再送信"}
              </button>
            </div>

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
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-slate-600 dark:text-slate-400">読み込み中...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}

