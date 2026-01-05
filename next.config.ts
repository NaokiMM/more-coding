import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // next/image を使ってても事故りにくくする
};

export default nextConfig;
