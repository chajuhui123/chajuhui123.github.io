"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { Chip } from "@/components/ui/chip";
import { Heading, Text } from "@/components/ui/typography";
import type { PostSummary } from "@/lib/posts";
import Image from "next/image";

type PostListProps = {
  posts: PostSummary[];
};

function DateBadge({ date }: { date: string }) {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 border-gray-200 border rounded-full text-text">
      <span className="text-[0.65rem] font-semibold uppercase">{weekday}</span>
      <span className="text-xl font-bold leading-none text-text">{day}</span>
    </div>
  );
}

export function PostList({ posts }: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
    });
    return Array.from(counts, ([name, count]) => ({ name, count }));
  }, [posts]);

  function toggleTag(name: string) {
    setSelectedTags((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name],
    );
  }

  const filteredPosts = selectedTags.length
    ? posts.filter((post) =>
        post.tags?.some((tag) => selectedTags.includes(tag)),
      )
    : posts;

  return (
    <>
      <div className="mx-auto flex max-w-lg flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <Chip
            key={tag.name}
            className="group cursor-pointer"
            selected={selectedTags.includes(tag.name)}
            onClick={() => toggleTag(tag.name)}
          >
            {tag.name}
            <span className="text-xxs text-gray-600 transition-colors group-hover:text-white group-aria-pressed:text-white">
              {tag.count}
            </span>
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredPosts.map((post, idx) => (
          <NextLink
            key={`post-${post.slug}-${idx}`}
            href={`/post/${post.slug}`}
            className="flex justify-between transition-opacity bg-surface rounded-xl px-7 py-7 hover:opacity-70"
          >
            <div className="flex flex-col gap-10">
              <div>
                <div className="flex items-center gap-2">
                  {post.tags?.map((tag) => (
                    <Chip
                      key={tag}
                      className="text-xxs border-gray-1 py-1 px-2 cursor-default hover:bg-transparent hover:text-text"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>

                {/* IMAGE */}
              </div>
              <div className="flex flex-col gap-1">
                <Text className="text-text" variant="caption">
                  {post.date}
                </Text>
                <Heading level={4}>{post.title}</Heading>
              </div>
            </div>
            <div className="hidden h-18 w-18 shrink-0 overflow-hidden rounded-full sm:block">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <DateBadge date={post.date} />
              )}
            </div>
          </NextLink>
        ))}

        {filteredPosts.length === 0 && (
          <Text variant="caption" className="text-center">
            게시물이 존재하지 않습니다 •••
          </Text>
        )}
      </div>
    </>
  );
}
