import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  // GitHub Pages only serves static files (no server for on-demand image
  // optimization), so export a fully static build and skip next/image's
  // optimization pipeline — this also sidesteps the PNG palette-compression
  // banding issue, since images are now served unmodified.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
