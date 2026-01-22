import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ブログ - More Coding",
  description: "More Coding（モアコーディング）の技術ブログ。Next.js、TypeScript、Reactなどの最新技術について学べます。",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            ブログ
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            More Coding（モアコーディング）の技術ブログ。Next.js、TypeScript、Reactなどの最新技術について学べます。
          </p>
        </header>
        
        {posts.length === 0 ? (
          <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-12 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400">記事がありません。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600"
              >
                <article className="h-full flex flex-col">
                  {/* 日付 */}
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  
                  {/* タイトル */}
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {/* 抜粋 */}
                  {post.excerpt && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {/* タグ */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* 続きを読むリンク */}
                  <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto">
                    続きを読む
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
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
        
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
  );
}
