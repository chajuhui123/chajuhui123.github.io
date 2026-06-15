import type { Metadata } from "next";

import { PostList } from "@/components/post-list";
import { SiteLayout } from "@/components/site-layout";
import { getArchivedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archived Posts",
  description: "2023년 이전에 작성된 포스팅 모음",
};

export default function DraftPostingPage() {
  const posts = getArchivedPosts();

  return (
    <SiteLayout>
      <div className="mb-12">
        <h1 className="mb-4 text-pink">Archived Posts</h1>
        <p className="mb-0 text-sm font-semibold text-text-light">
          2023년 이전에 작성된 포스팅들입니다. 추억으로 간직하기 위해 남겨두었어요. 🌱
        </p>
      </div>

      <PostList posts={posts} />
    </SiteLayout>
  );
}
