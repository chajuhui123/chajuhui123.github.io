import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: projectRoot,
  },
};

// rehype-pretty-code는 Turbopack 직렬화 제약으로 Phase 4에서 별도 파이프라인으로 추가
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
