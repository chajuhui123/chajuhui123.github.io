import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { AdjacentPosts, Post, PostFrontmatter } from "./types";
import { getContentDir } from "./paths";
import { getExcerpt, normalizeSlug, slugToSegments } from "./utils";

function createSlugFromRelativePath(relativePath: string): string {
  const withoutExtension = relativePath.replace(/\.mdx?$/i, "");
  return `/${withoutExtension}/`;
}

function collectMarkdownFiles(dir: string, baseDir = dir): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectMarkdownFiles(fullPath, baseDir);
    }

    if (/\.mdx?$/i.test(entry.name)) {
      return [path.relative(baseDir, fullPath)];
    }

    return [];
  });
}

function parseFrontmatter(data: PostFrontmatter, fallbackTitle: string): PostFrontmatter {
  return {
    title: data.title || fallbackTitle,
    date: data.date,
    category: data.category,
    description: data.description,
    draft: data.draft ?? false,
    archived: data.archived ?? false,
  };
}

function toPost(relativePath: string): Post {
  const contentDir = getContentDir();
  const absolutePath = path.join(contentDir, relativePath);
  const fileContents = fs.readFileSync(absolutePath, "utf8");
  const { data, content } = matter(fileContents);
  const slug = createSlugFromRelativePath(relativePath);
  const frontmatter = parseFrontmatter(data as PostFrontmatter, slugToSegments(slug).at(-1) ?? slug);

  return {
    slug,
    slugSegments: slugToSegments(slug),
    title: frontmatter.title,
    date: frontmatter.date,
    category: frontmatter.category,
    description: frontmatter.description,
    draft: frontmatter.draft ?? false,
    archived: frontmatter.archived ?? false,
    content,
    excerpt: getExcerpt(content),
  };
}

function sortByDate(posts: Post[], order: "asc" | "desc" = "desc"): Post[] {
  return [...posts].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return order === "asc" ? diff : -diff;
  });
}

export function getAllPosts(): Post[] {
  const files = collectMarkdownFiles(getContentDir());
  return sortByDate(files.map(toPost));
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => !post.draft && !post.archived);
}

export function getArchivedPosts(): Post[] {
  return sortByDate(
    getAllPosts().filter((post) => post.archived),
    "desc",
  );
}

export function getStaticPostParams(): Post[] {
  return sortByDate(
    getAllPosts().filter((post) => !post.draft),
    "asc",
  );
}

export function getPostBySlug(slug: string | string[]): Post | null {
  const normalizedSlug = normalizeSlug(slug);
  return getAllPosts().find((post) => post.slug === normalizedSlug) ?? null;
}

export function getAdjacentPosts(slug: string | string[]): AdjacentPosts {
  const normalizedSlug = normalizeSlug(slug);
  const chronology = getStaticPostParams();
  const index = chronology.findIndex((post) => post.slug === normalizedSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? chronology[index - 1] : null,
    next: index < chronology.length - 1 ? chronology[index + 1] : null,
  };
}

export function getAllCategories(): string[] {
  return [...new Set(getPublishedPosts().map((post) => post.category))];
}
