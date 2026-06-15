import type { Metadata } from "next";

import { Bio } from "@/components/bio";
import { HomeContent } from "@/components/home-content";
import { SiteLayout } from "@/components/site-layout";
import { getAllCategories, getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.author.summary,
};

export default function HomePage() {
  const posts = getPublishedPosts();
  const categories = getAllCategories();

  return (
    <SiteLayout isRootPath>
      <Bio />

      {posts.length === 0 ? (
        <p>포스팅이 존재하지 않습니다 😢</p>
      ) : (
        <HomeContent posts={posts} categories={categories} />
      )}
    </SiteLayout>
  );
}
