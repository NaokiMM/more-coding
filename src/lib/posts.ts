import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import { type Post, type PostMetadata } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content/posts");

/**
 * 最初のh1要素を削除するrehypeプラグイン
 */
function rehypeRemoveFirstHeading() {
  return (tree: Root) => {
    let firstHeadingRemoved = false;
    visit(tree, "element", (node: Element, index: number | null, parent: Element | Root | null) => {
      if (!firstHeadingRemoved && node.tagName === "h1" && parent && typeof index === "number") {
        // 最初のh1を削除
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
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) || [],
        excerpt: (data.excerpt as string) || "",
      };
    });

  // 日付で降順ソート（新しい順）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 指定されたslugの記事を取得（メタデータ + HTML本文）
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // MarkdownをHTMLに変換（先頭のh1を削除）
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeRemoveFirstHeading)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) || [],
    excerpt: (data.excerpt as string) || "",
    content: contentHtml,
  };
}

/**
 * すべての記事のslugを取得（generateStaticParams用）
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
