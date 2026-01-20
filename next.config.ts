import type { NextConfig } from "next";

// 静的サイトとして出力する
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // 静的ホスティングでのルーティングを安定させる
  images: { unoptimized: true }, // next/image を使ってても事故りにくくする
};

export default nextConfig;
