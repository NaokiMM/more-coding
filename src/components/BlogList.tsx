/**
 * BlogList コンポーネント
 *
 * ブログ記事一覧を表示し、カテゴリ・タグでフィルタリングできるUIを提供する。
 * - カテゴリリンク: フロントエンド / バックエンド / DevOps などで絞り込み
 * - タグフィルター: 選択したタグに該当する記事のみ表示
 * - 記事カード: 日付・タイトル・抜粋・タグを表示し、クリックで記事詳細へ遷移
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import type { PostMetadata } from "@/types/post";

/** ブログ一覧に渡す props */
interface BlogListProps {
  posts: PostMetadata[];
  allTags: string[];
  allCategories?: string[];
  currentCategory?: string | null;
}

/** カテゴリIDと表示ラベルの対応（日本語表示用） */
const CATEGORY_LABELS: Record<string, string> = {
  frontend: "フロントエンド",
  backend: "バックエンド",
  devops: "DevOps",
};

export default function BlogList({
  posts,
  allTags,
  allCategories = [],
  currentCategory = null,
}: BlogListProps) {
  /**
   * 記事の詳細ページURLを生成する。
   * カテゴリがある場合は /blogs/{category}/{slug}、ない場合は /blogs/_/{slug} を返す。
   */
  const getPostHref = (post: PostMetadata) =>
    post.category ? `/blogs/${post.category}/${post.slug}` : `/blogs/_/${post.slug}`;

  return (
    <>
      {/* 記事一覧 */}
      {posts.length === 0 ? (
        <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-12 text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400">記事がありません。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
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
                key={post.slug}
                href={getPostHref(post)}
                className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600"
              >
                <article className="h-full flex flex-col">
                  {/* サムネイル画像 */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-full">
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
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
      
      {/* Back Link */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
    </>
  );
}
