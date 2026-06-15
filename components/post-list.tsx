import Link from "next/link";

import { Tag } from "@/components/tag";
import { formatKoreanDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="mt-8">포스팅이 존재하지 않습니다 😢</p>;
  }

  return (
    <ol className="list-none">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ol>
  );
}

function PostListItem({ post }: { post: Post }) {
  const title = post.title || post.slug;

  return (
    <li>
      <article
        className="my-16"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="mb-4">
          <div className="mb-2.5">
            <Tag category={post.category} />
          </div>
          <h2 className="mb-2 mt-0 text-[1.728rem] leading-normal text-primary">
            <Link href={post.slug} itemProp="url">
              <span
                className="cursor-pointer bg-[length:0%_100%] bg-no-repeat transition-[background-size] duration-700 hover:bg-[length:100%_100%] [background-image:linear-gradient(transparent_60%,var(--color-accent)_10%)]"
                itemProp="headline"
              >
                {title}
              </span>
            </Link>
          </h2>
          <small>{formatKoreanDate(post.date)}</small>
        </header>
        <section>
          <p className="mb-0" itemProp="description">
            {post.description || post.excerpt}
          </p>
        </section>
      </article>
    </li>
  );
}
