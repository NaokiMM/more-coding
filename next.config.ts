import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: "/", // ←追加（/_next をルート固定にする）
};

export default nextConfig;
