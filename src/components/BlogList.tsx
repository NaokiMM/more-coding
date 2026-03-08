/**
 * BlogList コンポーネント
 *
 * ブログ記事一覧を表示し、カテゴリ・タグでフィルタリングできるUIを提供する。
 * - カテゴリリンク: フロントエンド / バックエンド / DevOps / TypeScript などで絞り込み
 * - タグフィルター: 選択したタグに該当する記事のみ表示
 * - 記事カード: 日付・タイトル・抜粋・タグを表示し、クリックで記事詳細へ遷移
 */
"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
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
  typescript: "TypeScript",
};

export default function BlogList({
  posts,
  allTags,
  allCategories = [],
  currentCategory = null,
}: BlogListProps) {
  /** 現在選択中のタグ（null のときは全件表示） */
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  /** 選択タグでフィルタした記事リスト（タグ未選択時は posts をそのまま返す） */
  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return posts;
    }
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  /**
   * タグボタンクリック時のハンドラ。
   * 同じタグを再度クリックした場合はフィルタを解除し、別のタグならそのタグでフィルタする。
   */
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  /**
   * 記事の詳細ページURLを生成する。
   * カテゴリがある場合は /blogs/{category}/{slug}、ない場合は /blogs/_/{slug} を返す。
   */
  const getPostHref = (post: PostMetadata) =>
    post.category ? `/blogs/${post.category}/${post.slug}` : `/blogs/_/${post.slug}`;

  return (
    <>
      {/* カテゴリリンク */}
      {allCategories.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              カテゴリ:
            </span>
            <Link
              href="/blogs"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentCategory === null
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              すべて
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blogs/${cat}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentCategory === cat
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* タグフィルター */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              タグ:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === null
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              すべて
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTag && (
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              「{selectedTag}」でフィルタリング中 ({filteredPosts.length}件)
            </div>
          )}
        </div>
      )}

      {/* 記事一覧 */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-12 text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400">
            {selectedTag
              ? `「${selectedTag}」に該当する記事がありません。`
              : "記事がありません。"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={getPostHref(post)}
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
