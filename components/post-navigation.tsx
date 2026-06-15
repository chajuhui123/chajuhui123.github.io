import Link from "next/link";

import type { Post } from "@/lib/types";

type PostNavigationProps = {
  previous: Post | null;
  next: Post | null;
};

export function PostNavigation({ previous, next }: PostNavigationProps) {
  return (
    <nav className="blog-post-nav">
      <ul className="m-0 flex list-none flex-wrap justify-between p-0">
        <li>
          {previous && (
            <Link href={previous.slug} rel="prev" className="text-primary hover:underline">
              ← {previous.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link href={next.slug} rel="next" className="text-primary hover:underline">
              {next.title} →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
