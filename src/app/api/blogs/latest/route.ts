import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import type { PostMetadata } from "@/types/post";

export async function GET() {
  const posts: PostMetadata[] = await getAllPosts();
  const latest = posts.slice(0, 3);
  return NextResponse.json(latest);
}

