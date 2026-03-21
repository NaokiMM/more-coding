import { getAllPosts, getAllCategories } from "@/lib/posts";
import type { Metadata } from "next";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "ブログ - More Coding",
  description: "More Coding（モアコーディング）の技術ブログ。エンジニア向けの開発技術やキャリアに関する記事を掲載しています。",
};

export default async function BlogsPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            ブログ
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            More Coding（モアコーディング）の技術ブログ。開発技術やエンジニアのキャリアに役立つ記事を掲載しています。
          </p>
        </header>

        <BlogList
          posts={posts}
          allTags={allTags}
          allCategories={categories}
          currentCategory={null}
        />
      </div>
    </div>
  );
}
