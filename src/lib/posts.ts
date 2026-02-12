import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import type { Root } from "hast";
import { type Post, type PostMetadata } from "@/types/post";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

/**
 * カテゴリフォルダ内の .md ファイルを再帰的に取得
 * @returns { category, slug } の配列
 */
function getBlogFiles(): { category: string; slug: string }[] {
  const result: { category: string; slug: string }[] = [];

  function scanDir(dir: string, category: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath, entry.name);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const slug = entry.name.replace(/\.md$/, "");
        result.push({ category, slug });
      }
    }
  }

  const categories = fs.readdirSync(blogsDirectory, { withFileTypes: true });
  for (const cat of categories) {
    if (cat.isDirectory()) {
      scanDir(path.join(blogsDirectory, cat.name), cat.name);
    } else if (cat.isFile() && cat.name.endsWith(".md")) {
      const slug = cat.name.replace(/\.md$/, "");
      result.push({ category: "", slug });
    }
  }

  return result;
}

/**
 * 最初のh1要素を削除するrehypeプラグイン
 */
function rehypeRemoveFirstHeading() {
  return (tree: Root) => {
    let firstHeadingRemoved = false;
    visit(tree, "element", (node, index, parent) => {
      if (!firstHeadingRemoved && node.tagName === "h1" && parent !== undefined && index !== undefined) {
        if ("children" in parent && Array.isArray(parent.children)) {
          parent.children.splice(index, 1);
          firstHeadingRemoved = true;
        }
      }
    });
  };
}

/**
 * すべての記事のメタデータを取得（日付降順）
 * @param category - 指定した場合はそのカテゴリのみ
 */
export async function getAllPosts(category?: string): Promise<PostMetadata[]> {
  const files = getBlogFiles();
  const allPostsData = files
    .filter((f) => !category || f.category === category)
    .map(({ category: cat, slug }) => {
      const fullPath =
        cat
          ? path.join(blogsDirectory, cat, `${slug}.md`)
          : path.join(blogsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        category: cat,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) || [],
        excerpt: (data.excerpt as string) || "",
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * すべてのカテゴリを取得
 */
export async function getAllCategories(): Promise<string[]> {
  const files = getBlogFiles();
  const categories = new Set(files.map((f) => f.category).filter(Boolean));
  return Array.from(categories).sort();
}

/**
 * 指定された category と slug の記事を取得（メタデータ + HTML本文）
 */
export async function getPostBySlug(category: string, slug: string): Promise<Post | null> {
  const fullPath = category
    ? path.join(blogsDirectory, category, `${slug}.md`)
    : path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeRemoveFirstHeading)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    category,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) || [],
    excerpt: (data.excerpt as string) || "",
    content: contentHtml,
  };
}

/**
 * すべての記事の params を取得（generateStaticParams用）
 */
export async function getAllPostParams(): Promise<{ category: string; slug: string }[]> {
  return getBlogFiles();
}
