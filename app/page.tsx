import { type Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "./post-list";

export const metadata: Metadata = {
  // root layout's title.template only applies to nested routes, not to its
  // own sibling page.tsx, so the suffix has to be spelled out here directly.
  title: "Post ꕤ Joy Devlog",
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-16 rounded-xl px-6 pb-20 pt-8">
      <PostList posts={posts} />
    </div>
  );
}
