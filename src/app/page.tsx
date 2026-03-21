"use client";

// ホームページ
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";
import type { PostMetadata } from "@/types/post";

export default function Home() {
  const router = useRouter();
  const { language } = useLanguage();
  const tKey = (key: string) => t(language, key);

  const [latestPosts, setLatestPosts] = useState<PostMetadata[]>([]);

  useEffect(() => {
    let cancelled = false;
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/blogs/latest");
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as PostMetadata[];
        if (!cancelled) setLatestPosts(data);
      } catch {
        // 失敗時は何もしない（表示しない）
      }
    };
    fetchLatest();
    return () => {
      cancelled = true;
    };
  }, []);

  const recommendItems = [
    {
      key: "home.recommend.item1" as const,
    },
    {
      key: "home.recommend.item2" as const,
    },
    {
      key: "home.recommend.item3" as const,
    },
  ];

  const technologies = [
    {
      id: "ai-interview",
      nameKey: "tech.ai-interview.name" as const,
      descriptionKey: "tech.ai-interview.description" as const,
      color: "from-slate-700 to-blue-600",
      icon: "🤖",
      recommendationLabel: "推奨No.1",
    },
  ];

  const RabbitMascot = () => {
    return (
      <div className="mt-10 flex justify-center">
        <div className="relative flex items-center gap-6 rounded-3xl bg-white/80 px-6 py-4 shadow-lg ring-1 ring-slate-100 backdrop-blur dark:bg-slate-800/90 dark:ring-slate-700">
          {/* オリジナルうさぎ */}
          <div className="relative flex flex-col items-center">
            {/* 耳（ぴょこぴょこ動く） */}
            <div className="flex gap-2">
              <div className="relative h-10 w-4 rounded-full bg-slate-100 shadow-sm dark:bg-slate-600 animate-bounce [animation-duration:1.8s]">
                <div className="absolute inset-1 rounded-full bg-blue-200 dark:bg-blue-300/80" />
              </div>
              <div className="relative h-10 w-4 rounded-full bg-slate-100 shadow-sm dark:bg-slate-600 animate-bounce [animation-duration:1.8s] [animation-delay:150ms]">
                <div className="absolute inset-1 rounded-full bg-blue-200 dark:bg-blue-300/80" />
              </div>
            </div>
            {/* 顔 */}
            <div className="relative mt-1 h-16 w-18 rounded-3xl bg-white shadow-md dark:bg-slate-800">
              {/* 目 */}
              <div className="absolute left-4 top-5 h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-100" />
              <div className="absolute right-4 top-5 h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-100" />
              {/* 鼻 */}
              <div className="absolute left-1/2 top-7 h-1.5 w-2 -translate-x-1/2 rounded-full bg-blue-400 dark:bg-blue-300" />
              {/* 口 */}
              <div className="absolute left-1/2 top-8 h-3 w-5 -translate-x-1/2 rounded-b-full border-b-2 border-blue-400 dark:border-blue-300" />
              {/* ほっぺ（ほんのり点滅） */}
              <div className="absolute left-1 top-7 h-2.5 w-4 rounded-full bg-blue-200/80 dark:bg-blue-300/70 animate-pulse" />
              <div className="absolute right-1 top-7 h-2.5 w-4 rounded-full bg-blue-200/80 dark:bg-blue-300/70 animate-pulse [animation-delay:200ms]" />

              {/* くわえているにんじん（モグモグ） */}
              <div className="pointer-events-none absolute right-0 top-8 origin-left animate-bounce [animation-duration:0.9s]">
                <div className="relative h-7 w-3 -rotate-15">
                  {/* 葉っぱ */}
                  <div className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-0.5">
                    <div className="h-2.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    <div className="h-2.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  </div>
                  {/* 本体 */}
                  <div className="absolute inset-0 rounded-[999px] bg-gradient-to-b from-orange-400 to-orange-600 shadow-md" />
                  {/* スジ */}
                  <div className="absolute inset-x-0.5 top-2 h-0.5 rounded-full bg-orange-300/70" />
                </div>
              </div>
            </div>
            {/* 体＋前足 */}
            <div className="mt-1 flex flex-col items-center">
              <div className="flex items-end gap-1">
                {/* 前足 */}
                <div className="h-4 w-3 rounded-full bg-slate-100 shadow-sm dark:bg-slate-700" />
                <div className="h-5 w-8 rounded-3xl bg-slate-100 shadow-sm dark:bg-slate-700" />
                <div className="h-4 w-3 rounded-full bg-slate-100 shadow-sm dark:bg-slate-700" />
              </div>
              {/* 影 */}
              <div className="mt-1 h-2 w-12 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 opacity-80 dark:from-slate-600/80 dark:to-slate-500/80" />
            </div>
          </div>

          
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            {tKey("home.hero.title1")}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {tKey("home.hero.title2")}
            </span>
          </h1>
          <RabbitMascot />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 whitespace-pre-line">
            {tKey("home.hero.description")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
            >
              {tKey("home.hero.signupCta")}
            </Link>
            <Link
              href="#technologies"
              className="w-full rounded-lg border-2 border-slate-300 bg-white px-8 py-3.5 text-center text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:w-auto"
            >
              {tKey("home.hero.viewTechnologies")}
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {tKey("home.hero.signupHint")}
          </p>
        </div>
      </section>

      {/* Counseling CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-2 pb-8 sm:px-6 lg:px-8">
        <div className="text-center">
          {(() => {
            const lines = tKey("home.counseling.cta").split("\n");
            return (
              <>
                <p className="text-3xl font-semibold text-slate-800 dark:text-slate-100 sm:text-4xl">
                  {lines[0]}
                  <br />
                  {lines[1]}
                </p>
                {lines[2] && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {lines[2]}
                  </p>
                )}
              </>
            );
          })()}
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            {tKey("home.counseling.button")}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Recommended For Section */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl whitespace-pre-line">
            {tKey("home.recommend.title")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recommendItems.map((item) => (
            <div
              key={item.key}
              className="group flex h-full flex-col items-center rounded-2xl bg-white/90 p-6 text-center shadow-lg ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-600/95 hover:to-indigo-600/95 dark:bg-slate-800/90 dark:ring-slate-700"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-blue-600 motion-safe:animate-bounce">
                ✓
              </div>
              <p className="text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-white">
                {tKey(item.key)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {tKey("home.technologies.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {tKey("home.technologies.description")}
            <span className="ml-1" aria-hidden>🐰</span>
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            {tKey("home.technologies.signupPrompt")}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/learn/${tech.id}`)}
              onKeyDown={(e) => e.key === "Enter" && router.push(`/learn/${tech.id}`)}
              className="group relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 transition-opacity group-hover:opacity-10`} />
              <div className="relative">
                {"recommendationLabel" in tech && tech.recommendationLabel ? (
                  <div className="absolute right-4 top-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5d142] px-4 py-1.5 text-sm font-bold text-amber-900 shadow-lg ring-1 ring-[#e2b800]/70 motion-safe:animate-bounce [animation-duration:1.8s] dark:bg-[#facc15] dark:text-slate-900">
                      <span className="text-base">★</span>
                      <span>{tech.recommendationLabel}</span>
                    </span>
                  </div>
                ) : null}
                <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${tech.color} text-white text-2xl font-bold shadow-lg`}>
                  {tech.icon}
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {tKey(tech.nameKey)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {tKey(tech.descriptionKey)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {tKey("home.technologies.getStarted")}
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  {"tutorialHref" in tech && typeof tech.tutorialHref === "string" ? (
                    <Link
                      href={tech.tutorialHref}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline"
                    >
                      教材
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blogs Section */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              モアコーディングの最新ブログ
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              モアコーディングや技術に関するブログ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestPosts.map((post) => {
              const href = post.category
                ? `/blogs/${post.category}/${post.slug}`
                : `/blogs/_/${post.slug}`;
              const imageSrc =
                post.category === "frontend"
                  ? "/images/blog/frontend-default.svg"
                  : post.category === "backend"
                  ? "/images/blog/backend-default.svg"
                  : post.category === "devops"
                  ? "/images/blog/devops-default.svg"
                  : "/images/blog/default.svg";

              return (
                <Link
                  key={`${post.category}-${post.slug}`}
                  href={href}
                  className="group overflow-hidden rounded-2xl bg-white/90 shadow-lg ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-800/90 dark:ring-slate-700"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex h-full flex-col p-4">
                    <time
                      dateTime={post.date}
                      className="mb-2 text-xs text-slate-500 dark:text-slate-400"
                    >
                      {new Date(post.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </time>
                    <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mb-3 line-clamp-2 text-xs text-slate-600 dark:text-slate-300">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center rounded-full bg-slate-100 px-8 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              もっと見る
            </Link>
          </div>
        </section>
      )}

      {/* Ad Banner */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AdBanner />
      </section>

      {/* About Section */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-center text-white">
          <div className="mb-4 flex justify-center">
            <div className="rabbit-hop inline-block">
              <span className="text-5xl" aria-hidden>
                🐰
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            {tKey("home.about.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90 whitespace-pre-line">
            {tKey("home.about.description")}
          </p>
        </div>
      </section>
    </div>
  );
}
