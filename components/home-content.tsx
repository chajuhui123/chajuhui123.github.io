"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PostList } from "@/components/post-list";
import type { Post } from "@/lib/types";

type HomeContentProps = {
  posts: Post[];
  categories: string[];
};

export function HomeContent({ posts, categories }: HomeContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const visiblePosts = useMemo(() => {
    if (selectedCategory === "ALL") {
      return posts;
    }

    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const handleChangeCategory = (category: string) => {
    if (category === "ALL" || categories.includes(category)) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("ALL");
    }
  };

  return (
    <>
      <ul className="flex gap-2 overflow-x-auto text-nowrap border border-[#ecf0f2] border-x-[6px] bg-[#f4f7f8] px-5 py-2">
        <CategoryItem
          category="ALL"
          selectedCategory={selectedCategory}
          onSelect={handleChangeCategory}
        />
        {categories.map((category) => (
          <CategoryItem
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            onSelect={handleChangeCategory}
          />
        ))}
      </ul>

      <div className="mt-3 mb-2 flex justify-end">
        <Link
          href="/draft-posting"
          className="rounded-[13px] border border-accent bg-accent px-3 py-1 font-heading text-xs text-text-light no-underline transition-colors hover:border-white-pink hover:bg-white hover:text-accent-pink"
        >
          Archived Posts
        </Link>
      </div>

      <PostList posts={visiblePosts} />
    </>
  );
}

type CategoryItemProps = {
  category: string;
  selectedCategory: string;
  onSelect: (category: string) => void;
};

function CategoryItem({ category, selectedCategory, onSelect }: CategoryItemProps) {
  const isSelected = selectedCategory === category;

  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => onSelect(category)}
        className={`cursor-pointer rounded-[15px] border bg-white px-3 py-1 font-heading text-sm ${
          isSelected
            ? "border-[0.15rem] border-accent-pink text-accent-pink"
            : "border-[0.1rem] border-white-pink text-white-pink"
        }`}
      >
        {category}
      </button>
    </li>
  );
}
