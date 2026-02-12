import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostParams } from "@/lib/posts";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const params = await getAllPostParams();
  return params.map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return {
      title: "記事が見つかりません - More Coding",
    };
  }

  return {
    title: `${post.title} - More Coding ブログ`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const backHref = category ? `/blogs/${category}` : "/blogs";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href={backHref}
          className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          ← ブログ一覧に戻る
        </Link>

        <article className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-8 sm:p-10">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {post.title}
            </h1>

            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
