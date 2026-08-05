"use client";

import NextLink from "next/link";
import { Text } from "@/components/ui/typography";
import type { StashSummary } from "@/lib/stash";

type StashListProps = {
  stashes: StashSummary[];
};

export function StashList({ stashes }: StashListProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {stashes.map((stash, idx) => (
          <NextLink
            key={`stash-${stash.slug}-${idx}`}
            href={`/stash/${stash.slug}`}
            className="flex items-center gap-18 transition-opacity hover:opacity-70"
          >
            <Text className="text-text font-semibold" variant="body">
              {stash.date}
            </Text>
            <Text className="text-text font-semibold" variant="lead">
              {stash.title}
            </Text>
          </NextLink>
        ))}
        {stashes.length === 0 && (
          <Text variant="caption" className="text-center">
            게시물이 존재하지 않습니다 •••
          </Text>
        )}
      </div>
    </>
  );
}
