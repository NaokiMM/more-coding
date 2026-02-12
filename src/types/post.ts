/**
 * 記事のメタデータ（一覧表示用）
 */
export interface PostMetadata {
  slug: string;
  category: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

/**
 * 記事の完全なデータ（詳細表示用）
 */
export interface Post extends PostMetadata {
  content: string; // HTML形式の本文
}
