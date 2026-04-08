import { getAllPosts, getAllCategories } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
import Link from "next/link";

type Props = {
  params: Promise<{ category: string }>;
};

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "フロントエンド",
  backend: "バックエンド",
  devops: "DevOps",
  career: "キャリア",
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category] ?? category;

  return {
    title: `${label} - ブログ | More Coding`,
    description: `More Codingの${label}に関する技術記事一覧`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const [posts, allCategories] = await Promise.all([
    getAllPosts(category),
    getAllCategories(),
  ]);

  if (posts.length === 0) {
    notFound();
  }

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  const label = CATEGORY_LABELS[category] ?? category;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
        <header className="mb-12">
          <div className="mb-4">
            <Link
              href="/blogs"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← ブログ一覧
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {label}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {label}に関する技術記事（{posts.length}件）
          </p>
        </header>

        <BlogList
          posts={posts}
          allTags={allTags}
          allCategories={allCategories}
          currentCategory={category}
        />
      </div>
    </div>
  );
}
