// 問い合わせページ

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: "", label: "選択してください" },
    { value: "service", label: "サービスについて" },
    { value: "pricing", label: "料金について" },
    { value: "technical", label: "技術的な質問" },
    { value: "account", label: "アカウントについて" },
    { value: "partnership", label: "パートナーシップ" },
    { value: "other", label: "その他" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      newErrors.name = "お名前を入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.category) {
      newErrors.category = "お問い合わせ種別を選択してください";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "件名を入力してください";
    }

    if (!formData.message.trim()) {
      newErrors.message = "お問い合わせ内容を入力してください";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "お問い合わせ内容は10文字以上で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // デバッグ用：フォーム送信イベントが発火しているか確認するため
    console.log("SUBMIT fired", formData);
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
      
      if (!apiUrl) {
        throw new Error("API URLが設定されていません。");
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.ok === true) {
        setIsSubmitted(true);
        setIsSubmitting(false);
        
        // フォームをリセット
        setFormData({
          name: "",
          email: "",
          category: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "送信に失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "送信に失敗しました。もう一度お試しください。",
      });
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header */}
        <Header />

        {/* Success Message */}
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white p-8 shadow-lg text-center dark:bg-slate-800">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                お問い合わせありがとうございます
              </h2>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                お問い合わせを受け付けました。
                <br />
                担当者より3営業日以内にご連絡いたします。
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                >
                  ホームへ戻る
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                >
                  新しいお問い合わせ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            お問い合わせ
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            サービスに関するご質問やご不明点がございましたら、お気軽にお問い合わせください
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-600"
                }`}
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-600"
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                お問い合わせ種別 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${
                  errors.category
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                件名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-600"
                }`}
                placeholder="お問い合わせの件名を入力してください"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={8}
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-600"
                }`}
                placeholder="お問い合わせ内容を詳しくご記入ください（10文字以上）"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                    送信中...
                  </>
                ) : (
                  "送信する"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Back Link */}
      <div className="mx-auto max-w-3xl px-4 pb-16 text-center sm:px-6 lg:px-8">
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
  );
}