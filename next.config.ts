import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    // Next's default quality (75) drives PNG output to palette/indexed-color
    // quantization, which bands visibly on smooth gradients (e.g. frontmatter
    // cover images) — allow a higher quality tier to avoid that.
    qualities: [75, 85],
  },
};

export default nextConfig;
